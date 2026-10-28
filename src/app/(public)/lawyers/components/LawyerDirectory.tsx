"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  SearchIcon,
  ScaleIcon,
  SlidersHorizontalIcon,
  StarIcon,
} from "@/assets/icons";
import { CountUp, Icon } from "@/components/common";
import { LawyerAvatar, LawyerCard } from "@/components/lawyers";
import { FEE_OPTIONS, LAWYERS_PAGE_SIZE, RATING_OPTIONS } from "@/constants";
import { cn, formatNaira } from "@/lib/utils";
import type { ExpertiseStat, LawyerPage, LawyerSummary } from "@/types/lawyer";

type Filters = {
  name: string;
  expertise: string;
  location: string;
  available: boolean;
  maxFee: number | null;
  minRating: number | null;
  page: number;
};

const DEFAULT_FILTERS: Filters = {
  name: "",
  expertise: "",
  location: "",
  available: false,
  maxFee: null,
  minRating: null,
  page: 1,
};

function toQueryString(filters: Filters) {
  const params = new URLSearchParams();
  if (filters.name.trim()) params.set("name", filters.name.trim());
  if (filters.expertise) params.set("expertise", filters.expertise);
  if (filters.location.trim()) params.set("location", filters.location.trim());
  if (filters.available) params.set("available", "true");
  if (filters.maxFee) params.set("maxFee", String(filters.maxFee));
  if (filters.minRating) params.set("minRating", String(filters.minRating));
  if (filters.page > 1) params.set("page", String(filters.page));
  return params.toString();
}

type LawyerDirectoryProps = {
  initialPage: LawyerPage | null;
  featured: LawyerSummary[];
  expertise: ExpertiseStat[];
};

