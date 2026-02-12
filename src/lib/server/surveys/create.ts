import "server-only";

import { supabaseServerComponent } from "@/lib/supabase/server-component";
import type { CreateSurveyPayload, QuestionType } from "./types";

import { requireAdmin } from "@/lib/server/auth/guards";

function isChoice(type: QuestionType) {
  return type === "single_choice" || type === "multiple_choice";
}

export async function createSurvey(
  payload: CreateSurveyPayload,
): Promise<{ surveyId: string }> {
  await requireAdmin();

  const title = (payload.title ?? "").trim();
  if (!title) throw new Error("Title is required");

  const questions = Array.isArray(payload.questions) ? payload.questions : [];
  if (questions.length === 0) throw new Error("Add at least one question");

  questions.forEach((q) => {
    if (!q.prompt?.trim()) throw new Error("Each question needs a prompt");
    if (isChoice(q.type)) {
      const opts = (q.options ?? []).map((o) => o.trim()).filter(Boolean);
      if (opts.length < 2)
        throw new Error("Choice questions need at least 2 options");
    }
  });

  const supabase = await supabaseServerComponent();
  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  const user = userRes.user;
  if (!user) throw new Error("Not authenticated");

  const status = payload.mode === "publish" ? "published" : "draft";
  const published_at =
    payload.mode === "publish" ? new Date().toISOString() : null;

  // 1) Insert survey
  const { data: survey, error: surveyErr } = await supabase
    .from("surveys")
    .insert({
      owner_id: user.id,
      title,
      status,
      published_at,
    })
    .select("id")
    .single();

  if (surveyErr) throw surveyErr;

  // 2) Insert questions
  const questionRows = questions.map((q, idx) => ({
    survey_id: survey.id,
    position: idx,
    prompt: q.prompt.trim(),
    type: q.type,
  }));

  const { data: insertedQuestions, error: qErr } = await supabase
    .from("survey_questions")
    .insert(questionRows)
    .select("id, position, type");

  if (qErr) throw qErr;

  // 3) Insert options
  const byPosition = new Map<number, { id: string; type: QuestionType }>();
  for (const iq of insertedQuestions ?? []) {
    byPosition.set(iq.position, { id: iq.id, type: iq.type as QuestionType });
  }

  const optionRows: Array<{
    question_id: string;
    position: number;
    label: string;
  }> = [];

  questions.forEach((q, qIndex) => {
    if (!isChoice(q.type)) return;

    const match = byPosition.get(qIndex);
    if (!match) return;

    const opts = (q.options ?? []).map((o) => o.trim()).filter(Boolean);
    opts.forEach((label, optIndex) => {
      optionRows.push({
        question_id: match.id,
        position: optIndex,
        label,
      });
    });
  });

  if (optionRows.length > 0) {
    const { error: optErr } = await supabase
      .from("survey_options")
      .insert(optionRows);
    if (optErr) throw optErr;
  }

  return { surveyId: survey.id };
}
