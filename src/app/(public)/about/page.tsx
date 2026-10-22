import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  officeCity,
  teamAlexanderOmini,
  teamCyrilAndem,
  teamIfunanyaDike,
  teamJulietDike,
  teamPhoto,
} from "@/assets/images";
import { CountUp, Icon } from "@/components/common";
import { TeamMemberCard, type TeamMember } from "./components";
import { ROUTES } from "@/constants";
import { AccessibilityIcon, ArrowRightIcon, HeartHandshakeIcon, ShieldCheckIcon, TrendingUpIcon } from "@/assets/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "CallLawya exists to make qualified legal help easier to find, understand and afford — democratising Africa's legal system.",
};

const IMPACT = [
  { value: 10, suffix: "K+", label: "VERIFIED LAWYERS" },
  { value: 50, suffix: "+", label: "COUNTRIES" },
  { value: 500, suffix: "K+", label: "CASES RESOLVED" },
  { value: 4.9, decimals: 1, suffix: "★", label: "AVERAGE RATING" },
];

const VALUES = [
  { icon: AccessibilityIcon, title: "Access", text: "Legal support should meet people where they are." },
  { icon: ShieldCheckIcon, title: "Trust", text: "Verified professionals and protected conversations." },
  { icon: HeartHandshakeIcon, title: "Dignity", text: "Every person deserves respect and plain language." },
  {
    icon: TrendingUpIcon,
    title: "Progress",
    text: "Technology should move justice closer, not complicate it.",
    accent: true,
  },
];

const TEAM: TeamMember[] = [
  {
    image: teamCyrilAndem,
    imagePosition: "object-[50%_20%]",
    name: "Cyril Andem",
    role: "CEO & FOUNDER",
    credentials: null,
    bio: "Cyril founded CallLawya to make trusted legal help reachable for everyone, wherever they are. As CEO, he leads the company's vision, strategy and partnerships.",
  },
  {
    image: teamJulietDike,
    imagePosition: "object-[50%_25%]",
    name: "Juliet Dike",
    role: "CO-FOUNDER & COO",
    credentials: null,
    bio: "Juliet is a technology and operations professional with experience in project & product delivery, business operations, and digital innovation. As Co-Founder and COO of CallLawya, she drives operational strategy, platform development, and partnerships, helping make trusted legal services more accessible through technology. She is passionate about building practical, user-focused solutions that bridge the gap between people and legal support.",
  },
  {
    image: teamIfunanyaDike,
    imagePosition: "object-top",
    name: "Ifunanya Dike, Esq.",
    role: "BOARD MEMBER",
    credentials: "LLB",
    bio: "Ifunanya is a Nigerian-qualified Barrister and Solicitor with a UK Master’s degree in Intellectual Property and Information Technology Law. Her legal expertise encompasses contract drafting and review, legal research and advisory, and corporate and commercial documentation. Combining strong legal analytical skills with an international outlook, she is committed to delivering practical, commercially sound legal solutions that protect clients’ interests and support business growth. Through CallLawya, she aims to contribute to accessible, professional legal services for individuals, businesses, and organisations in Nigeria and internationally, particularly in corporate, commercial, and cross-border legal matters.",
  },
  {
    image: teamAlexanderOmini,
    imagePosition: "object-top",
    name: "Alexander Omini, Esq.",
    role: "BOARD MEMBER",
    credentials: "LLB, BL, FSS, USIP",
    bio: "Alexander supports the board with legal and governance expertise, helping CallLawya grow responsibly and keep trust at the centre of every consultation.",
  },
];

const MILESTONES = [
  { year: "2022", title: "The idea takes shape", text: "A simple question: why should finding a lawyer be so difficult?" },
  { year: "2023", title: "First verified network", text: "Lawyers join across early launch markets." },
  { year: "2025", title: "Africa-wide momentum", text: "Call, video and chat connect clients across borders." },
  { year: "2026", title: "The next chapter", text: "Scaling trusted access to every community.", accent: true },
];

const PRESS = ["AFRICA TECH", "LEGAL FUTURES", "THE CONTINENT", "FOUNDERS AFRICA"];

