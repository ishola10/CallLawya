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

export const MAX_TAGS = 6;
const MAX_TAG_LENGTH = 30;
export const MAX_COVER_BYTES = 2 * 1024 * 1024;
export const COVER_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function parseTags(tags?: string) {
  const seen = new Set<string>();
  return (tags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => {
      const key = tag.toLowerCase();
      if (!tag || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, MAX_TAGS);
}

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, "Use at least 10 characters for the title")
    .max(140, "Keep the title under 140 characters"),
  category: z.enum(ARTICLE_CATEGORIES, {
    errorMap: () => ({ message: "Choose a category" }),
  }),
  authorName: z.string().trim().min(2, "Enter the author's name").max(80, "Keep the name under 80 characters"),
  authorRole: z.string().trim().max(80, "Keep this under 80 characters").optional(),
  excerpt: z
    .string()
    .trim()
    .min(40, "Write a summary of at least 40 characters")
    .max(240, "Keep the summary under 240 characters"),
  body: z
    .string()
    .trim()
    .min(300, "The article should be at least 300 characters long")
    .max(50_000, "Keep the article under 50,000 characters"),
  tags: z
    .string()
    .trim()
    .max(200)
    .optional()
    .refine(
      (value) => parseTags(value).every((tag) => tag.length <= MAX_TAG_LENGTH),
      `Keep each tag under ${MAX_TAG_LENGTH} characters`,
    ),
  confirmed: z
    .boolean()
    .refine((value) => value, "Please confirm before continuing"),
});

export type ArticleValues = z.infer<typeof articleSchema>;
