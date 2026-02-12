import { notFound } from "next/navigation";
import { supabaseServerComponent } from "@/lib/supabase/server-component";
import SurveyResultsView from "./SurveyResultsView";
import { getSurveyResults } from "@/lib/server/surveys/results";

export default async function SurveyResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await supabaseServerComponent();

  const { data, error } = await supabase.auth.getUser();

  // Guest = OK (don't crash)
  const isLoggedIn =
    error && error.name === "AuthSessionMissingError" ? false : !!data.user;

  // Only crash for unexpected auth errors
  if (error && error.name !== "AuthSessionMissingError") {
    throw error;
  }

  console.log("🚀 ~ SurveyResultsPage ~ id:", id);
  const results = await getSurveyResults(id);
  console.log("🚀 ~ SurveyResultsPage ~ results:", results);
  if (!results) return notFound();

  return <SurveyResultsView data={results} isLoggedIn={isLoggedIn} />;
}
