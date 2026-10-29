import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BanknoteIcon,
  CalendarCheckIcon,
  CalendarClockIcon,
  CheckIcon,
  LockIcon,
  ReceiptTextIcon,
  ScanFaceIcon,
  ShieldCheckIcon,
  UserRoundCheckIcon,
  WalletIcon,
} from "@/assets/icons";
import { appConsultationFee, appProfileSettings, appVerifyLicence } from "@/assets/images";
import { Icon, StoreButton } from "@/components/common";
import { LAWYER_PRICING_NOTE, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { FaceVerificationScreen, PhoneFrame } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Join as a Lawyer — How to Get Started on CallLawya",
  description:
    "See how to join CallLawya as a lawyer: verify your Supreme Court Number, complete facial verification, publish your profile and set your consultation fee. Free to join.",
  path: ROUTES.joinAsLawyer,
});

type AppStep = {
  label: string;
  title: string;
  text: string;
  points: string[];
  icon: typeof ShieldCheckIcon;
  screenshot?: StaticImageData;
  alt?: string;
};

const APP_STEPS: AppStep[] = [
  {
    label: "Submit your details",
    title: "Verify your licence with your Supreme Court Number.",
    text: "Download the CallLawya app, create your lawyer account and enter your Supreme Court of Nigeria enrolment number, together with the professional information required during registration.",
    points: ["Supreme Court Number (SCN)", "Identity details", "Professional information"],
    icon: BadgeCheckIcon,
    screenshot: appVerifyLicence,
    alt: "CallLawya app screen: Verify Your Licence by entering your Supreme Court Number",
  },
  {
    label: "Facial verification",
    title: "Confirm it's really you with a quick selfie.",
    text: "Take a selfie in the app so we can check that the person behind the profile matches the identity details you submitted. Our team then completes the applicable identity and professional checks.",
    points: ["Good, even lighting", "Face centred in the frame", "Reviewed by our team"],
    icon: ScanFaceIcon,
  },
  {
    label: "Publish your profile",
    title: "Complete your profile and go live.",
    text: "Once you're approved, set up your practice from Profile settings: complete your profile, add your bank account for payouts and manage your availability. Then publish so potential clients can discover your expertise.",
    points: ["My profile and practice areas", "Bank account for payouts", "Manage availability"],
    icon: UserRoundCheckIcon,
    screenshot: appProfileSettings,
    alt: "CallLawya app Profile settings screen with My profile, Bank account, Consultation fee and Manage availability",
  },
  {
    label: "Start consulting",
    title: "Set your fee and start receiving bookings.",
    text: "Choose what you charge per consultation, or offer free consultations, and update it anytime. Clients see your fee before they book, then connect with you by call or chat.",
    points: ["Your fee, your choice", "Shown to clients before booking", "Consult by call or chat"],
    icon: CalendarCheckIcon,
    screenshot: appConsultationFee,
    alt: "CallLawya app screen: Set your consultation fee in Naira, with an option to offer free consultations",
  },
];

const VERIFICATION_STEPS = [
  {
    title: "Submit Your Details",
    text: "Provide your Supreme Court of Nigeria enrolment number and the professional information required during registration.",
  },
  {
    title: "Complete the Verification Process",
    text: "Our team reviews the submitted details and conducts the applicable identity and professional checks.",
  },
  {
    title: "Publish Your Profile",
    text: "Once approved, your profile can be published so potential clients can discover your expertise and explore your consultation services.",
  },
];

const PRACTICE_CONTROLS = [
  {
    icon: WalletIcon,
    title: "Set Your Consultation Fees",
    text: "Choose your consultation prices and, where supported, offer different durations or consultation formats. Clients can review the applicable fees before confirming a booking.",
  },
  {
    icon: CalendarClockIcon,
    title: "Choose When You Are Available",
    text: "Set your working hours, publish available appointment slots, and block out dates when you cannot accept consultations.",
  },
  {
    icon: CalendarCheckIcon,
    title: "Keep Your Calendar Organised",
    text: "Track upcoming bookings and add appointments to your preferred calendar through supported calendar integrations.",
  },
  {
    icon: UserRoundCheckIcon,
    title: "Manage Your Professional Profile",
    text: "Keep your qualifications, areas of practice, biography and contact preferences up to date so potential clients can understand the services you offer.",
  },
];

