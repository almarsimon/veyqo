"use client";
import {
  Box,
  Container,
  Stack,
  Link as MuiLink,
  IconButton,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderTop: "1px solid #e0e0e0",
        p: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Veyqo. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={2} style={{ fontSize: ".8rem" }}>
            <MuiLink
              component={Link}
              href="/privacy"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Privacy
            </MuiLink>
            <MuiLink
              component={Link}
              href="/terms-and-conditions"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Terms
            </MuiLink>
            <MuiLink
              component={Link}
              href="/contact"
              color="inherit"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Contact
            </MuiLink>
            <IconButton href="#" color="inherit">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" color="inherit">
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" color="inherit">
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
