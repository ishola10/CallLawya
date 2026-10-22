import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lawyerMan1, lawyerWoman1 } from "@/assets/images";
import { ROUTES } from "@/constants";
import { Icon } from "@/components/common";
import { faChevronDown, faComment, faPhone, faPlus, faVideo } from "@/assets/icons";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Describe your issue, get matched with verified lawyers and connect securely by call, video or chat — legal help in three clear steps.",
};

const LAWYER_STEPS = [
  {
    title: "Create & verify your profile",
    text: "Share your credentials, licensing, languages and areas of practice.",
  },
  {
    title: "Receive relevant client requests",
    text: "Choose availability and get matched to matters aligned with your expertise.",
  },
  {
    title: "Consult, resolve & earn",
    text: "Connect securely, help clients across Africa and receive payment through the platform.",
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

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      <section className="page-x bg-ink pb-16 pt-14 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow text-brand-light">Simple by design</p>
          <h1 className="mt-5 font-serif text-[40px] sm:text-5xl font-bold leading-none md:text-6xl lg:text-[76px]">
            Legal help in three clear steps.
          </h1>
          <p className="mt-7 text-lg text-white/60 md:text-xl">
            Whether you need a lawyer or you&apos;re ready to serve clients, CallLawya makes every step visible, secure
            and human.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {["Tell us what you need", "Review your matches", "Connect securely"].map((label, index) => (
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
            <p className="mt-5 leading-7 text-slate-500">No complex intake. No waiting rooms. No jargon.</p>
          </aside>
          <div className="space-y-7">
            <article className={`${stepCard} border border-slate-200 bg-white`}>
              <span className="font-serif text-7xl text-brand">01</span>
              <div>
                <p className="text-xs font-bold text-brand">DESCRIBE YOUR ISSUE</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Tell us what happened, in your own words.</h2>
                <p className="mt-3 text-slate-600">
                  Choose a legal area, explain the situation and set your preferred language and contact method.
                </p>
              </div>
              <div className="rounded-lg bg-brand-mist p-5 md:col-span-2 xl:col-span-1">
                <p className="text-xs font-bold">WHAT DO YOU NEED HELP WITH?</p>
                <div className="mt-4 flex items-center justify-between rounded border border-brand bg-white p-3">
                  Land & Property <Icon icon={faChevronDown} />
                </div>
                <div className="mt-3 h-10 rounded border border-slate-200 bg-white" />
              </div>
            </article>

            <article className={`${stepCard} border border-slate-200 bg-white`}>
              <span className="font-serif text-7xl text-brand">02</span>
              <div>
                <p className="text-xs font-bold text-brand">GET MATCHED</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Compare qualified lawyers who fit.</h2>
                <p className="mt-3 text-slate-600">
                  Review credentials, specialties, ratings, availability and transparent consultation prices.
                </p>
              </div>
              <div className="flex justify-center -space-x-8 md:col-span-2 xl:col-span-1">
                {[lawyerWoman1, lawyerMan1].map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="Lawyer"
                    className="h-28 w-28 rounded-full border-4 border-white object-cover"
                    sizes="112px"
                  />
                ))}
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-brand font-bold text-white">
                  +12
                </div>
              </div>
            </article>

            <article className={`${stepCard} bg-ink text-white`}>
              <span className="font-serif text-7xl text-gold">03</span>
              <div>
                <p className="text-xs font-bold text-brand-light">CONNECT & RESOLVE</p>
                <h2 className="mt-2 font-serif text-3xl font-bold">Start a secure conversation.</h2>
                <p className="mt-3 text-white/60">
                  Call, video or chat — then share files, track next steps and continue when it suits you.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center md:col-span-2 xl:col-span-1">
                {[
                  { icon: faPhone, label: "Call" },
                  { icon: faVideo, label: "Video" },
                  { icon: faComment, label: "Chat" },
                ].map(({ icon, label }) => (
                  <div key={label} className="rounded bg-white/10 py-5">
                    <Icon icon={icon} className="text-brand-light" />
                    <p className="mt-2 text-xs">{label}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="for-lawyers" className="page-x bg-white section-y">
        <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">For lawyers</p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">Grow your practice beyond your office.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Build a verified presence, receive relevant client requests and deliver professional counsel securely.
            </p>
            <Link
              href={`${ROUTES.contact}?subject=Lawyer%20onboarding`}
              className="press mt-8 inline-block rounded-md bg-brand px-7 py-4 font-bold text-white hover:bg-brand-hover"
            >
              Join as a Lawyer
            </Link>
          </div>
          <div className="border-t-4 border-black">
            {LAWYER_STEPS.map((step, index) => (
              <article key={step.title} className="grid grid-cols-[70px_1fr] gap-6 border-b border-slate-200 py-8">
                <span className={`font-serif text-4xl ${index === 2 ? "text-gold" : "text-brand"}`}>
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-slate-600">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x bg-paper section-y">
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
                  <Icon icon={faPlus} className="transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-7 text-slate-600 md:pr-16">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x flex flex-col gap-8 bg-brand py-10 lg:py-12 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Ready for a clearer next step?</h2>
          <p className="mt-3 text-lg text-white/70">Your legal rights matter. Start now.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={ROUTES.lawyers} className="press rounded-md bg-black px-8 py-4 font-bold">
            I need a Lawyer
          </Link>
          <a href="#for-lawyers" className="press rounded-md border border-white px-8 py-4 font-bold">
            I am a Lawyer
          </a>
        </div>
      </section>
    </div>
  );
}
