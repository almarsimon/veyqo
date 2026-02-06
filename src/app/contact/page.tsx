"use client";
import React, { useState } from "react";
import { Typography, TextField, Button, Box, Alert } from "@mui/material";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setError(true);
      setSuccess(false);
      return;
    }
    setSuccess(true);
    setError(false);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ py: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Message sent successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Please fill all fields.
        </Alert>
      )}
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
