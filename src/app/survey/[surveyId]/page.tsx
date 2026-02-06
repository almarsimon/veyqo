"use client";
import {
  Box,
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Rating,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { useState } from "react";

interface Question {
  id: string;
  type: "text" | "number" | "date" | "checkbox" | "radio" | "rating" | "select";
  question: string;
  options?: string[];
}

const sampleQuestions: Question[] = [
  { id: "q1", type: "text", question: "What is your name?" },
  { id: "q2", type: "number", question: "How old are you?" },
  { id: "q3", type: "date", question: "Select your birth date" },
  {
    id: "q4",
    type: "checkbox",
    question: "Select your hobbies",
    options: ["Reading", "Gaming", "Sports"],
  },
  {
    id: "q5",
    type: "radio",
    question: "Gender",
    options: ["Male", "Female", "Other"],
  },
  { id: "q6", type: "rating", question: "Rate your satisfaction" },
  {
    id: "q7",
    type: "select",
    question: "Select your country",
    options: ["USA", "Canada", "Philippines"],
  },
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id: string, value: any) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    console.log("Answers submitted:", answers);
    // TODO: Save to Firebase
    setSubmitted(true);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Survey
      </Typography>
      {submitted && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Survey submitted successfully!
        </Alert>
      )}
      {sampleQuestions.map((q) => (
        <Box key={q.id} sx={{ mb: 3 }}>
          <FormLabel>{q.question}</FormLabel>
          {q.type === "text" && (
            <TextField
              fullWidth
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "number" && (
            <TextField
              fullWidth
              type="number"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "date" && (
            <TextField
              fullWidth
              type="date"
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}
          {q.type === "checkbox" &&
            q.options?.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    onChange={(e) => {
                      const prev = answers[q.id] || [];
                      if (e.target.checked) {
                        handleChange(q.id, [...prev, opt]);
                      } else {
                        handleChange(
                          q.id,
                          prev.filter((o: string) => o !== opt),
                        );
                      }
                    }}
                  />
                }
                label={opt}
              />
            ))}
          {q.type === "radio" && (
            <RadioGroup onChange={(e) => handleChange(q.id, e.target.value)}>
              {q.options?.map((opt) => (
                <FormControlLabel
                  key={opt}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          )}
          {q.type === "rating" && (
            <Rating onChange={(_, value) => handleChange(q.id, value)} />
          )}
          {q.type === "select" && (
            <Select
              fullWidth
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            >
              {q.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>
                  {opt}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Submit Survey
      </Button>
    </Box>
  );
}
