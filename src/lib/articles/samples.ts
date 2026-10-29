import { officeCity } from "@/assets/images";
import type { Article } from "@/types/article";

/** Dummy articles added to the browser on first visit so the page isn't empty. Set to false to turn off. */
export const SEED_SAMPLE_ARTICLES = true;

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "sample-tenancy",
    slug: "what-to-check-before-signing-a-tenancy-agreement",
    title: "What to check before signing a tenancy agreement",
    category: "Land & Property",
    authorName: "CallLawya Editorial Team",
    authorRole: "CallLawya Newsroom",
    excerpt:
      "A tenancy agreement sets out your rights and obligations for the length of your stay. Here are the clauses worth reading carefully before you sign.",
    body: `Signing a tenancy agreement is a big commitment. Once you sign, the terms generally bind both you and your landlord, so it is worth taking the time to read every clause and ask about anything you do not understand.

## Rent and payment terms

Check the rent amount, how often it is due and how it should be paid. Ask for receipts for every payment and keep them somewhere safe.

- The total rent and the payment schedule
- Whether rent can be reviewed or increased during the tenancy
- Any service charge, agency fee or legal fee, and what each one covers

## Length of the tenancy and notice

Make sure the agreement states when the tenancy starts and ends, and what happens at the end of it. Look for the notice period that applies if either side wants to end the arrangement.

## Deposits, repairs and house rules

Find out the conditions for getting any deposit back, who is responsible for repairs, and whether there are rules about subletting, guests or alterations to the property.

If anything in the agreement worries you, speak to a qualified lawyer before signing. A short consultation can help you understand your rights and obligations.`,
    tags: ["tenancy", "rent", "property"],
    cover: officeCity.src,
    readMinutes: 3,
    reads: 128,
    createdAt: "2026-10-20T09:00:00.000Z",
  },
  {
    id: "sample-first-consultation",
    slug: "five-questions-to-ask-before-your-first-legal-consultation",
    title: "Five questions to ask before your first legal consultation",
    category: "Legal Access",
    authorName: "CallLawya Editorial Team",
    authorRole: "CallLawya Newsroom",
    excerpt:
      "A little preparation goes a long way. Use these questions to get the most out of your first conversation with a lawyer.",
    body: `Your first consultation is an opportunity to explain your situation and understand your options. Preparing in advance helps you use the time well and leave with a clearer next step.

## Before the consultation

Write down the key facts in the order they happened, and gather any documents that relate to your matter, such as contracts, letters, receipts or messages.

## Questions to ask your lawyer

- Do you have experience with matters like mine?
- What are my options, and what are the possible outcomes of each?
- What information or documents do you need from me?
- How much will your services cost, and how are fees charged?
- What are the next steps, and roughly how long might they take?

## After the consultation

Make a note of what was discussed and any actions you agreed. If something was unclear, it is fine to ask for clarification.

CallLawya can help you find a verified lawyer and book a consultation at a time that suits you.`,
    tags: ["consultation", "legal advice", "getting started"],
    cover: null,
    readMinutes: 2,
    reads: 86,
    createdAt: "2026-10-23T09:00:00.000Z",
  },
  {
    id: "sample-employment-contract",
    slug: "understanding-your-employment-contract-before-you-sign",
    title: "Understanding your employment contract before you sign",
    category: "Employment",
    authorName: "CallLawya Editorial Team",
    authorRole: "CallLawya Newsroom",
    excerpt:
      "Your employment contract shapes your pay, duties and rights at work. These are the terms worth understanding before you accept an offer.",
    body: `A new job offer is exciting, but the contract you sign will shape your working relationship for months or years. Reading it carefully now can help you avoid misunderstandings later.

## Pay and benefits

Confirm your salary, when it is paid and what deductions apply. Check whether allowances, bonuses or other benefits are included and what conditions attach to them.

## Duties, hours and location

Look at how your role and responsibilities are described, your working hours, and whether you may be asked to work in other locations.

## Clauses that deserve a closer look

- Probation period and how it can be extended
- Notice period for resignation or termination
- Confidentiality and restrictions after you leave
- Ownership of work you create during your employment

## Ask before you sign

If any term is unclear or seems unfair, ask your employer to explain it before you sign. For important decisions, a lawyer can review the contract and explain how it affects you.`,
    tags: ["employment", "contracts", "work"],
    cover: null,
    readMinutes: 2,
    reads: 54,
    createdAt: "2026-10-25T09:00:00.000Z",
  },
];
