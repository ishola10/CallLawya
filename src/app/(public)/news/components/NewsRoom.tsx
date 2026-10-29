"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { courtCorridor, legalConsultation, officeCity } from "@/assets/images";
import { ArrowRightIcon, ExternalLinkIcon, InfoIcon, RefreshCwIcon, SearchIcon, TriangleAlertIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { REVEAL_REFRESH_EVENT } from "@/components/common/ScrollReveal";
import { LawyerAvatar } from "@/components/lawyers";
import { NEWS_REGIONS, NEWS_TOPICS, ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import type { LawyerSummary } from "@/types/lawyer";
import type { NewsArticle, NewsFeed, NewsRegion, NewsTopicId } from "@/types/news";
import NewsletterForm from "./NewsletterForm";

type TopicFilter = NewsTopicId | "all";
type RegionFilter = Exclude<NewsRegion, "international"> | "all";
type SortOrder = "latest" | "oldest";

const MORE_PAGE_SIZE = 8;
const TOPIC_LABELS = Object.fromEntries(NEWS_TOPICS.map((topic) => [topic.id, topic.label])) as Record<NewsTopicId, string>;
const REGION_LABELS: Record<NewsRegion, string> = { africa: "Africa", europe: "Europe", international: "International" };

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" });
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Lagos",
});

const FALLBACK_BY_TOPIC: Record<NewsTopicId, StaticImageData> = {
  "land-property": officeCity,
  family: legalConsultation,
  criminal: courtCorridor,
  business: officeCity,
  "human-rights": legalConsultation,
  "tech-ip": officeCity,
};
const FALLBACK_ROTATION = [courtCorridor, legalConsultation, officeCity];

const isTopic = (value: string | null): value is NewsTopicId => NEWS_TOPICS.some((topic) => topic.id === value);
const isRegion = (value: string | null): value is Exclude<NewsRegion, "international"> =>
  NEWS_REGIONS.some((region) => region.id === value);

/** Never present a guess as fact: weak keyword matches are labelled as such. */
function topicLabel(article: NewsArticle) {
  const [primary] = article.topics;
  if (!primary) return REGION_LABELS[article.region];
  return primary.confidence === "strong" ? TOPIC_LABELS[primary.id] : `May relate to ${TOPIC_LABELS[primary.id]}`;
}

/** Credits the outlet and, when different, the feed it reached us through (AllAfrica requires this). */
const via = (article: NewsArticle) => (article.publisher !== article.source.name ? ` via ${article.source.name}` : "");

function Byline({ article, className }: { article: NewsArticle; className?: string }) {
  return (
    <p className={cn("text-sm text-slate-500", className)}>
      <span className="font-semibold">{article.publisher}</span>
      {via(article)} · <time dateTime={article.publishedAt}>{dateFormat.format(new Date(article.publishedAt))}</time>
    </p>
  );
}

function StoryLink({ article, className, children }: { article: NewsArticle; className?: string; children: React.ReactNode }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer" className={cn("group block", className)}>
      {children}
      <span className="sr-only"> (opens the original article on {article.publisher} in a new tab)</span>
    </a>
  );
}

function StoryImage({
  article,
  index,
  className,
  sizes,
}: {
  article: NewsArticle;
  index: number;
  className: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);
  if (article.image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- remote image from a source whose terms allow it; not proxied
      <img
        src={article.image}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={cn("w-full object-cover transition duration-500 group-hover:scale-[1.03]", className)}
      />
    );
  }
  const primary = article.topics[0]?.id;
  const fallback = primary ? FALLBACK_BY_TOPIC[primary] : FALLBACK_ROTATION[index % FALLBACK_ROTATION.length];
  return (
    <Image
      src={fallback}
      alt=""
      sizes={sizes}
      placeholder="blur"
      className={cn("w-full object-cover transition duration-500 group-hover:scale-[1.03]", className)}
    />
  );
}

type NewsRoomProps = { feed: NewsFeed; topLawyers: LawyerSummary[] };

