import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";

export async function POST(req: Request) {
  const res = NextResponse.json({ ok: true });

  const supabase = await supabaseServerClient();

  await supabase.auth.signOut();

  return res;
}
