import { supabaseServerComponent } from "@/lib/supabase/server-component";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await supabaseServerComponent();

  const { data } = await supabase
    .from("survey_questions")
    .select(
      `
      id,
      prompt,
      type,
      survey_options ( id, label )
    `,
    )
    .eq("survey_id", id)
    .order("position");

  return NextResponse.json(data ?? []);
}
