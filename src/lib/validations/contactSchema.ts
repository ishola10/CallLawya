import * as z from "zod";

export const CONTACT_SUBJECTS = [
  "Client support",
  "Lawyer onboarding",
  "Partnerships",
  "Media enquiry",
] as const;

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.enum(CONTACT_SUBJECTS, {
    errorMap: () => ({ message: "Please select a subject" }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters)"),
  consent: z
    .boolean()
    .refine((value) => value, "Please agree so we can respond to you"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const SUPPORT_ISSUES = [
  "Account & Login",
  "Connecting with a Lawyer",
  "Billing & Payments",
  "Bug Report",
  "Other",
] as const;

export const supportRequestSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  issue: z.enum(SUPPORT_ISSUES, {
    errorMap: () => ({ message: "Please select an issue type" }),
  }),
  description: z.string().trim().min(10, "Please describe your issue (at least 10 characters)"),
});

export type SupportRequestValues = z.infer<typeof supportRequestSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
