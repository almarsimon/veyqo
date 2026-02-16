// src/app/page.tsx
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { supabaseServerComponent } from "@/lib/supabase/server-component";

type TrendingSurvey = {
  id: string;
  title: string;
  response_count: number;
  last_response_at: string | null;
};

export default async function HomePage() {
  const supabase = await supabaseServerComponent();

  const { data: trending, error } = await supabase.rpc("get_trending_surveys", {
    days: 7,
    lim: 3,
  });

  if (error) {
    console.error("get_trending_surveys error:", error.message);
  }

  const surveys = (trending ?? []) as TrendingSurvey[];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#ffffff" }}>
      {/* ================= HERO SECTION ================= */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#ffffff" }}>
        <Container maxWidth="md">
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Stack spacing={1.5} alignItems="center">
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 850,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  fontSize: { xs: 40, sm: 56, md: 64 },
                }}
              >
                See What People Really Think.
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: "text.secondary", maxWidth: 720, fontWeight: 400 }}
              >
                Create public surveys, share them instantly, and watch real-time
                results from real people.
              </Typography>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Link href="/surveys/new" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{ px: 3.2, py: 1.2, borderRadius: 3 }}
                >
                  Create a survey
                </Button>
              </Link>

              <Link href="/surveys" style={{ textDecoration: "none" }}>
                <Button
                  size="large"
                  variant="outlined"
                  sx={{ px: 3.2, py: 1.2, borderRadius: 3 }}
                >
                  Explore live surveys
                </Button>
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ================= TRENDING SECTION ================= */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#f8fafc" }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              borderRadius: 4,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 3, py: 2.25 }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <LocalFireDepartmentIcon sx={{ fontSize: 20 }} />
                <Typography sx={{ fontWeight: 800 }}>
                  Trending Surveys
                </Typography>
              </Stack>

              <Link href="/surveys" style={{ textDecoration: "none" }}>
                <Button size="small" variant="text" sx={{ borderRadius: 2 }}>
                  View all →
                </Button>
              </Link>
            </Stack>

            <Divider />

            <Stack>
              {surveys.length === 0 ? (
                <Box sx={{ px: 3, py: 3 }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    No trending surveys yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Be the first to create one.
                  </Typography>
                </Box>
              ) : (
                surveys.map((s, idx) => (
                  <Box key={s.id}>
                    <Box
                      sx={{
                        px: 3,
                        py: 2.25,
                        "&:hover": { bgcolor: "#f1f5f9" },
                      }}
                    >
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1.5}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                      >
                        {/* ✅ CLICKABLE TITLE */}
                        <Stack spacing={0.25}>
                          <Link
                            href={`/surveys/${s.id}`}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                "&:hover": {
                                  textDecoration: "underline",
                                },
                              }}
                            >
                              {s.title}
                            </Typography>
                          </Link>

                          <Typography variant="body2" color="text.secondary">
                            {s.response_count} responses (last 7 days)
                          </Typography>
                        </Stack>

                        <Link
                          href={`/surveys/${s.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ borderRadius: 999, px: 2 }}
                          >
                            Open
                          </Button>
                        </Link>
                      </Stack>
                    </Box>

                    {idx !== surveys.length - 1 && <Divider />}
                  </Box>
                ))
              )}
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* ================= HOW IT WORKS ================= */}
      <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: "#ffffff" }}>
        <Container maxWidth="md">
          <Stack spacing={6} alignItems="center" textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              How It Works
            </Typography>

            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={6}
              justifyContent="center"
            >
              {[
                {
                  step: "1",
                  title: "Create",
                  desc: "Write a question and publish instantly.",
                },
                {
                  step: "2",
                  title: "Share",
                  desc: "Send the link anywhere — no login required.",
                },
                {
                  step: "3",
                  title: "Analyze",
                  desc: "Watch live results and public opinion shift.",
                },
              ].map((item) => (
                <Stack key={item.step} spacing={1} sx={{ maxWidth: 220 }}>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    {item.step}
                  </Typography>
                  <Typography sx={{ fontWeight: 700 }}>{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* ================= FINAL CTA SECTION ================= */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "#fff7ed" }}>
        <Container maxWidth="md">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Ready to start a conversation?
            </Typography>

            <Link href="/surveys/new" style={{ textDecoration: "none" }}>
              <Button
                size="large"
                variant="contained"
                sx={{ borderRadius: 3, px: 4, py: 1.3 }}
              >
                Create Your First Survey
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
