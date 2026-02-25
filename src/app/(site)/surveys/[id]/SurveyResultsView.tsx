import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import type {
  SurveyResultsData,
  QuestionRow,
} from "@/lib/server/surveys/results";

function pct(count: number, total: number) {
  if (!total) return 0;
  return Math.round((count / total) * 100);
}

type ViewerResponse = {
  hasResponded: boolean;
  respondedAt?: string | null;
  answers: Record<
    string,
    | { type: "text"; value: string }
    | { type: "single_choice"; optionId: string }
    | { type: "multiple_choice"; optionIds: string[] }
  >;
};

export default function SurveyResultsView({
  data,
  isLoggedIn,
  viewerResponse,
}: {
  data: SurveyResultsData;
  isLoggedIn: boolean;
  viewerResponse?: ViewerResponse | null;
}) {
  const {
    survey,
    questions,
    totalResponses,
    choiceCounts,
    textAnswers,
    answeredCount,
  } = data;

  const hasResponded = !!viewerResponse?.hasResponded;

  const participateHref = `/surveys/${survey.id}/participate`;
  const editHref = `${participateHref}?mode=edit`;

  // ✅ if logged out, login should bring them to participate (or edit if they already voted)
  const desiredAfterLogin = hasResponded ? editHref : participateHref;
  const loginHref = `/login?returnTo=${encodeURIComponent(desiredAfterLogin)}`;

  const surveyUrl = `https://veyqo.vercel.app/surveys/${survey.id}`;
  const encodedUrl = encodeURIComponent(surveyUrl);
  const encodedText = encodeURIComponent(
    `Check out this survey on Veyqo: "${survey.title}"`,
  );

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              {survey.title}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              alignItems={{ sm: "center" }}
              sx={{ mt: 1 }}
            >
              <Typography color="text.secondary">
                Total responses: <b>{totalResponses}</b>
              </Typography>
            </Stack>
          </Box>

          {/* ✅ Already voted (only if logged in + responded) */}
          {isLoggedIn && hasResponded ? (
            <Card variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Alert severity="info">
                    You already voted on this survey
                    {viewerResponse?.respondedAt
                      ? ` (${new Date(
                          viewerResponse.respondedAt,
                        ).toLocaleString()})`
                      : ""}
                    .
                  </Alert>

                  <Accordion variant="outlined" sx={{ borderRadius: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography sx={{ fontWeight: 800 }}>
                        View your answers
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Stack spacing={2}>
                        {(questions ?? []).map((q: QuestionRow) => {
                          const a = viewerResponse?.answers?.[q.id];

                          const optLabelById = new Map(
                            (q.survey_options ?? []).map((o) => [
                              o.id,
                              o.label,
                            ]),
                          );

                          let rendered: React.ReactNode = (
                            <Typography color="text.secondary">
                              No answer recorded.
                            </Typography>
                          );

                          if (a?.type === "text") {
                            rendered = (
                              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                                {a.value ? (
                                  a.value
                                ) : (
                                  <span style={{ opacity: 0.7 }}>(empty)</span>
                                )}
                              </Typography>
                            );
                          }

                          if (a?.type === "single_choice") {
                            rendered = (
                              <Chip
                                label={
                                  optLabelById.get(a.optionId) ??
                                  "Unknown option"
                                }
                                variant="outlined"
                              />
                            );
                          }

                          if (a?.type === "multiple_choice") {
                            const labels = a.optionIds.map(
                              (id) => optLabelById.get(id) ?? "Unknown option",
                            );

                            rendered = (
                              <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                              >
                                {labels.map((label, i) => (
                                  <Chip
                                    key={`${q.id}-${i}`}
                                    label={label}
                                    variant="outlined"
                                  />
                                ))}
                              </Stack>
                            );
                          }

                          return (
                            <Box key={q.id}>
                              <Typography sx={{ fontWeight: 800 }}>
                                {q.prompt}
                              </Typography>
                              <Box sx={{ mt: 1 }}>{rendered}</Box>
                              <Divider sx={{ mt: 2 }} />
                            </Box>
                          );
                        })}
                      </Stack>
                    </AccordionDetails>
                  </Accordion>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="flex-end"
                  >
                    <Link href={editHref} style={{ textDecoration: "none" }}>
                      <Button variant="contained">Change my votes</Button>
                    </Link>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ) : null}

          {/* ✅ CTA (hide if already responded) */}
          {!(isLoggedIn && hasResponded) ? (
            <Card variant="outlined">
              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  alignItems={{ sm: "center" }}
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>
                      Want to share your voice?
                    </Typography>
                  </Box>

                  <Box>
                    {isLoggedIn ? (
                      <Link
                        href={participateHref}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="contained">Take Survey</Button>
                      </Link>
                    ) : (
                      <Link href={loginHref} style={{ textDecoration: "none" }}>
                        <Button variant="contained">
                          Login to participate
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ) : null}

          {/* Share Card */}
          <Card variant="outlined">
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
              >
                <Typography sx={{ fontWeight: 800 }}>
                  Share this survey
                </Typography>

                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button
                    component="a"
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    sx={{
                      bgcolor: "#1877F2",
                      "&:hover": { bgcolor: "#166FE5" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Share on Facebook
                  </Button>

                  <Button
                    component="a"
                    href={xShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    sx={{
                      bgcolor: "#000000",
                      "&:hover": { bgcolor: "#111111" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Share on X
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Questions (ALWAYS RENDER) */}
          <Stack spacing={2}>
            {questions.map((q: QuestionRow) => {
              const answered = answeredCount[q.id] ?? 0;
              const isChoice =
                q.type === "single_choice" || q.type === "multiple_choice";
              const isText = q.type === "text";

              return (
                <Card key={q.id} variant="outlined">
                  <CardContent>
                    <Stack spacing={1.25}>
                      <Box>
                        <Typography sx={{ fontWeight: 800 }}>
                          {q.prompt}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                          {q.type === "single_choice"
                            ? "Single choice"
                            : q.type === "multiple_choice"
                              ? "Multiple choice"
                              : "Text"}{" "}
                          • Answered by {answered} / {totalResponses}
                        </Typography>
                      </Box>

                      <Divider />

                      {/* Choice */}
                      {isChoice ? (
                        <Stack spacing={1.25}>
                          {(q.survey_options ?? []).map((opt) => {
                            const count = choiceCounts[q.id]?.[opt.id] ?? 0;
                            const percent = pct(count, answered);

                            return (
                              <Box key={opt.id}>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="baseline"
                                  justifyContent="space-between"
                                >
                                  <Typography sx={{ fontWeight: 600 }}>
                                    {opt.label}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    {count} ({percent}%)
                                  </Typography>
                                </Stack>

                                <Box
                                  sx={{
                                    mt: 0.75,
                                    height: 10,
                                    borderRadius: 999,
                                    bgcolor: "grey.200",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      height: "100%",
                                      width: `${percent}%`,
                                      bgcolor: "primary.main",
                                    }}
                                  />
                                </Box>
                              </Box>
                            );
                          })}

                          {(q.survey_options?.length ?? 0) === 0 ? (
                            <Typography color="text.secondary">
                              No options configured for this question.
                            </Typography>
                          ) : null}
                        </Stack>
                      ) : null}

                      {/* Text */}
                      {isText ? (
                        <Stack spacing={1}>
                          {(() => {
                            const list = textAnswers[q.id] ?? [];
                            const LIMIT = 25;
                            const shown = list.slice(0, LIMIT);

                            if (list.length === 0) {
                              return (
                                <Typography color="text.secondary">
                                  No text answers yet.
                                </Typography>
                              );
                            }

                            return (
                              <>
                                <Typography color="text.secondary">
                                  Showing {shown.length} of {list.length} text
                                  answers
                                </Typography>

                                <Stack spacing={1}>
                                  {shown.map((t, i) => (
                                    <Box
                                      key={i}
                                      sx={{
                                        p: 1.25,
                                        border: "1px solid",
                                        borderColor: "divider",
                                        borderRadius: 2,
                                        bgcolor: "background.paper",
                                      }}
                                    >
                                      <Typography
                                        sx={{ whiteSpace: "pre-wrap" }}
                                      >
                                        {t}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Stack>

                                {list.length > LIMIT ? (
                                  <Typography color="text.secondary">
                                    And {list.length - LIMIT} more…
                                  </Typography>
                                ) : null}
                              </>
                            );
                          })()}
                        </Stack>
                      ) : null}
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
