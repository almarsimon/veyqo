"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import VeyqoLogo from "../public/VeyqoLogo.png";
import { Space_Grotesk } from "next/font/google";

const logoFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
          {/* <Button component={Link} href="/" sx={{ color: "#000" }}> */}
          <Typography
            component={Link}
            href="/"
            className={logoFont.className}
            sx={{
              flexGrow: 1,
              fontSize: "1.2rem",
              letterSpacing: "0.06em",
            }}
          >
            veyqo
          </Typography>
          {/* </Button> */}

          <Button component={Link} href="/" sx={{ color: "#000" }}>
            Home
          </Button>
          <Button component={Link} href="/about" sx={{ color: "#000" }}>
            About
          </Button>
          <Button component={Link} href="/contact" sx={{ color: "#000" }}>
            Contact
          </Button>
          <Button
            component={Link}
            href="/login"
            variant="outlined"
            sx={{ ml: 2, color: "#000", borderColor: "#666" }}
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
