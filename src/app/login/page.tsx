"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Typography, Box } from "@mui/material";
import { signInWithGoogle } from "./googleAction";

export default function LoginPage() {
  console.log("login page");

  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      {/* <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography paragraph>Login using your Google account.</Typography>
      <GoogleLoginButton /> */}
      return (
      <form action={signInWithGoogle}>
        <button type="submit">Continue with Google</button>
      </form>
      );
    </Box>
  );
}
