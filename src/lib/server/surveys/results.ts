import "server-only";

import { supabaseServerComponent } from "@/lib/supabase/server-component";

export type QuestionType = "single_choice" | "multiple_choice" | "text";

export type SurveyRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  created_at: string;
  published_at: string | null;
};

export type QuestionRow = {
  id: string;
  prompt: string;
  type: QuestionType;
  position: number;
  survey_options?: { id: string; label: string; position: number }[];
};

type ResponseRow = { id: string };

type AnswerRow = {
  response_id: string;
  question_id: string;
  option_id: string | null;
  text_answer: string | null;
  created_at: string;
};

export type SurveyResultsData =
  | {
      survey: SurveyRow;
      questions: QuestionRow[];
      totalResponses: number;
      // Aggregates:
      choiceCounts: Record<string, Record<string, number>>; // questionId -> optionId -> count
      textAnswers: Record<string, string[]>; // questionId -> answers
      answeredCount: Record<string, number>; // questionId -> unique responses count
    }
  | {
      survey: SurveyRow;
      questions: QuestionRow[];
      totalResponses: 0;
      choiceCounts: Record<string, Record<string, number>>;
      textAnswers: Record<string, string[]>;
      answeredCount: Record<string, number>;
    };

export async function getSurveyResults(
  surveyId: string,
): Promise<SurveyResultsData | null> {
  const supabase = await supabaseServerComponent();

  // 1) Survey
  const { data: survey, error: surveyErr } = await supabase
    .from("surveys")
    .select("id, title, status, created_at, published_at")
    .eq("id", surveyId)
    .single();

  if (surveyErr || !survey) return null;

  // 2) Questions + options
  const { data: questionsRaw, error: qErr } = await supabase
    .from("survey_questions")
    .select(
      `
      id,
      prompt,
      type,
      position,
      survey_options (
        id,
        label,
        position
      )
    `,
    )
    .eq("survey_id", surveyId)
    .order("position", { ascending: true });

  if (qErr) throw qErr;

  const questions = (questionsRaw ?? []) as QuestionRow[];
  questions.forEach((q) => {
    q.survey_options = (q.survey_options ?? []).sort(
      (a, b) => a.position - b.position,
    );
  });

  // 3) Response IDs
  const { data: responses, error: rErr } = await supabase
    .from("survey_responses")
    .select("id")
    .eq("survey_id", surveyId);

  if (rErr) throw rErr;

  const responseIds = (responses ?? []).map((r: ResponseRow) => r.id);
  const totalResponses = responseIds.length;

  // Prepare aggregates (always return same shape)
  const choiceCounts: Record<string, Record<string, number>> = {};
  const textAnswers: Record<string, string[]> = {};
  const answeredCount: Record<string, number> = {};

  if (totalResponses === 0) {
    return {
      survey,
      questions,
      totalResponses: 0,
      choiceCounts,
      textAnswers,
      answeredCount,
    };
  }

  // 4) Answers
  const { data: answers, error: aErr } = await supabase
    .from("survey_answers")
    .select("response_id, question_id, option_id, text_answer, created_at")
    .in("response_id", responseIds)
    .order("created_at", { ascending: false });

  if (aErr) throw aErr;

  const allAnswers = (answers ?? []) as AnswerRow[];

  // Use sets to compute unique answered counts per question
  const answeredSets: Record<string, Set<string>> = {};

  for (const ans of allAnswers) {
    if (!answeredSets[ans.question_id])
      answeredSets[ans.question_id] = new Set<string>();
    answeredSets[ans.question_id].add(ans.response_id);

    // Choice
    if (ans.option_id) {
      if (!choiceCounts[ans.question_id]) choiceCounts[ans.question_id] = {};
      choiceCounts[ans.question_id][ans.option_id] =
        (choiceCounts[ans.question_id][ans.option_id] ?? 0) + 1;
      continue;
    }

    // Text
    const t = (ans.text_answer ?? "").trim();
    if (t) {
      if (!textAnswers[ans.question_id]) textAnswers[ans.question_id] = [];
      textAnswers[ans.question_id].push(t);
    }
  }

  for (const [questionId, set] of Object.entries(answeredSets)) {
    answeredCount[questionId] = set.size;
  }

  return {
    survey,
    questions,
    totalResponses,
    choiceCounts,
    textAnswers,
    answeredCount,
  };
}
