import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AccessibilityIcon,
  ArrowRightIcon,
  BriefcaseIcon,
  EyeIcon,
  FileTextIcon,
  HeartHandshakeIcon,
  HouseIcon,
  LandmarkIcon,
  LightbulbIcon,
  ScaleIcon,
  ShieldCheckIcon,
  StoreIcon,
  UsersIcon,
} from "@/assets/icons";
import { officeCity, teamPhoto } from "@/assets/images";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { TeamMemberCard } from "./components";
import { TEAM } from "./team";

export const metadata: Metadata = pageMetadata({
  title: "About CallLawya",
  description:
    "CallLawya uses technology to make discovering and connecting with legal professionals more accessible for individuals, families and businesses in Nigeria.",
  path: ROUTES.about,
});

const MISSION = [
  "For many people, the challenge begins before they even speak to a lawyer. They may not know whom to contact, how to compare professionals, what questions to ask or how much a consultation might cost.",
  "For small businesses and entrepreneurs, accessing the right legal expertise can be an important part of protecting their work and making informed decisions.",
  "CallLawya uses technology to make the process of discovering and connecting with legal professionals more accessible.",
  "Our goal is to help individuals, families and businesses move from uncertainty towards a clearer understanding of their options.",
];

const PROBLEMS = [
  { icon: HouseIcon, title: "A property disagreement", text: "can put a family's investment at risk." },
  { icon: FileTextIcon, title: "An unclear contract", text: "can create problems for a growing business." },
  { icon: BriefcaseIcon, title: "An employment dispute", text: "can leave someone uncertain about their rights." },
];

const VALUES = [
  {
    icon: AccessibilityIcon,
    title: "Access",
    text: "We believe people should have clearer pathways to finding appropriate legal support, regardless of whether they are individuals, families or business owners.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Trust",
    text: "We recognise the importance of professional qualifications, honest information and responsible handling of user data.",
  },
  {
    icon: EyeIcon,
    title: "Clarity",
    text: "We communicate in language people can understand, helping users navigate unfamiliar legal processes with greater confidence.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "Dignity",
    text: "Every legal concern deserves to be treated respectfully. We aim to provide an approachable experience without judgement or unnecessary complexity.",
  },
  {
    icon: LightbulbIcon,
    title: "Responsible Innovation",
    text: "We use technology to improve access and convenience while recognising the importance of professional legal judgement, accountability and user protection.",
    accent: true,
  },
];

