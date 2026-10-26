import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  updated: string;
  sections: LegalSection[];
  current: "privacy" | "terms" | "security";
};

const LEGAL_LINKS = [
  { key: "privacy", label: "Privacy Policy", href: ROUTES.privacy },
  { key: "terms", label: "Terms of Use", href: ROUTES.terms },
  { key: "security", label: "Security", href: ROUTES.security },
] as const;

export default function LegalDocument({ eyebrow, title, intro, updated, sections, current }: LegalDocumentProps) {
  return (
    <div className="bg-white">
      <section className="page-x bg-ink section-y text-white">
        <p className="eyebrow text-brand-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-serif text-[40px] font-bold leading-none sm:text-5xl md:text-6xl">{title}</h1>
        <div className="mt-6 max-w-3xl text-lg leading-8 text-white/65">{intro}</div>
        <p className="mt-6 text-sm font-semibold text-white/45">Last updated: {updated}</p>
      </section>

      <section className="page-x section-y">
        <div className="grid gap-10 lg:grid-cols-[250px_1fr] lg:gap-16">
          <aside className="h-fit lg:sticky lg:top-[110px]">
            <p className="text-xs font-bold tracking-widest text-slate-500">ON THIS PAGE</p>
            <nav aria-label={`${title} sections`} className="mt-4 border-l-2 border-slate-200">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-sm text-slate-600 transition hover:border-brand hover:text-brand"
                >
                  {index + 1}. {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="legal-prose max-w-3xl">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28 border-b border-slate-200 pb-10 pt-2 last:border-b-0 [&+section]:mt-10">
                <h2 className="font-serif text-2xl font-bold text-navy md:text-3xl">
                  <span className="mr-2 text-brand">{index + 1}.</span>
                  {section.title}
                </h2>
                {section.body}
              </section>
            ))}
          </article>
        </div>
      </section>

      <section className="page-x pb-12 lg:pb-14">
        <div className="grid gap-4 rounded-xl bg-paper p-6 md:grid-cols-4 md:p-8">
          {LEGAL_LINKS.filter((link) => link.key !== current).map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4 font-bold transition hover:border-brand hover:text-brand"
            >
              {link.label} <Icon icon={ArrowRightIcon} />
            </Link>
          ))}
          <Link
            href={ROUTES.contact}
            className="flex items-center justify-between rounded-lg bg-brand px-5 py-4 font-bold text-white hover:bg-brand-hover md:col-span-2"
          >
            Questions? Contact our team <Icon icon={ArrowRightIcon} />
          </Link>
        </div>
      </section>
    </div>
  );
}
