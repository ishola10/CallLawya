import { NextResponse } from "next/server";
import { clientKey, isRateLimited } from "@/lib/rate-limit";
import { supportRequestSchema } from "@/lib/validations";
import { MailNotConfiguredError, sendToSupportInbox } from "@/services/mail";

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  // Hidden "company" field: real visitors never fill it in, bots usually do.
  if (payload.company) return NextResponse.json({ ok: true });

  const parsed = supportRequestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the form and try again" }, { status: 400 });
  }
  if (isRateLimited(`support:${clientKey(request)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "You've sent several requests in a short time. Please try again later." }, { status: 429 });
  }

  const { fullName, email, issue, description } = parsed.data;
  try {
    await sendToSupportInbox({
      subject: `[Support] ${issue} — ${fullName}`,
      heading: "New support request",
      fields: [
        { label: "Name", value: fullName },
        { label: "Email", value: email },
        { label: "Issue type", value: issue },
      ],
      body: { label: "Description", value: description },
      replyTo: email,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error instanceof MailNotConfiguredError ? error.message : "Support request email failed", error);
    return NextResponse.json(
      { error: "We couldn't send your request right now. Please email support@calllawya.com directly." },
      { status: 502 },
    );
  }
}