const PRICING_HIGHLIGHTS = [
  {
    icon: BadgeCheckIcon,
    title: "Free to Join",
    text: "Create your professional profile without paying a monthly listing fee.",
  },
  {
    icon: WalletIcon,
    title: "Your Fees, Your Choice",
    text: "Set your consultation fees and let clients review the applicable price before booking.",
  },
  {
    icon: LockIcon,
    title: "Secure Payment Process",
    text: "Payments are managed through CallLawya's payment process, with funds held pending completion and release in accordance with the applicable terms.",
  },
];

const PRICING_POINTS = [
  { title: "Free registration", text: "Create your account without a monthly listing charge." },
  { title: "Your consultation fees", text: "Set the fees you charge for your services." },
  { title: "Clear transaction records", text: "Review payments, commissions and eligible payouts." },
  {
    title: "No monthly listing subscription",
    text: "Pay the platform commission on eligible transactions rather than a recurring listing fee.",
  },
];

const PRACTICE_TOOLS = [
  {
    icon: CalendarCheckIcon,
    title: "Manage Your Appointments",
    text: "View upcoming consultations, review booking details and keep track of appointment changes.",
  },
  {
    icon: CalendarClockIcon,
    title: "Keep Your Calendar Updated",
    text: "Organise your schedule using your published availability and supported calendar integrations.",
  },
  {
    icon: ReceiptTextIcon,
    title: "Track Your Earnings",
    text: "Review consultation payments, CallLawya's commission, pending balances and completed payouts from your account.",
  },
];

function DownloadCta({ label, className }: { label: string; className?: string }) {
  return (
    <Link
      href={ROUTES.download}
      className={cn(
        "press inline-flex items-center justify-center gap-2 rounded-md bg-brand px-8 py-4 font-bold text-white hover:bg-brand-hover",
        className,
      )}
    >
      {label} <Icon icon={ArrowRightIcon} />
    </Link>
  );
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="grid gap-6 border-t-4 border-black pt-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
      <div>
        <p className="eyebrow text-brand">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">{title}</h2>
      </div>
      {children && <div className="space-y-4 leading-7 text-slate-600">{children}</div>}
    </div>
  );
}