const AUDIENCES = [
  {
    icon: UsersIcon,
    title: "For Individuals and Families",
    text: "A more approachable starting point for finding help with personal legal concerns.",
  },
  {
    icon: StoreIcon,
    title: "For Entrepreneurs and Small Businesses",
    text: "A way to discover legal professionals who can help with contracts, business relationships, intellectual property and other commercial needs.",
  },
  {
    icon: ScaleIcon,
    title: "For Lawyers",
    text: "A digital platform to present professional expertise and connect with potential clients.",
  },
  {
    icon: LandmarkIcon,
    title: "For the Wider Legal Community",
    text: "An opportunity to support responsible innovation that improves the way people discover and access legal services.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="page-x bg-black section-y text-white lg:min-h-[640px]">
        <div className="grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr]">
          <div>
            <p className="eyebrow text-brand-light">Our mission</p>
            <h1 className="mt-5 font-serif text-[40px] font-bold leading-[.98] sm:text-5xl md:text-6xl xl:text-[72px]">
              Making Legal Support Easier to Access.
            </h1>
            <p className="mt-7 text-lg leading-8 text-white/65 md:text-xl">
              CallLawya was created around a simple belief: finding legal help should not be an overwhelming
              experience.
            </p>
          </div>
          <div className="relative">
            <Image
              src={teamPhoto}
              alt="The CallLawya team at work"
              className="h-[340px] w-full object-cover md:h-[470px]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              placeholder="blur"
              preload
            />
            <div className="absolute bottom-0 left-0 w-72 bg-brand p-6">
              <p className="font-serif text-3xl font-bold">Starting in Nigeria.</p>
              <p className="mt-2 text-white/75">
                Built around the needs of people and businesses looking for legal support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x section-y">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand">Why CallLawya exists</p>
            <p className="mt-4 border-l-4 border-gold pl-5 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Finding legal help should not be an overwhelming experience.
            </p>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-600">
            {MISSION.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="border-t-4 border-black pt-5">
          <p className="eyebrow text-brand">The problem we are solving</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl font-bold leading-tight md:text-5xl">
            Legal Problems Are Difficult Enough Without a Complicated Search for Help.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem) => (
            <article key={problem.title} className="rounded-xl border border-slate-200 bg-white p-7">
              <Icon icon={problem.icon} className="h-12 w-12 rounded-xl bg-brand-mist p-2.5 text-brand" />
              <p className="mt-6 text-lg leading-7 text-slate-600">
                <strong className="text-navy">{problem.title}</strong> {problem.text}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 text-lg leading-8 text-slate-600 lg:grid-cols-2 lg:gap-12">
          <p>
            In these situations, people need a practical way to find appropriate professional support. CallLawya aims
            to reduce the friction involved in finding lawyers, arranging consultations and preparing for legal
            discussions.
          </p>
          <p className="font-serif text-2xl leading-9 text-navy">
            We are not here to make legal matters appear simple when they are not. We are here to make accessing the
            right support easier.
          </p>
        </div>
      </section>

      <section className="page-x section-y">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Image
            src={officeCity}
            alt="A modern business district"
            className="h-[320px] w-full rounded-xl object-cover md:h-[470px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
          />
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">OUR VISION</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              A Future Where Finding Legal Help Is No Longer a Barrier.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We envision a future in which individuals and businesses can more easily discover qualified legal
              professionals, understand their options and seek support when it matters.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Through technology, professional collaboration and a user-focused approach, CallLawya aims to contribute
              to a more accessible legal services ecosystem, starting with the needs of people and businesses in
              Nigeria.
            </p>
          </div>
        </div>
      </section>

      <section className="page-x section-y bg-ink text-white">
        <div className="mb-10 flex flex-col gap-4 border-t border-white/30 pt-5 md:flex-row md:justify-between">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Our values.</h2>
          <p className="max-w-md text-white/50">The principles that shape how we build CallLawya and serve our users.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-5">
          {VALUES.map((value) => (
            <article
              key={value.title}
              className="lift w-full rounded-xl border border-white/15 bg-white/5 p-7 sm:w-[calc(50%-10px)] lg:w-[calc((100%-40px)/3)]"
            >
              <Icon
                icon={value.icon}
                className={`h-12 w-12 rounded-xl bg-white/10 p-2.5 ${value.accent ? "text-gold" : "text-brand-light"}`}
              />
              <h3 className="mt-8 text-xl font-bold">{value.title}</h3>
              <p className="mt-3 leading-7 text-white/60">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x section-y">
        <div className="mb-10 border-t-4 border-black pt-5">
          <p className="eyebrow text-brand">Who we serve</p>
          <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Built for everyone in the legal journey.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {AUDIENCES.map((audience) => (
            <article key={audience.title} className="lift rounded-xl border border-slate-200 bg-white p-7">
              <Icon icon={audience.icon} className="h-12 w-12 rounded-xl bg-brand-mist p-2.5 text-brand" />
              <h3 className="mt-8 text-xl font-bold">{audience.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{audience.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="mb-10 flex flex-col gap-4 border-t-4 border-black pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">THE PEOPLE</p>
            <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl">Building access together.</h2>
          </div>
          <p className="max-w-md text-slate-500">
            Legal, technology and operations professionals united by one mission.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="page-x flex flex-col gap-8 bg-brand section-y text-white lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">We Are Building a Better Starting Point for Legal Help.</h2>
          <p className="mt-4 text-lg leading-8 text-white/75">
            CallLawya&apos;s journey is about more than putting legal services online. It is about helping people find
            the support they need to make informed decisions.
          </p>
          <p className="mt-3 text-lg leading-8 text-white/75">
            Join us as we work towards a more accessible legal services experience.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link href={ROUTES.features} className="press rounded bg-black px-8 py-4 font-bold">
            Explore CallLawya <Icon icon={ArrowRightIcon} className="ml-2" />
          </Link>
          <Link
            href={`${ROUTES.contact}?subject=Partnerships`}
            className="press rounded border border-white px-8 py-4 font-bold hover:bg-white hover:text-brand"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
