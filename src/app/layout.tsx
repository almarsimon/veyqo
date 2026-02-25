// src/app/layout.tsx

import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import Providers from "./providers";
import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Veyqo",
  description: "Participate in surveys that amplify real voices",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  const user =
    error && error.name === "AuthSessionMissingError"
      ? null
      : (data.user ?? null);

  if (error && error.name !== "AuthSessionMissingError") {
    throw error;
  }

  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ?? null;

  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ?? null;

  const email = user?.email ?? null;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              backgroundColor: "#fff",
            }}
          >
            <Navbar
              user={user}
              avatarUrl={avatarUrl}
              fullName={fullName}
              email={email}
            />

            {/* 🔥 NO Container here */}
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>

            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
