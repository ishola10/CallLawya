import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  HeadsetIcon,
  HouseIcon,
  NewspaperIcon,
  ScaleIcon,
  SearchIcon,
  SparklesIcon,
  UserRoundCheckIcon,
} from "@/assets/icons";
import { Icon, SiteFooter, SiteHeader } from "@/components/common";
import { ROUTES } from "@/constants";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  { icon: ScaleIcon, title: "Find a lawyer", text: "Browse verified lawyers by practice area and location.", href: ROUTES.lawyers },
  { icon: SparklesIcon, title: "How it works", text: "See how consultations by call or chat work.", href: ROUTES.howItWorks },
  { icon: BriefcaseIcon, title: "For lawyers", text: "Grow your practice with a verified profile.", href: ROUTES.forLawyers },
  { icon: UserRoundCheckIcon, title: "Join as a lawyer", text: "Step-by-step sign-up in the CallLawya app.", href: ROUTES.joinAsLawyer },
  { icon: NewspaperIcon, title: "Legal news", text: "The latest legal stories from Africa and Europe.", href: ROUTES.news },
  { icon: HeadsetIcon, title: "Support", text: "Answers to common questions, or talk to our team.", href: ROUTES.support },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper text-navy">
      <SiteHeader />
      <main>
        <section className="page-x relative overflow-hidden bg-ink py-16 text-white lg:py-24">
          <span
            className="pointer-events-none absolute -right-6 -top-10 select-none font-serif text-[220px] font-bold leading-none text-white/[.04] sm:text-[320px] lg:text-[420px]"
            aria-hidden="true"
          >
            404
          </span>
          <div className="relative max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-10 bg-brand" />
              <span className="eyebrow text-brand-light">Error 404 · Page not found</span>
            </div>
            <h1 className="mt-6 font-serif text-[44px] font-bold leading-[1.02] tracking-[-.03em] sm:text-6xl md:text-7xl">
              This page has no case to answer.
            </h1>
            <p className="mt-6 max-w-xl border-l-2 border-gold pl-5 text-lg leading-8 text-white/70 md:text-xl">
              The page you&apos;re looking for may have moved, been removed or never existed. Let&apos;s get you back on
              track.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={ROUTES.home}
                className="press inline-flex items-center gap-2 rounded-md bg-brand px-7 py-4 font-bold hover:bg-brand-hover"
              >
                <Icon icon={HouseIcon} /> Back to home
              </Link>
              <Link
                href={ROUTES.lawyers}
                className="press inline-flex items-center gap-2 rounded-md border border-white/60 px-7 py-4 font-bold hover:bg-white hover:text-black"
              >
                Find a Lawyer <Icon icon={ArrowRightIcon} />
              </Link>
            </div>

            <form action={ROUTES.lawyers} method="get" role="search" className="mt-10 max-w-xl">
              <label htmlFor="not-found-search" className="text-sm font-semibold text-white/60">
                Looking for a lawyer? Search by name
              </label>
              <div className="mt-2 flex rounded-lg bg-white p-2 text-navy">
                <span className="flex items-center pl-3 text-brand">
                  <Icon icon={SearchIcon} />
                </span>
                <input
                  id="not-found-search"
                  name="name"
                  type="search"
                  placeholder="e.g. Adaeze"
                  className="min-w-0 flex-1 px-3 outline-none"
                />
                <button type="submit" className="press rounded-md bg-black px-5 py-3 text-sm font-bold text-white">
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="page-x section-y">
          <div className="border-t-4 border-black pt-5">
            <h2 className="font-serif text-3xl font-bold md:text-4xl">Popular places to start</h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="lift group flex gap-4 rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-brand"
              >
                <Icon icon={link.icon} className="h-11 w-11 shrink-0 rounded-lg bg-brand-mist p-2 text-brand" />
                <span>
                  <span className="flex items-center gap-2 text-lg font-bold group-hover:text-brand">
                    {link.title}
                    <Icon icon={ArrowRightIcon} className="text-sm transition group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-slate-500">{link.text}</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-sm text-slate-500">
            Think a link is broken?{" "}
            <Link href={ROUTES.contact} className="font-semibold text-brand hover:underline">
              Let us know
            </Link>{" "}
            and we&apos;ll fix it.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
