import {
  ARTICLE_CATEGORIES,
  COVER_TYPES,
  MAX_COVER_BYTES,
  MAX_TAGS,
  articleSchema,
  normalizeScn,
  parseTags,
} from "./articleSchema";
import type { ArticleValues } from "./articleSchema";
import {
  CONTACT_SUBJECTS,
  SUPPORT_ISSUES,
  contactFormSchema,
  newsletterSchema,
  supportRequestSchema,
} from "./contactSchema";
import type { ContactFormValues, NewsletterValues, SupportRequestValues } from "./contactSchema";

export {
  ARTICLE_CATEGORIES,
  CONTACT_SUBJECTS,
  COVER_TYPES,
  MAX_COVER_BYTES,
  MAX_TAGS,
  SUPPORT_ISSUES,
  articleSchema,
  contactFormSchema,
  newsletterSchema,
  normalizeScn,
  parseTags,
  supportRequestSchema,
};
export type { ArticleValues, ContactFormValues, NewsletterValues, SupportRequestValues };
