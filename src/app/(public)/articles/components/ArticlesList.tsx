"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { InfoIcon, PenLineIcon, PlusIcon, SearchIcon, XIcon } from "@/assets/icons";
import { ArticleCard } from "@/components/articles";
import { Icon } from "@/components/common";
import { ARTICLES_PAGE_SIZE, ROUTES } from "@/constants";
import { useArticles } from "@/lib/articles/store";
import { cn } from "@/lib/utils";
import type { ArticleSort } from "@/types/article";

/*
 * Browser-storage version. The backend version (fetching /api/articles with server-rendered first page)
 * is switched off; restore it from git together with src/services/articles.ts and src/app/api/articles.
 */

const subscribeNoop = () => () => {};

export default function ArticlesList() {
  const articles = useArticles();
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<ArticleSort>("latest");
  const [visible, setVisible] = useState(ARTICLES_PAGE_SIZE);

  const categories = useMemo(() => [...new Set(articles.map((article) => article.category))].sort(), [articles]);
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
      <section className="page-x bg-ink pb-10 pt-12 text-white">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-brand-light">CallLawya Newsroom</p>
            <h1 className="mt-3 font-serif text-[40px] font-bold leading-none sm:text-5xl md:text-6xl">Articles</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
              Practical legal guides and insights to help you understand your rights and take the next step.
            </p>
          </div>
          <Link
            href={ROUTES.writeArticle}
            className="press inline-flex shrink-0 items-center gap-2 self-start rounded-md bg-brand px-7 py-4 font-bold hover:bg-brand-hover lg:self-auto"
          >
            <Icon icon={PlusIcon} /> Post an article
          </Link>
        </div>
      </section>

      <section className="page-x section-y bg-paper">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="flex flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 focus-within:border-brand focus-within:ring-[3px] focus-within:ring-brand/10">
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
                    ? "bg-black text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand",
                )}
              >
                {item ?? "All"}
              </button>
            ))}
          </div>
        )}

        {!hydrated ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-[420px] animate-pulse rounded-xl bg-white" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
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
          <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <Icon icon={SearchIcon} className="mx-auto h-14 w-14 rounded-2xl bg-brand-mist p-3 text-brand" />
            <h2 className="mt-5 font-serif text-3xl font-bold">No articles match your search.</h2>
            <p className="mx-auto mt-2 max-w-md text-slate-500">Try a different word or another category.</p>
            <button type="button" onClick={resetFilters} className="mt-4 font-bold text-brand hover:underline">
              Clear search
            </button>
          </div>
        ) : (
          <>
            <p className="mt-6 text-sm text-slate-500" aria-live="polite">
              Showing {Math.min(visible, results.length)} of {results.length} article{results.length === 1 ? "" : "s"}
            </p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
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

        <p className="mt-10 flex items-start gap-2 text-xs text-slate-500">
          <Icon icon={InfoIcon} className="mt-0.5 text-brand" />
          Articles and read counts are currently saved in this browser while the articles service is being set up.
        </p>
      </section>
    </>
  );
}
