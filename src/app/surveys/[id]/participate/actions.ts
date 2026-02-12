"use server";

import { supabaseServerComponent } from "@/lib/supabase/server-component";
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
  const supabase = await supabaseServerComponent();

  // IMPORTANT: authenticate against Supabase Auth server
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  console.log("USER:", userData.user?.id);
  if (userErr) throw userErr;
  const user = userData.user;
  if (!user) throw new Error("Not authenticated");

  // Insert response row (RLS expects auth.uid() === user_id)
  const { data: response, error: responseErr } = await supabase
    .from("survey_responses")
    .insert({ survey_id: surveyId, user_id: user.id })
    .select("id")
    .single();

  if (responseErr) throw responseErr;

  const rows: any[] = [];
  for (const a of answers) {
    if (a.optionIds?.length) {
      for (const optId of a.optionIds) {
        rows.push({
          response_id: response.id,
          question_id: a.questionId,
          option_id: optId,
        });
      }
    } else {
      rows.push({
        response_id: response.id,
        question_id: a.questionId,
        text_answer: a.text ?? "",
      });
    }
  }

  console.log("🚀 ~ submitSurveyAction ~ rows:", rows);

  if (rows.length) {
    const { error: ansErr } = await supabase
      .from("survey_answers")
      .insert(rows);
    if (ansErr) throw ansErr;
  }

  redirect(`/surveys/${surveyId}/participate/thank-you`);
}