export default function JoinAsLawyerPage() {
  return (
    <div className="bg-white">
      <section className="page-x overflow-hidden bg-ink py-12 text-white lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-10">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-brand" />
              <span className="eyebrow text-brand-light">Lawyer onboarding</span>
            </div>
            <h1 className="font-serif text-[40px] font-bold leading-[1.02] tracking-[-.03em] sm:text-5xl md:text-6xl xl:text-[68px]">
              From sign-up to your first consultation.
            </h1>
            <p className="mt-7 max-w-[600px] border-l-2 border-gold pl-5 text-lg leading-8 text-white/75 md:text-xl">
              Here&apos;s what joining CallLawya looks like in the app, step by step: verify your licence, confirm your
              identity, publish your profile and start receiving bookings.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <StoreButton store="googlePlay" variant="light" />
              <StoreButton store="appStore" variant="light" />
            </div>
            <a href="#steps" className="mt-6 inline-flex items-center gap-2 font-bold text-white/80 hover:text-white">
              See the four steps <Icon icon={ArrowDownIcon} />
            </a>
            <p className="mt-6 text-sm italic text-white/55">{LAWYER_PRICING_NOTE}</p>
          </div>

          <div className="relative mx-auto flex h-[520px] w-full max-w-[520px] items-center justify-center sm:h-[600px]">
            <div className="absolute inset-x-10 bottom-10 top-16 rounded-[40px] bg-brand/25 blur-3xl" aria-hidden="true" />
            <PhoneFrame
              screenshot={appVerifyLicence}
              alt="CallLawya app: Verify Your Licence"
              className="absolute left-0 top-10 hidden w-[230px] -rotate-6 sm:block"
              floatDelay="-3s"
              preload
            />
            <PhoneFrame className="relative z-10 sm:absolute sm:right-0 sm:top-0 sm:w-[260px] sm:rotate-3" floatDelay="0s">
              <FaceVerificationScreen />
            </PhoneFrame>
          </div>
        </div>
      </section>

      <section id="steps" className="page-x scroll-mt-24 section-y">
        <SectionHeading eyebrow="How to sign up" title="Four steps in the CallLawya app.">
          <p>
            Everything happens in the app. Here is what you will see at each stage, from verifying your licence to
            receiving your first booking.
          </p>
        </SectionHeading>

        <ol className="mt-12 space-y-16 lg:space-y-24">
          {APP_STEPS.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                "grid items-center gap-10 lg:gap-20",
                index % 2 === 0 ? "lg:grid-cols-[.8fr_1.2fr]" : "lg:grid-cols-[1.2fr_.8fr]",
              )}
            >
              <div className={cn("relative flex justify-center", index % 2 === 1 && "lg:order-2")}>
                <div className="absolute inset-8 rounded-full bg-brand-mist blur-2xl" aria-hidden="true" />
                <PhoneFrame screenshot={step.screenshot} alt={step.alt} floatDelay={`-${index * 1.5}s`} className="relative">
                  {!step.screenshot && <FaceVerificationScreen />}
                </PhoneFrame>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand font-serif text-2xl font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-brand">
                    Step {String(index + 1).padStart(2, "0")} / {step.label}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-3xl font-bold leading-tight md:text-4xl">{step.title}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-600">{step.text}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 rounded-lg bg-paper px-4 py-3 text-sm font-semibold text-slate-700">
                      <Icon icon={step.icon} className="mt-0.5 text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Trust starts here</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Your Credentials Matter. So Does Your Reputation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Clients need confidence in the professionals they choose. CallLawya&apos;s verification process is designed
              to check the identity and professional credentials of lawyers before their profiles can accept bookings.
            </p>
            <p className="mt-6 flex gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
              <Icon icon={ShieldCheckIcon} className="mt-0.5 shrink-0 text-base text-brand" />
              A verified profile helps clients make informed decisions. It does not guarantee a particular legal outcome or
              replace a client&apos;s own assessment of a lawyer&apos;s suitability.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm md:p-10">
            <h3 className="text-sm font-bold tracking-widest text-slate-500">HOW VERIFICATION WORKS</h3>
            <ol className="relative mt-6 space-y-8 before:absolute before:bottom-6 before:left-[21px] before:top-6 before:w-px before:bg-brand/25">
              {VERIFICATION_STEPS.map((step, index) => (
                <li key={step.title} className="relative flex gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-bold text-white ring-4 ring-white">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold">{step.title}</h4>
                    <p className="mt-1 leading-7 text-slate-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="page-x section-y">
        <SectionHeading eyebrow="Flexibility and control" title="You Set the Terms of Your Consultations.">
          <p>
            Your professional time and expertise have value. CallLawya gives you control over your consultation fees and
            availability while providing tools to manage bookings.
          </p>
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PRACTICE_CONTROLS.map((item) => (
            <article key={item.title} className="lift flex gap-5 rounded-xl border border-slate-200 bg-white p-7">
              <Icon icon={item.icon} className="h-12 w-12 shrink-0 rounded-xl bg-brand-mist p-2.5 text-brand" />
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <DownloadCta label="Create Your Professional Profile" className="mt-10" />
      </section>

      <section className="page-x bg-ink section-y text-white">
        <div className="grid gap-6 border-t border-white/30 pt-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-brand-light">Simple and transparent</p>
            <h2 className="mt-2 font-serif text-4xl font-bold leading-tight md:text-5xl">
              Grow Your Practice Without a Monthly Listing Fee.
            </h2>
          </div>
          <div className="space-y-4 leading-7 text-white/65">
            <p>
              Joining CallLawya is free. There is no monthly listing subscription, and you remain in control of your
              consultation fees and availability.
            </p>
            <p>
              CallLawya charges a 10% platform commission on eligible transactions processed through the platform. Once
              your consultation or case-related service has been completed and the payment is eligible for release, your
              earnings are processed for payout according to CallLawya&apos;s payment terms.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PRICING_HIGHLIGHTS.map((item) => (
            <article key={item.title} className="rounded-xl border border-white/15 bg-white/5 p-7">
              <Icon icon={item.icon} className="h-12 w-12 rounded-xl bg-white/10 p-2.5 text-gold" />
              <h3 className="mt-6 text-xl font-bold">{item.title}</h3>
              <p className="mt-2 leading-7 text-white/65">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-7 text-navy lg:col-span-1">
            <h3 className="text-xl font-bold">What This Means for You</h3>
            <ul className="mt-5 space-y-4">
              {PRICING_POINTS.map((point) => (
                <li key={point.title} className="flex gap-3">
                  <Icon icon={CheckIcon} className="mt-1 h-5 w-5 shrink-0 rounded-full bg-brand-mist p-1 text-brand" />
                  <span className="leading-7 text-slate-600">
                    <strong className="text-navy">{point.title}:</strong> {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col rounded-xl bg-brand p-7">
            <Icon icon={BanknoteIcon} className="h-12 w-12 rounded-xl bg-white/15 p-2.5" />
            <h3 className="mt-6 text-xl font-bold">Weekly Payouts Through Paystack</h3>
            <p className="mt-2 leading-7 text-white/80">
              Your eligible earnings are scheduled for payout every Thursday through Paystack to your verified bank
              account, subject to payment clearance, verification and applicable payout conditions.
            </p>
            <p className="mt-auto flex items-center gap-2 pt-6 text-sm font-bold">
              <Icon icon={CalendarCheckIcon} /> Every Thursday
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/5 p-7">
            <p className="text-xs font-bold tracking-widest text-brand-light">EXAMPLE OF THE 10% COMMISSION</p>
            <p className="mt-3 leading-7 text-white/65">For a consultation fee of ₦10,000:</p>
            <dl className="mt-4 divide-y divide-white/15 border-y border-white/15">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/65">Consultation fee</dt>
                <dd className="font-bold">₦10,000</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/65">CallLawya&apos;s 10% commission</dt>
                <dd className="font-bold">₦1,000</dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-white/65">Your earnings before other applicable deductions</dt>
                <dd className="font-serif text-2xl font-bold text-gold">₦9,000</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl font-serif text-2xl leading-snug">
            Your expertise deserves a transparent payment process. Know what you earn, track your transactions, and plan
            around a regular payout schedule.
          </p>
          <DownloadCta label="Join CallLawya" className="shrink-0" />
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <SectionHeading eyebrow="Your practice, organised" title="From Consultation Bookings to Your Weekly Payout.">
          <p>Manage your appointments, keep track of completed consultations and monitor your earnings through CallLawya.</p>
        </SectionHeading>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PRACTICE_TOOLS.map((tool) => (
            <article key={tool.title} className="lift flex flex-col rounded-xl border-t-4 border-brand bg-white p-7">
              <Icon icon={tool.icon} className="h-12 w-12 rounded-xl bg-brand-mist p-2.5 text-brand" />
              <h3 className="mt-6 text-xl font-bold">{tool.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{tool.text}</p>
            </article>
          ))}
        </div>

        <article className="mt-6 grid gap-6 rounded-xl border-t-4 border-gold bg-ink p-7 text-white md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8 md:p-9">
          <Icon icon={BanknoteIcon} className="h-14 w-14 rounded-xl bg-white/10 p-3 text-gold" />
          <div>
            <h3 className="text-2xl font-bold">Receive Your Payout Every Thursday</h3>
            <p className="mt-3 max-w-3xl leading-7 text-white/70">
              Once your consultation or case-related service is completed and the payment is approved for release, your
              eligible earnings enter the payout process. CallLawya schedules payouts every Thursday through Paystack to
              your verified bank account, subject to the applicable payment terms.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start rounded-lg bg-white/10 px-5 py-4 md:flex-col md:items-start md:gap-1 md:self-center">
            <span className="text-xs font-bold tracking-widest text-gold">EVERY</span>
            <span className="font-serif text-2xl font-bold">Thursday</span>
            <span className="text-xs text-white/60">via Paystack</span>
          </div>
        </article>

        <DownloadCta label="Join CallLawya" className="mt-8" />
      </section>

      <section className="page-x section-y">
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
              href={ROUTES.download}
              className="press inline-flex items-center gap-2 rounded-md bg-black px-8 py-4 text-lg font-bold hover:bg-neutral-800"
            >
              Join as a Lawyer <Icon icon={ArrowRightIcon} />
            </Link>
            <p className="mt-4 text-sm text-white/75">
              Free to join. No monthly listing fee. A 10% platform commission applies to eligible transactions.
            </p>
            <Link href={ROUTES.forLawyers} className="mt-3 inline-block text-sm font-bold underline underline-offset-4">
              Why lawyers choose CallLawya
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
