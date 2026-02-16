import { supabaseServerComponent } from "@/lib/supabase/server-component";
import { notFound, redirect } from "next/navigation";
import ParticipateForm from "./ParticipateForm";

type QuestionRow = {
  id: string;
  prompt: string;
  type: "single_choice" | "multiple_choice" | "text";
  position: number;
  survey_options?: { id: string; label: string; position: number }[];
};

type PrefillAnswer =
  | { type: "text"; value: string }
  | { type: "single_choice"; optionId: string }
  | { type: "multiple_choice"; optionIds: string[] };

type PrefillAnswers = Record<string, PrefillAnswer>;

export default async function ParticipatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ mode?: string }>;
}) {
  const { id } = await params;
  const sp = (await searchParams) ?? {};
  const mode = sp.mode; // "edit" to prefill + allow editing

  const supabase = await supabaseServerComponent();

  // Require auth for participate (since you store user_id)
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  const user = userData.user;
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(`/surveys/${id}/participate`)}`);
  }

  // Load survey
  const { data: survey, error: sErr } = await supabase
    .from("surveys")
    .select("id, title, status")
    .eq("id", id)
    .single();

  if (sErr || !survey) return notFound();

  // MVP: only allow participation in published surveys
  if (survey.status !== "published") return notFound();

  // Load questions + options
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
    .eq("survey_id", id)
    .order("position", { ascending: true });

  if (qErr) throw qErr;

  const questions = (questionsRaw ?? []) as QuestionRow[];

  // sort options for each question
  questions.forEach((q) => {
    q.survey_options = (q.survey_options ?? []).sort(
      (a, b) => a.position - b.position,
    );
  });

  // Prefill answers if editing
  let prefill: PrefillAnswers | null = null;

  if (mode === "edit") {
    // Get user's current response for this survey
    const { data: resp, error: rErr } = await supabase
      .from("survey_responses")
      .select("id")
      .eq("survey_id", id)
      .eq("user_id", user.id)
      .eq("is_current", true)
      .maybeSingle();

    if (rErr) throw rErr;

    if (resp?.id) {
      const { data: ansRows, error: aErr } = await supabase
        .from("survey_answers")
        .select("question_id, option_id, text_answer")
        .eq("response_id", resp.id);

      if (aErr) throw aErr;

      const rows = ansRows ?? [];

      const out: PrefillAnswers = {};

      for (const q of questions) {
        if (q.type === "text") {
          const row = rows.find((r) => r.question_id === q.id);
          if (row) out[q.id] = { type: "text", value: row.text_answer ?? "" };
        } else if (q.type === "single_choice") {
          const row = rows.find((r) => r.question_id === q.id && r.option_id);
          if (row?.option_id)
            out[q.id] = { type: "single_choice", optionId: row.option_id };
        } else if (q.type === "multiple_choice") {
          const optionIds = rows
            .filter((r) => r.question_id === q.id && r.option_id)
            .map((r) => r.option_id as string);
          out[q.id] = { type: "multiple_choice", optionIds };
        }
      }

      prefill = out;
    }
  }

  // Shape for client component
  const clientQuestions = questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    type: q.type,
    options: (q.survey_options ?? []).map((o) => ({
      id: o.id,
      label: o.label,
    })),
  }));

  return (
    <ParticipateForm
      surveyId={id}
      surveyTitle={survey.title}
      questions={clientQuestions}
      mode={mode === "edit" ? "edit" : "new"}
      prefillAnswers={prefill}
    />
  );
}
