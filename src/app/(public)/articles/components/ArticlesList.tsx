"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { PenLineIcon, PlusIcon, SearchIcon, XIcon } from "@/assets/icons";
import { ArticleCard } from "@/components/articles";
import { Icon } from "@/components/common";
import { ARTICLES_PAGE_SIZE, ROUTES } from "@/constants";
import { cn } from "@/lib/utils";
import type { ArticleCategoryCount, ArticlePage, ArticleSort, ArticleSummary } from "@/types/article";

type Filters = {
  search: string;
  category: string | null;
  sort: ArticleSort;
};

const DEFAULT_FILTERS: Filters = { search: "", category: null, sort: "latest" };

function toQueryString(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.category) params.set("category", filters.category);
  if (filters.sort !== "latest") params.set("sort", filters.sort);
  return params.toString();
}

function fetchPage(queryKey: string, page: number, signal?: AbortSignal) {
  const params = new URLSearchParams(queryKey);
  params.set("limit", String(ARTICLES_PAGE_SIZE));
  if (page > 1) params.set("page", String(page));
  return fetch(`/api/articles?${params}`, { signal }).then((response) =>
    response.ok ? (response.json() as Promise<ArticlePage>) : Promise.reject(response.status),
  );
}

type ArticlesListProps = {
  initialPage: ArticlePage | null;
  categories: ArticleCategoryCount[];
};

export default function ArticlesList({ initialPage, categories }: ArticlesListProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [result, setResult] = useState<ArticlePage | null>(initialPage);
  const [items, setItems] = useState<ArticleSummary[]>(initialPage?.items ?? []);
  const [status, setStatus] = useState<"idle" | "loading" | "loading-more" | "error">(initialPage ? "idle" : "error");
  const [retry, setRetry] = useState(0);
  const [queryKey] = useDebounceValue(toQueryString(filters), 300);

  useEffect(() => {
    if (queryKey === "" && initialPage && retry === 0) {
      setResult(initialPage);
      setItems(initialPage.items);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    setStatus("loading");
    fetchPage(queryKey, 1, controller.signal)
      .then((page) => {
        setResult(page);
        setItems(page.items);
        setStatus("idle");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, [queryKey, initialPage, retry]);

  const loadMore = () => {
    if (!result) return;
    setStatus("loading-more");
    fetchPage(queryKey, result.page + 1)
      .then((page) => {
        setResult(page);
        setItems((current) => [...current, ...page.items.filter((item) => !current.some((c) => c.id === item.id))]);
        setStatus("idle");
      })
      .catch(() => setStatus("error"));
  };

  const update = (patch: Partial<Filters>) => setFilters((current) => ({ ...current, ...patch }));
  const isFiltered = Boolean(filters.search.trim() || filters.category);
  const hasMore = Boolean(result && result.page < result.totalPages);

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
              value={filters.search}
              onChange={(event) => update({ search: event.target.value })}
              placeholder="Search by title, topic, author or tag"
              maxLength={100}
              className="w-full min-w-0 bg-transparent outline-none"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => update({ search: "" })}
                aria-label="Clear search"
                className="text-slate-400 hover:text-navy"
              >
                <Icon icon={XIcon} />
              </button>
            )}
          </label>
          <select
            value={filters.sort}
            onChange={(event) => update({ sort: event.target.value as ArticleSort })}
            aria-label="Sort articles"
            className="rounded-lg border border-slate-200 bg-white px-4 py-3 font-semibold"
          >
            <option value="latest">Latest</option>
            <option value="most-read">Most read</option>
          </select>
        </div>

        {categories.length > 1 && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {[null, ...categories.map((item) => item.category)].map((item) => (
              <button
                key={item ?? "all"}
                type="button"
                onClick={() => update({ category: item })}
                aria-pressed={filters.category === item}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  filters.category === item
                    ? "bg-black text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand",
                )}
              >
                {item ?? "All"}
              </button>
            ))}
          </div>
        )}

        <div aria-busy={status === "loading" || status === "loading-more"}>
          {status === "error" && !result ? (
            <EmptyState
              icon={SearchIcon}
              title="We couldn't load articles right now."
              text="Please check your connection and try again."
              action={{ label: "Try again", onClick: () => setRetry((count) => count + 1) }}
            />
          ) : items.length === 0 && !isFiltered && status !== "loading" ? (
            <EmptyState
              icon={PenLineIcon}
              title="No articles yet."
              text="Be the first to share practical legal guidance with the CallLawya community."
              link
            />
          ) : items.length === 0 && status !== "loading" ? (
            <EmptyState
              icon={SearchIcon}
              title="No articles match your search."
              text="Try a different word or another category."
              action={{ label: "Clear search", onClick: () => setFilters(DEFAULT_FILTERS) }}
            />
          ) : (
            <>
              <p className="mt-6 text-sm text-slate-500" aria-live="polite">
                {status === "loading"
                  ? "Searching…"
                  : result && `Showing ${items.length} of ${result.total} article${result.total === 1 ? "" : "s"}`}
              </p>
              <div
                className={cn(
                  "mt-4 grid gap-6 transition-opacity sm:grid-cols-2 xl:grid-cols-3",
                  status === "loading" && "opacity-60",
                )}
              >
                {items.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}

          {status === "error" && result && (
            <p className="mt-6 text-sm font-semibold text-[#D92D20]" role="alert">
              Couldn&apos;t update the articles.{" "}
              <button type="button" className="underline" onClick={() => setRetry((count) => count + 1)}>
                Try again
              </button>
            </p>
          )}

          {hasMore && items.length > 0 && (
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={status === "loading-more" || status === "loading"}
                className="press rounded-md border border-slate-300 bg-white px-7 py-3 font-bold hover:border-brand hover:text-brand disabled:opacity-60"
              >
                {status === "loading-more" ? "Loading…" : "Load more articles"}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyState({
  icon,
  title,
  text,
  action,
  link,
}: {
  icon: typeof SearchIcon;
  title: string;
  text: string;
  action?: { label: string; onClick: () => void };
  link?: boolean;
}) {
  return (
    <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <Icon icon={icon} className="mx-auto h-14 w-14 rounded-2xl bg-brand-mist p-3 text-brand" />
      <h2 className="mt-5 font-serif text-3xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-slate-500">{text}</p>
      {action && (
        <button type="button" onClick={action.onClick} className="mt-4 font-bold text-brand hover:underline">
          {action.label}
        </button>
      )}
      {link && (
        <Link
          href={ROUTES.writeArticle}
          className="press mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover"
        >
          <Icon icon={PlusIcon} /> Post an article
        </Link>
      )}
    </div>
  );
}
