import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { IconComponent } from "@/assets/icons";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  CalendarCheckIcon,
  CheckIcon,
  FileSearchIcon,
  FolderKanbanIcon,
  InfoIcon,
  MessagesSquareIcon,
  ReceiptTextIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@/assets/icons";
import { legalConsultation } from "@/assets/images";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Features",
  description:
    "Verified lawyers, consultation booking, Lex AI, document review, digital consultations and case management — practical legal support tools in one place.",
  path: ROUTES.features,
});

type Tone = "mist" | "ink" | "brand";

type Feature = {
  id: string;
  name: string;
  title: string;
  icon: IconComponent;
  paragraphs: string[];
  listIntro?: string;
  list?: string[];
  note?: string;
  tone: Tone;
  panelLabel: string;
  panelTitle: string;
};

const FEATURES: Feature[] = [
  {
    id: "verified-lawyers",
    name: "Verified Legal Professionals",
    title: "Know Who You Are Connecting With.",
    icon: BadgeCheckIcon,
    paragraphs: [
      "Choosing a lawyer requires confidence in their qualifications and professional background.",
      "CallLawya's lawyer verification process is designed to check relevant professional identity and licensing information before eligible profiles are activated.",
      "Explore lawyer profiles to learn about their experience, areas of practice and professional background before deciding whom to contact.",
    ],
    tone: "mist",
    panelLabel: "PROFILE CHECKS",
    panelTitle: "Identity and licensing reviewed before activation.",
  },
  {
    id: "consultation-booking",
    name: "Consultation Booking",
    title: "Book a Legal Consultation Without the Unnecessary Back-and-Forth.",
    icon: CalendarCheckIcon,
    paragraphs: [
      "Finding a suitable time to speak with a lawyer should be straightforward.",
      "Browse available appointment slots, choose your preferred time and complete the booking process through the platform.",
      "Whether you need an initial discussion or want to arrange a follow-up, the aim is to make accessing legal professionals more convenient.",
    ],
    tone: "ink",
    panelLabel: "SCHEDULING",
    panelTitle: "Pick a slot. Confirm. Talk.",
  },
  {
    id: "lex-ai",
    name: "Lex AI",
    title: "Meet Lex AI: A Smarter Starting Point for Legal Questions.",
    icon: SparklesIcon,
    paragraphs: [
      "Legal language can be difficult to understand, particularly when you are already dealing with a stressful situation.",
      "Lex AI is designed to help users explore legal information, organise their thoughts and better understand the questions they may need to ask.",
    ],
    listIntro: "Use Lex AI to:",
    list: [
      "Explore general legal information.",
      "Summarise or clarify unfamiliar legal terminology.",
      "Organise the facts of a situation.",
      "Prepare questions for a consultation.",
      "Identify issues that may require professional legal attention.",
    ],
    note: "Lex AI is intended to support access to legal information, not replace a qualified lawyer. Its responses may require verification, particularly where the law depends on your location or the specific facts of your case.",
    tone: "brand",
    panelLabel: "LEX AI",
    panelTitle: "A starting point for your legal questions.",
  },
  {
    id: "document-review",
    name: "Legal Document Review",
    title: "Understand the Document Before You Sign.",
    icon: FileSearchIcon,
    paragraphs: [
      "Contracts and other legal documents can contain obligations, conditions and risks that are easy to overlook.",
      "CallLawya's document-review tools are intended to help users examine documents, understand important clauses and identify questions that may need further attention.",
    ],
    listIntro: "Potential uses include:",
    list: [
      "Reviewing rental and tenancy agreements.",
      "Understanding employment contracts.",
      "Examining business agreements.",
      "Identifying important dates, obligations and termination provisions.",
      "Preparing questions for a lawyer.",
    ],
    note: "AI-assisted document review is preliminary assistance. It is not a substitute for a lawyer's review, particularly for high-value transactions, litigation or legally binding decisions.",
    tone: "mist",
    panelLabel: "DOCUMENT REVIEW",
    panelTitle: "Clauses, dates and obligations, highlighted.",
  },
  {
    id: "digital-consultations",
    name: "Digital Consultations",
    title: "Speak to a Lawyer in a Way That Works for You.",
    icon: MessagesSquareIcon,
    paragraphs: [
      "Connect with legal professionals through the consultation formats supported by CallLawya.",
      "Depending on the service available, users can choose voice calls or chat to discuss their concerns.",
      "Digital consultations can make it easier to seek guidance without always needing to arrange an in-person meeting.",
    ],
    tone: "ink",
    panelLabel: "CALL · CHAT",
    panelTitle: "Legal guidance without the commute.",
  },
  {
    id: "case-management",
    name: "Case Management",
    title: "Keep Your Legal Matters Organised.",
    icon: FolderKanbanIcon,
    paragraphs: [
      "When dealing with a legal issue, it can be difficult to keep track of conversations, documents, appointments and next steps.",
      "CallLawya's case-management experience is designed to help users organise their legal matters in one place.",
    ],
    listIntro: "Depending on the functionality enabled, this may include:",
    list: [
      "Viewing active and completed matters.",
      "Tracking case progress and status updates.",
      "Keeping relevant documents organised.",
      "Reviewing upcoming consultations.",
      "Following up on agreed next steps.",
    ],
    note: "Case-management tools help organise information but do not guarantee the outcome or resolution time of a legal matter.",
    tone: "brand",
    panelLabel: "CASE MANAGEMENT",
    panelTitle: "Every matter and next step in one place.",
  },
  {
    id: "transparent-pricing",
    name: "Transparent Consultation Options",
    title: "Understand the Cost Before You Commit.",
    icon: ReceiptTextIcon,
    paragraphs: [
      "Legal costs are an important consideration when choosing professional support.",
      "CallLawya aims to make consultation information clearer by presenting relevant fees and service details before users commit to a booking.",
      "Review the consultation price, format and scope of service so you can make a more informed decision.",
    ],
    tone: "mist",
    panelLabel: "BEFORE YOU BOOK",
    panelTitle: "Price, format and scope, upfront.",
  },
  {
    id: "secure-communication",
    name: "Secure Communication",
    title: "Your Legal Conversations Deserve Care.",
    icon: ShieldCheckIcon,
    paragraphs: [
      "Legal matters can involve personal, financial or commercially sensitive information.",
      "Our commitment is to make privacy and security an essential part of the user experience.",
    ],
    tone: "ink",
    panelLabel: "PRIVACY",
    panelTitle: "Care for every conversation.",
  },
];

