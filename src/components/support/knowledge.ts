import { CONTACT_EMAILS, ROUTES, STORE_LINKS, SUPPORT_PHONE } from "@/constants";

export type ChatLink = { label: string; href: string; external?: boolean };

export type ChatTopic = {
  id: string;
  /** Shown as a suggested question. */
  question: string;
  /** Single words match whole words; phrases (with spaces) count for more. */
  keywords: string[];
  answer: string;
  links?: ChatLink[];
};

const DIRECTORY: ChatLink = { label: "Browse verified lawyers", href: ROUTES.lawyers };
const APP_LINKS: ChatLink[] = [
  { label: "Get it on Google Play", href: STORE_LINKS.googlePlay, external: true },
  { label: "Download on the App Store", href: STORE_LINKS.appStore, external: true },
];

export const CHAT_TOPICS: ChatTopic[] = [
  {
    id: "urgent",
    question: "I need urgent legal help",
    keywords: ["urgent", "emergency", "arrested", "arrest", "detained", "detention", "police", "danger", "threat", "threatened", "custody", "right now", "immediately"],
    answer:
      "If you or someone else is in immediate danger, please contact emergency services first (in Nigeria, dial 112). For urgent legal help, open the Lawyers Directory and turn on “Available now” to see lawyers you can reach straight away by call or chat. If you're detained, you have the right to remain silent and to ask for a lawyer.",
    links: [DIRECTORY],
  },
  {
    id: "find-lawyer",
    question: "How do I find a lawyer?",
    keywords: ["find", "hire", "get a lawyer", "need a lawyer", "looking for", "search", "match", "matched", "connect", "recommend", "lawyer for", "talk to a lawyer", "speak to a lawyer", "speak with a lawyer"],
    answer:
      "Describe your legal issue in the CallLawya app, or browse the Lawyers Directory on this site. You can filter by practice area, location, availability, fee and rating, compare profiles, then book a consultation by call or chat.",
    links: [DIRECTORY],
  },
  {
    id: "areas",
    question: "What areas of law do your lawyers cover?",
    keywords: ["areas", "area of law", "practice", "property", "land", "tenancy", "tenant", "landlord", "rent", "family", "divorce", "custody", "marriage", "inheritance", "will", "criminal", "business", "company", "employment", "job", "fired", "dismissed", "salary", "contract", "intellectual property", "copyright", "trademark", "immigration", "debt", "human rights"],
    answer:
      "CallLawya lawyers practise across property and land, tenancy, family and divorce, wills and inheritance, criminal law, business and company law, employment, contracts, intellectual property and more. I can't advise on your specific situation, but you can find a lawyer who handles that area in the directory. Filter by practice area to see who's available.",
    links: [DIRECTORY],
  },
  {
    id: "legal-advice",
    question: "Can you give me legal advice?",
    keywords: ["advice", "advise", "what should i do", "can i sue", "sue", "is it legal", "legal", "my case", "my situation", "court", "rights", "lawsuit", "case"],
    answer:
      "I'm an assistant for questions about CallLawya, so I can't give legal advice on your situation. The law often depends on the facts and where you are. A verified lawyer can advise you properly: book a consultation by call or chat. To prepare, Lex AI in the app can help you organise the facts and the questions to ask.",
    links: [DIRECTORY, { label: "About Lex AI", href: ROUTES.howItWorks }],
  },
  {
    id: "cost",
    question: "How much does a consultation cost?",
    keywords: ["cost", "costs", "price", "prices", "pricing", "fee", "fees", "charge", "charges", "how much", "expensive", "cheap", "affordable", "naira"],
    answer:
      "Each lawyer sets their own consultation fee, and you always see the price before you confirm a booking. Rates vary with the lawyer and the complexity of your matter. In the directory, you can filter by maximum fee to match your budget.",
    links: [DIRECTORY],
  },
  {
    id: "consultation",
    question: "How do consultations work?",
    keywords: ["consultation", "consultations", "book", "booking", "session", "appointment", "call", "chat", "meet", "meeting", "schedule"],
    answer:
      "Choose a lawyer, pick a consultation type (call or chat) and a time, then pay securely in the app. You'll connect with the lawyer privately through CallLawya at the booked time. Matches can appear within minutes, depending on your legal area and preferred time.",
    links: [{ label: "See how it works", href: ROUTES.howItWorks }],
  },
  {
    id: "choose",
    question: "Can I choose my lawyer?",
    keywords: ["choose", "pick", "select", "prefer", "change lawyer", "different lawyer", "switch"],
    answer:
      "Yes. You can compare lawyer profiles, including their practice areas, experience, location, fee and client ratings, and choose the professional you prefer.",
    links: [DIRECTORY],
  },
  {
    id: "verified",
    question: "Are the lawyers verified?",
    keywords: ["verified", "verify", "verification", "licensed", "license", "licence", "genuine", "real", "trust", "trusted", "qualified", "legit", "scam", "fake"],
    answer:
      "Yes. CallLawya checks each lawyer's professional identity and relevant licensing information before their profile is activated, so you can see who you're speaking to before you book.",
  },
  {
    id: "privacy",
    question: "Are my conversations private?",
    keywords: ["private", "privacy", "confidential", "confidentiality", "secure", "security", "safe", "encrypted", "encryption", "data", "information"],
    answer:
      "Yes. Conversations on CallLawya are protected with encryption and secure account access, and your legal matters are treated as confidential. You can read exactly how we handle your data in our Privacy Policy.",
    links: [
      { label: "Privacy Policy", href: ROUTES.privacy },
      { label: "Security", href: ROUTES.security },
    ],
  },
  {
    id: "refund",
    question: "How do I request a refund?",
    keywords: ["refund", "refunds", "money back", "charged", "double charged", "billing", "payment failed", "transaction", "debited", "reversal"],
    answer: `For a billing issue or refund, send us your transaction reference and the date of payment, either by email to ${CONTACT_EMAILS.support} or through the support form. Our team reviews requests within 2 business days.`,
    links: [{ label: "Open the support form", href: `${ROUTES.support}#support-request` }],
  },
  {
    id: "payment",
    question: "How do I pay for a consultation?",
    keywords: ["pay", "paying", "pay for", "payment", "payments", "card", "transfer", "wallet", "paystack"],
    answer:
      "You pay securely in the CallLawya app when you confirm a booking. The full price is shown before you pay, so there are no surprises.",
  },
  {
    id: "lex-ai",
    question: "What is Lex AI?",
    keywords: ["lex", "lex ai", "ai", "artificial intelligence", "bot", "assistant"],
    answer:
      "Lex AI is the legal information assistant in the CallLawya app. It helps you understand general legal concepts and unfamiliar terms, organise the facts of your situation and prepare questions for a lawyer. It supports your legal journey but doesn't replace advice from a qualified lawyer.",
    links: [{ label: "Learn about Lex AI", href: ROUTES.howItWorks }],
  },
  {
    id: "lawyer-free",
    question: "Is it free for lawyers to register?",
    keywords: ["free to register", "free to join", "free for lawyers", "registration fee", "listing fee", "monthly fee", "subscription", "cost to join", "pay to join", "pay to register"],
    answer:
      "Yes. Registration and listing are free, with no monthly listing fee. A 10% platform commission applies to eligible transactions processed through CallLawya.",
    links: [{ label: "Join as a Lawyer", href: ROUTES.joinAsLawyer }],
  },
  {
    id: "lawyer-commission",
    question: "How does the 10% commission work?",
    keywords: ["commission", "ten percent", "percent", "platform fee", "your cut", "deduction", "deductions"],
    answer:
      "CallLawya charges a 10% platform commission on eligible payments processed through the platform. For example, on a ₦10,000 consultation the commission is ₦1,000. Your account shows the relevant transaction details and applicable deductions.",
    links: [{ label: "Pricing for lawyers", href: ROUTES.joinAsLawyer }],
  },
  {
    id: "lawyer-verification",
    question: "How does lawyer verification work?",
    keywords: ["lawyer verification", "get verified", "verify my", "verification process", "scn", "supreme court number", "enrolment", "enrollment", "bar number", "selfie", "facial verification", "face verification"],
    answer:
      "You provide your Supreme Court of Nigeria enrolment number, identity details and the required professional information, and complete a quick facial verification in the app. Your profile must pass the applicable verification checks before it can accept bookings.",
    links: [{ label: "See the verification steps", href: ROUTES.joinAsLawyer }],
  },
  {
    id: "lawyer-fees",
    question: "Can I set my own consultation fees?",
    keywords: ["set my own", "my own fee", "my own fees", "set my fee", "set my fees", "my consultation fee", "how much should i charge", "charge clients", "free consultations"],
    answer:
      "Yes. You can set your consultation fees and publish them on your profile, subject to CallLawya's applicable platform rules. You can also choose to offer free consultations and update your fee anytime.",
  },
  {
    id: "lawyer-availability",
    question: "Can I choose when I am available?",
    keywords: ["when i am available", "when i'm available", "my availability", "availability", "working hours", "block dates", "block out", "time off", "my hours"],
    answer:
      "Yes. You can configure your working hours and appointment availability, and block dates when you are unavailable.",
  },
  {
    id: "lawyer-payouts",
    question: "How do I receive payments as a lawyer?",
    keywords: ["receive payments", "receive payment", "receive my money", "payout", "payouts", "get paid", "paid", "withdraw", "withdrawal", "earnings", "thursday", "bank account"],
    answer:
      "Add and verify your payout account and review the applicable payment terms. Eligible earnings are processed according to CallLawya's payment and payout arrangements: payouts are scheduled every Thursday through Paystack to your verified bank account, subject to payment clearance and verification.",
  },
  {
    id: "lawyer-calendar",
    question: "Can I connect my calendar?",
    keywords: ["connect my calendar", "calendar", "google calendar", "outlook", "sync"],
    answer:
      "Where supported, you can connect a compatible calendar or add confirmed appointments to help manage your schedule.",
  },
  {
    id: "lawyer-guarantee",
    question: "Does joining guarantee clients?",
    keywords: ["guarantee clients", "guarantee", "guaranteed", "how many clients", "enough clients", "get clients"],
    answer:
      "No. CallLawya provides a platform for discovery and connection, but the number of enquiries and bookings depends on client demand, profile suitability, availability and other factors.",
  },
  {
    id: "join-as-lawyer",
    question: "I'm a lawyer. How do I join CallLawya?",
    keywords: ["i am a lawyer", "i'm a lawyer", "im a lawyer", "as a lawyer", "join", "who can join", "become", "onboard", "onboarding", "register as", "list my", "partner", "partnership", "earn", "clients", "for lawyers"],
    answer: `Legal professionals who meet CallLawya's eligibility and verification requirements can apply to join. Download the app, verify your Supreme Court Number, complete facial verification, then publish your profile and set your fee. It's free to join; a 10% platform commission applies to eligible transactions. For partnerships, email ${CONTACT_EMAILS.lawyers}.`,
    links: [{ label: "See how to join", href: ROUTES.joinAsLawyer }, ...APP_LINKS],
  },
  {
    id: "account",
    question: "How do I create an account?",
    keywords: ["account", "sign up", "signup", "register", "registration", "create", "otp", "verification code", "log in", "login", "password"],
    answer:
      "Download the CallLawya app, tap “Sign Up” and enter your name, email and phone number. You'll receive a verification code to confirm your account. If you can't log in, make sure you're using the email linked to your account and the latest version of the app.",
    links: APP_LINKS,
  },
  {
    id: "delete-account",
    question: "How do I delete my account?",
    keywords: ["delete", "deactivate", "close my account", "remove my account", "delete account", "delete my account"],
    answer: `In the app, go to Settings > Account > Delete Account. You can also email ${CONTACT_EMAILS.support} from your account email, and we'll process the deletion within 7 business days.`,
  },
  {
    id: "app-problem",
    question: "The app isn't working",
    keywords: ["crash", "crashing", "not working", "isn't working", "doesn't work", "not loading", "app problem", "app issue", "bug", "error", "broken", "freeze", "frozen", "stuck", "glitch"],
    answer:
      "Please update to the latest version of the app from the App Store or Google Play, then restart it. If the problem continues, tell our support team your device model and operating system version, plus a screenshot if you can, so we can investigate.",
    links: APP_LINKS,
  },
  {
    id: "download",
    question: "Where can I download the app?",
    keywords: ["download", "install", "app store", "play store", "google play", "android", "iphone", "ios", "apple", "mobile app"],
    answer: "The CallLawya app is free to download for Android and iPhone.",
    links: APP_LINKS,
  },
  {
    id: "contact",
    question: "How do I contact support?",
    keywords: ["support", "human", "agent", "person", "someone", "talk to", "speak to", "contact", "customer care", "customer service", "phone number", "email"],
    answer: `You can email ${CONTACT_EMAILS.support}, send a request through the support form, or call ${SUPPORT_PHONE.display} (${SUPPORT_PHONE.hours}). We reply within 24 hours.`,
  },
];

