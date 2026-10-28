import { NextResponse } from "next/server";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/validations";
import { MailNotConfiguredError, sendToSupportInbox } from "@/services/mail";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  // Hidden "company" field: real visitors never fill it in, bots usually do.
  if (payload.company) return NextResponse.json({ ok: true });

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the form and try again" }, { status: 400 });
  }
  if (isRateLimited(`contact:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "You've sent several messages in a short time. Please try again later." }, { status: 429 });
  }

  const { fullName, email, subject, message } = parsed.data;
  try {
    await sendToSupportInbox({
      subject: `[Contact] ${subject} — ${fullName}`,
      heading: "New contact form message",
      fields: [
        { label: "Name", value: fullName },
        { label: "Email", value: email },
        { label: "Subject", value: subject },
      ],
      body: { label: "Message", value: message },
      replyTo: email,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error instanceof MailNotConfiguredError ? error.message : "Contact form email failed", error);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please email support@calllawya.com directly." },
      { status: 502 },
    );
  }
}
