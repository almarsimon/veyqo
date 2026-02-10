"use client";

import * as React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signInWithGoogle } from "./signInWithGoogle";
import { signInWithFacebook } from "./signInWithFacebook";

// Brand-ish buttons (Material UI doesn't ship official OAuth provider buttons)
const GoogleButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  justifyContent: "flex-start",
  gap: theme.spacing(1.25),
  paddingTop: theme.spacing(1.2),
  paddingBottom: theme.spacing(1.2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));

const FacebookButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  justifyContent: "flex-start",
  gap: theme.spacing(1.25),
  paddingTop: theme.spacing(1.2),
  paddingBottom: theme.spacing(1.2),
  backgroundColor: "#1877F2",
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: "#166FE5",
  },
}));

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: { xs: "auto", md: "100dvh" },
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        bgcolor: "background.default",
        py: { xs: 0, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr" },
              minHeight: { md: 520 },
            }}
          >
            {/* LEFT: Image / Illustration (hidden on mobile) */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "relative",
                bgcolor: "grey.100",
              }}
            >
              {/* You can replace this with next/image if you prefer */}
              <Box
                component="img"
                alt="Welcome illustration"
                src="/login-illustration.jpg"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Optional overlay text */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  p: 4,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                  color: "common.white",
                }}
              >
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Welcome back
                  </Typography>
                  <Typography sx={{ opacity: 0.9, mt: 1 }}>
                    Sign in to answer surveys, share links, and view results in
                    one place.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* RIGHT: Login panel */}
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    Sign in
                  </Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>
                    Continue with a provider to access your dashboard.
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  <form action={signInWithGoogle}>
                    <GoogleButton
                      fullWidth
                      variant="contained"
                      type="submit"
                      disableElevation
                      startIcon={<GoogleIcon />}
                    >
                      Continue with Google
                    </GoogleButton>
                  </form>

                  <form action={signInWithFacebook}>
                    <FacebookButton
                      fullWidth
                      variant="contained"
                      type="submit"
                      disableElevation
                      startIcon={<FacebookIcon />}
                    >
                      Continue with Facebook
                    </FacebookButton>
                  </form>
                </Stack>

                <Divider />

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  By continuing, you agree to our Terms and acknowledge our
                  Privacy Policy.
                </Typography>

                {/* Optional: small helper */}
                <Typography variant="body2" color="text.secondary">
                  Having trouble? Try a different provider or check that pop-ups
                  are allowed.
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

// "use client";

// import { Typography, Box, Button } from "@mui/material";
// import { signInWithFacebook, signInWithGoogle } from "./googleAction";

// export default function LoginPage() {
//   return (
//     <Box sx={{ py: 8, textAlign: "center" }}>
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>
//       <form action={signInWithGoogle}>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mr: 2 }}
//           type="submit"
//         >
//           Continue with Google
//         </Button>
//       </form>
//       <form action={signInWithFacebook}>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ mr: 2 }}
//           type="submit"
//         >
//           Continue with Facebook
//         </Button>
//       </form>
//     </Box>
//   );
// }