export default function LawyerDirectory({ initialPage, featured, expertise }: LawyerDirectoryProps) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [result, setResult] = useState<LawyerPage | null>(initialPage);
  const [status, setStatus] = useState<"idle" | "loading" | "error">(initialPage ? "idle" : "error");
  const [retry, setRetry] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [queryKey] = useDebounceValue(toQueryString(filters), 300);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = {
      name: params.get("name") ?? "",
      expertise: params.get("expertise") ?? "",
      location: params.get("location") ?? "",
    };
    if (fromUrl.name || fromUrl.expertise || fromUrl.location) setFilters({ ...DEFAULT_FILTERS, ...fromUrl });
  }, []);

  useEffect(() => {
    if (queryKey === "" && initialPage && retry === 0) {
      setResult(initialPage);
      setStatus("idle");
      return;
    }
    const controller = new AbortController();
    setStatus("loading");
    fetch(`/api/lawyers?${queryKey}${queryKey ? "&" : ""}limit=${LAWYERS_PAGE_SIZE}`, { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<LawyerPage>) : Promise.reject(response.status)))
      .then((page) => {
        setResult(page);
        setStatus("idle");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });
    return () => controller.abort();
  }, [queryKey, initialPage, retry]);

  const update = (patch: Partial<Filters>) =>
    setFilters((current) => ({ ...current, ...patch, page: patch.page ?? 1 }));

  const goToPage = (page: number) => {
    update({ page });
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeFilterCount = [filters.available, filters.maxFee, filters.minRating].filter(Boolean).length;
  const hasAnyFilter = toQueryString({ ...filters, page: 1 }) !== "";
  const totalPages = result?.totalPages ?? 1;

  const scrollFeatured = (direction: 1 | -1) => {
    const row = featuredRef.current;
    if (row) row.scrollBy({ left: direction * row.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      <section className="page-x bg-ink pb-8 pt-12 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand-light">Verified professionals</p>
            <h1 className="mt-3 font-serif text-[40px] font-bold sm:text-5xl md:text-6xl">Find the right lawyer.</h1>
            <p className="mt-3 text-lg text-white/60">Search by name, expertise, location, availability and budget.</p>
          </div>
          {initialPage && (
            <p className="text-sm text-white/50">
              <CountUp value={initialPage.total} className="font-bold text-white" /> verified lawyers on CallLawya
            </p>
          )}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="mt-9 grid gap-2 rounded-lg bg-white p-3 text-navy md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto]"
        >
          <label className="px-4 py-2 lg:border-r lg:border-slate-200">
            <span className="block text-[10px] font-bold text-slate-500">SEARCH</span>
            <div className="mt-1 flex items-center gap-3">
              <Icon icon={SearchIcon} className="text-brand" />
              <input
                value={filters.name}
                onChange={(event) => update({ name: event.target.value })}
                className="w-full min-w-0 outline-none"
                placeholder="Area of expertise"
              />
            </div>
          </label>
          <label className="px-4 py-2 lg:border-r lg:border-slate-200">
            <span className="block text-[10px] font-bold text-slate-500">PRACTICE AREA</span>
            <select
              value={filters.expertise}
              onChange={(event) => update({ expertise: event.target.value })}
              className="mt-1 w-full bg-white outline-none"
            >
              <option value="">All practice areas</option>
              {expertise.map((item) => (
                <option key={item.expertise} value={item.expertise}>
                  {item.expertise} ({item.count})
                </option>
              ))}
            </select>
          </label>
          <label className="px-4 py-2">
            <span className="block text-[10px] font-bold text-slate-500">LOCATION</span>
            <input
              value={filters.location}
              onChange={(event) => update({ location: event.target.value })}
              className="mt-1 w-full min-w-0 outline-none"
              placeholder="e.g. Lagos or Abuja"
            />
          </label>
          <button
            type="submit"
            className="press rounded-md bg-brand px-8 py-4 font-bold text-white hover:bg-brand-hover lg:py-0"
          >
            Search Lawyers
          </button>
        </form>
      </section>

      {featured.length > 0 && (
        <section className="page-x border-b border-slate-200 bg-white py-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold">Featured lawyers</h2>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous featured lawyers"
                onClick={() => scrollFeatured(-1)}
                className="h-10 w-10 rounded-full border border-slate-300 hover:border-black"
              >
                <Icon icon={ArrowLeftIcon} />
              </button>
              <button
                type="button"
                aria-label="Next featured lawyers"
                onClick={() => scrollFeatured(1)}
                className="h-10 w-10 rounded-full bg-black text-white hover:bg-neutral-800"
              >
                <Icon icon={ArrowRightIcon} />
              </button>
            </div>
          </div>
          <div
            ref={featuredRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featured.map((lawyer) => (
              <Link
                key={lawyer.id}
                href={`/lawyers/${lawyer.id}`}
                className="flex min-w-[260px] shrink-0 snap-start items-center gap-4 rounded-lg border border-slate-200 p-4 transition hover:border-brand sm:min-w-[calc(50%-10px)] lg:min-w-[calc(25%-15px)]"
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
                  <span className="text-[10px] font-bold text-brand">FEATURED</span>
                  <h3 className="truncate font-bold">{lawyer.name}</h3>
                  <p className="truncate text-xs text-slate-500">
                    {lawyer.expertiseAreas[0] ?? "General practice"}
                    {lawyer.rating !== null && (
                      <>
                        {" "}
                        · {lawyer.rating.toFixed(1)} <Icon icon={StarIcon} className="fill-current text-gold" />
                      </>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section id="results" className="page-x py-10">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <div>
            <button
              type="button"
              onClick={() => setFiltersOpen((open) => !open)}
              className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold lg:hidden"
              aria-expanded={filtersOpen}
            >
              <span>
                <Icon icon={SlidersHorizontalIcon} className="mr-2 text-brand" />
                Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
              </span>
              <Icon icon={ChevronDownIcon} className={cn("transition", filtersOpen && "rotate-180")} />
            </button>
            <aside
              className={cn(
                "h-fit rounded-xl border border-slate-200 bg-white p-6 lg:sticky lg:top-[105px] lg:block",
                !filtersOpen && "hidden",
              )}
            >
              <div className="flex justify-between border-b border-slate-200 pb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button type="button" onClick={() => setFilters(DEFAULT_FILTERS)} className="text-xs font-bold text-brand">
                  Clear all
                </button>
              </div>
              <div className="border-b border-slate-200 py-5">
                <p className="mb-4 text-sm font-bold">Availability</p>
                <label className="flex gap-3 text-sm">
                  <input
                    type="checkbox"
                    className="accent-brand"
                    checked={filters.available}
                    onChange={(event) => update({ available: event.target.checked })}
                  />
                  Available now
                </label>
              </div>
              <fieldset className="border-b border-slate-200 py-5">
                <legend className="mb-4 text-sm font-bold">Consultation fee</legend>
                {[null, ...FEE_OPTIONS].map((fee) => (
                  <label key={fee ?? "any"} className="mb-3 flex gap-3 text-sm last:mb-0">
                    <input
                      type="radio"
                      name="maxFee"
                      className="accent-brand"
                      checked={filters.maxFee === fee}
                      onChange={() => update({ maxFee: fee })}
                    />
                    {fee === null ? "Any fee" : `Up to ${formatNaira(fee)}`}
                  </label>
                ))}
              </fieldset>
              <div className="pt-5">
                <p className="mb-4 text-sm font-bold">Minimum rating</p>
                <div className="flex gap-2">
                  {RATING_OPTIONS.map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => update({ minRating: filters.minRating === rating ? null : rating })}
                      aria-pressed={filters.minRating === rating}
                      className={cn(
                        "rounded border px-3 py-2 text-sm",
                        filters.minRating === rating ? "border-brand bg-brand-mist" : "border-slate-300",
                      )}
                    >
                      {rating === 5 ? "5★" : `${rating}★+`}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div aria-busy={status === "loading"}>
            <div className="mb-6">
              <h2 className="font-serif text-3xl font-bold">Lawyers for you</h2>
              <p className="mt-1 text-sm text-slate-500" aria-live="polite">
                {status === "loading"
                  ? "Searching…"
                  : result
                    ? `Showing ${result.items.length} of ${result.total} lawyer${result.total === 1 ? "" : "s"}`
                    : ""}
              </p>
            </div>

            {status === "error" && !result ? (
              <EmptyState
                title="We couldn't load lawyers right now."
                text="Please check your connection and try again."
                action="Try again"
                onAction={() => setRetry((count) => count + 1)}
              />
            ) : result && result.items.length === 0 ? (
              <EmptyState
                title="No lawyers match those filters."
                text="Try widening your search or clearing a few filters."
                action={hasAnyFilter ? "Clear all filters" : undefined}
                onAction={() => setFilters(DEFAULT_FILTERS)}
              />
            ) : (
              <div
                className={cn(
                  "grid gap-5 transition-opacity sm:grid-cols-2 xl:grid-cols-3",
                  status === "loading" && "opacity-60",
                )}
              >
                {result?.items.map((lawyer) => <LawyerCard key={lawyer.id} lawyer={lawyer} />)}
              </div>
            )}

            {status === "error" && result && (
              <p className="mt-6 text-sm font-semibold text-[#D92D20]" role="alert">
                Couldn&apos;t update results.{" "}
                <button type="button" className="underline" onClick={() => setRetry((count) => count + 1)}>
                  Try again
                </button>
              </p>
            )}

            {totalPages > 1 && (
              <nav className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Pagination">
                <button
                  type="button"
                  aria-label="Previous page"
                  disabled={filters.page <= 1}
                  onClick={() => goToPage(filters.page - 1)}
                  className="h-11 w-11 rounded border border-slate-300 disabled:opacity-40"
                >
                  <Icon icon={ArrowLeftIcon} />
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={page === filters.page ? "page" : undefined}
                    onClick={() => goToPage(page)}
                    className={cn(
                      "h-11 w-11 rounded font-bold",
                      page === filters.page ? "bg-brand text-white" : "border border-slate-300",
                    )}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Next page"
                  disabled={filters.page >= totalPages}
                  onClick={() => goToPage(filters.page + 1)}
                  className="h-11 w-11 rounded border border-slate-300 disabled:opacity-40"
                >
                  <Icon icon={ArrowRightIcon} />
                </button>
              </nav>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyState({
  title,
  text,
  action,
  onAction,
}: {
  title: string;
  text: string;
  action?: string;
  onAction: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
      <Icon icon={ScaleIcon} className="text-4xl text-brand" />
      <h3 className="mt-5 font-serif text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-slate-500">{text}</p>
      {action && (
        <button type="button" onClick={onAction} className="press mt-6 rounded-md bg-brand px-6 py-3 font-bold text-white">
          {action}
        </button>
      )}
    </div>
  );
}