export default function AboutPage() {
  return (
    <div className="bg-white">
      <section className="page-x bg-black section-y text-white lg:min-h-[680px]">
        <div className="grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-brand-light">Our mission</p>
            <h1 className="mt-5 font-serif text-[40px] sm:text-5xl font-bold leading-[.98] md:text-6xl xl:text-[76px]">
              Democratising Africa&apos;s Legal System
            </h1>
            <p className="mt-7 text-lg leading-8 text-white/65 md:text-xl">
              We believe justice should not be a privilege. CallLawya exists to make qualified legal help easier to
              find, understand and afford — wherever you are.
            </p>
          </div>
          <div className="relative">
            <Image
              src={teamPhoto}
              alt="CallLawya team"
              className="h-[340px] w-full object-cover md:h-[490px]"
              sizes="(min-width: 1024px) 55vw, 100vw"
              placeholder="blur"
              preload
            />
            <div className="absolute bottom-0 left-0 w-72 bg-brand p-6">
              <p className="font-serif text-3xl font-bold">Built in Africa.</p>
              <p className="mt-2 text-white/70">
                Designed for the realities of people and professionals across the continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x bg-brand py-10 text-white">
        <div className="grid grid-cols-2 gap-y-8 lg:grid-cols-4 lg:divide-x lg:divide-white/25">
          {IMPACT.map((stat) => (
            <div key={stat.label} className="px-4 lg:px-8">
              <strong className="font-serif text-4xl md:text-5xl">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </strong>
              <p className="mt-2 text-xs tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-x section-y">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow text-brand">Why we started</p>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Too many people face legal problems alone.</h2>
          </div>
          <div className="text-lg leading-9 text-slate-600 md:text-xl">
            <p>
              Across Africa, physical distance, unclear costs and a shortage of trusted information can turn a solvable
              legal issue into a lasting crisis.
            </p>
            <p className="mt-7">
              CallLawya closes that gap. We connect people with thoroughly vetted lawyers by call, video or chat — and
              help professionals extend their reach beyond physical offices. The result is a legal system that feels
              closer, faster and more human.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="border-t-4 border-brand pt-4">
                <h3 className="text-xl font-bold text-navy">For clients</h3>
                <p className="mt-2 text-base leading-7">Clarity, choice and secure access to help.</p>
              </div>
              <div className="border-t-4 border-gold pt-4">
                <h3 className="text-xl font-bold text-navy">For lawyers</h3>
                <p className="mt-2 text-base leading-7">More reach, meaningful work and sustainable growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Image
            src={officeCity}
            alt="Modern African city"
            className="h-[320px] w-full rounded-xl object-cover md:h-[470px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
          />
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">OUR VISION</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
              A continent where legal rights travel farther than geography.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              We see legal access as infrastructure: essential to safe homes, growing businesses, protected ideas and
              fair treatment. Our vision is to become the trusted legal connection layer for Africa.
            </p>
            <blockquote className="mt-8 border-l-4 border-gold pl-6 font-serif text-2xl italic">
              “Justice becomes real when people can reach it.”
            </blockquote>
          </div>
        </div>
      </section>

      <section className="page-x bg-ink section-y text-white">
        <div className="mb-10 flex flex-col gap-4 border-t border-white/30 pt-5 md:flex-row md:justify-between">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">What guides us.</h2>
          <p className="max-w-md text-white/50">Trust is earned in every match, every message and every outcome.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <article key={value.title} className="lift rounded-xl border border-white/15 bg-white/5 p-7">
              <Icon icon={value.icon} className={`h-12 w-12 rounded-xl bg-white/10 p-2.5 ${value.accent ? "text-gold" : "text-brand-light"}`} />
              <h3 className="mt-8 text-xl font-bold">{value.title}</h3>
              <p className="mt-3 leading-7 text-white/55">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x section-y">
        <div className="mb-10 flex flex-col gap-4 border-t-4 border-black pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand">THE PEOPLE</p>
            <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl">Building access together.</h2>
          </div>
          <p className="max-w-md text-slate-500">
            Legal thinkers, product builders and community advocates united by one mission.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TEAM.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <h2 className="font-serif text-4xl font-bold md:text-5xl">Milestones that matter.</h2>
        <div className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-0 md:before:absolute md:before:left-0 md:before:right-0 md:before:top-3 md:before:h-px md:before:bg-slate-300">
          {MILESTONES.map((milestone) => (
            <article key={milestone.year} className="relative md:pr-8">
              <span
                className={`block h-6 w-6 rounded-full border-4 border-paper ${milestone.accent ? "bg-gold" : "bg-brand"}`}
              />
              <p className="mt-6 font-bold text-brand">{milestone.year}</p>
              <h3 className="mt-2 text-xl font-bold">{milestone.title}</h3>
              <p className="mt-2 text-slate-500">{milestone.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x bg-white py-10 text-center">
        <p className="text-xs font-bold tracking-[.2em] text-slate-500">AS FEATURED IN</p>
        <div className="mt-8 flex flex-wrap justify-center gap-x-16 gap-y-4 text-xl font-bold text-slate-400 md:text-2xl">
          {PRESS.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      </section>

      <section className="page-x flex flex-col gap-8 bg-brand py-10 lg:py-12 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Help us move justice closer.</h2>
          <p className="mt-3 text-white/70">Join as a client, lawyer or partner.</p>
        </div>
        <Link href={ROUTES.lawyers} className="press self-start rounded bg-black px-8 py-4 font-bold lg:self-auto">
          Get started <Icon icon={ArrowRightIcon} className="ml-2" />
        </Link>
      </section>
    </div>
  );
}
