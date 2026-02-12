import { supabaseServerComponent } from "@/lib/supabase/server-component";
import { notFound } from "next/navigation";
import ParticipateForm from "./ParticipateForm";

type QuestionRow = {
  id: string;
  prompt: string;
  type: "single_choice" | "multiple_choice" | "text";
  position: number;
  survey_options?: { id: string; label: string; position: number }[];
};

export default async function ParticipatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await supabaseServerComponent();

  // Load survey (optional but recommended)
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
    />
  );
}
