"use server";

import { redirect } from "next/navigation";
import { supabaseServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";

export async function signInWithGoogle() {
  const supabase = await supabaseServerClient();

  const headersList = await headers();
  const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";

  const origin = `${protocol}://${host}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // MUST be allowed in Supabase Auth URL config
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/login?error=oauth_start");
  }

  // This is the Supabase /authorize URL; redirect the browser to it.
  redirect(data.url);
}
