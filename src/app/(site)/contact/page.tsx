"use client";

import * as React from "react";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Divider,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const SUPPORT_EMAIL = "support@Vottally.com"; // change if needed

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80, "Name is too long"),
  email: z.string().email("Enter a valid email").max(120),
  subject: z.string().min(2, "Subject is too short").max(120),
  message: z.string().min(10, "Message is too short").max(4000),
  company: z.string().max(0).optional().or(z.literal("")), // honeypot
});

type ContactForm = z.infer<typeof ContactSchema>;

export default function ContactPage() {
  const [form, setForm] = React.useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });

  const [fieldErrors, setFieldErrors] = React.useState<
    Partial<Record<keyof ContactForm, string>>
  >({});

  const [status, setStatus] = React.useState<
    | { state: "idle" }
    | { state: "sending" }
    | { state: "success"; message: string }
    | { state: "error"; message: string }
  >({ state: "idle" });

  function onChange<K extends keyof ContactForm>(
    key: K,
    value: ContactForm[K],
  ) {
    setForm((p) => ({ ...p, [key]: value }));
    setFieldErrors((p) => ({ ...p, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ state: "idle" });

    const parsed = ContactSchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactForm | undefined;
        if (k) next[k] = issue.message;
      }
      setFieldErrors(next);
      return;
    }

    try {
      setStatus({ state: "sending" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await res.json()) as { ok: boolean; message?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus({
        state: "success",
        message: data.message || "Message sent! We’ll get back to you soon.",
      });

      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Try again.",
      });
    }
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Contact
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Prefer email? Reach us at{" "}
        <MuiLink href={`mailto:${SUPPORT_EMAIL}`} underline="hover">
          {SUPPORT_EMAIL}
        </MuiLink>
        .
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography paragraph color="text.secondary">
        Send us a message and we’ll reply as soon as we can.
      </Typography>

      <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 640 }}>
        <Stack spacing={2.25}>
          {status.state === "success" && (
            <Alert severity="success">{status.message}</Alert>
          )}
          {status.state === "error" && (
            <Alert severity="error">{status.message}</Alert>
          )}

          {/* Honeypot */}
          <input
            type="text"
            value={form.company ?? ""}
            onChange={(e) => onChange("company", e.target.value)}
            autoComplete="off"
            tabIndex={-1}
            style={{ display: "none" }}
          />

          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            error={!!fieldErrors.name}
            helperText={fieldErrors.name}
            fullWidth
            sx={fieldSx}
          />

          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            fullWidth
            sx={fieldSx}
          />

          <TextField
            label="Subject"
            value={form.subject}
            onChange={(e) => onChange("subject", e.target.value)}
            error={!!fieldErrors.subject}
            helperText={fieldErrors.subject}
            fullWidth
            sx={fieldSx}
          />

          <TextField
            label="Message"
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
            error={!!fieldErrors.message}
            helperText={fieldErrors.message}
            fullWidth
            multiline
            minRows={6}
            sx={fieldSx}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={status.state === "sending"}
            sx={{
              borderRadius: 2,
              py: 1.2,
              fontWeight: 800,
              textTransform: "none",
            }}
          >
            {status.state === "sending" ? "Sending..." : "Send message"}
          </Button>

          <Typography variant="caption" color="text.secondary">
            Tip: If you’re reporting a bug, include the page URL and steps to
            reproduce.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

const fieldSx = {
  "& .MuiInputBase-root": {
    borderRadius: 2,
  },
};
