"use client";
import { Typography, Button, Box } from "@mui/material";

export default function LoginPage() {
  const handleGoogleLogin = () => {
    alert("Google OAuth placeholder");
  };
  const handleFacebookLogin = () => {
    alert("Facebook OAuth placeholder");
  };
  const handleXLogin = () => {
    alert("X/Twitter OAuth placeholder");
  };

  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Typography paragraph>Login using your social account:</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoogleLogin}
        sx={{ mr: 2 }}
      >
        Login with Google
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleFacebookLogin}
        sx={{ mr: 2 }}
      >
        Login with Facebook
      </Button>
      <Button variant="contained" color="primary" onClick={handleXLogin}>
        Login with X
      </Button>
    </Box>
  );
}
