import {
  ARTICLE_CATEGORIES,
  COVER_TYPES,
  MAX_COVER_BYTES,
  MAX_TAGS,
  articleSchema,
  parseTags,
} from "./articleSchema";
import type { ArticleValues } from "./articleSchema";
import { loginFormSchema } from "./authSchema";
import {
  CONTACT_SUBJECTS,
  SUPPORT_ISSUES,
  contactFormSchema,
  newsletterSchema,
  supportRequestSchema,
} from "./contactSchema";
import type { ContactFormValues, NewsletterValues, SupportRequestValues } from "./contactSchema";
//export all schemas from the validations folder
export {
  ARTICLE_CATEGORIES,
  CONTACT_SUBJECTS,
  COVER_TYPES,
  MAX_COVER_BYTES,
  MAX_TAGS,
  SUPPORT_ISSUES,
  articleSchema,
  contactFormSchema,
  loginFormSchema,
  newsletterSchema,
  parseTags,
  supportRequestSchema,
};
export type { ArticleValues, ContactFormValues, NewsletterValues, SupportRequestValues };
