import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  CheckIcon,
  DotIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
  PlusIcon,
  SmartphoneIcon,
} from "@/assets/icons";
import { Icon, JsonLd } from "@/components/common";
import { SupportChat } from "@/components/support";
import { CONTACT_EMAILS, LAWYER_FAQS, ROUTES, SUPPORT_PHONE } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { SupportForm } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Support",
  description:
    "Get help with your CallLawya account, connecting with a lawyer, billing or anything else related to the CallLawya app.",
  path: ROUTES.support,
});

const CHANNELS = [
  {
    icon: MailIcon,
    title: "Email Support",
    link: { label: CONTACT_EMAILS.support, href: `mailto:${CONTACT_EMAILS.support}` },
    note: "Typical reply time: within 24 hours",
  },
  {
    icon: MessageCircleIcon,
    title: "Contact Form",
    link: { label: "Submit a request", href: "#support-request" },
    note: "Best for account or billing issues",
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    link: { label: SUPPORT_PHONE.display, href: SUPPORT_PHONE.href },
    note: SUPPORT_PHONE.hours,
  },
];

const REQUEST_TIPS = [
  "The email address linked to your CallLawya account.",
  "For billing issues, your transaction reference and the date of payment.",
  "For app problems, your device model and operating system version.",
  "Screenshots or error messages, if you have them.",
];

const FAQS = [
  {
    question: "How do I create an account?",
    answer:
      "Download the CallLawya app, tap “Sign Up” and enter your name, email and phone number to get started. You’ll receive a verification code to confirm your account.",
  },
  {
    question: "How do I connect with a lawyer?",
    answer:
      "Describe your legal issue in the app and browse qualified, verified lawyers who practise in that area. You can then book a consultation and connect by call or chat.",
  },
  {
    question: "How much does a consultation cost?",
    answer:
      "Pricing is shown before you confirm any consultation. Rates vary depending on the lawyer and the complexity of your matter.",
  },
  {
    question: "How do I request a refund?",
    answer: `If you experience a billing issue, contact us at ${CONTACT_EMAILS.support} or use the support form above with your transaction details, and our team will review your request within 2 business days.`,
  },
  {
    question: "Is my information secure?",
    answer:
      "We use safeguards designed to protect your account and personal data, and we handle your information in line with our Privacy Policy. Your legal matters are treated as confidential.",
  },
  {
    question: "How do I delete my account?",
    answer: `Go to Settings > Account > Delete Account in the app, or email ${CONTACT_EMAILS.support} with your account email and we’ll process the deletion within 7 business days.`,
  },
  {
    question: "The app is crashing or not working. What should I do?",
    answer: `Try updating to the latest version of the app from the App Store or Google Play. If the issue persists, email us at ${CONTACT_EMAILS.support} with your device model and OS version so we can investigate.`,
  },
];

