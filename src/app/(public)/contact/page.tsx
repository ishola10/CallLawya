import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lawyerWoman1, legalConsultation, officeCity } from "@/assets/images";
import { CONTACT_EMAILS, ROUTES, SOCIAL_LINKS } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/common";
import { ContactForm } from "./components";
import {
  ArrowRightIcon,
  DotIcon,
  HeadsetIcon,
  MailIcon,
  MapPinIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UserIcon,
} from "@/assets/icons";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Questions about CallLawya, lawyer onboarding, partnerships or support? Contact the CallLawya team and we will direct your message to the right person.",
  path: ROUTES.contact,
});

const CHANNELS = [
  { icon: HeadsetIcon, label: "CLIENT SUPPORT", email: CONTACT_EMAILS.support },
  { icon: ScaleIcon, label: "LAWYER PARTNERSHIPS", email: CONTACT_EMAILS.lawyers },
];

const HERO_FACTS = [
  { label: "Client support", value: "Bookings & payments" },
  { label: "Lawyer team", value: "Onboarding & payouts" },
  { label: "Partnerships", value: "Firms & organisations" },
];

const QUICK_HELP = [
  { icon: UserIcon, title: "For clients", text: "Matching, consultations and payments.", href: ROUTES.howItWorks },
  { icon: ScaleIcon, title: "For lawyers", text: "Verification, clients and earnings.", href: `${ROUTES.howItWorks}#lawyer-faqs` },
  { icon: ShieldCheckIcon, title: "Privacy & security", text: "How your information is protected.", href: `${ROUTES.features}#secure-communication` },
  { icon: SmartphoneIcon, title: "Using the app", text: "Downloads, access and troubleshooting.", href: ROUTES.download },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-x flex items-center overflow-hidden bg-ink py-12 text-white lg:min-h-[720px] lg:py-16">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[3px] w-10 bg-brand" />
              <span className="eyebrow text-brand-light">We&apos;re here to help</span>
            </div>
            <h1 className="font-serif text-[40px] font-bold leading-[1.02] tracking-[-.03em] sm:text-5xl md:text-6xl xl:text-[72px]">
              Let&apos;s start the right conversation.
            </h1>
            <p className="mt-7 max-w-[620px] border-l-2 border-gold pl-5 text-lg leading-8 text-white/75 md:text-xl">
              Questions about the platform, partnerships or support? Send a message and our team will direct it to the
              right person.
            </p>
            <p className="mt-5 max-w-[620px] leading-7 text-white/55 md:text-lg">
              Whether you need help with a booking, want to join as a lawyer or are exploring a partnership, you&apos;ll
              hear back from a real person on the CallLawya team.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="press inline-flex items-center gap-2 rounded-md bg-brand px-8 py-4 text-lg font-bold hover:bg-brand-hover"
              >
                Send a message <Icon icon={ArrowRightIcon} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAILS.support}`}
                className="press inline-flex items-center gap-2 rounded-md border border-white/60 px-8 py-4 text-lg font-bold hover:bg-white hover:text-black"
              >
                <Icon icon={MailIcon} /> Email support
              </a>
            </div>
            <dl className="mt-10 grid max-w-[620px] grid-cols-3 gap-4 border-t border-white/15 pt-6 text-sm">
              {HERO_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-white/50">{fact.label}</dt>
                  <dd className="mt-1 font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto h-[460px] w-full max-w-[520px] sm:h-[540px]">
            <div className="absolute inset-y-0 right-0 w-[82%] overflow-hidden rounded-[26px] border border-white/15">
              <Image
                src={legalConsultation}
                alt="A CallLawya team member helping a client"
                className="h-full w-full object-cover"
                sizes="(min-width: 640px) 970px, 830px"
                quality={85}
                placeholder="blur"
                preload
              />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-6 pb-20 text-right">
                <span className="bg-brand px-2 py-1 text-xs font-bold">REAL PEOPLE</span>
                <p className="ml-auto mt-3 max-w-[230px] font-serif text-xl leading-snug sm:text-2xl">
                  Every message is read by our team.
                </p>
              </div>
            </div>
            <div className="absolute left-0 top-[38%] w-[220px] -translate-y-1/2 rounded-xl border-t-4 border-brand bg-white p-4 text-navy shadow-2xl sm:w-[250px]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold tracking-wide text-slate-500">SUPPORT TEAM</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600">
                  <Icon icon={DotIcon} className="text-[8px]" /> Online
                </span>
              </div>
              <p className="mt-2 font-bold">Mon–Fri, 08:00–20:00 WAT</p>
              <p className="mt-1 text-xs text-slate-500">Saturday, 09:00–15:00 WAT</p>
            </div>
            <div className="absolute bottom-32 right-4 hidden w-[240px] rounded-xl bg-black/45 p-4 shadow-xl ring-1 ring-white/15 backdrop-blur-md sm:block">
              <div className="flex items-center gap-3">
                <Image
                  src={lawyerWoman1}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-white/30"
                  sizes="44px"
                  placeholder="blur"
                />
                <div className="min-w-0">
                  <p className="text-xs text-white/60">Lawyer partnerships</p>
                  <p className="truncate text-sm font-bold">{CONTACT_EMAILS.lawyers}</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-0 rounded-lg bg-gold px-5 py-4 text-black shadow-xl">
              <p className="text-xs font-bold tracking-wide">CLIENTS · LAWYERS · PARTNERS</p>
              <p className="mt-1 font-serif text-xl font-bold">One place to reach us</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="page-x scroll-mt-24 py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <ContactForm />
          <div className="space-y-6">
            <article className="rounded-xl bg-brand p-8 text-white">
              <p className="text-xs font-bold tracking-widest text-white/70">CONTACT INFORMATION</p>
              <h2 className="mt-3 font-serif text-3xl font-bold">Reach the right team.</h2>
              <div className="mt-7 space-y-6">
                {CHANNELS.map((channel) => (
                  <div key={channel.label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Icon icon={channel.icon} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs text-white/60">{channel.label}</p>
                      <a href={`mailto:${channel.email}`} className="break-words font-bold hover:underline">
                        {channel.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-5 border-t border-white/25 pt-6 text-xl">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`CallLawya on ${social.label}`}
                    className="hover:text-white/70"
                  >
                    <Icon icon={social.icon} />
                  </a>
                ))}
              </div>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-7">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-brand">SUPPORT HOURS</p>
                  <h3 className="mt-2 text-xl font-bold">We&apos;re online across time zones.</h3>
                </div>
                <span className="shrink-0 text-sm font-bold text-green-600">
                  <Icon icon={DotIcon} className="text-[8px]" /> Online
                </span>
              </div>
              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                <div className="bg-paper p-4">
                  <p className="text-slate-500">Monday–Friday</p>
                  <strong>08:00–20:00 WAT</strong>
                </div>
                <div className="bg-paper p-4">
                  <p className="text-slate-500">Saturday</p>
                  <strong>09:00–15:00 WAT</strong>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-x pb-10 lg:pb-12">
        <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[1.4fr_.6fr]">
          <div className="relative h-[280px] md:h-[380px]">
            <Image
              src={officeCity}
              alt="CallLawya office location"
              className="h-full w-full object-cover grayscale-[30%]"
              sizes="(min-width: 1024px) 65vw, 100vw"
              placeholder="blur"
            />
            <div className="absolute inset-0 bg-navy/25" />
            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-8 border-white/40 bg-brand bg-clip-padding text-white">
              <Icon icon={MapPinIcon} className="text-2xl" />
            </div>
          </div>
          <div className="flex flex-col justify-center p-9">
            <p className="text-xs font-bold tracking-widest text-brand">OUR HUB</p>
            <h2 className="mt-3 font-serif text-3xl font-bold">Working across Nigeria, connected everywhere.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our distributed team collaborates across key Nigerian markets, supported by a central operations hub.
            </p>
          </div>
        </div>
      </section>

      <section className="page-x bg-white py-10 lg:py-12">
        <div className="mb-8 border-t-4 border-black pt-5">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Looking for a quick answer?</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_HELP.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-lg border border-slate-200 p-6 transition hover:border-brand"
            >
              <Icon icon={item.icon} className="h-11 w-11 rounded-lg bg-brand-mist p-2 text-brand" />
              <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{item.text}</p>
              <span className="mt-4 inline-block text-sm font-bold group-hover:text-brand">
                Explore <Icon icon={ArrowRightIcon} className="ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

    </>
  );
}
