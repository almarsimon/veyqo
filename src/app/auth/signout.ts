import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await supabaseServerClient();
  await supabase.auth.signOut();

  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/login", url.origin), { status: 303 });
}
