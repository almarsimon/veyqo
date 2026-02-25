import "server-only";
import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";

export type PublicSurveyRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  created_at: string;
  published_at: string | null;
};

export async function getPublicSurveys(): Promise<PublicSurveyRow[]> {
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase
    .from("surveys")
    .select("id, title, status, created_at, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as PublicSurveyRow[];
}
