import { notFound } from "next/navigation";

// The News page is hidden for now and returns "page not found".
// To restore it, delete NewsPage below and uncomment the original page underneath.
export default function NewsPage() {
  notFound();
}

/*
import type { Metadata } from "next";
import Image from "next/image";
import {
  courtCorridor,
  lawyerMan1,
  lawyerWoman1,
  lawyerWoman2,
  legalConsultation,
  officeCity,
  teamPhoto,
} from "@/assets/images";
import { NewsletterForm } from "./components";
import { Icon } from "@/components/common";
import { HouseIcon, LaptopIcon } from "@/assets/icons";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Legal News & Guides",
  description:
    "Practical legal guides and news on property, family, business, employment and your rights from the CallLawya Newsroom.",
  path: ROUTES.news,
});

const CATEGORIES = ["All", "Land & Property", "Family Law", "Criminal", "Business", "Human Rights", "Tech & IP"];

const SIDE_STORIES = [
  { category: "HUMAN RIGHTS", title: "Why plain-language legal guidance matters more than ever", readTime: 5 },
  { category: "BUSINESS", title: "Cross-border founders face a maze of compliance questions", readTime: 6 },
  { category: "FAMILY LAW", title: "Five questions to ask before choosing a family lawyer", readTime: 4 },
];

const TRENDING = [
  "Know your rights during a landlord dispute",
  "How business registration differs across markets",
  "What makes a contract enforceable?",
  "A first-time founder's legal checklist",
];

const ANALYSIS = [
  {
    image: lawyerWoman2,
    alt: "Legal analyst",
    category: "OPINION",
    title: "Technology won't replace lawyers — but accessible lawyers will transform justice",
  },
  {
    image: teamPhoto,
    alt: "Legal technology team",
    category: "SPECIAL REPORT",
    title: "Inside the teams building Africa's next legal infrastructure",
  },
  {
    image: officeCity,
    alt: "African business district",
    category: "BUSINESS",
    title: "Why legal certainty is a growth strategy for African cities",
  },
];

const TOP_LAWYERS = [
  { image: lawyerWoman1, name: "Amara Okoye", detail: "Property Law · Nigeria", rating: "4.9" },
  { image: lawyerMan1, name: "Kwame Mensah", detail: "Business Law · Ghana", rating: "4.8" },
];

const storyHover = "group";
const zoomOnHover = "transition duration-500 group-hover:scale-[1.03]";

export default function NewsPage() {
  return (
    <div className="bg-white">
      <div className="page-x flex min-h-[38px] items-center gap-5 bg-brand py-2 text-sm text-white">
        <span className="shrink-0 bg-white px-2 py-1 text-[10px] font-bold text-brand">BREAKING</span>
        <strong>Africa&apos;s digital legal services enter a new era of cross-border access</strong>
        <span className="hidden text-white/70 md:inline">Updated 12 minutes ago</span>
      </div>

      <section className="page-x pb-5 pt-10">
        <div className="flex flex-col gap-3 border-b-4 border-black pb-5 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-[40px] sm:text-5xl font-bold md:text-6xl">CallLawya Newsroom</h1>
          <p className="text-sm text-slate-500">Reporting on law, rights and access across Africa</p>
        </div>
        <nav className="flex overflow-x-auto border-b border-slate-300 [scrollbar-width:none]" aria-label="News categories">
          {CATEGORIES.map((category, index) => (
            <span
              key={category}
              className={`shrink-0 px-6 py-4 ${index === 0 ? "bg-black font-bold text-white" : "font-semibold"}`}
            >
              {category}
            </span>
          ))}
        </nav>
      </section>

      <section className="page-x py-7">
        <div className="grid gap-7 border-b border-black pb-8 lg:grid-cols-[1.55fr_.8fr]">
          <article className={`${storyHover} grid gap-6 md:grid-cols-[1.25fr_.75fr]`}>
            <div className="overflow-hidden">
              <Image
                src={legalConsultation}
                alt="African lawyers consulting"
                className={`h-[300px] w-full object-cover md:h-[470px] ${zoomOnHover}`}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
                placeholder="blur"
                preload
              />
            </div>
            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-bold tracking-widest text-brand">LEGAL ACCESS</p>
                <h2 className="mt-3 font-serif text-4xl font-bold leading-[1.05] group-hover:text-brand lg:text-[44px]">
                  The new digital front door to justice across Africa
                </h2>
                <p className="mt-5 text-lg leading-7 text-slate-600">
                  A growing network of verified professionals is changing where — and how quickly — people find legal
                  help.
                </p>
              </div>
              <div>
                <p className="font-bold">By CallLawya News Desk</p>
                <p className="mt-1 text-sm text-slate-500">8 min read · Today</p>
              </div>
            </div>
          </article>
          <div className="space-y-6 lg:border-l lg:border-slate-300 lg:pl-7">
            {SIDE_STORIES.map((story, index) => (
              <article
                key={story.title}
                className={`group ${index < SIDE_STORIES.length - 1 ? "border-b border-slate-300 pb-6" : ""}`}
              >
                <p className="text-xs font-bold text-brand">{story.category}</p>
                <h3 className="mt-2 font-serif text-2xl font-bold group-hover:text-brand">{story.title}</h3>
                <p className="mt-3 text-sm text-slate-500">{story.readTime} min read</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x py-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_310px]">
          <article className={`${storyHover} border-t-4 border-black pt-4`}>
            <div className="overflow-hidden">
              <Image
                src={courtCorridor}
                alt="Lawyers at courthouse"
                className={`h-48 w-full object-cover ${zoomOnHover}`}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                placeholder="blur"
              />
            </div>
            <p className="mt-4 text-xs font-bold text-brand">CRIMINAL LAW</p>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight group-hover:text-brand">
              What happens after an arrest? A practical guide to your first 24 hours
            </h3>
            <p className="mt-3 text-sm text-slate-500">7 min read</p>
          </article>
          <article className="group border-t-4 border-black pt-4">
            <div className="flex h-48 items-end bg-navy p-6 text-white">
              <Icon icon={HouseIcon} strokeWidth={1.25} className="text-6xl text-brand-light" />
            </div>
            <p className="mt-4 text-xs font-bold text-brand">LAND & PROPERTY</p>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight group-hover:text-brand">
              The documents that can save a property buyer from years of dispute
            </h3>
            <p className="mt-3 text-sm text-slate-500">6 min read</p>
          </article>
          <article className="group border-t-4 border-black pt-4">
            <div className="flex h-48 items-end bg-brand p-6 text-white">
              <Icon icon={LaptopIcon} strokeWidth={1.25} className="text-6xl" />
            </div>
            <p className="mt-4 text-xs font-bold text-brand">TECH & IP</p>
            <h3 className="mt-2 font-serif text-2xl font-bold leading-tight group-hover:text-brand">
              Creators are learning to protect the value behind their ideas
            </h3>
            <p className="mt-3 text-sm text-slate-500">5 min read</p>
          </article>
          <aside className="border-t-4 border-brand bg-paper p-5">
            <h2 className="font-serif text-2xl font-bold">Trending now</h2>
            <ol className="mt-5">
              {TRENDING.map((title, index) => (
                <li key={title} className="grid grid-cols-[34px_1fr] gap-2 border-t border-slate-300 py-4">
                  <strong className="font-serif text-2xl text-brand">{index + 1}</strong>
                  <span className="text-sm font-bold">{title}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="page-x bg-ink py-10 text-white">
        <div className="mb-8 border-t border-white/30 pt-5">
          <h2 className="font-serif text-4xl font-bold">Analysis & insight</h2>
        </div>
        <div className="grid gap-7 md:grid-cols-3">
          {ANALYSIS.map((story) => (
            <article key={story.title} className={storyHover}>
              <div className="overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.alt}
                  className={`h-56 w-full object-cover ${zoomOnHover}`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  placeholder="blur"
                />
              </div>
              <p className="mt-4 text-xs font-bold text-brand-light">{story.category}</p>
              <h3 className="mt-2 font-serif text-2xl font-bold group-hover:text-brand-light">{story.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x bg-white py-10 lg:py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="border-t-4 border-black pt-4">
              <h2 className="font-serif text-4xl font-bold">More top stories</h2>
            </div>
            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <article className="border-b border-slate-300 pb-6">
                <p className="text-xs font-bold text-brand">FAMILY LAW</p>
                <h3 className="mt-2 font-serif text-2xl font-bold">Planning an estate is not only for the wealthy</h3>
                <p className="mt-3 text-slate-500">A practical starting point for families.</p>
              </article>
              <article className="border-b border-slate-300 pb-6">
                <p className="text-xs font-bold text-brand">EMPLOYMENT</p>
                <h3 className="mt-2 font-serif text-2xl font-bold">
                  Understanding your employment contract before signing
                </h3>
                <p className="mt-3 text-slate-500">The clauses that deserve a closer look.</p>
              </article>
            </div>
          </div>
          <aside className="bg-brand-mist p-6">
            <p className="text-xs font-bold text-brand">TOP LAWYERS OF THE WEEK</p>
            {TOP_LAWYERS.map((lawyer, index) => (
              <div key={lawyer.name} className={`flex gap-4 ${index === 0 ? "mt-6" : "mt-5"}`}>
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="h-16 w-16 rounded-full object-cover"
                  sizes="64px"
                />
                <div>
                  <h3 className="font-bold">{lawyer.name}</h3>
                  <p className="text-sm text-slate-500">{lawyer.detail}</p>
                  <p className="mt-1 text-sm font-bold">{lawyer.rating} ★</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="page-x pb-10 lg:pb-12">
        <div className="grid grid-cols-1 items-center gap-8 bg-brand p-8 text-white md:p-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-serif text-4xl font-bold">The legal briefing, every week.</h2>
            <p className="mt-2 text-white/70">Practical rights, major developments and expert perspectives.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
*/
