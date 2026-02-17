import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  subject: z.string().min(2).max(120),
  message: z.string().min(10).max(4000),
  company: z.string().optional().or(z.literal("")), // honeypot
});

type ContactPayload = z.infer<typeof ContactSchema>;

/**
 * Very simple in-memory rate limit (works best on a single server).
 * On serverless it may reset — still useful as a basic guard.
 */
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, { count: number; windowStart: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipHits.get(ip);

  if (!entry) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false };
  }

  entry.count += 1;
  ipHits.set(ip, entry);
  return { ok: true };
}

async function sendWithResend(payload: ContactPayload) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const to = process.env.CONTACT_TO_EMAIL; // e.g. "you@yourdomain.com"
  const from = process.env.CONTACT_FROM_EMAIL; // e.g. "Veyqo <no-reply@yourdomain.com>"

  if (!to || !from) {
    throw new Error("Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL env vars.");
  }

  const subject = `[Contact] ${payload.subject}`;

  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    text,
    replyTo: payload.email,
  });

  if (error) {
    throw new Error(error.message || "Email provider error");
  }
}

export async function POST(req: Request) {
  try {
    // IP for basic rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const limited = rateLimit(ip);
    if (!limited.ok) {
      return NextResponse.json(
        { ok: false, message: "Too many requests. Please try again shortly." },
        { status: 429 },
      );
    }

    const json = (await req.json()) as unknown;
    const parsed = ContactSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Invalid form data." },
        { status: 400 },
      );
    }

    // Honeypot: if filled, silently succeed to avoid tipping off bots
    if (parsed.data.company && parsed.data.company.length > 0) {
      return NextResponse.json({ ok: true, message: "Message sent." });
    }

    // If Resend not configured, just log (dev-friendly)
    if (!process.env.RESEND_API_KEY) {
      console.log(
        "CONTACT MESSAGE (no RESEND_API_KEY configured):",
        parsed.data,
      );
      return NextResponse.json({
        ok: true,
        message: "Message received (email not configured in this env).",
      });
    }

    await sendWithResend(parsed.data);

    return NextResponse.json({ ok: true, message: "Message sent!" });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error. Please try again." },
      { status: 500 },
    );
  }
}
