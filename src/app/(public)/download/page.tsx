import type { Metadata } from "next";
import Image from "next/image";
import { appScreen, lawyerMan1, lawyerWoman1, logo } from "@/assets/images";
import { Icon, JsonLd, StoreButton } from "@/components/common";
import { ArrowRightIcon, BellIcon, CircleCheckIcon, FileLockIcon, PhoneIcon, MessageCircleIcon, ShieldCheckIcon, StarIcon, WalletIcon, ZapIcon } from "@/assets/icons";
import { QR_APP_STORE, QR_GOOGLE_PLAY, type QrCode } from "@/assets/qr-codes";
import { ROUTES, STORE_LINKS } from "@/constants";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Download the CallLawya App",
  description:
    "Download CallLawya for Android and iOS. Find verified Nigerian lawyers, compare consultation fees and connect by call or chat.",
  path: ROUTES.download,
});

const APP_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: SITE_NAME,
  operatingSystem: "ANDROID, IOS",
  applicationCategory: "BusinessApplication",
  description: "Find verified lawyers, book consultations and connect by call or chat.",
  url: `${SITE_URL}${ROUTES.download}`,
  downloadUrl: [STORE_LINKS.googlePlay, STORE_LINKS.appStore],
  offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const BENEFITS = [
  { icon: ZapIcon, title: "Instant Matching", text: "See relevant, available lawyers based on your legal issue." },
  { icon: MessageCircleIcon, title: "Call or Chat", text: "Choose the consultation format that works for you." },
  { icon: WalletIcon, title: "Clear Pricing", text: "Understand consultation prices before you connect." },
  {
    icon: FileLockIcon,
    title: "Secure Files",
    text: "Keep documents and next steps together in one protected place.",
    accent: true,
  },
];

const REVIEWS = [
  {
    quote: "I spoke to a property lawyer the same afternoon. The process was clear from the start.",
    author: "Chidinma, Lagos",
  },
  {
    quote: "The pricing was visible and the lawyer explained everything without jargon.",
    author: "Kojo, Accra",
  },
  {
    quote: "As a lawyer, CallLawya helps me serve people I would never meet through my office alone.",
    author: "Nandi, Cape Town",
  },
];

const SHOWCASE_POINTS = [
  "Profiles verified before activation",
  "Specializations that match your issue",
  "Real-time availability indicators",
];

const QR_CODES = [
  { label: "Android", store: "Google Play", href: STORE_LINKS.googlePlay, code: QR_GOOGLE_PLAY },
  { label: "iPhone", store: "the App Store", href: STORE_LINKS.appStore, code: QR_APP_STORE },
];

function QrCodeImage({ code, label }: { code: QrCode; label: string }) {
  return (
    <svg
      viewBox={`-2 -2 ${code.size + 4} ${code.size + 4}`}
      className="h-36 w-36 sm:h-40 sm:w-40"
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      <rect x={-2} y={-2} width={code.size + 4} height={code.size + 4} fill="#fff" />
      <path d={code.path} stroke="#000" />
    </svg>
  );
}

const PHONE = "absolute overflow-hidden border-[#20242B] bg-black shadow-[0_35px_70px_rgba(0,0,0,.45)]";

function Notch() {
  return (
    <div className="flex h-7 justify-center bg-black">
      <span className="h-4 w-20 rounded-b-xl bg-[#20242B]" />
    </div>
  );
}

