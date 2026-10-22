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

export const newsletterSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
