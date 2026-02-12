"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { submitSurveyAction } from "./actions";

type Question = {
  id: string;
  prompt: string;
  type: "single_choice" | "multiple_choice" | "text";
  options?: { id: string; label: string }[];
};

type AnswerState = Record<string, string | Record<string, boolean>>;

export default function ParticipateForm({
  surveyId,
  surveyTitle,
  questions,
}: {
  surveyId: string;
  surveyTitle: string;
  questions: Question[];
}) {
  const router = useRouter();

  const [answers, setAnswers] = React.useState<AnswerState>({});
  const [submitting, setSubmitting] = React.useState(false);

  const goToResults = () => router.push(`/surveys/${surveyId}`);

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = questions.map((q) => {
        if (q.type === "text") {
          return { questionId: q.id, text: (answers[q.id] as string) ?? "" };
        }

        if (q.type === "single_choice") {
          const selected = (answers[q.id] as string) ?? "";
          return { questionId: q.id, optionIds: selected ? [selected] : [] };
        }

        // multiple_choice
        const obj = (answers[q.id] as Record<string, boolean>) ?? {};
        const optionIds = Object.entries(obj)
          .filter(([, v]) => v)
          .map(([k]) => k);

        return { questionId: q.id, optionIds };
      });

      // @ts-ignore server action
      await submitSurveyAction(surveyId, payload);

      // after submit, go to results
      router.push(`/surveys/${surveyId}/results`);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={3} sx={{ py: 4 }}>
        <Box>
          {/* Back to results */}
          <Button
            variant="text"
            onClick={goToResults}
            sx={{ mb: 1, px: 0, justifyContent: "flex-start" }}
            disabled={submitting}
          >
            ← Back to Results
          </Button>

          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {surveyTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Please answer the questions below.
          </Typography>
        </Box>

        {questions.map((q) => (
          <Card key={q.id} variant="outlined">
            <CardContent>
              <Typography sx={{ fontWeight: 700, mb: 1 }}>
                {q.prompt}
              </Typography>

              {q.type === "text" ? (
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  value={(answers[q.id] as string) ?? ""}
                  onChange={(e) =>
                    setAnswers((p) => ({ ...p, [q.id]: e.target.value }))
                  }
                />
              ) : q.type === "single_choice" ? (
                <RadioGroup
                  value={(answers[q.id] as string) ?? ""}
                  onChange={(_, value) =>
                    setAnswers((p) => ({ ...p, [q.id]: value }))
                  }
                >
                  {q.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.id}
                      value={opt.id}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>
              ) : (
                <Stack>
                  {q.options?.map((opt) => {
                    const cur =
                      (answers[q.id] as Record<string, boolean>) ?? {};
                    return (
                      <FormControlLabel
                        key={opt.id}
                        control={
                          <Checkbox
                            checked={cur[opt.id] ?? false}
                            onChange={(e) =>
                              setAnswers((p) => ({
                                ...p,
                                [q.id]: { ...cur, [opt.id]: e.target.checked },
                              }))
                            }
                          />
                        }
                        label={opt.label}
                      />
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        ))}

        <Button variant="contained" onClick={submit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
}
