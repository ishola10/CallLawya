"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  ArrowRightIcon,
  EyeIcon,
  InfoIcon,
  NewspaperIcon,
  PenLineIcon,
  PlusIcon,
  SearchIcon,
  TrendingUpIcon,
  XIcon,
} from "@/assets/icons";
import { ArticleCard } from "@/components/articles";
import { articleDate, formatReads } from "@/components/articles/ArticleCard";
import { Icon } from "@/components/common";
import { ARTICLES_PAGE_SIZE, ROUTES } from "@/constants";
import { useArticles } from "@/lib/articles/store";
import { cn } from "@/lib/utils";
import type { ArticleSort, ArticleSummary } from "@/types/article";

const subscribeNoop = () => () => {};

function FeaturedCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[.06] shadow-[0_30px_80px_rgba(0,0,0,.35)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-brand/50"
    >
      <div className="relative h-52 overflow-hidden">
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 460px, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-navy to-brand/60 p-6">
            <Icon icon={PenLineIcon} strokeWidth={1.25} className="text-5xl text-brand-light" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-md bg-brand px-2.5 py-1 text-xs font-bold tracking-wide">FEATURED</span>
      </div>
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-light">{article.category}</p>
        <h2 className="mt-2 line-clamp-2 font-serif text-2xl font-bold leading-snug">{article.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs text-white/55">
          <span className="min-w-0 truncate">
            <strong className="text-white">{article.authorName}</strong> · {article.readMinutes} min read
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-bold text-white group-hover:text-brand-light">
            Read article <Icon icon={ArrowRightIcon} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesList() {
  const articles = useArticles();
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<ArticleSort>("latest");
  const [visible, setVisible] = useState(ARTICLES_PAGE_SIZE);

  const categories = useMemo(() => [...new Set(articles.map((article) => article.category))].sort(), [articles]);
  const featured = useMemo(
    () => [...articles].sort((a, b) => b.reads - a.reads || b.createdAt.localeCompare(a.createdAt))[0] ?? null,
    [articles],
  );
  const totalReads = useMemo(() => articles.reduce((sum, article) => sum + article.reads, 0), [articles]);
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = articles.filter(
      (article) =>
        (!category || article.category === category) &&
        (!query ||
          [article.title, article.excerpt, article.authorName, article.category, ...article.tags].some((value) =>
            value.toLowerCase().includes(query),
          )),
    );
    return [...filtered].sort((a, b) =>
      sort === "most-read" ? b.reads - a.reads : b.createdAt.localeCompare(a.createdAt),
    );
  }, [articles, search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory(null);
    setVisible(ARTICLES_PAGE_SIZE);
  };

  return (
    <>
      <section className="page-x relative overflow-hidden bg-ink pb-24 pt-14 text-white lg:min-h-[640px] lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px]"
          aria-hidden="true"
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-light">
              <span className="h-2 w-2 rounded-full bg-brand-light" aria-hidden="true" /> CallLawya Newsroom
            </p>
            <h1 className="mt-7 font-serif text-[44px] font-bold leading-[1.02] tracking-[-.03em] sm:text-6xl xl:text-[76px]">
              Legal Insights &amp;{" "}
              <em className="bg-gradient-to-r from-brand-light to-brand-pale bg-clip-text pr-2 font-normal italic text-transparent">
                Articles
              </em>
            </h1>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-white/65 md:text-xl">
              Practical legal guides and expert insights designed to help you understand your rights, prepare for
              conversations with a lawyer and take the next step with confidence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={ROUTES.writeArticle}
                className="press inline-flex items-center gap-2 rounded-md bg-brand px-8 py-4 text-lg font-bold hover:bg-brand-hover"
              >
                <Icon icon={PlusIcon} /> Post an article
              </Link>
              <a
                href="#latest"
                className="press inline-flex items-center gap-2 rounded-md border border-white/40 px-8 py-4 text-lg font-bold hover:bg-white hover:text-black"
              >
                Browse articles
              </a>
            </div>
            <dl className="mt-10 grid max-w-[560px] grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {[
                { icon: NewspaperIcon, label: "Articles", value: hydrated ? articles.length : "—" },
                { icon: PenLineIcon, label: "Topics", value: hydrated ? categories.length : "—" },
                { icon: TrendingUpIcon, label: "Reads", value: hydrated ? totalReads.toLocaleString("en-US") : "—" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/50">
                    <Icon icon={stat.icon} className="text-brand-light" /> {stat.label}
                  </dt>
                  <dd className="mt-1 font-serif text-3xl font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mx-auto w-full max-w-[480px]">
            {!hydrated ? (
              <div className="h-[430px] animate-pulse rounded-2xl bg-white/5" aria-hidden="true" />
            ) : featured ? (
              <FeaturedCard article={featured} />
            ) : (
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
                <Icon icon={PenLineIcon} className="mx-auto h-14 w-14 rounded-2xl bg-white/10 p-3 text-brand-light" />
                <p className="mt-5 font-serif text-2xl font-bold">Your article could be featured here.</p>
                <p className="mt-2 text-sm text-white/60">Share practical legal guidance with the CallLawya community.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="latest" className="page-x scroll-mt-24 bg-paper pb-14 lg:pb-16">
        <div className="relative z-10 -mt-12 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_24px_60px_rgba(10,37,64,.12)] md:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-paper px-4 py-3 focus-within:border-brand focus-within:bg-white focus-within:ring-[3px] focus-within:ring-brand/10">
              <Icon icon={SearchIcon} className="text-lg text-brand" />
              <span className="sr-only">Search articles</span>
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisible(ARTICLES_PAGE_SIZE);
                }}
                placeholder="Search by title, topic, author or tag"
                maxLength={100}
                className="w-full min-w-0 bg-transparent outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="text-slate-400 hover:text-navy"
                >
                  <Icon icon={XIcon} />
                </button>
              )}
            </label>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as ArticleSort)}
              aria-label="Sort articles"
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold"
            >
              <option value="latest">Latest</option>
              <option value="most-read">Most read</option>
            </select>
          </div>

          {categories.length > 1 && (
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {[null, ...categories].map((item) => (
                <button
                  key={item ?? "all"}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setVisible(ARTICLES_PAGE_SIZE);
                  }}
                  aria-pressed={category === item}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition",
                    category === item
                      ? "bg-ink text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-brand hover:text-brand",
                  )}
                >
                  {item ?? "All topics"}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-4 border-t-4 border-black pt-5">
          <div>
            <p className="eyebrow text-brand">{category ?? "All topics"}</p>
            <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">
              {sort === "most-read" ? "Most read articles" : "Latest articles"}
            </h2>
          </div>
          {hydrated && results.length > 0 && (
            <p className="text-sm text-slate-500" aria-live="polite">
              Showing {Math.min(visible, results.length)} of {results.length} article{results.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {!hydrated ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-[420px] animate-pulse rounded-xl bg-white" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Icon icon={PenLineIcon} className="mx-auto h-14 w-14 rounded-2xl bg-brand-mist p-3 text-brand" />
            <h2 className="mt-5 font-serif text-3xl font-bold">No articles yet.</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Be the first to share practical legal guidance with the CallLawya community.
            </p>
            <Link
              href={ROUTES.writeArticle}
              className="press mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover"
            >
              <Icon icon={PlusIcon} /> Post an article
            </Link>
          </div>
        ) : results.length === 0 ? (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Icon icon={SearchIcon} className="mx-auto h-14 w-14 rounded-2xl bg-brand-mist p-3 text-brand" />
            <h2 className="mt-5 font-serif text-3xl font-bold">No articles match your search.</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">Try a different word or another topic.</p>
            <button type="button" onClick={resetFilters} className="mt-4 font-bold text-brand hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.slice(0, visible).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {results.length > visible && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisible((count) => count + ARTICLES_PAGE_SIZE)}
                  className="press rounded-md border border-slate-300 bg-white px-7 py-3 font-bold hover:border-brand hover:text-brand"
                >
                  Load more articles
                </button>
              </div>
            )}
          </>
        )}

        {hydrated && featured && (
          <aside className="mt-14 grid gap-6 overflow-hidden rounded-[20px] bg-brand p-8 text-white md:p-12 lg:grid-cols-[1.4fr_.6fr] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-widest text-white/70">WRITE FOR CALLLAWYA</p>
              <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">Share your legal expertise.</h2>
              <p className="mt-3 max-w-2xl leading-7 text-white/80">
                Help people understand their rights with a clear, practical guide. Most read right now:{" "}
                <Link href={`/articles/${featured.slug}`} className="font-bold underline underline-offset-4">
                  {featured.title}
                </Link>{" "}
                <span className="whitespace-nowrap text-white/60">
                  (<Icon icon={EyeIcon} /> {formatReads(featured.reads)}, {articleDate.format(new Date(featured.createdAt))})
                </span>
              </p>
            </div>
            <div className="lg:text-right">
              <Link
                href={ROUTES.writeArticle}
                className="press inline-flex items-center gap-2 rounded-md bg-black px-8 py-4 font-bold hover:bg-neutral-800"
              >
                <Icon icon={PenLineIcon} /> Post an article
              </Link>
            </div>
          </aside>
        )}

        <p className="mt-10 flex items-start gap-2 text-xs text-slate-500">
          <Icon icon={InfoIcon} className="mt-0.5 text-brand" />
          Articles and read counts are currently saved in this browser while the articles service is being set up.
        </p>
      </section>
    </>
  );
}