export const SUGGESTED_TOPIC_IDS = ["find-lawyer", "cost", "legal-advice", "privacy", "refund", "join-as-lawyer"];

const GREETINGS = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy"];
const THANKS = ["thanks", "thank you", "thank", "appreciate", "great", "perfect", "ok", "okay"];

const normalize = (text: string) => ` ${text.toLowerCase().replace(/[^a-z0-9']+/g, " ").trim()} `;
const has = (text: string, keyword: string) => text.includes(` ${keyword} `);

export type ChatReply =
  | { kind: "topic"; topic: ChatTopic }
  | { kind: "greeting" }
  | { kind: "thanks" }
  | { kind: "unknown" };

export function findReply(input: string): ChatReply {
  const text = normalize(input);
  const words = text.trim().split(" ").filter(Boolean);

  let best: { topic: ChatTopic; score: number } | null = null;
  for (const topic of CHAT_TOPICS) {
    const score = topic.keywords.reduce(
      (total, keyword) => (has(text, keyword) ? total + (keyword.includes(" ") ? 3 : 1) : total),
      0,
    );
    if (score > 0 && (!best || score > best.score)) best = { topic, score };
  }
  if (best) return { kind: "topic", topic: best.topic };

  if (words.length <= 4 && GREETINGS.some((greeting) => has(text, greeting))) return { kind: "greeting" };
  if (words.length <= 5 && THANKS.some((word) => has(text, word))) return { kind: "thanks" };
  return { kind: "unknown" };
}

export const topicById = (id: string) => CHAT_TOPICS.find((topic) => topic.id === id);

export function supportLinks(transcript: string[]): ChatLink[] {
  const body = transcript.length
    ? `Hi CallLawya team,\n\nI asked the website assistant:\n${transcript.map((line) => `- ${line}`).join("\n")}\n\nI still need help with:\n`
    : "Hi CallLawya team,\n\nI need help with:\n";
  return [
    {
      label: `Email ${CONTACT_EMAILS.support}`,
      href: `mailto:${CONTACT_EMAILS.support}?subject=${encodeURIComponent("Help request from the website")}&body=${encodeURIComponent(body)}`,
    },
    { label: "Open the support form", href: `${ROUTES.support}#support-request` },
    { label: `Call ${SUPPORT_PHONE.display}`, href: SUPPORT_PHONE.href },
  ];
}
