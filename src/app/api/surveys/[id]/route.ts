import { supabaseServerComponent } from "@/lib/supabase/server-component";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
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
    .eq("survey_id", params.id)
    .order("position");

  return NextResponse.json(data ?? []);
}
