"use server";

import { redirect } from "next/navigation";
import { createSurvey } from "@/lib/server/surveys/create";
import type { CreateSurveyPayload } from "@/lib/server/surveys/types";

export async function createSurveyAction(formData: FormData) {
  const raw = formData.get("payload");
  if (typeof raw !== "string") throw new Error("Missing payload");

  const payload = JSON.parse(raw) as CreateSurveyPayload;

  const { surveyId } = await createSurvey(payload);

  redirect(`/surveys/${surveyId}`);
}
