import { ARTICLE_CATEGORIES, articleSchema } from "./articleSchema";
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
  SUPPORT_ISSUES,
  articleSchema,
  contactFormSchema,
  loginFormSchema,
  newsletterSchema,
  supportRequestSchema,
};
export type { ArticleValues, ContactFormValues, NewsletterValues, SupportRequestValues };
