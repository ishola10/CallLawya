import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { officeCity } from "@/assets/images";
import { CONTACT_EMAILS, ROUTES, SOCIAL_LINKS } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { Icon } from "@/components/common";
import { SupportChat } from "@/components/support";
import { ContactForm } from "./components";
import { ArrowRightIcon, DotIcon, HeadsetIcon, MapPinIcon, ScaleIcon, ShieldCheckIcon, SmartphoneIcon, UserIcon } from "@/assets/icons";

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

const QUICK_HELP = [
  { icon: UserIcon, title: "For clients", text: "Matching, consultations and payments.", href: ROUTES.howItWorks },
  { icon: ScaleIcon, title: "For lawyers", text: "Verification, clients and earnings.", href: ROUTES.forLawyers },
  { icon: ShieldCheckIcon, title: "Privacy & security", text: "How your information is protected.", href: `${ROUTES.features}#secure-communication` },
  { icon: SmartphoneIcon, title: "Using the app", text: "Downloads, access and troubleshooting.", href: ROUTES.download },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-x bg-ink py-10 lg:py-12 text-white">
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <p className="eyebrow text-brand-light">We&apos;re here to help</p>
            <h1 className="mt-4 font-serif text-[40px] sm:text-5xl font-bold leading-none md:text-6xl xl:text-[72px]">
              Let&apos;s start the right conversation.
            </h1>
          </div>
          <p className="pb-2 text-lg leading-8 text-white/60 md:text-xl">
            Questions about the platform, partnerships or support? Send a message and our team will direct it to the
            right person.
          </p>
        </div>
      </section>

      <section className="page-x py-10 lg:py-12">
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
            <h2 className="mt-3 font-serif text-3xl font-bold">Working across Africa, connected everywhere.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Our distributed team collaborates across key African markets, supported by a central operations hub.
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

      <SupportChat />
    </>
  );
}
