import {
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
import Link from "next/link";
import type {
  SurveyResultsData,
  QuestionRow,
} from "@/lib/server/surveys/results";

function pct(count: number, total: number) {
  if (!total) return 0;
  return Math.round((count / total) * 100);
}

export default function SurveyResultsView({
  data,
  isLoggedIn,
}: {
  data: SurveyResultsData;
  isLoggedIn: boolean;
}) {
  const {
    survey,
    questions,
    totalResponses,
    choiceCounts,
    textAnswers,
    answeredCount,
  } = data;

  const participateHref = `/surveys/${survey.id}/participate`;
  const loginHref = `/login?next=${encodeURIComponent(participateHref)}`;

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
              <Chip
                label={survey.status === "published" ? "Published" : "Draft"}
                color={survey.status === "published" ? "success" : "default"}
                variant="outlined"
              />
              <Typography color="text.secondary">
                Total responses: <b>{totalResponses}</b>
              </Typography>
            </Stack>
          </Box>

          {/* CTA */}
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
                  <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                    {isLoggedIn
                      ? "You’re signed in — you can participate now."
                      : "Sign in to participate in this survey."}
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
                      <Button variant="contained">Login to participate</Button>
                    </Link>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Empty state */}
          {totalResponses === 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontWeight: 700 }}>Results</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  No responses yet. Share the link and check back once people
                  have participated.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Questions */}
              <Stack spacing={2}>
                {questions.map((q: QuestionRow, idx: number) => {
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
                              Q{idx + 1}. {q.prompt}
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
                                      Showing {shown.length} of {list.length}{" "}
                                      text answers
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
            </>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