export default function NewsRoom({ feed, topLawyers }: NewsRoomProps) {
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [sort, setSort] = useState<SortOrder>("latest");
  const [moreCount, setMoreCount] = useState(MORE_PAGE_SIZE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hydrated) window.dispatchEvent(new Event(REVEAL_REFRESH_EVENT));
  }, [hydrated]);

  useEffect(() => {
    setHydrated(true);
    const params = new URLSearchParams(window.location.search);
    const fromUrl = { topic: params.get("topic"), region: params.get("region"), sort: params.get("sort") };
    if (isTopic(fromUrl.topic)) setTopic(fromUrl.topic);
    if (isRegion(fromUrl.region)) setRegion(fromUrl.region);
    if (fromUrl.sort === "oldest") setSort("oldest");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (topic !== "all") params.set("topic", topic);
    if (region !== "all") params.set("region", region);
    if (sort !== "latest") params.set("sort", sort);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [topic, region, sort]);

  const filtered = useMemo(() => {
    const matches = feed.articles.filter(
      (article) =>
        (topic === "all" || article.topics.some((match) => match.id === topic)) &&
        (region === "all" || article.region === region),
    );
    return sort === "oldest" ? [...matches].reverse() : matches;
  }, [feed.articles, topic, region, sort]);

  const update = (patch: Partial<{ topic: TopicFilter; region: RegionFilter; sort: SortOrder }>) => {
    if (patch.topic !== undefined) setTopic(patch.topic);
    if (patch.region !== undefined) setRegion(patch.region);
    if (patch.sort !== undefined) setSort(patch.sort);
    setMoreCount(MORE_PAGE_SIZE);
  };
  const resetFilters = () => update({ topic: "all", region: "all", sort: "latest" });

  const failedSources = feed.sources.filter((source) => !source.ok);
  const allFailed = feed.sources.length === 0 || failedSources.length === feed.sources.length;
  const newest = feed.articles[0];
  const [lead, ...rest] = filtered;
  const side = rest.slice(0, 3);
  const cards = rest.slice(3, 6);
  const headlines = rest.slice(6, 11);
  const featured = rest.slice(11, 14);
  const more = rest.slice(14);
  const regionLabel = region === "all" ? "all regions" : REGION_LABELS[region];

  return (
    <div className="bg-white" data-reveal-pending={hydrated ? undefined : ""}>
      <div className="page-x flex min-h-[38px] items-center gap-5 bg-brand py-2 text-sm text-white">
        <span className="shrink-0 bg-white px-2 py-1 text-[10px] font-bold text-brand">LATEST</span>
        {newest ? (
          <a href={newest.url} target="_blank" rel="noopener noreferrer" className="min-w-0 truncate font-bold hover:underline">
            {newest.title}
          </a>
        ) : (
          <strong>Legal news from Africa and Europe</strong>
        )}
        <span className="ml-auto hidden shrink-0 text-white/70 md:inline">
          Updated {timeFormat.format(new Date(feed.fetchedAt))} WAT
        </span>
      </div>

      <section className="page-x pb-5 pt-10">
        <div className="flex flex-col gap-3 border-b-4 border-black pb-5 md:flex-row md:items-end md:justify-between">
          <h1 className="font-serif text-[40px] font-bold sm:text-5xl md:text-6xl">CallLawya Newsroom</h1>
          <p className="text-sm text-slate-500">Legal news from trusted publishers across Africa and Europe</p>
        </div>

        <div className="flex flex-col gap-3 border-b border-slate-300 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter by topic"
            className="-mx-1 flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[{ id: "all" as const, label: "All" }, ...NEWS_TOPICS].map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={topic === item.id}
                onClick={() => update({ topic: item.id })}
                className={cn(
                  "shrink-0 px-5 py-4 text-sm transition md:px-6",
                  topic === item.id ? "bg-black font-bold text-white" : "font-semibold hover:text-brand",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 pb-3 lg:pb-0">
            <div role="group" aria-label="Filter by region" className="flex rounded-full border border-slate-300 p-1 text-sm">
              {[{ id: "all" as const, label: "All regions" }, ...NEWS_REGIONS].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={region === item.id}
                  onClick={() => update({ region: item.id })}
                  className={cn(
                    "rounded-full px-4 py-1.5 font-semibold transition",
                    region === item.id ? "bg-brand text-white" : "text-slate-600 hover:text-brand",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-600">Sort</span>
              <select
                value={sort}
                onChange={(event) => update({ sort: event.target.value as SortOrder })}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold"
              >
                <option value="latest">Latest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite">
            {allFailed ? "" : `${filtered.length} ${filtered.length === 1 ? "story" : "stories"} · ${regionLabel}`}
          </p>
          <p className="flex items-center gap-1.5">
            <Icon icon={InfoIcon} className="text-brand" />
            Topics are suggested automatically from publisher categories and keywords, so they may not always be exact.
          </p>
        </div>
      </section>

      {allFailed ? (
        <section className="page-x py-10">
          <div className="rounded-xl border border-dashed border-slate-300 bg-paper p-10 text-center md:p-14" role="alert">
            <Icon icon={TriangleAlertIcon} className="mx-auto h-14 w-14 rounded-2xl bg-white p-3 text-brand shadow-sm" />
            <h2 className="mt-5 font-serif text-3xl font-bold">We couldn&apos;t load the latest legal news.</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Our news sources didn&apos;t respond just now. Please try again in a few minutes.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="press mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover"
            >
              <Icon icon={RefreshCwIcon} /> Try again
            </button>
          </div>
        </section>
      ) : (
        <>
          {failedSources.length > 0 && (
            <div className="page-x">
              <p className="flex items-start gap-2 rounded-lg border border-gold/50 bg-gold/10 px-4 py-3 text-sm text-slate-700" role="status">
                <Icon icon={TriangleAlertIcon} className="mt-0.5 shrink-0 text-gold" />
                Some sources are temporarily unavailable ({failedSources.map((source) => source.credit.split(" — ")[0]).join(", ")}),
                so a few stories may be missing.
              </p>
            </div>
          )}

          {!lead ? (
            <section className="page-x py-10">
              <div className="rounded-xl border border-dashed border-slate-300 bg-paper p-10 text-center md:p-14">
                <Icon icon={SearchIcon} className="mx-auto h-14 w-14 rounded-2xl bg-white p-3 text-brand shadow-sm" />
                <h2 className="mt-5 font-serif text-3xl font-bold">No stories match these filters.</h2>
                <p className="mx-auto mt-2 max-w-md text-slate-500">Try another topic or region, or check back soon.</p>
                <button type="button" onClick={resetFilters} className="mt-5 font-bold text-brand hover:underline">
                  Show all stories
                </button>
              </div>
            </section>
          ) : (
            <>
              <section className="page-x py-7">
                <div
                  className={cn(
                    "grid gap-7 border-b border-black pb-8",
                    side.length > 0 && "lg:grid-cols-[1.55fr_.8fr]",
                  )}
                >
                  <article>
                    <StoryLink article={lead} className="grid gap-6 md:grid-cols-[1.25fr_.75fr]">
                      <div className="overflow-hidden">
                        <StoryImage
                          article={lead}
                          index={0}
                          className="h-[260px] md:h-[440px]"
                          sizes="(min-width: 1024px) 40vw, (min-width: 768px) 60vw, 100vw"
                        />
                      </div>
                      <div className="flex flex-col justify-between gap-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-brand">{topicLabel(lead)}</p>
                          <h2 className="mt-3 font-serif text-3xl font-bold leading-[1.1] group-hover:text-brand md:text-4xl lg:text-[40px]">
                            {lead.title}
                          </h2>
                          {lead.summary && <p className="mt-5 text-lg leading-7 text-slate-600">{lead.summary}</p>}
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <Byline article={lead} />
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-brand">
                            Read <Icon icon={ExternalLinkIcon} />
                          </span>
                        </div>
                      </div>
                    </StoryLink>
                  </article>
                  {side.length > 0 && (
                    <div className="space-y-6 lg:border-l lg:border-slate-300 lg:pl-7">
                      {side.map((story, index) => (
                        <article
                          key={story.id}
                          className={index < side.length - 1 ? "border-b border-slate-300 pb-6" : undefined}
                        >
                          <StoryLink article={story}>
                            <p className="text-xs font-bold uppercase text-brand">{topicLabel(story)}</p>
                            <h3 className="mt-2 font-serif text-2xl font-bold leading-snug group-hover:text-brand">
                              {story.title}
                            </h3>
                            <Byline article={story} className="mt-3" />
                          </StoryLink>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {(cards.length > 0 || headlines.length > 0) && (
                <section className="page-x py-10">
                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_310px]">
                    {cards.map((story, index) => (
                      <article key={story.id} className="border-t-4 border-black pt-4">
                        <StoryLink article={story}>
                          <div className="overflow-hidden">
                            <StoryImage
                              article={story}
                              index={index + 1}
                              className="h-48"
                              sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                            />
                          </div>
                          <p className="mt-4 text-xs font-bold uppercase text-brand">{topicLabel(story)}</p>
                          <h3 className="mt-2 font-serif text-2xl font-bold leading-tight group-hover:text-brand">
                            {story.title}
                          </h3>
                          {story.summary && <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{story.summary}</p>}
                          <Byline article={story} className="mt-3" />
                        </StoryLink>
                      </article>
                    ))}
                    {headlines.length > 0 && (
                      <aside className="border-t-4 border-brand bg-paper p-5 md:col-span-2 xl:col-span-1">
                        <h2 className="font-serif text-2xl font-bold">Latest headlines</h2>
                        <ol className="mt-5">
                          {headlines.map((story, index) => (
                            <li key={story.id} className="border-t border-slate-300 py-4">
                              <StoryLink article={story} className="grid grid-cols-[34px_1fr] gap-2">
                                <strong className="font-serif text-2xl text-brand">{index + 1}</strong>
                                <span>
                                  <span className="text-sm font-bold group-hover:text-brand">{story.title}</span>
                                  <span className="mt-1 block text-xs text-slate-500">
                                    {story.publisher}
                                    {via(story)} · {dateFormat.format(new Date(story.publishedAt))}
                                  </span>
                                </span>
                              </StoryLink>
                            </li>
                          ))}
                        </ol>
                      </aside>
                    )}
                  </div>
                </section>
              )}

              {featured.length > 0 && (
                <section className="page-x bg-ink py-10 text-white">
                  <div className="mb-8 border-t border-white/30 pt-5">
                    <h2 className="font-serif text-4xl font-bold">More stories</h2>
                  </div>
                  <div className="grid gap-7 md:grid-cols-3">
                    {featured.map((story, index) => (
                      <article key={story.id}>
                        <StoryLink article={story}>
                          <div className="overflow-hidden">
                            <StoryImage article={story} index={index + 4} className="h-56" sizes="(min-width: 768px) 33vw, 100vw" />
                          </div>
                          <p className="mt-4 text-xs font-bold uppercase text-brand-light">{topicLabel(story)}</p>
                          <h3 className="mt-2 font-serif text-2xl font-bold group-hover:text-brand-light">{story.title}</h3>
                          <p className="mt-3 text-sm text-white/55">
                            {story.publisher}
                            {via(story)} · {dateFormat.format(new Date(story.publishedAt))}
                          </p>
                        </StoryLink>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="page-x bg-white py-10 lg:py-12">
                <div className={cn("grid gap-12", topLawyers.length > 0 && "lg:grid-cols-[1fr_360px]")}>
                  {more.length > 0 ? (
                    <div>
                      <div className="border-t-4 border-black pt-4">
                        <h2 className="font-serif text-4xl font-bold">More top stories</h2>
                      </div>
                      <div className="mt-7 grid gap-6 md:grid-cols-2">
                        {more.slice(0, moreCount).map((story) => (
                          <article key={story.id} className="border-b border-slate-300 pb-6">
                            <StoryLink article={story}>
                              <p className="text-xs font-bold uppercase text-brand">{topicLabel(story)}</p>
                              <h3 className="mt-2 font-serif text-2xl font-bold group-hover:text-brand">{story.title}</h3>
                              {story.summary && <p className="mt-3 line-clamp-2 text-slate-500">{story.summary}</p>}
                              <Byline article={story} className="mt-3" />
                            </StoryLink>
                          </article>
                        ))}
                      </div>
                      {more.length > moreCount && (
                        <button
                          type="button"
                          onClick={() => setMoreCount((count) => count + MORE_PAGE_SIZE)}
                          className="press mt-8 rounded-md border border-slate-300 px-6 py-3 font-bold hover:border-brand hover:text-brand"
                        >
                          Load more stories
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-paper p-8">
                      <h2 className="font-serif text-3xl font-bold">Need advice on a story like this?</h2>
                      <p className="mt-3 text-slate-600">
                        News explains what happened. A verified lawyer can explain what it means for you.
                      </p>
                      <Link href={ROUTES.lawyers} className="press mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover">
                        Find a lawyer <Icon icon={ArrowRightIcon} />
                      </Link>
                    </div>
                  )}
                  {topLawyers.length > 0 && (
                    <aside className="h-fit bg-brand-mist p-6">
                      <p className="text-xs font-bold text-brand">TOP-RATED LAWYERS ON CALLLAWYA</p>
                      {topLawyers.map((lawyer, index) => (
                        <Link
                          key={lawyer.id}
                          href={`${ROUTES.lawyers}/${lawyer.id}`}
                          className={cn("group flex gap-4", index === 0 ? "mt-6" : "mt-5")}
                        >
                          <LawyerAvatar
                            src={lawyer.avatar}
                            name={lawyer.name}
                            initials={lawyer.initials}
                            className="h-16 w-16 shrink-0 rounded-full"
                            initialsClassName="text-lg"
                            sizes="64px"
                          />
                          <div className="min-w-0">
                            <h3 className="font-bold group-hover:text-brand">{lawyer.name}</h3>
                            <p className="text-sm text-slate-500">
                              {[lawyer.expertiseAreas[0], lawyer.location].filter(Boolean).join(" · ") || "Verified lawyer"}
                            </p>
                            {lawyer.rating !== null && <p className="mt-1 text-sm font-bold">{lawyer.rating.toFixed(1)} ★</p>}
                          </div>
                        </Link>
                      ))}
                      <Link href={ROUTES.lawyers} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
                        Find a lawyer <Icon icon={ArrowRightIcon} />
                      </Link>
                    </aside>
                  )}
                </div>
              </section>
            </>
          )}
        </>
      )}

      <section className="page-x pb-10 lg:pb-12">
        <div className="grid grid-cols-1 items-center gap-8 bg-brand p-8 text-white md:p-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="font-serif text-4xl font-bold">The legal briefing, every week.</h2>
            <p className="mt-2 text-white/70">Practical rights, major developments and expert perspectives.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {feed.sources.length > 0 && (
        <section className="page-x pb-12">
          <div className="rounded-xl border border-slate-200 bg-paper p-6 md:p-8">
            <h2 className="text-sm font-bold tracking-widest text-slate-500">SOURCES &amp; ATTRIBUTION</h2>
            <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              {feed.sources.map((source) => (
                <li key={source.id} className="flex items-start gap-2">
                  <span
                    className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", source.ok ? "bg-green-500" : "bg-slate-300")}
                    aria-hidden="true"
                  />
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy hover:text-brand">
                    {source.credit}
                  </a>
                  {!source.ok && <span className="text-slate-400">(unavailable)</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              Headlines and short summaries link to the original articles on each publisher&apos;s website. Copyright remains
              with the publishers. CallLawya is not affiliated with these publishers, and news stories are not legal advice.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