const PANEL_TONES: Record<Tone, { panel: string; tile: string; label: string; title: string }> = {
  mist: { panel: "bg-brand-mist", tile: "bg-white text-brand shadow-sm", label: "text-brand", title: "text-navy" },
  ink: { panel: "bg-ink", tile: "bg-white/10 text-gold", label: "text-white/50", title: "text-white" },
  brand: { panel: "bg-brand", tile: "bg-white/15 text-white", label: "text-white/70", title: "text-white" },
};

function FeaturePanel({ feature }: { feature: Feature }) {
  const tone = PANEL_TONES[feature.tone];
  return (
    <div className={cn("flex min-h-[260px] flex-col justify-between rounded-xl p-8 md:min-h-[320px]", tone.panel)}>
      <Icon icon={feature.icon} className={cn("h-16 w-16 rounded-2xl p-3.5", tone.tile)} />
      <div>
        <p className={cn("text-xs font-bold tracking-widest", tone.label)}>{feature.panelLabel}</p>
        <p className={cn("mt-2 font-serif text-3xl font-bold leading-tight md:text-4xl", tone.title)}>
          {feature.panelTitle}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div className="bg-white">
      <section className="page-x bg-ink section-y text-white lg:min-h-[610px]">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-brand-light">One platform. Every legal step.</p>
            <h1 className="mt-5 font-serif text-[40px] font-bold leading-none sm:text-5xl md:text-6xl xl:text-[66px]">
              Everything You Need to Take the Next Legal Step.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65 md:text-xl">
              From finding a lawyer to understanding documents and managing consultations, CallLawya brings practical
              legal support tools together in one place.
            </p>
            <a
              href="#tools"
              className="press mt-9 inline-block rounded-md bg-brand px-8 py-4 text-lg font-bold hover:bg-brand-hover"
            >
              Explore the features <Icon icon={ArrowDownIcon} className="ml-2" />
            </a>
          </div>
          <div className="relative mb-7 h-[320px] md:h-[430px] lg:mb-0">
            <Image
              src={legalConsultation}
              alt="Legal professionals in a consultation"
              className="h-full w-full rounded-xl object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
              placeholder="blur"
              preload
            />
            <div className="absolute -bottom-7 left-4 w-64 border-t-4 border-gold bg-white p-6 text-navy shadow-xl lg:-left-7">
              <p className="font-serif text-3xl font-bold">{FEATURES.length} core tools</p>
              <p className="mt-1 text-sm text-slate-500">One connected legal journey</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tools" className="page-x section-y">
        <div className="flex flex-col gap-4 border-t-4 border-black pt-5 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Practical tools for every step.</h2>
          <p className="max-w-md text-slate-600">
            Find the right professional, prepare with confidence and keep your legal matters on track.
          </p>
        </div>
        <nav aria-label="Features on this page" className="mt-8 flex flex-wrap gap-2">
          {FEATURES.map((feature) => (
            <a
              key={feature.id}
              href={`#${feature.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
            >
              <Icon icon={feature.icon} className="text-brand" />
              {feature.name}
            </a>
          ))}
        </nav>

        <div className="mt-10 border-y border-slate-200">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.id}
              id={feature.id}
              className={cn(
                "grid items-center gap-10 border-b border-slate-200 py-10 last:border-b-0 lg:gap-16 lg:py-12",
                index % 2 === 0 ? "lg:grid-cols-[.8fr_1.2fr]" : "lg:grid-cols-[1.2fr_.8fr]",
              )}
            >
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <FeaturePanel feature={feature} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand">
                  {String(index + 1).padStart(2, "0")} / {feature.name}
                </span>
                <h3 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">{feature.title}</h3>
                <div className="mt-4 space-y-4 text-lg leading-8 text-slate-600">
                  {feature.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {feature.list && (
                  <>
                    <p className="mt-6 font-bold">{feature.listIntro}</p>
                    <ul className="mt-3 grid gap-3 text-slate-700 sm:grid-cols-2">
                      {feature.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Icon icon={CheckIcon} className="mt-1 text-brand" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {feature.note && (
                  <p className="mt-6 flex gap-3 rounded-lg border border-slate-200 bg-paper p-4 text-sm leading-6 text-slate-600">
                    <Icon icon={InfoIcon} className="mt-0.5 text-base text-brand" />
                    <span>{feature.note}</span>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x pb-12 lg:pb-14">
        <div className="flex flex-col gap-8 rounded-xl bg-brand p-8 text-white md:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-bold md:text-5xl">Legal Assistance. Anywhere. Anytime.</h2>
            <p className="mt-4 text-lg leading-8 text-white/75">
              Explore CallLawya and discover a more convenient way to find legal professionals, prepare for
              consultations and organise your legal journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={ROUTES.lawyers} className="press rounded-md bg-black px-8 py-4 font-bold">
              Find a Lawyer <Icon icon={ArrowRightIcon} className="ml-2" />
            </Link>
            <Link href={ROUTES.download} className="press rounded-md border border-white px-8 py-4 font-bold">
              Get the app
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