const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [...FAQS, ...LAWYER_FAQS].map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function SupportPage() {
  return (
    <>
      <JsonLd data={FAQ_STRUCTURED_DATA} />

      <section className="page-x bg-ink section-y text-white">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-light">Help centre</p>
            <h1 className="mt-4 font-serif text-[40px] font-bold leading-none sm:text-5xl md:text-6xl xl:text-[72px]">
              CallLawya Support
            </h1>
          </div>
          <div className="pb-2">
            <p className="text-lg leading-8 text-white/60 md:text-xl">
              Get help with your account, connecting with a lawyer, billing or anything else related to the CallLawya
              app.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <span className="inline-flex items-center gap-2 rounded-full bg-green-500/15 px-4 py-2 text-green-300">
                <Icon icon={DotIcon} className="text-[8px] text-green-400" /> All systems operational
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-white/70">
                <Icon icon={SmartphoneIcon} className="text-brand-light" /> CallLawya app for iOS &amp; Android
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="grid gap-5 md:grid-cols-3">
          {CHANNELS.map((channel) => (
            <article key={channel.title} className="lift rounded-xl border border-slate-200 bg-white p-7">
              <Icon icon={channel.icon} className="h-12 w-12 rounded-xl bg-brand-mist p-2.5 text-brand" />
              <h2 className="mt-6 text-xl font-bold">{channel.title}</h2>
              <a href={channel.link.href} className="mt-2 block break-words font-semibold text-brand hover:underline">
                {channel.link.label}
              </a>
              <p className="mt-1 text-sm text-slate-500">{channel.note}</p>
            </article>
          ))}
        </div>

        <div id="support-request" className="mt-10 grid scroll-mt-28 gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-bold tracking-widest text-brand">SUBMIT A SUPPORT REQUEST</p>
                <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">How can we help?</h2>
                <p className="mt-2 text-slate-600">Our support team will get back to you as soon as possible.</p>
              </div>
              <Icon
                icon={MessageCircleIcon}
                className="hidden h-14 w-14 shrink-0 rounded-full bg-brand-mist p-3.5 text-brand sm:block"
              />
            </div>
            <SupportForm />
          </div>

          <div className="space-y-6">
            <article className="rounded-xl bg-brand p-8 text-white">
              <p className="text-xs font-bold tracking-widest text-white/70">BEFORE YOU SEND</p>
              <h2 className="mt-3 font-serif text-3xl font-bold">Help us help you faster.</h2>
              <p className="mt-3 text-white/75">Including these details means we can resolve your request sooner:</p>
              <ul className="mt-6 space-y-4">
                {REQUEST_TIPS.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <Icon icon={CheckIcon} className="mt-1 h-5 w-5 rounded-full bg-white/15 p-1" />
                    <span className="text-white/85">{tip}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-7">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-brand">SUPPORT HOURS</p>
                  <h3 className="mt-2 text-xl font-bold">We respond within 24 hours.</h3>
                </div>
                <span className="shrink-0 text-sm font-bold text-green-600">
                  <Icon icon={DotIcon} className="text-[8px]" /> Online
                </span>
              </div>
              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div className="bg-paper p-4">
                  <p className="text-slate-500">Phone support</p>
                  <strong>{SUPPORT_PHONE.hours}</strong>
                </div>
                <div className="bg-paper p-4">
                  <p className="text-slate-500">Email &amp; form</p>
                  <strong>Reply within 24 hours</strong>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-x bg-white section-y">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">COMMON QUESTIONS</p>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Frequently asked questions.</h2>
            <p className="mt-5 text-slate-600">
              Quick answers about accounts, consultations, billing and the app. Read our{" "}
              <Link href={ROUTES.privacy} className="font-semibold text-brand hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href={ROUTES.terms} className="font-semibold text-brand hover:underline">
                Terms of Use
              </Link>{" "}
              for more.
            </p>
          </div>
          <div className="space-y-10">
            {[
              { title: "For clients", faqs: FAQS },
              { title: "For lawyers", faqs: LAWYER_FAQS },
            ].map((group, groupIndex) => (
              <div key={group.title}>
                <h3 className="mb-2 text-xs font-bold tracking-widest text-brand">{group.title.toUpperCase()}</h3>
                <div className="border-t-2 border-black">
                  {group.faqs.map((faq, index) => (
                    <details
                      key={faq.question}
                      className="group border-b border-slate-300 py-6"
                      open={groupIndex === 0 && index === 0}
                    >
                      <summary className="flex cursor-pointer list-none justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <Icon icon={PlusIcon} className="shrink-0 transition group-open:rotate-45" />
                      </summary>
                      <p className="mt-4 leading-7 text-slate-600 md:pr-16">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x flex flex-col gap-8 bg-brand py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Still need help?</h2>
          <p className="mt-3 text-lg text-white/75">Our team is here for clients and lawyers alike.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${CONTACT_EMAILS.support}`} className="press rounded-md bg-black px-8 py-4 font-bold">
            Email support <Icon icon={ArrowRightIcon} className="ml-2" />
          </a>
          <Link
            href={ROUTES.contact}
            className="press rounded-md border border-white px-8 py-4 font-bold hover:bg-white hover:text-brand"
          >
            Contact us
          </Link>
        </div>
      </section>

      <SupportChat />
    </>
  );
}
