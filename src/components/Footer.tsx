"use client";

// components/home/modules/views/AppFooter.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import NextLink from "next/link";

function Copyright() {
  return (
    <>
      {"© "}
      <Link component={NextLink} color="inherit" href="/" underline="hover">
        Veyqo
      </Link>{" "}
      {new Date().getFullYear()}
      {". All rights reserved."}
    </>
  );
}

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.50",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container sx={{ py: 8 }}>
        {/* ================= MAIN ROW ================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: { xs: 6, md: 0 },
          }}
        >
          {/* ================= LEFT SIDE ================= */}
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Veyqo
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Public-first surveys for real-time results. Create a question,
              share a link, and watch opinions change live.
            </Typography>

            {/* Socials (from your current footer) */}
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                href="#"
                aria-label="Facebook"
                sx={{ color: "text.secondary" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="#"
                aria-label="Twitter / X"
                sx={{ color: "text.secondary" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="#"
                aria-label="Instagram"
                sx={{ color: "text.secondary" }}
              >
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* ================= RIGHT SIDE ================= */}
          <Box
            sx={{
              display: "flex",
              gap: { xs: 6, md: 10 },
              textAlign: "right",
            }}
          >
            {/* Product */}
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 1 }}>Product</Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link component={NextLink} href="/surveys" underline="hover">
                    Explore surveys
                  </Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link
                    component={NextLink}
                    href="/surveys/new"
                    underline="hover"
                  >
                    Create a survey
                  </Link>
                </Box>
              </Box>
            </Box>

            {/* Company */}
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 1 }}>Company</Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link component={NextLink} href="/#about" underline="hover">
                    About
                  </Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link component={NextLink} href="/#contact" underline="hover">
                    Contact
                  </Link>
                </Box>
              </Box>
            </Box>

            {/* Legal */}
            <Box>
              <Typography sx={{ fontWeight: 800, mb: 1 }}>Legal</Typography>
              <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link component={NextLink} href="/privacy" underline="hover">
                    Privacy
                  </Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  {/* Keeping your existing route from the current footer */}
                  <Link
                    component={NextLink}
                    href="/terms-and-conditions"
                    underline="hover"
                  >
                    Terms
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="caption" color="text.secondary">
          <Copyright />
        </Typography>
      </Container>
    </Box>
  );
}
