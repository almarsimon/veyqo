"use server";

import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import { redirect } from "next/navigation";

type AnswerPayload = {
  questionId: string;
  optionIds?: string[];
  text?: string;
};

export async function submitSurveyAction(
  surveyId: string,
  answers: AnswerPayload[],
) {
  const supabase = await supabaseServerClient();

  // Auth
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  const user = userData.user;
  if (!user) throw new Error("Not authenticated");

  // 1) Find current response (if any)
  const { data: prev, error: prevErr } = await supabase
    .from("survey_responses")
    .select("id")
    .eq("survey_id", surveyId)
    .eq("user_id", user.id)
    .eq("is_current", true)
    .maybeSingle();

  if (prevErr) throw prevErr;

  // 2) IMPORTANT: mark previous as not current BEFORE inserting new current
  if (prev?.id) {
    const { error: updErr } = await supabase
      .from("survey_responses")
      .update({ is_current: false })
      .eq("id", prev.id)
      .eq("user_id", user.id); // safety

    if (updErr) throw updErr;
  }

  // 3) Insert new response snapshot as current
  const { data: next, error: nextErr } = await supabase
    .from("survey_responses")
    .insert({
      survey_id: surveyId,
      user_id: user.id,
      is_current: true,
      supersedes_response_id: prev?.id ?? null,
    })
    .select("id")
    .single();

  if (nextErr) throw nextErr;

  const newResponseId = next.id as string;

  // 4) Insert answers for the new response
  const rows: Array<{
    response_id: string;
    question_id: string;
    option_id?: string;
    text_answer?: string;
  }> = [];

  for (const a of answers) {
    if (a.optionIds?.length) {
      for (const optId of a.optionIds) {
        rows.push({
          response_id: newResponseId,
          question_id: a.questionId,
          option_id: optId,
        });
      }
    } else {
      rows.push({
        response_id: newResponseId,
        question_id: a.questionId,
        text_answer: a.text ?? "",
      });
    }
  }

  if (rows.length) {
    const { error: ansErr } = await supabase
      .from("survey_answers")
      .insert(rows);
    if (ansErr) throw ansErr;
  }

  redirect(`/surveys/${surveyId}/participate/thank-you`);
}
