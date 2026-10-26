import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  ArrowLeftIcon,
  DotIcon,
  CircleCheckIcon,
  MessageCircleIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StarIcon,
  VideoIcon,
} from "@/assets/icons";
import { Icon, JsonLd, StoreButton } from "@/components/common";
import { BookButton, LawyerAvatar, LawyerFee, LawyerRating } from "@/components/lawyers";
import { ROUTES } from "@/constants";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { getLawyer } from "@/services/lawyers";

export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const loadLawyer = cache(async (id: string) => (UUID_PATTERN.test(id) ? getLawyer(id) : null));

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const lawyer = await loadLawyer(id);
  if (!lawyer) return { title: "Lawyer not found", robots: { index: false, follow: true } };
  const practice = lawyer.expertiseAreas.slice(0, 2).join(" & ") || "Lawyer";
  const place = lawyer.location ? ` in ${lawyer.location}` : "";
  return pageMetadata({
    title: `${lawyer.name} — ${practice}${place}`,
    description: truncate(
      lawyer.bio
        ? `${lawyer.bio} Book a consultation with ${lawyer.name} on CallLawya.`
        : `Book a consultation with ${lawyer.name}, a verified lawyer${place}, on CallLawya.`,
      158,
    ),
    path: `${ROUTES.lawyers}/${id}`,
  });
}

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;
}

