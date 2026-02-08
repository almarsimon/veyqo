"use client";

import { Typography, Box, Button } from "@mui/material";
import { signInWithGoogle } from "./googleAction";

export default function LoginPage() {
  console.log("login page");

  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography paragraph>Login using your Google account.</Typography>
      <form action={signInWithGoogle}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          type="submit"
        >
          Continue with Google
        </Button>
      </form>
    </Box>
  );
}
