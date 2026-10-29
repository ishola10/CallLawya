import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  CheckIcon,
  ChevronDownIcon,
  InfoIcon,
  MapPinIcon,
  PlusIcon,
  ScaleIcon,
  SparklesIcon,
} from "@/assets/icons";
import { Icon, JsonLd } from "@/components/common";
import { BookButton } from "@/components/lawyers";
import { LAWYER_ONBOARDING_STEPS, LAWYER_SIGNUP_HREF, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How It Works",
  description:
    "Describe your situation, find the right lawyer and book a consultation in three steps. Explore Lex AI and see how lawyers get started on CallLawya.",
  path: ROUTES.howItWorks,
});

const CLIENT_STEPS = [
  "Describe Your Situation",
  "Find the Right Legal Support",
  "Book a Consultation and Move Forward",
];

const LEX_CAPABILITIES = [
  {
    title: "Understand legal information",
    text: "Explore explanations of general legal concepts in clear, accessible language.",
  },
  {
    title: "Make sense of legal terms",
    text: "Get help understanding unfamiliar wording in legal documents and discussions.",
  },
  {
    title: "Organise your situation",
    text: "Arrange the key facts of your concern and identify information you may need.",
  },
  {
    title: "Prepare for a consultation",
    text: "Develop questions to discuss with a lawyer and identify relevant documents to bring to the conversation.",
  },
  {
    title: "Know when to seek professional support",
    text: "Recognise when your situation may require advice tailored to your circumstances.",
  },
];

const FAQS = [
  {
    question: "How quickly will I be matched?",
    answer:
      "Available matches can appear within minutes, depending on your legal area, country and preferred consultation time.",
  },
  {
    question: "How are lawyers verified?",
    answer: "We check professional identity and relevant licensing information before profiles are activated.",
  },
  {
    question: "Are conversations private?",
    answer: "CallLawya is designed to protect your communications with encryption and secure account access.",
  },
  {
    question: "Can I choose my lawyer?",
    answer: "Yes. Compare matched profiles and choose the professional you prefer.",
  },
];

const stepCard = "lift grid items-center gap-6 rounded-xl p-8 md:grid-cols-[90px_1fr] xl:grid-cols-[90px_1fr_330px] xl:gap-8";

