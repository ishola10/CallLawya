import { loginFormSchema } from "./authSchema";
import {
  CONTACT_SUBJECTS,
  contactFormSchema,
  newsletterSchema,
} from "./contactSchema";
import type { ContactFormValues, NewsletterValues } from "./contactSchema";
//export all schemas from the validations folder
export { CONTACT_SUBJECTS, contactFormSchema, loginFormSchema, newsletterSchema };
export type { ContactFormValues, NewsletterValues };
