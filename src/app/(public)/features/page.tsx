import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { legalConsultation } from "@/assets/images";
import { ROUTES } from "@/constants";
import { Icon } from "@/components/common";
import { faArrowDown, faArrowRight, faArrowTrendUp, faCheck, faLock, faMobileScreenButton, faScaleBalanced, faUserShield, faWallet, faWandMagicSparkles } from "@/assets/icons";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Verified lawyers, transparent pricing and secure, encrypted consultations — everything you need for legal access across Africa.",
};

const VERIFIED_CHECKS = ["Professional credentials", "Client ratings", "Practice expertise", "Country licensing"];

const FEATURE_CARDS = [
  { icon: faMobileScreenButton, title: "Mobile-First", text: "Get advice on the go without geographic limitations." },
  { icon: faScaleBalanced, title: "Specialized Expertise", text: "Property, family, business, maritime, IP and more." },
  { icon: faWandMagicSparkles, title: "Instant Matching", text: "Relevant available lawyers, surfaced in minutes." },
  { icon: faArrowTrendUp, title: "Income for Lawyers", text: "Serve clients beyond physical boundaries." },
];

const COMPARISON = [
  { label: "Time to connect", us: "Minutes", them: "Days or weeks" },
  { label: "Pricing visibility", us: "Upfront", them: "Often unclear" },
  { label: "Access format", us: "Call, video & chat", them: "Mostly in-person" },
  { label: "Geographic reach", us: "Africa-wide", them: "Office location" },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      <section className="page-x bg-ink section-y text-white lg:min-h-[610px]">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-brand-light">One platform. Every legal need.</p>
            <h1 className="mt-5 font-serif text-[40px] sm:text-5xl font-bold leading-none md:text-6xl xl:text-[70px]">
              Everything You Need for Legal Access
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65 md:text-xl">
              From first question to final resolution, CallLawya puts verified expertise, transparent pricing and
              secure communication in your hands.
            </p>
            <a
              href="#tools"
              className="press mt-9 inline-block rounded-md bg-brand px-8 py-4 text-lg font-bold hover:bg-brand-hover"
            >
              Explore the platform <Icon icon={faArrowDown} className="ml-2" />
            </a>
          </div>
          <div className="relative mb-7 h-[320px] md:h-[430px] lg:mb-0">
            <Image
              src={legalConsultation}
              alt="African legal team"
              className="h-full w-full rounded-xl object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              preload
            />
            <div className="absolute -bottom-7 left-4 w-64 border-t-4 border-gold bg-white p-6 text-navy shadow-xl lg:-left-7">
              <p className="font-serif text-3xl font-bold">8 core tools</p>
              <p className="mt-1 text-sm text-slate-500">One seamless legal journey</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="page-x section-y">
        <div className="mb-12 flex flex-col gap-4 border-t-4 border-black pt-5 md:flex-row md:justify-between">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Built around trust.</h2>
          <p className="max-w-md text-slate-600">
            Every feature reduces friction between a legal problem and the right professional.
          </p>
        </div>
        <div className="border-y border-slate-200">
          <article className="grid items-center gap-10 border-b border-slate-200 py-10 lg:py-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
            <div className="relative flex h-[280px] items-center justify-center rounded-xl bg-brand-mist md:h-[320px]">
              <Icon icon={faUserShield} className="text-[90px] text-brand md:text-[110px]" />
              <span className="absolute left-5 top-5 bg-white px-3 py-2 text-xs font-bold">
                IDENTITY + LICENSE CHECKED
              </span>
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-brand">01 / CONFIDENCE</span>
              <h3 className="mt-3 font-serif text-4xl font-bold">Verified Lawyers</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Access thoroughly vetted and licensed lawyers across Africa. Profiles show experience, areas of
                practice, location and verified client feedback before you connect.
              </p>
              <div className="mt-7 grid gap-4 text-sm font-semibold sm:grid-cols-2">
                {VERIFIED_CHECKS.map((check) => (
                  <p key={check}>
                    <Icon icon={faCheck} className="mr-2 text-brand" />
                    {check}
                  </p>
                ))}
              </div>
            </div>
          </article>

          <article className="grid items-center gap-10 border-b border-slate-200 py-10 lg:py-12 lg:grid-cols-[1.25fr_.75fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <span className="text-xs font-bold tracking-widest text-brand">02 / ACCESS</span>
              <h3 className="mt-3 font-serif text-4xl font-bold">Affordable, transparent pricing</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Compare options before committing. Choose the consultation format and lawyer that fit your need and
                budget — with no hidden surprises.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-lg border border-slate-200 p-5">
                  <p className="text-xs text-slate-500">CHAT CONSULTATION</p>
                  <strong className="text-2xl">From $12</strong>
                </div>
                <div className="rounded-lg border border-slate-200 p-5">
                  <p className="text-xs text-slate-500">VIDEO CONSULTATION</p>
                  <strong className="text-2xl">From $25</strong>
                </div>
              </div>
            </div>
            <div className="order-1 flex h-[280px] flex-col justify-between rounded-xl bg-ink p-8 text-white md:h-[320px] lg:order-2">
              <Icon icon={faWallet} className="text-4xl text-gold" />
              <div>
                <p className="text-xs text-white/50">PRICE VISIBILITY</p>
                <p className="mt-2 font-serif text-4xl font-bold">Know before you connect.</p>
              </div>
            </div>
          </article>

          <article
            id="secure"
            className="grid items-center gap-10 border-b border-slate-200 py-10 lg:py-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16"
          >
            <div className="flex h-[280px] flex-col justify-between rounded-xl bg-brand p-8 text-white md:h-[320px]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40">
                <Icon icon={faLock} className="text-2xl" />
              </div>
              <div>
                <p className="text-sm text-white/60">SECURE SESSION</p>
                <div className="mt-3 h-2 rounded-full bg-white/20">
                  <div className="h-full w-4/5 rounded-full bg-white" />
                </div>
                <p className="mt-3 text-xs text-white/60">End-to-end encrypted</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-brand">03 / PRIVACY</span>
              <h3 className="mt-3 font-serif text-4xl font-bold">Secure & encrypted</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Your legal conversations deserve the highest level of privacy. Calls, video sessions and messages are
                protected so you can speak openly with confidence.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURE_CARDS.map((card) => (
            <article key={card.title} className="lift rounded-xl bg-white p-7">
              <Icon icon={card.icon} className="text-3xl text-brand" />
              <h3 className="mt-8 text-xl font-bold">{card.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{card.text}</p>
            </article>
          ))}
        </div>
        <article className="mt-5 grid items-center gap-6 rounded-xl bg-navy p-9 text-white lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-light">AFRICA-WIDE COVERAGE</p>
            <h3 className="mt-2 font-serif text-3xl font-bold md:text-4xl">Local legal context. Continental reach.</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {["NG", "GH", "KE", "ZA"].map((code) => (
              <span
                key={code}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 font-bold"
              >
                {code}
              </span>
            ))}
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand font-bold">50+</span>
          </div>
        </article>
      </section>

      <section className="page-x bg-white section-y">
        <h2 className="font-serif text-4xl font-bold md:text-5xl">A clearer way forward.</h2>
        <div className="mt-9 overflow-x-auto rounded-xl border border-slate-200">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-ink font-bold text-white">
              <div className="p-5">Experience</div>
              <div className="bg-brand p-5">CallLawya</div>
              <div className="p-5">Traditional Law Firms</div>
            </div>
            {COMPARISON.map((row, index) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1.4fr_1fr_1fr] ${index % 2 === 1 ? "bg-slate-50" : ""} ${
                  index < COMPARISON.length - 1 ? "border-b border-slate-200" : ""
                }`}
              >
                <div className="p-5 font-semibold">{row.label}</div>
                <div className="p-5 font-bold text-brand">{row.us}</div>
                <div className="p-5 text-slate-500">{row.them}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x pb-12 lg:pb-14">
        <div className="flex flex-col gap-6 rounded-xl bg-brand p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="font-serif text-4xl font-bold">Legal access starts here.</h2>
            <p className="mt-2 text-white/70">Find the right lawyer for your situation today.</p>
          </div>
          <Link href={ROUTES.lawyers} className="press self-start rounded-md bg-black px-8 py-4 font-bold md:self-auto">
            Find a Lawyer <Icon icon={faArrowRight} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
