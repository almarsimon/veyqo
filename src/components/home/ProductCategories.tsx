"use client";

// components/home/modules/views/ProductCategories.tsx
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

type TrendingSurvey = {
  id: string;
  title: string;
  response_count: number;
  last_response_at: string | null;
};

const CardRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  transition: "background 150ms ease",
  "&:hover": { background: theme.palette.action.hover },
}));

export default function ProductCategories({
  surveys,
}: {
  surveys: TrendingSurvey[];
}) {
  return (
    <Container component="section" sx={{ mt: 10, mb: 6 }}>
      <Stack spacing={2} sx={{ mb: 3, textAlign: "center" }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
          Trending public surveys
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          The most answered surveys in the last 7 days.
        </Typography>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 3, py: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalFireDepartmentIcon sx={{ fontSize: 20 }} />
            <Typography sx={{ fontWeight: 800 }}>Trending</Typography>
          </Stack>

          <Link href="/surveys" style={{ textDecoration: "none" }}>
            <Button size="small" variant="text">
              View all →
            </Button>
          </Link>
        </Stack>

        <Divider />

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
              <CardRow>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                >
                  {/* ✅ CLICKABLE TITLE */}
                  <Stack spacing={0.5}>
                    <Link
                      href={`/surveys/${s.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {s.title}
                      </Typography>
                    </Link>

                    <Typography variant="body2" color="text.secondary">
                      {s.response_count} responses (last 7 days)
                    </Typography>
                  </Stack>

                  {/* ✅ OPEN BUTTON */}
                  <Link
                    href={`/surveys/${s.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ borderRadius: 999, px: 2.5 }}
                    >
                      Open
                    </Button>
                  </Link>
                </Stack>
              </CardRow>

              {idx !== surveys.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </Paper>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <Link href="/surveys/new" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large" sx={{ px: 4 }}>
            Create a survey
          </Button>
        </Link>
        <Link href="/surveys" style={{ textDecoration: "none" }}>
          <Button variant="outlined" size="large" sx={{ px: 4 }}>
            Explore live surveys
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
