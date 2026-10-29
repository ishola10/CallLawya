import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CalendarCheckIcon, CircleCheckIcon, FileTextIcon, PlusIcon, UsersIcon } from "@/assets/icons";
import { appVerifyLicence, lawyerMan1 } from "@/assets/images";
import { Icon, JsonLd } from "@/components/common";
import {
  LAWYER_BENEFITS,
  LAWYER_FAQS,
  LAWYER_ONBOARDING_STEPS,
  LAWYER_PRICING_NOTE,
  LAWYER_SIGNUP_HREF,
  ROUTES,
} from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "For Lawyers — Grow Your Practice on CallLawya",
  description:
    "Create a verified lawyer profile, set your consultation fees and availability, and connect with clients across Nigeria. Free to join; a 10% platform commission applies to eligible transactions.",
  path: ROUTES.forLawyers,
});

const FAQ_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LAWYER_FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

function JoinButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <Link
      href={LAWYER_SIGNUP_HREF}
      className={`press inline-flex items-center justify-center gap-2 rounded-md bg-brand px-8 py-4 font-bold text-white hover:bg-brand-hover ${className}`}
    >
      {label} <Icon icon={ArrowRightIcon} />
    </Link>
  );
}

export default function ForLawyersPage() {
  return (
    <div className="bg-white">
      <JsonLd data={FAQ_STRUCTURED_DATA} />

      <section className="page-x overflow-hidden bg-ink py-12 text-white lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-brand" />
              <span className="eyebrow text-brand-light">For legal professionals</span>
            </div>
            <h1 className="font-serif text-[40px] font-bold leading-[1.02] tracking-[-.03em] sm:text-5xl md:text-6xl xl:text-[68px]">
              Your Next Client Is Already Looking for You.
            </h1>
            <p className="mt-7 max-w-[640px] border-l-2 border-gold pl-5 text-lg leading-8 text-white/75 md:text-xl">
              CallLawya connects legal professionals with people seeking legal support. Create your verified professional
              profile, showcase your expertise, set your consultation fees and availability, and manage bookings through
              one platform.
            </p>
            <p className="mt-5 max-w-[640px] leading-7 text-white/55 md:text-lg">
              Focus on delivering quality legal services while CallLawya helps you connect with potential clients.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <JoinButton label="Join as a Lawyer" className="text-lg" />
              <a
                href="#how-it-works"
                className="press rounded-md border border-white/60 px-8 py-4 text-lg font-bold hover:bg-white hover:text-black"
              >
                How It Works
              </a>
            </div>
            <p className="mt-6 text-sm italic text-white/55">{LAWYER_PRICING_NOTE}</p>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-[420px] sm:h-[520px]">
            <div className="absolute inset-y-0 right-0 w-[85%] overflow-hidden rounded-[26px] border border-white/15">
              <Image
                src={lawyerMan1}
                alt="Nigerian lawyer using CallLawya"
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 360px, 85vw"
                placeholder="blur"
                preload
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-6 pb-24">
                <span className="bg-brand px-2 py-1 text-xs font-bold">VERIFIED PROFILE</span>
                <p className="mt-3 font-serif text-2xl">Your expertise, discoverable.</p>
              </div>
            </div>
            <div className="absolute left-0 top-10 w-[200px] rounded-xl border-t-4 border-brand bg-white p-4 text-navy shadow-2xl sm:w-[230px]">
              <p className="text-xs text-slate-500">NEW BOOKING</p>
              <p className="mt-1 font-bold">Property consultation</p>
              <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <Icon icon={CalendarCheckIcon} className="text-brand" /> Confirmed · Call
              </p>
            </div>
            <div className="absolute bottom-6 left-0 rounded-lg bg-gold px-5 py-4 text-black shadow-xl">
              <p className="text-xs font-bold tracking-wide">YOUR FEE · YOUR TERMS</p>
              <p className="mt-1 font-serif text-xl font-bold">You set the price</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x section-y">
        <div className="grid gap-6 border-t-4 border-black pt-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Grow your practice</p>
            <h2 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
              More Visibility. Better Connections. Greater Control.
            </h2>
          </div>
          <p className="leading-7 text-slate-600">
            Your expertise deserves to reach the people who need it. CallLawya gives you the tools to establish your
            digital presence and connect with potential clients looking for legal support.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
          {LAWYER_BENEFITS.map((benefit, index) => (
            <article key={benefit.title} className="group bg-white p-8 transition-colors duration-300 hover:bg-brand">
              <div className="flex items-center justify-between">
                <Icon
                  icon={benefit.icon}
                  className="h-12 w-12 rounded-xl bg-brand-mist p-2.5 text-brand transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
                />
                <span className="font-serif text-3xl text-slate-200 transition-colors duration-300 group-hover:text-white/30">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold transition-colors duration-300 group-hover:text-white">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-slate-600 transition-colors duration-300 group-hover:text-white/80">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
        <JoinButton label="Start Your CallLawya Journey" className="mt-10" />
      </section>

      <section id="how-it-works" className="page-x scroll-mt-24 bg-ink section-y text-white">
        <div className="grid gap-6 border-t border-white/30 pt-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-brand-light">Getting started</p>
            <h2 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Three Steps to Getting Started on CallLawya.
            </h2>
          </div>
          <p className="leading-7 text-white/60">
            Joining CallLawya is straightforward. Complete your professional profile, set up your services and prepare to
            connect with potential clients.
          </p>
        </div>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {LAWYER_ONBOARDING_STEPS.map((step, index) => (
            <li
              key={step.title}
              className={`border-t-4 pt-6 ${index === LAWYER_ONBOARDING_STEPS.length - 1 ? "border-gold" : "border-brand"}`}
            >
              <span className="font-serif text-6xl text-white/20">0{index + 1}</span>
              <p className="mt-6 text-xs font-bold tracking-widest text-brand-light">STEP 0{index + 1}</p>
              <h3 className="mt-2 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-7 text-white/60">{step.text}</p>
            </li>
          ))}
        </ol>
        <JoinButton label="Join as a Lawyer" className="mt-12" />
      </section>

      <section className="page-x section-y">
        <div className="grid items-center gap-10 overflow-hidden rounded-[20px] bg-brand-mist p-8 md:p-12 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <p className="eyebrow text-brand">See it in the app</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Walk through sign-up, verification and your first booking.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
              Our step-by-step guide shows each screen you&apos;ll see in the CallLawya app, plus how verification, fees and
              weekly payouts work.
            </p>
            <JoinButton label="See how to join" className="mt-8" />
          </div>
          <div className="relative mx-auto hidden h-[300px] w-[200px] lg:block">
            <div className="absolute inset-0 rotate-3 overflow-hidden rounded-[34px] border-[8px] border-[#151a23] bg-white shadow-2xl">
              <Image src={appVerifyLicence} alt="" fill sizes="200px" className="object-cover object-top" placeholder="blur" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-x pb-12 lg:pb-14">
        <div className="grid items-center gap-8 rounded-[20px] bg-brand p-8 text-white md:p-14 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <h2 className="font-serif text-4xl font-bold md:text-5xl">Let More Clients Discover Your Expertise.</h2>
            <p className="mt-4 text-lg leading-8 text-white/80">
              Build your professional presence, showcase your specialisation and connect with people looking for legal
              support.
            </p>
            <p className="mt-3 leading-7 text-white/70">
              Join CallLawya and take your legal practice a step further with a platform designed to make connecting with
              potential clients easier.
            </p>
          </div>
          <div className="lg:text-right">
            <Link
              href={LAWYER_SIGNUP_HREF}
              className="press inline-flex items-center gap-2 rounded-md bg-black px-8 py-4 text-lg font-bold hover:bg-neutral-800"
            >
              Join as a Lawyer <Icon icon={ArrowRightIcon} />
            </Link>
            <p className="mt-4 text-sm text-white/75">
              Free to join. No monthly listing fee. A 10% platform commission applies to eligible transactions.
            </p>
          </div>
        </div>
      </section>

      <section className="page-x bg-white pb-12 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">FREQUENTLY ASKED QUESTIONS</p>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Questions from lawyers.</h2>
            <p className="mt-5 text-slate-600">Can&apos;t find your answer? Our team is happy to help.</p>
            <Link
              href={`${ROUTES.contact}?subject=Lawyer%20onboarding`}
              className="mt-6 inline-flex items-center gap-2 border-b-2 border-brand font-bold"
            >
              Contact us <Icon icon={ArrowRightIcon} />
            </Link>
          </div>
          <div className="border-t-2 border-black">
            {LAWYER_FAQS.map((faq, index) => (
              <details key={faq.question} className="group border-b border-slate-300 py-6" open={index === 0}>
                <summary className="flex cursor-pointer list-none justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Icon icon={PlusIcon} className="shrink-0 transition group-open:rotate-45" />
                </summary>
                <p className="mt-4 leading-7 text-slate-600 md:pr-16">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x border-t border-slate-200 bg-paper py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <Icon icon={UsersIcon} className="h-12 w-12 shrink-0 rounded-xl bg-white p-2.5 text-brand shadow-sm" />
            <div>
              <p className="text-xs font-bold tracking-widest text-brand">CALLLAWYA FOR LAWYERS</p>
              <p className="mt-1 font-serif text-2xl font-bold">Your Expertise. Your Practice. More Opportunities to Connect.</p>
              <p className="mt-2 max-w-2xl text-slate-600">
                CallLawya helps legal professionals establish a digital presence, manage consultations and connect with
                potential clients seeking legal support.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-sm font-semibold text-slate-600">
            <Icon icon={CircleCheckIcon} className="text-brand" /> Verified profiles
            <Icon icon={FileTextIcon} className="ml-3 text-brand" /> Clear records
          </div>
        </div>
      </section>
    </div>
  );
}
