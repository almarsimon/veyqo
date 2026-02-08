import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
// import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
// import SidebarAd from "@/components/SidebarAd";
// import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/NavBar";
import { theme } from "./theme";
import Providers from "./providers";
import { supabaseServer } from "@/lib/supabase/server";
import { supabaseServerComponent } from "@/lib/supabase/server-component";

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
  const { data, error } = await supabase.auth.getSession();

  if (error) throw error;

  const user = data.session?.user ?? null;

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
            <Navbar user={user} avatarUrl={avatarUrl} fullName={fullName} />
            <Container
              component="main"
              sx={{ mt: 4, mb: 4, flexGrow: 1 }}
              maxWidth="lg"
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
