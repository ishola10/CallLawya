import "server-only";
import { CONTACT_EMAILS } from "@/constants";

export class MailNotConfiguredError extends Error {}

type Field = { label: string; value: string };

type InboxMessage = {
  subject: string;
  heading: string;
  fields: Field[];
  body: { label: string; value: string };
  replyTo: string;
};

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

function renderHtml({ heading, fields, body }: InboxMessage) {
  const rows = fields
    .map(
      (field) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#64748b;white-space:nowrap">${escapeHtml(field.label)}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(field.value)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Segoe UI,Arial,sans-serif;color:#0a2540;max-width:640px">
<h2 style="margin:0 0 16px">${escapeHtml(heading)}</h2>
<table style="border-collapse:collapse;font-size:14px">${rows}</table>
<p style="margin:24px 0 8px;color:#64748b;font-size:13px">${escapeHtml(body.label)}</p>
<div style="white-space:pre-wrap;font-size:15px;line-height:1.6;border-left:3px solid #0066ff;padding-left:12px">${escapeHtml(body.value)}</div>
<p style="margin-top:28px;color:#94a3b8;font-size:12px">Sent from the CallLawya website. Reply to this email to respond directly.</p>
</div>`;
}

function renderText({ heading, fields, body }: InboxMessage) {
  return [heading, "", ...fields.map((field) => `${field.label}: ${field.value}`), "", `${body.label}:`, body.value].join(
    "\n",
  );
}

/** Sends a website form submission to the support inbox through Resend (https://resend.com/docs/api-reference). */
export async function sendToSupportInbox(message: InboxMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) throw new MailNotConfiguredError("RESEND_API_KEY and MAIL_FROM must be set to send website emails.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [CONTACT_EMAILS.support],
      reply_to: message.replyTo,
      subject: message.subject,
      html: renderHtml(message),
      text: renderText(message),
    }),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${(await response.text()).slice(0, 300)}`);
  }
}
