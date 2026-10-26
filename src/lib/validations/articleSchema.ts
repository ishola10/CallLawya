import * as z from "zod";

export const ARTICLE_CATEGORIES = [
  "Land & Property",
  "Family Law",
  "Criminal Law",
  "Business",
  "Employment",
  "Human Rights",
  "Tech & IP",
  "Legal Access",
] as const;

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Use at least 10 characters for the title")
    .max(140, "Keep the title under 140 characters"),
  category: z.enum(ARTICLE_CATEGORIES, {
    errorMap: () => ({ message: "Choose a category" }),
  }),
  authorName: z.string().trim().min(2, "Enter the author's name"),
  authorRole: z.string().trim().max(80, "Keep this under 80 characters").optional(),
  excerpt: z
    .string()
    .trim()
    .min(40, "Write a summary of at least 40 characters")
    .max(240, "Keep the summary under 240 characters"),
  body: z.string().trim().min(300, "The article should be at least 300 characters long"),
  tags: z.string().trim().max(200).optional(),
  confirmed: z
    .boolean()
    .refine((value) => value, "Please confirm before continuing"),
});

export type ArticleValues = z.infer<typeof articleSchema>;
