"use client";

import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GoogleIcon from "@mui/icons-material/Google"; // optional remove
import { createSurveyAction } from "./actions";

type QuestionType = "single_choice" | "multiple_choice" | "text";

type QuestionDraft = {
  prompt: string;
  type: QuestionType;
  options: string[]; // ignore for text
};

const defaultQuestion = (): QuestionDraft => ({
  prompt: "",
  type: "single_choice",
  options: ["", ""],
});

const isChoice = (t: QuestionType) =>
  t === "single_choice" || t === "multiple_choice";

export default function NewSurveyPage() {
  const [title, setTitle] = React.useState("");
  const [questions, setQuestions] = React.useState<QuestionDraft[]>([
    defaultQuestion(),
  ]);
  const [error, setError] = React.useState<string | null>(null);

  const addQuestion = () =>
    setQuestions((prev) => [...prev, defaultQuestion()]);
  const removeQuestion = (idx: number) =>
    setQuestions((prev) => prev.filter((_, i) => i !== idx));

  const updateQuestion = (idx: number, patch: Partial<QuestionDraft>) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, ...patch } : q)),
    );
  };

  const addOption = (qIdx: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx ? { ...q, options: [...q.options, ""] } : q,
      ),
    );
  };

  const removeOption = (qIdx: number, oIdx: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.filter((_, j) => j !== oIdx) }
          : q,
      ),
    );
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.map((o, j) => (j === oIdx ? value : o)) }
          : q,
      ),
    );
  };

  const submit = (mode: "draft" | "publish") => {
    setError(null);

    const payload = {
      title,
      mode,
      questions: questions.map((q) => ({
        prompt: q.prompt,
        type: q.type,
        options: isChoice(q.type) ? q.options : undefined,
      })),
    };

    const fd = new FormData();
    fd.set("payload", JSON.stringify(payload));

    // server action
    // @ts-ignore Next action
    return createSurveyAction(fd);
  };

  return (
    <Container maxWidth="md">
      <Stack spacing={2.5} sx={{ py: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Create survey
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            Add questions, save a draft, or publish when ready.
          </Typography>
        </Box>

        {error ? (
          <Box
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "error.light",
              borderRadius: 2,
            }}
          >
            <Typography color="error.main">{error}</Typography>
          </Box>
        ) : null}

        <Card variant="outlined">
          <CardContent>
            <TextField
              label="Survey title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CardContent>
        </Card>

        <Stack spacing={2}>
          {questions.map((q, qIdx) => (
            <Card key={qIdx} variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography sx={{ fontWeight: 700, flexGrow: 1 }}>
                      Question {qIdx + 1}
                    </Typography>
                    <IconButton
                      aria-label="Remove question"
                      onClick={() => removeQuestion(qIdx)}
                      disabled={questions.length === 1}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>

                  <TextField
                    label="Question prompt"
                    fullWidth
                    value={q.prompt}
                    onChange={(e) =>
                      updateQuestion(qIdx, { prompt: e.target.value })
                    }
                  />

                  <TextField
                    label="Question type"
                    select
                    value={q.type}
                    onChange={(e) => {
                      const nextType = e.target.value as QuestionType;
                      updateQuestion(qIdx, { type: nextType });
                      if (isChoice(nextType) && q.options.length < 2) {
                        updateQuestion(qIdx, { options: ["", ""] });
                      }
                    }}
                  >
                    <MenuItem value="single_choice">Single choice</MenuItem>
                    <MenuItem value="multiple_choice">Multiple choice</MenuItem>
                    <MenuItem value="text">Text</MenuItem>
                  </TextField>

                  {isChoice(q.type) ? (
                    <>
                      <Divider />
                      <Typography sx={{ fontWeight: 700 }}>Options</Typography>

                      <Stack spacing={1.25}>
                        {q.options.map((opt, oIdx) => (
                          <Box key={oIdx} sx={{ display: "flex", gap: 1 }}>
                            <TextField
                              label={`Option ${oIdx + 1}`}
                              fullWidth
                              value={opt}
                              onChange={(e) =>
                                updateOption(qIdx, oIdx, e.target.value)
                              }
                            />
                            <IconButton
                              aria-label="Remove option"
                              onClick={() => removeOption(qIdx, oIdx)}
                              disabled={q.options.length <= 2}
                            >
                              <DeleteOutlineIcon />
                            </IconButton>
                          </Box>
                        ))}

                        <Button
                          onClick={() => addOption(qIdx)}
                          startIcon={<AddIcon />}
                          sx={{
                            alignSelf: "flex-start",
                            textTransform: "none",
                          }}
                        >
                          Add option
                        </Button>
                      </Stack>
                    </>
                  ) : null}
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Button
          onClick={addQuestion}
          startIcon={<AddIcon />}
          variant="outlined"
          sx={{ textTransform: "none", alignSelf: "flex-start" }}
        >
          Add question
        </Button>

        <Divider />

        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={() => submit("draft")}
          >
            Save draft
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => submit("publish")}
          >
            Publish
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
