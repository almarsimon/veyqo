import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const res = NextResponse.json({ ok: true });

  const supabase = await supabaseServer();

  await supabase.auth.signOut();

  return res;
}
