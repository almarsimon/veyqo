import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
// import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
// import SidebarAd from "@/components/SidebarAd";
// import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/NavBar";
// import { theme } from "./theme";
import Providers from "./providers";
import { supabaseServerComponent } from "@/lib/supabase/server-component";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  const supabase = await supabaseServerComponent();

  const { data, error } = await supabase.auth.getUser();

  // If logged out, Supabase may return AuthSessionMissingError — treat as guest
  const user =
    error && error.name === "AuthSessionMissingError"
      ? null
      : (data.user ?? null);

  // Only throw unexpected auth errors
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
        {/* <AuthProvider> */}
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
            <Container
              component="main"
              maxWidth="lg"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                mt: 4,
                pb: 4, // padding instead of margin
              }}
            >
              {children}
            </Container>
            <Footer />
          </Box>
        </Providers>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
