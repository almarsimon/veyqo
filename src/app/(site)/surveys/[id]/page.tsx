import { notFound } from "next/navigation";
import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import SurveyResultsView from "./SurveyResultsView";
import { getSurveyResults } from "@/lib/server/surveys/results";

type ViewerResponse = {
  hasResponded: boolean;
  respondedAt?: string | null;
  answers: Record<
    string,
    | { type: "text"; value: string }
    | { type: "single_choice"; optionId: string }
    | { type: "multiple_choice"; optionIds: string[] }
  >;
};

async function getViewerResponse(args: {
  supabase: Awaited<ReturnType<typeof supabaseServerClient>>;
  surveyId: string;
  userId: string;
  questions: Array<{
    id: string;
    type: "single_choice" | "multiple_choice" | "text";
  }>;
}) {
  const { supabase, surveyId, userId, questions } = args;

  // 1) Get latest response for this user + survey
  const { data: responseRow, error: responseErr } = await supabase
    .from("survey_responses")
    .select("id, created_at")
    .eq("survey_id", surveyId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (responseErr) throw responseErr;

  if (!responseRow) {
    const empty: ViewerResponse = {
      hasResponded: false,
      respondedAt: null,
      answers: {},
    };
    return empty;
  }

  const responseId = responseRow.id as string;

  // 2) Get all answers for that response
  const { data: answerRows, error: answersErr } = await supabase
    .from("survey_answers")
    .select("question_id, option_id, text_answer")
    .eq("response_id", responseId);

  if (answersErr) throw answersErr;

  const rows = answerRows ?? [];

  // 3) Build answers based on question type (from getSurveyResults)
  const qTypeById = new Map(questions.map((q) => [q.id, q.type] as const));

  const answers: ViewerResponse["answers"] = {};

  for (const q of questions) {
    const qt = q.type;

    if (qt === "text") {
      // expect 0..1 row
      const row = rows.find((r) => r.question_id === q.id);
      if (row && (row.text_answer ?? "") !== "") {
        answers[q.id] = { type: "text", value: row.text_answer ?? "" };
      } else if (row) {
        // record empty text too, so UI can show "(empty)" if you want
        answers[q.id] = { type: "text", value: row.text_answer ?? "" };
      }
      continue;
    }

    if (qt === "single_choice") {
      // expect 0..1 row
      const row = rows.find((r) => r.question_id === q.id && r.option_id);
      if (row?.option_id) {
        answers[q.id] = { type: "single_choice", optionId: row.option_id };
      }
      continue;
    }

    if (qt === "multiple_choice") {
      // expect 0..N rows (one per selected option)
      const optionIds = rows
        .filter((r) => r.question_id === q.id && r.option_id)
        .map((r) => r.option_id as string);

      answers[q.id] = { type: "multiple_choice", optionIds };
      continue;
    }
  }

  return {
    hasResponded: true,
    respondedAt: (responseRow.created_at ?? null) as string | null,
    answers,
  };
}

export default async function SurveyResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.auth.getUser();

  // Guest = OK (don't crash)
  const isLoggedIn =
    error && error.name === "AuthSessionMissingError" ? false : !!data.user;

  // Only crash for unexpected auth errors
  if (error && error.name !== "AuthSessionMissingError") {
    throw error;
  }

  const results = await getSurveyResults(id);
  if (!results) return notFound();

  const viewerResponse =
    isLoggedIn && data.user
      ? await getViewerResponse({
          supabase,
          surveyId: id,
          userId: data.user.id,
          questions: results.questions.map((q) => ({
            id: q.id,
            type: q.type,
          })),
        })
      : null;

  return (
    <SurveyResultsView
      data={results}
      isLoggedIn={isLoggedIn}
      viewerResponse={viewerResponse}
    />
  );
}
