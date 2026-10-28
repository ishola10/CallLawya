import Image from "next/image";
import Link from "next/link";
import { lawyerWoman1 } from "@/assets/images";
// Used by the hidden news section: import { courtCorridor, legalConsultation } from "@/assets/images";
// Used by the hidden news section: import { LandmarkIcon } from "@/assets/icons";
import { CountUp, Icon, StoreButton } from "@/components/common";
import { LawyerAvatar } from "@/components/lawyers";
import { ROUTES } from "@/constants";
import { getLawyerStats, getTopLawyers } from "@/services/lawyers";
import { ArrowRightIcon, BriefcaseIcon, CalendarCheckIcon, ChartLineIcon, FileSearchIcon, LockIcon, ScaleIcon, SearchIcon, SmartphoneIcon, SparklesIcon, UserCheckIcon } from "@/assets/icons";
// Used by the hidden partners section: import { Building2Icon, GavelIcon, GlobeIcon, HandshakeIcon, ShieldCheckIcon } from "@/assets/icons";

/* Partners section hidden until real partners are confirmed. Uncomment (with its section below) to restore it.
const PARTNERS = [
  { icon: ScaleIcon, name: "LexNigeria" },
  { icon: Building2Icon, name: "Nigerian Bar Forum" },
  { icon: GavelIcon, name: "Justice Hub" },
  { icon: GlobeIcon, name: "Ubuntu Rights" },
  { icon: HandshakeIcon, name: "Legal Aid Alliance" },
  { icon: ShieldCheckIcon, name: "TrustPay Nigeria" },
];
*/

const FEATURES = [
  {
    icon: SearchIcon,
    label: "FIND",
    title: "Find a Lawyer",
    text: "Discover lawyers by area of expertise, location, and other relevant criteria. Review available profiles and choose a professional suited to your legal needs.",
    href: ROUTES.lawyers,
    card: "bg-ink text-white",
    iconClass: "bg-white/10 text-gold",
    labelClass: "text-brand-light",
    textClass: "text-white/65",
  },
  {
    icon: CalendarCheckIcon,
    label: "BOOK",
    title: "Book a Consultation",
    text: "Arrange a consultation with a lawyer at a suitable time. Get the opportunity to explain your situation, ask questions, and understand your next steps.",
    href: `${ROUTES.features}#consultation-booking`,
    card: "bg-brand-mist",
    iconClass: "bg-white text-brand shadow-sm",
    labelClass: "text-brand",
    textClass: "text-slate-600",
  },
  {
    icon: SparklesIcon,
    label: "LEX AI",
    title: "Get Legal Guidance with Lex AI",
    text: "Use AI-assisted legal tools to help you understand legal information, organise your questions, and identify issues you may need to discuss with a lawyer.",
    href: `${ROUTES.features}#lex-ai`,
    card: "bg-brand text-white",
    iconClass: "bg-white/15 text-white",
    labelClass: "text-white/70",
    textClass: "text-white/75",
  },
  {
    icon: FileSearchIcon,
    label: "REVIEW",
    title: "Review Legal Documents",
    text: "Get assistance reviewing documents, identifying important clauses, and preparing questions for a qualified legal professional.",
    href: `${ROUTES.features}#document-review`,
    card: "border border-slate-200 bg-paper",
    iconClass: "bg-white text-brand shadow-sm",
    labelClass: "text-brand",
    textClass: "text-slate-600",
  },
];

const WHY_ITEMS = [
  {
    icon: UserCheckIcon,
    title: "Verified Lawyers",
    text: "Vetted and licensed professionals.",
    href: `${ROUTES.features}#verified-lawyers`,
  },
  { icon: SmartphoneIcon, title: "Mobile First", text: "Advice wherever life happens.", href: ROUTES.download },
  { icon: ChartLineIcon, title: "Expand Your Income", text: "Serve more clients across borders.", href: ROUTES.forLawyers },
  {
    icon: BriefcaseIcon,
    title: "Specialized Expertise",
    text: "Property, family, business, IP and more.",
    href: ROUTES.lawyers,
  },
];

