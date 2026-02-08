"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export async function signInWithGoogle() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // MUST be allowed in Supabase Auth URL config
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    redirect("/login?error=oauth_start");
  }

  // This is the Supabase /authorize URL; redirect the browser to it.
  redirect(data.url);
}