const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <JsonLd data={FAQ_STRUCTURED_DATA} />
      <section className="page-x bg-ink pb-16 pt-14 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-brand-light">How CallLawya works</p>
          <h1 className="mt-5 font-serif text-[40px] font-bold leading-none sm:text-5xl md:text-6xl lg:text-[72px]">
            Three Steps Towards the Right Legal Support.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
            You do not need to have all the answers before you begin. CallLawya helps you explore your legal needs,
            find suitable professionals and take the next step with confidence.
          </p>
        </div>
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
          {CLIENT_STEPS.map((label, index) => (
            <div key={label} className="flex items-center gap-4 rounded-lg border border-white/15 bg-white/5 p-5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${
                  index === 2 ? "bg-gold text-black" : "bg-brand"
                }`}
              >
                {index + 1}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="mb-12 flex border-b border-slate-300">
          <span className="bg-brand px-6 py-4 font-bold text-white md:px-8">I need legal help</span>
          <a href="#for-lawyers" className="bg-white px-6 py-4 font-bold hover:text-brand md:px-8">
            I am a lawyer
          </a>
        </div>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <aside className="lg:border-r lg:border-slate-300 lg:pr-8">
            <p className="text-xs font-bold tracking-widest text-brand">CLIENT JOURNEY</p>
            <p className="mt-4 font-serif text-3xl font-bold">From uncertainty to a clear next step.</p>
            <p className="mt-5 leading-7 text-slate-500">You do not need to know the technical legal terms to get started.</p>
          </aside>
          <div className="space-y-7">
            <article className={`${stepCard} border border-slate-200 bg-white`}>
              <span className="font-serif text-7xl text-brand">01</span>
              <div>
                <p className="text-xs font-bold text-brand">STEP 1</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Describe Your Situation</h2>
                <p className="mt-3 text-slate-600">
                  Start by explaining the legal issue you are facing. It could be a property dispute, a disagreement
                  over a business contract, an employment concern or a question about your rights.
                </p>
                <p className="mt-3 text-slate-600">
                  Describe your situation in your own words. You do not need to know the technical legal terms to get
                  started.
                </p>
              </div>
              <div className="rounded-lg bg-brand-mist p-5 md:col-span-2 xl:col-span-1">
                <p className="text-xs font-bold">WHAT DO YOU NEED HELP WITH?</p>
                <div className="mt-4 flex items-center justify-between rounded border border-brand bg-white p-3">
                  Land & Property <Icon icon={ChevronDownIcon} />
                </div>
                <div className="mt-3 rounded border border-slate-200 bg-white p-3 text-sm text-slate-400">
                  My landlord wants me to leave before my lease ends…
                </div>
              </div>
            </article>

            <article className={`${stepCard} border border-slate-200 bg-white`}>
              <span className="font-serif text-7xl text-brand">02</span>
              <div>
                <p className="text-xs font-bold text-brand">STEP 2</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Find the Right Legal Support</h2>
                <p className="mt-3 text-slate-600">
                  Explore lawyer profiles based on their areas of practice, qualifications, location and availability.
                  Review relevant experience and consultation fees to help you decide which professional may be
                  suitable for your needs.
                </p>
                <p className="mt-3 text-slate-600">
                  CallLawya helps you discover potential legal support, making it easier to take the first step towards
                  addressing your concern.
                </p>
              </div>
              <div className="rounded-lg bg-brand-mist p-5 md:col-span-2 xl:col-span-1">
                <p className="text-xs font-bold">FILTER LAWYERS</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-white">
                    <Icon icon={ScaleIcon} /> Land & Property
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600">
                    <Icon icon={MapPinIcon} /> Lagos
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-600">
                    <Icon icon={CheckIcon} className="text-green-600" /> Available now
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {[0, 1].map((row) => (
                    <div key={row} className="flex items-center gap-3 rounded bg-white p-2.5">
                      <span className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-navy to-brand" />
                      <span className="h-2 flex-1 rounded-full bg-slate-200" />
                      <span className="h-2 w-10 rounded-full bg-gold/60" />
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article className={`${stepCard} bg-ink text-white`}>
              <span className="font-serif text-7xl text-gold">03</span>
              <div>
                <p className="text-xs font-bold text-brand-light">STEP 3</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Book a Consultation and Move Forward</h2>
                <p className="mt-3 text-white/60">
                  Choose an available appointment, book a consultation and connect with your selected lawyer through
                  the available communication options.
                </p>
                <p className="mt-3 text-white/60">
                  Explain your situation, ask questions and discuss the options available to you. Your lawyer can help
                  you understand the next steps based on your circumstances.
                </p>
              </div>
              <div className="rounded-lg bg-white/5 p-5 md:col-span-2 xl:col-span-1">
                <p className="flex items-center gap-2 text-xs font-bold">
                  <Icon icon={CalendarClockIcon} className="text-base text-brand-light" /> CHOOSE A TIME
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                  {["Mon 10:00", "Tue 14:30", "Wed 09:00"].map((slot, index) => (
                    <span
                      key={slot}
                      className={index === 1 ? "rounded bg-brand py-2.5" : "rounded bg-white/10 py-2.5 text-white/70"}
                    >
                      {slot}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded bg-white/10 p-3 text-xs font-semibold text-white/80">
                  <Icon icon={CalendarCheckIcon} className="text-base text-gold" /> Booked: Tuesday, 14:30 · Voice call
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="lex-ai" className="page-x section-y">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Meet Lex AI: Your starting point for legal questions</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Understand More. Prepare Better. Take Your Next Step.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Not sure where to start with a legal issue? Lex AI helps you explore legal information, understand
              unfamiliar terminology and organise your thoughts before speaking with a lawyer.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Whether you have a question about a tenancy agreement, a business contract or an employment concern, Lex
              AI can help you identify relevant questions and prepare for a more informed conversation with a legal
              professional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton className="press rounded-md bg-brand px-7 py-4 font-bold text-white hover:bg-brand-hover">
                <Icon icon={SparklesIcon} className="mr-2" /> Try Lex AI
              </BookButton>
              <Link
                href={ROUTES.lawyers}
                className="press rounded-md border border-slate-300 px-7 py-4 font-bold hover:border-brand hover:text-brand"
              >
                Find a Lawyer
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-ink p-6 text-sm text-white shadow-xl md:p-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Icon icon={SparklesIcon} className="h-10 w-10 rounded-xl bg-white/10 p-2 text-gold" />
              <div>
                <p className="font-bold">Lex AI</p>
                <p className="text-xs text-white/50">Legal information assistant</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <p className="ml-10 rounded-2xl rounded-br-sm bg-brand px-4 py-3">
                What should I check before signing a tenancy agreement?
              </p>
              <p className="mr-6 rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 leading-6 text-white/80">
                Key areas to look at include the rent and payment terms, the notice period, the deposit conditions and
                who is responsible for repairs. Would you like a list of questions to ask a lawyer?
              </p>
              <p className="ml-10 rounded-2xl rounded-br-sm bg-brand px-4 py-3">Yes, please.</p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-serif text-3xl font-bold">What can Lex AI help you with?</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {LEX_CAPABILITIES.map((capability) => (
              <article key={capability.title} className="rounded-xl border border-slate-200 bg-white p-6">
                <Icon icon={CheckIcon} className="h-9 w-9 rounded-lg bg-brand-mist p-2 text-brand" />
                <h4 className="mt-5 font-bold">{capability.title}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{capability.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4 rounded-xl border border-slate-200 bg-paper p-6 md:p-8">
          <Icon icon={InfoIcon} className="mt-1 text-xl text-brand" />
          <div>
            <h3 className="font-bold">From Questions to Clarity</h3>
            <p className="mt-2 leading-7 text-slate-600">
              Lex AI is designed to support your legal journey, not replace a qualified lawyer. Its responses may be
              incomplete or inaccurate and may not reflect the law applicable to your particular situation.
            </p>
            <p className="mt-2 leading-7 text-slate-600">
              For legal decisions, complex disputes or matters with significant consequences, consult an appropriately
              qualified legal professional.
            </p>
          </div>
        </div>
      </section>

      <section id="for-lawyers" className="page-x bg-paper section-y">
        <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Getting started</p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">Three Steps to Getting Started on CallLawya.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Joining CallLawya is straightforward. Complete your professional profile, set up your services and prepare
              to connect with potential clients.
            </p>
            <Link
              href={LAWYER_SIGNUP_HREF}
              className="press mt-8 inline-block rounded-md bg-brand px-7 py-4 font-bold text-white hover:bg-brand-hover"
            >
              Join as a Lawyer
            </Link>
          </div>
          <div className="border-t-4 border-black">
            {LAWYER_ONBOARDING_STEPS.map((step, index) => (
              <article key={step.title} className="grid grid-cols-[70px_1fr] gap-6 border-b border-slate-200 py-8">
                <span
                  className={`font-serif text-4xl ${index === LAWYER_ONBOARDING_STEPS.length - 1 ? "text-gold" : "text-brand"}`}
                >
                  0{index + 1}
                </span>
                <div>
                  <p className="text-xs font-bold text-brand">STEP 0{index + 1}</p>
                  <h3 className="mt-1 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-slate-600">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x bg-white section-y">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">COMMON QUESTIONS</p>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Before you begin.</h2>
            <p className="mt-5 text-slate-600">Still unsure? Our support team is here to help.</p>
            <Link href={ROUTES.contact} className="mt-6 inline-block border-b-2 border-brand font-bold">
              Contact support
            </Link>
          </div>
          <div className="border-t-2 border-black">
            {FAQS.map((faq, index) => (
              <details key={faq.question} className="group border-b border-slate-300 py-6" open={index === 0}>
                <summary className="flex cursor-pointer list-none justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Icon icon={PlusIcon} className="transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-7 text-slate-600 md:pr-16">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x flex flex-col gap-8 bg-brand py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Start With What You Know.</h2>
          <p className="mt-3 text-lg text-white/75">You do not need to have all the answers before seeking legal support.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={ROUTES.lawyers} className="press rounded-md bg-black px-8 py-4 font-bold">
            Find a Lawyer <Icon icon={ArrowRightIcon} className="ml-2" />
          </Link>
          <Link
            href={LAWYER_SIGNUP_HREF}
            className="press rounded-md border border-white px-8 py-4 font-bold hover:bg-white hover:text-brand"
          >
            Join as a Lawyer
          </Link>
        </div>
      </section>
    </div>
  );
}