const STEPS = [
  {
    title: "Describe Your Issue",
    text: "Tell us about your legal matter in plain language. No legal jargon required.",
  },
  {
    title: "Get Matched",
    text: "We match you with qualified lawyers who specialise in your exact need.",
  },
  {
    title: "Connect & Resolve",
    text: "Connect securely by call or chat and move forward with confidence.",
  },
];

export const revalidate = 300;

export default async function HomePage() {
  const [topLawyers, stats] = await Promise.all([
    getTopLawyers(4).catch(() => []),
    getLawyerStats().catch(() => null),
  ]);

  return (
    <>
      <Link
        href={ROUTES.lawyers}
        className="page-x flex min-h-[34px] items-center gap-4 bg-brand py-2 text-xs font-bold tracking-wide text-white"
      >
        <span className="shrink-0 bg-white px-2 py-1 text-brand">LEGAL ACCESS</span>
        <span>Now serving clients and lawyers across Nigeria — call or chat in minutes.</span>
        <Icon icon={ArrowRightIcon} className="ml-auto" />
      </Link>

      <section className="page-x overflow-hidden bg-black py-10 lg:py-12 text-white lg:min-h-[780px]">
        <div className="mx-auto grid max-w-[1296px] items-center gap-16 lg:grid-cols-[1.06fr_.94fr]">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-brand" />
              <span className="eyebrow text-brand-pale">Nigeria&apos;s legal access network</span>
            </div>
            <h1 className="mb-7 font-serif text-[40px] sm:text-5xl font-bold leading-[.98] tracking-[-.04em] md:text-6xl xl:text-[72px]">
              Legal Assistance.
              <br />
              <span className="text-[#2F7FFF]">Anywhere. Anytime.</span>
            </h1>
            <p className="max-w-[650px] border-l-2 border-gold pl-5 text-lg leading-8 text-white/75 md:text-xl">
              Finding the right lawyer should not be complicated. CallLawya helps you connect with legal professionals,
              book consultations and get support for the issues that matter to you.
            </p>
            <p className="mt-5 max-w-[650px] leading-7 text-white/55 md:text-lg">
              Whether you are dealing with a property dispute, starting a business, reviewing a contract or trying to
              understand your rights, CallLawya helps you take the next step with greater confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={ROUTES.lawyers}
                className="press rounded-md bg-brand px-8 py-4 text-lg font-bold hover:bg-brand-hover"
              >
                Find a Lawyer <Icon icon={ArrowRightIcon} className="ml-3" />
              </Link>
              <Link
                href={ROUTES.features}
                className="press rounded-md border border-white/60 px-8 py-4 text-lg font-bold hover:bg-white hover:text-black"
              >
                Explore CallLawya
              </Link>
            </div>
            <p className="mt-10 flex items-center gap-3 text-sm text-white/60">
              <span className="h-px w-8 shrink-0 bg-gold" />
              Your legal questions deserve clear answers and professional guidance.
            </p>
          </div>

          <div className="relative h-[520px] sm:h-[600px]">
            <div className="absolute right-0 top-2 h-[92%] w-[80%] max-w-[395px] overflow-hidden rounded-[26px] border border-white/15">
              <Image
                src={lawyerWoman1}
                alt="Verified Nigerian lawyer"
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 395px, 80vw"
                placeholder="blur"
                preload
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-7">
                <span className="bg-brand px-2 py-1 text-xs font-bold">VERIFIED LAWYER</span>
                <h3 className="mt-3 font-serif text-3xl">Counsel in your corner.</h3>
                <p className="mt-2 text-white/70">Speak privately by call or chat.</p>
              </div>
            </div>
            <div className="absolute left-0 top-[110px] w-[210px] rounded-xl sm:w-[245px] border-t-4 border-brand bg-white p-5 text-navy shadow-2xl">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-mist text-brand">
                  <Icon icon={ScaleIcon} />
                </span>
                <div>
                  <p className="text-xs text-slate-500">MATCH FOUND</p>
                  <p className="font-bold">Property Law</p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[88%] bg-brand" />
              </div>
              <p className="mt-2 text-xs text-slate-500">3 verified lawyers available now</p>
            </div>
            <div className="absolute bottom-8 left-0 rounded-lg bg-gold px-5 py-4 font-bold text-black shadow-xl sm:left-8">
              <Icon icon={LockIcon} className="mr-2" /> End-to-end encrypted
            </div>
          </div>
        </div>
      </section>

      {stats && stats.verifiedLawyers > 0 && (
        <section className="page-x border-b border-slate-200 bg-white">
          <div className="grid grid-cols-2 divide-x divide-slate-200 py-7">
            <div className="pr-4 lg:px-7">
              <strong className="font-serif text-3xl md:text-4xl">
                <CountUp value={stats.verifiedLawyers} />
              </strong>
              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">Verified Lawyers</p>
            </div>
            {stats.averageRating !== null && (
              <div className="pl-6 lg:px-7">
                <strong className="font-serif text-3xl md:text-4xl">
                  <CountUp value={stats.averageRating} decimals={1} />
                  <span className="text-gold">★</span>
                </strong>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                  Client Rating · {stats.ratingsCount.toLocaleString("en-US")} rating
                  {stats.ratingsCount === 1 ? "" : "s"}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Partners section hidden until real partners are confirmed. Uncomment (with PARTNERS above) to restore it.
      <section className="page-x border-b border-slate-200 bg-paper py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="shrink-0 lg:w-[240px]">
            <p className="eyebrow text-brand">Our partners</p>
            <p className="mt-2 font-serif text-xl font-bold leading-snug">
              Working with Nigeria&apos;s legal community.
            </p>
          </div>
          <ul data-reveal="whole" className="grid flex-1 grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-3 xl:grid-cols-6">
            {PARTNERS.map((partner) => (
              <li
                key={partner.name}
                className="group flex h-24 items-center justify-center gap-3 bg-white px-4 text-slate-400 transition-colors hover:text-navy"
              >
                <Icon icon={partner.icon} className="text-2xl transition-colors group-hover:text-brand" />
                <span className="font-serif text-lg font-bold leading-tight">{partner.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      */}

      <section className="page-x bg-white section-y">
        <div className="mb-10 grid gap-6 border-t-4 border-black pt-5 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Built for real life</p>
            <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl">Legal Support for Real-Life Situations</h2>
          </div>
          <div className="space-y-4 leading-7 text-slate-600">
            <p>
              Life can present legal challenges when you least expect them. You might need help recovering a debt,
              understanding an employment agreement, protecting your business, or resolving a family matter.
            </p>
            <p>
              CallLawya makes it easier to find legal professionals who understand your needs and can help you explore
              your options.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className={`lift group flex min-h-[340px] flex-col rounded-xl p-8 ${feature.card}`}
            >
              <Icon icon={feature.icon} className={`h-12 w-12 rounded-xl p-2.5 ${feature.iconClass}`} />
              <p className={`mt-10 text-xs font-bold tracking-widest ${feature.labelClass}`}>
                0{index + 1} / {feature.label}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-bold">{feature.title}</h3>
              <p className={`mt-4 leading-7 ${feature.textClass}`}>{feature.text}</p>
              <span className="mt-auto pt-6 text-sm font-bold">
                Learn more <Icon icon={ArrowRightIcon} className="ml-1 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-x bg-paper section-y">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Why CallLawya</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">
              One trusted network. Every kind of legal need.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              We are breaking down barriers to make legal representation accessible to everyone across Nigeria.
            </p>
          </div>
          <div data-reveal="whole" className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {WHY_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative block bg-white p-7 outline-none transition-colors duration-300 hover:bg-brand focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                <Icon
                  icon={item.icon}
                  className="h-11 w-11 rounded-lg bg-brand-mist p-2 text-brand transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
                />
                <Icon
                  icon={ArrowRightIcon}
                  className="absolute right-7 top-7 -translate-x-2 text-xl text-white opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                />
                <h3 className="mt-5 text-xl font-bold transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-slate-600 transition-colors duration-300 group-hover:text-white/80">
                  {item.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-x bg-ink section-y text-white">
        <div className="flex flex-col gap-4 border-t border-white/30 pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand-light">How it works</p>
            <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl">From question to counsel.</h2>
          </div>
          <p className="text-white/60">Getting legal help has never been easier.</p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <article
              key={step.title}
              className={`border-t-4 pt-6 ${index === STEPS.length - 1 ? "border-gold" : "border-brand"}`}
            >
              <span className="font-serif text-6xl text-white/20">0{index + 1}</span>
              <h3 className="mt-8 text-2xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-7 text-white/60">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {topLawyers.length > 0 && (
        <section className="page-x bg-white section-y">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-brand">Available now</p>
              <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl">Meet verified lawyers.</h2>
            </div>
            <Link href={ROUTES.lawyers} className="font-bold hover:text-brand">
              View directory <Icon icon={ArrowRightIcon} className="ml-2" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topLawyers.map((lawyer) => (
              <Link
                key={lawyer.id}
                href={`${ROUTES.lawyers}/${lawyer.id}`}
                className="lift block overflow-hidden rounded-xl border border-slate-200"
              >
                <LawyerAvatar
                  src={lawyer.avatar}
                  name={lawyer.name}
                  initials={lawyer.initials}
                  className="h-64 w-full"
                  initialsClassName="text-6xl"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-5">
                  <span className="line-clamp-1 text-xs font-bold uppercase text-brand">
                    {lawyer.expertiseAreas[0] ?? "General practice"}
                  </span>
                  <h3 className="mt-1 line-clamp-2 font-serif text-2xl font-bold leading-tight">{lawyer.name}</h3>
                  <p className="text-sm text-slate-500">
                    {lawyer.location}
                    {lawyer.rating !== null && ` · ${lawyer.rating.toFixed(1)} ★`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* News section hidden for now. Uncomment to restore it.
      <section className="page-x bg-paper section-y">
        <div className="mb-8 flex items-end justify-between border-t-4 border-black pt-5">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Latest Legal News</h2>
          <Link href={ROUTES.news} className="font-bold hover:text-brand">
            All stories
          </Link>
        </div>
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <Link href={ROUTES.news} className="group md:col-span-2 lg:col-span-1">
            <Image
              src={legalConsultation}
              alt="Legal professionals in consultation"
              className="h-[260px] w-full object-cover md:h-[330px]"
              sizes="(min-width: 1024px) 45vw, 100vw"
              placeholder="blur"
            />
            <p className="mt-4 text-xs font-bold text-brand">LEGAL ACCESS</p>
            <h3 className="mt-2 font-serif text-3xl font-bold leading-tight group-hover:text-brand">
              The digital shift reshaping how Nigerians find legal representation
            </h3>
          </Link>
          <Link href={ROUTES.news} className="group border-t border-black pt-4">
            <Image
              src={courtCorridor}
              alt="Lawyers at courthouse"
              className="h-44 w-full object-cover"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
              placeholder="blur"
            />
            <p className="mt-4 text-xs font-bold text-brand">HUMAN RIGHTS</p>
            <h3 className="mt-2 font-serif text-2xl font-bold group-hover:text-brand">
              What to know before your first legal consultation
            </h3>
          </Link>
          <Link href={ROUTES.news} className="group border-t border-black pt-4">
            <div className="flex h-44 items-end bg-navy p-6 text-white">
              <Icon icon={LandmarkIcon} strokeWidth={1.25} className="text-5xl text-brand-light" />
            </div>
            <p className="mt-4 text-xs font-bold text-brand">LAND & PROPERTY</p>
            <h3 className="mt-2 font-serif text-2xl font-bold group-hover:text-brand">
              Five documents that protect your property transaction
            </h3>
          </Link>
        </div>
      </section>
      */}

      <section className="page-x section-y">
        <div className="grid items-center gap-8 rounded-[20px] bg-brand p-8 text-white md:p-14 lg:grid-cols-[1.3fr_.7fr]">
          <div>
            <p className="eyebrow text-white/70">CallLawya in your pocket</p>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Justice should travel with you.</h2>
            <p className="mt-4 text-lg text-white/75">
              Download the app and reach a verified lawyer wherever you are.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <StoreButton store="googlePlay" />
            <StoreButton store="appStore" />
          </div>
        </div>
      </section>
    </>
  );
}