function lawyerStructuredData(lawyer: NonNullable<Awaited<ReturnType<typeof loadLawyer>>>) {
  const url = absoluteUrl(`${ROUTES.lawyers}/${lawyer.id}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url,
      mainEntity: {
        "@type": "Person",
        name: lawyer.name,
        jobTitle: "Lawyer",
        url,
        ...(lawyer.avatar ? { image: lawyer.avatar } : {}),
        ...(lawyer.bio ? { description: lawyer.bio } : {}),
        ...(lawyer.expertiseAreas.length ? { knowsAbout: lawyer.expertiseAreas } : {}),
        ...(lawyer.location
          ? { address: { "@type": "PostalAddress", addressLocality: lawyer.location, addressCountry: "NG" } }
          : {}),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Lawyers", item: absoluteUrl(ROUTES.lawyers) },
        { "@type": "ListItem", position: 3, name: lawyer.name, item: url },
      ],
    },
  ];
}

const reviewDate = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

export default async function LawyerProfilePage({ params }: PageProps) {
  const lawyer = await loadLawyer((await params).id);
  if (!lawyer) notFound();

  const writtenReviews = lawyer.reviews.filter((review) => review.comment);

  return (
    <div className="bg-paper">
      <JsonLd data={lawyerStructuredData(lawyer)} />
      <section className="page-x bg-ink pb-12 pt-8 text-white lg:pb-14">
        <Link href={ROUTES.lawyers} className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white">
          <Icon icon={ArrowLeftIcon} /> All lawyers
        </Link>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <LawyerAvatar
            src={lawyer.avatar}
            name={lawyer.name}
            initials={lawyer.initials}
            className="h-40 w-40 rounded-2xl border border-white/15 md:h-48 md:w-48"
            initialsClassName="text-5xl"
            sizes="192px"
            preload
          />
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
              <span className="rounded-full bg-brand px-3 py-1">
                <Icon icon={CircleCheckIcon} className="mr-1.5" /> VERIFIED LAWYER
              </span>
              {lawyer.isAvailable && (
                <span className="rounded-full bg-white px-3 py-1 text-brand">
                  <Icon icon={DotIcon} className="mr-1.5 text-[7px] text-green-500" /> AVAILABLE NOW
                </span>
              )}
            </div>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">{lawyer.name}</h1>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-white/70">
              {lawyer.location && (
                <span>
                  <Icon icon={MapPinIcon} className="mr-2 text-brand-light" />
                  {lawyer.location}
                </span>
              )}
              <LawyerRating lawyer={lawyer} className="text-white/80" />
              {lawyer.sessionsCount > 0 && (
                <span>
                  {lawyer.sessionsCount} consultation{lawyer.sessionsCount === 1 ? "" : "s"}
                </span>
              )}
              {lawyer.yearOfCall && <span>Called to the Bar {lawyer.yearOfCall}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="page-x section-y">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="space-y-8">
            <article className="rounded-xl border border-slate-200 bg-white p-7 md:p-9">
              <p className="eyebrow text-brand">About</p>
              <p className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-600">
                {lawyer.bio ?? `${lawyer.name} is a verified lawyer on CallLawya.`}
              </p>
              {lawyer.expertiseAreas.length > 0 && (
                <>
                  <h2 className="mt-8 font-bold">Areas of practice</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {lawyer.expertiseAreas.map((area) => (
                      <li key={area}>
                        <Link
                          href={`${ROUTES.lawyers}?expertise=${encodeURIComponent(area)}#results`}
                          className="inline-block rounded-full border border-brand/30 bg-brand-mist px-4 py-2 text-sm font-semibold text-brand"
                        >
                          {area}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-7 md:p-9">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="eyebrow text-brand">Client reviews</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold">
                    {lawyer.rating !== null ? (
                      <>
                        {lawyer.rating.toFixed(1)} <Icon icon={StarIcon} className="fill-current text-gold" />
                      </>
                    ) : (
                      "No ratings yet"
                    )}
                  </h2>
                </div>
                {lawyer.reviewCount > 0 && (
                  <p className="text-sm text-slate-500">
                    Based on {lawyer.reviewCount} rating{lawyer.reviewCount === 1 ? "" : "s"}
                  </p>
                )}
              </div>
              {writtenReviews.length > 0 ? (
                <ul className="mt-6 divide-y divide-slate-200 border-t border-slate-200">
                  {writtenReviews.map((review) => (
                    <li key={review.id} className="py-5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gold" aria-label={`${review.rating} out of 5`}>
                          {"★".repeat(Math.round(review.rating))}
                          <span className="text-slate-200">{"★".repeat(5 - Math.round(review.rating))}</span>
                        </span>
                        <span className="text-slate-400">{reviewDate.format(new Date(review.createdAt))}</span>
                      </div>
                      <p className="mt-3 leading-7 text-slate-600">“{review.comment}”</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">VERIFIED CLIENT</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-slate-500">
                  {lawyer.reviewCount > 0
                    ? "Clients have rated this lawyer but haven't left written reviews yet."
                    : "Be one of the first clients to consult and rate this lawyer."}
                </p>
              )}
            </article>
          </div>

          <aside className="h-fit space-y-5 lg:sticky lg:top-[105px]">
            <div className="rounded-xl border-t-4 border-brand bg-white p-7 shadow-sm">
              <p className="text-xs font-bold tracking-widest text-slate-500">CONSULTATION FEE</p>
              <div className="mt-2 text-2xl">
                <LawyerFee fee={lawyer.fee} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
                {[
                  { icon: PhoneIcon, label: "Call" },
                  { icon: VideoIcon, label: "Video" },
                  { icon: MessageCircleIcon, label: "Chat" },
                ].map((mode) => (
                  <div key={mode.label} className="rounded bg-paper py-4">
                    <Icon icon={mode.icon} className="text-lg text-brand" />
                    <p className="mt-2">{mode.label}</p>
                  </div>
                ))}
              </div>
              <BookButton className="press mt-6 block w-full rounded-md bg-brand py-4 text-center text-lg font-bold text-white hover:bg-brand-hover">
                Book {lawyer.name.split(" ")[0]}
              </BookButton>
              <p className="mt-6 text-sm text-slate-500">Bookings happen in the CallLawya app. Get it here:</p>
              <div className="mt-3 grid gap-3">
                <StoreButton store="googlePlay" className="justify-center" />
                <StoreButton store="appStore" className="justify-center" />
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-navy p-6 text-white">
              <Icon icon={ShieldCheckIcon} className="mt-1 text-2xl text-brand-light" />
              <p className="text-sm leading-6 text-white/70">
                Every CallLawya lawyer is identity- and licence-checked. Consultations are private and encrypted.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
