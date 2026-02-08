"use client";

import { Button } from "@mui/material";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    auth: {
      flowType: "pkce",
    },
  },
);

export default function GoogleLoginButton() {
  const signIn = async () => {
    console.log("signing in");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error(error);
  };

  return (
    <Button variant="contained" color="primary" sx={{ mr: 2 }} onClick={signIn}>
      Continue with Google
    </Button>
  );
}
