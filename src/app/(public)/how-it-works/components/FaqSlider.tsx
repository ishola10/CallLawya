"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

type Faq = { question: string; answer: string };
type Panel = "clients" | "lawyers";

const LAWYER_FAQS_HASH = "#lawyer-faqs";

const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="border-t-2 border-black">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="group border-b border-slate-300 py-6" open={index === 0}>
          <summary className="flex cursor-pointer list-none justify-between gap-6 text-xl font-bold [&::-webkit-details-marker]:hidden">
            {faq.question}
            <Icon icon={PlusIcon} className="shrink-0 transition group-open:rotate-45" />
          </summary>
          <p className="mt-4 leading-7 text-slate-600 md:pr-16">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function FaqSlider({ clientFaqs, lawyerFaqs }: { clientFaqs: readonly Faq[]; lawyerFaqs: readonly Faq[] }) {
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "");
  // A button choice only sticks until the URL hash changes again (e.g. a "#lawyer-faqs" link is followed).
  const [choice, setChoice] = useState<{ panel: Panel; hash: string } | null>(null);
  const panel: Panel = choice && choice.hash === hash ? choice.panel : hash === LAWYER_FAQS_HASH ? "lawyers" : "clients";

  const show = (next: Panel) => setChoice({ panel: next, hash });

  const panelClass = (name: Panel) =>
    cn(
      "transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none",
      panel === name
        ? "relative translate-x-0 opacity-100"
        : cn("pointer-events-none absolute inset-x-0 top-0 opacity-0", name === "clients" ? "-translate-x-full" : "translate-x-full"),
    );

  return (
    <section id="faqs" className="page-x scroll-mt-24 bg-white section-y">
      <div id="lawyer-faqs" className="relative scroll-mt-24 overflow-hidden">
        <div className={panelClass("clients")} inert={panel !== "clients"} aria-hidden={panel !== "clients"}>
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold tracking-widest text-brand">COMMON QUESTIONS</p>
              <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Before you begin.</h2>
              <p className="mt-5 text-slate-600">Still unsure? Our support team is here to help.</p>
              <Link href={ROUTES.contact} className="mt-6 inline-block border-b-2 border-brand font-bold">
                Contact support
              </Link>
            </div>
            <FaqList faqs={clientFaqs} />
          </div>
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={() => show("lawyers")}
              className="press inline-flex items-center gap-2 rounded-md bg-ink px-7 py-4 font-bold text-white hover:bg-brand"
            >
              Questions from lawyers <Icon icon={ArrowRightIcon} />
            </button>
          </div>
        </div>

        <div className={panelClass("lawyers")} inert={panel !== "lawyers"} aria-hidden={panel !== "lawyers"}>
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
            <FaqList faqs={lawyerFaqs} />
          </div>
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              onClick={() => show("clients")}
              className="press inline-flex items-center gap-2 rounded-md border border-slate-300 px-7 py-4 font-bold hover:border-brand hover:text-brand"
            >
              <Icon icon={ArrowLeftIcon} /> Questions from clients
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