export default function DownloadPage() {
  return (
    <div className="bg-black text-white">
      <JsonLd data={APP_STRUCTURED_DATA} />
      <section className="page-x relative overflow-hidden bg-[#050A12] lg:min-h-[814px]">
        <div className="absolute inset-y-0 right-0 hidden w-[47%] bg-brand lg:block" />
        <div className="relative grid items-center gap-10 lg:min-h-[814px] lg:grid-cols-[.9fr_1.1fr]">
          <div className="py-12 lg:py-16">
            <p className="eyebrow text-brand-light">Legal access. In your pocket.</p>
            <h1 className="mt-5 font-serif text-[40px] sm:text-5xl font-bold leading-[.96] md:text-6xl xl:text-[76px]">
              Your lawyer is closer than you think.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65 md:text-xl">
              Find verified lawyers, compare transparent pricing and connect securely by call or chat — wherever
              life happens.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <StoreButton store="googlePlay" variant="light" className="min-w-[185px]" />
              <StoreButton store="appStore" variant="light" className="min-w-[185px]" />
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }, (_, index) => (
                  <Icon key={index} icon={StarIcon} className="fill-current" />
                ))}
              </div>
              <span className="text-sm text-white/55">
                <strong className="text-white">4.9</strong> average rating
              </span>
            </div>
          </div>

          <div className="relative hidden h-[700px] lg:block">
            <div className={`${PHONE} left-0 top-24 h-[550px] w-[270px] -rotate-[7deg] rounded-[42px] border-[8px] lg:left-16`}>
              <Notch />
              <div className="h-full bg-paper px-5 pt-5 text-navy">
                <div className="flex items-center justify-between">
                  <Image src={logo} alt="CallLawya" className="h-auto w-24 rounded bg-black px-2 py-1" />
                  <Icon icon={BellIcon} />
                </div>
                <p className="mt-6 text-xs text-slate-500">Good morning</p>
                <h3 className="font-serif text-2xl font-bold">How can we help?</h3>
                <div className="mt-5 rounded-xl bg-brand p-4 text-white">
                  <p className="text-xs text-white/60">START HERE</p>
                  <strong>Describe your legal issue</strong>
                  <div className="mt-4 flex items-center justify-between rounded bg-white/15 px-3 py-2 text-xs">
                    Property dispute <Icon icon={ArrowRightIcon} />
                  </div>
                </div>
                <p className="mt-6 text-xs font-bold">Available lawyers</p>
                <div className="mt-3 flex gap-3 rounded-lg bg-white p-3 shadow-sm">
                  <Image
                    src={lawyerWoman1}
                    alt="Lawyer"
                    className="h-12 w-12 rounded-full object-cover"
                    sizes="48px"
                  />
                  <div>
                    <strong className="text-sm">Amara Okoye</strong>
                    <p className="text-[10px] text-slate-500">Property Law · 4.9 ★</p>
                    <span className="text-[9px] font-bold text-green-600">AVAILABLE NOW</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${PHONE} right-0 top-2 h-[590px] w-[290px] rotate-6 rounded-[44px] border-[8px]`}>
              <Notch />
              <div className="relative h-full">
                <Image
                  src={appScreen}
                  alt="CallLawya app"
                  className="h-full w-full object-cover object-top"
                  sizes="290px"
                  placeholder="blur"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-5 pb-12">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <Icon icon={PhoneIcon} />
                  </span>
                  <p className="mt-3 text-xs text-white/70">Secure consultation in progress</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-20 left-0 rounded-lg bg-gold px-5 py-4 font-bold text-black shadow-xl">
              <Icon icon={ShieldCheckIcon} className="mr-2" /> Private & encrypted
            </div>
          </div>
        </div>
      </section>

      <section className="page-x bg-white section-y text-navy">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand">Built for real moments</p>
          <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Everything you need to move forward.</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <article
              key={benefit.title}
              className={`border-t-4 bg-paper p-7 ${benefit.accent ? "border-gold" : "border-brand"}`}
            >
              <Icon icon={benefit.icon} className="h-12 w-12 rounded-xl bg-white p-2.5 text-brand shadow-sm" />
              <h3 className="mt-7 text-xl font-bold">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x bg-paper section-y text-navy">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative h-[520px] overflow-hidden rounded-xl bg-brand">
            <div className="absolute left-1/2 top-16 h-[500px] w-[245px] -translate-x-1/2 overflow-hidden rounded-[38px] border-[7px] border-[#20242B] bg-black">
              <div className="h-full bg-white p-5 pt-8 text-navy">
                <p className="text-xs text-slate-500">YOUR MATCH</p>
                <Image
                  src={lawyerMan1}
                  alt="Matched lawyer"
                  className="mx-auto mt-5 h-28 w-28 rounded-full object-cover"
                  sizes="112px"
                />
                <h3 className="mt-4 text-center font-serif text-2xl font-bold">Kwame Mensah</h3>
                <p className="text-center text-xs font-bold text-brand">BUSINESS LAW</p>
                <div className="mt-5 flex justify-center gap-3">
                  <span className="rounded bg-paper px-3 py-2 text-xs">4.8 ★</span>
                  <span className="rounded bg-paper px-3 py-2 text-xs">12 yrs</span>
                </div>
                <div className="mt-6 w-full rounded bg-brand py-3 text-center font-bold text-white">Connect now</div>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow text-brand">Right expertise, right now</p>
            <h2 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">Compare. Choose. Connect.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              View verified credentials, relevant expertise, ratings, languages, availability and price — then choose
              with confidence.
            </p>
            <ul className="mt-7 space-y-4 font-semibold">
              {SHOWCASE_POINTS.map((point) => (
                <li key={point}>
                  <Icon icon={CircleCheckIcon} className="mr-3 text-brand" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-x bg-ink section-y">
        <div className="flex flex-col gap-6 border-t border-white/30 pt-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-widest text-brand-light">APP STORE REVIEWS</p>
            <h2 className="mt-2 font-serif text-4xl font-bold md:text-5xl">Trusted when it matters.</h2>
          </div>
          <div className="md:text-right">
            <strong className="font-serif text-5xl">4.9</strong>
            <div className="mt-1 text-gold">★★★★★</div>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <article key={review.author} className="rounded-xl border border-white/15 bg-white/5 p-7">
              <div className="text-gold">★★★★★</div>
              <blockquote className="mt-6 font-serif text-2xl leading-9">“{review.quote}”</blockquote>
              <p className="mt-7 text-sm text-white/45">— {review.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-x bg-white section-y text-navy">
        <div className="grid items-center gap-12 rounded-xl bg-brand-mist p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <p className="eyebrow text-brand">Download CallLawya</p>
            <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">Scan. Install. Get legal help.</h2>
            <p className="mt-4 text-lg text-slate-600">
              Point your phone camera at the code for your phone, or choose your app store.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <StoreButton store="googlePlay" compact />
              <StoreButton store="appStore" compact />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-self-start lg:justify-self-auto">
            {QR_CODES.map((qr) => (
              <a
                key={qr.label}
                href={qr.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white p-4 shadow-lg transition hover:shadow-xl"
              >
                <QrCodeImage code={qr.code} label={`QR code to download CallLawya on ${qr.store}`} />
                <p className="mt-2 text-center text-xs font-bold tracking-wide">SCAN FOR {qr.label.toUpperCase()}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
