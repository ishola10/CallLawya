"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { CountUp, Icon } from "@/components/common";
import { COUNTRIES, LANGUAGES, LAWYERS, ROUTES, SPECIALIZATIONS } from "@/constants";
import type { Availability, Lawyer } from "@/constants";
import { cn } from "@/lib/utils";
import { faArrowLeft, faArrowRight, faChevronDown, faCircle, faMagnifyingGlass, faScaleBalanced, faSliders } from "@/assets/icons";

const ALL = "all";
const PRICE_MIN = 10;
const PRICE_MAX = 200;

type SortOption = "recommended" | "rating" | "price";

const SORTERS: Record<SortOption, ((a: Lawyer, b: Lawyer) => number) | null> = {
  recommended: null,
  rating: (a, b) => b.rating - a.rating,
  price: (a, b) => a.price - b.price,
};

export default function LawyerDirectory() {
  const [query, setQuery] = useState("");
  const [specialization, setSpecialization] = useState<string>(ALL);
  const [country, setCountry] = useState<string>(ALL);
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [minRating, setMinRating] = useState(4);
  const [languages, setLanguages] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const featuredRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();
    const filtered = LAWYERS.filter(
      (lawyer) =>
        (!search ||
          [lawyer.name, lawyer.specialization, lawyer.city, lawyer.country].some((value) =>
            value.toLowerCase().includes(search),
          )) &&
        (specialization === ALL || lawyer.specialization === specialization) &&
        (country === ALL || lawyer.country === country) &&
        (availability.length === 0 || availability.includes(lawyer.availability)) &&
        (maxPrice === PRICE_MAX || lawyer.price <= maxPrice) &&
        lawyer.rating >= minRating &&
        (languages.length === 0 || languages.some((language) => lawyer.languages.includes(language))),
    );
    const sorter = SORTERS[sort];
    return sorter ? [...filtered].sort(sorter) : filtered;
  }, [query, specialization, country, availability, maxPrice, minRating, languages, sort]);

  const activeFilterCount =
    availability.length + languages.length + (maxPrice < PRICE_MAX ? 1 : 0) + (minRating === 5 ? 1 : 0);

  const toggle = <T,>(list: T[], value: T) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

  const clearAll = () => {
    setQuery("");
    setSpecialization(ALL);
    setCountry(ALL);
    setAvailability([]);
    setMaxPrice(PRICE_MAX);
    setMinRating(4);
    setLanguages([]);
  };

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
            <h1 className="mt-3 font-serif text-[40px] sm:text-5xl font-bold md:text-6xl">Find the right lawyer.</h1>
            <p className="mt-3 text-lg text-white/60">Search by expertise, country, availability and budget.</p>
          </div>
          <p className="text-sm text-white/50">
            <CountUp value={10284} className="font-bold text-white" /> verified lawyers across Africa
          </p>
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
              <Icon icon={faMagnifyingGlass} className="text-brand" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full outline-none"
                placeholder="Name or legal issue"
              />
            </div>
          </label>
          <label className="px-4 py-2 lg:border-r lg:border-slate-200">
            <span className="block text-[10px] font-bold text-slate-500">SPECIALIZATION</span>
            <select
              value={specialization}
              onChange={(event) => setSpecialization(event.target.value)}
              className="mt-1 w-full bg-white outline-none"
            >
              <option value={ALL}>All practice areas</option>
              {SPECIALIZATIONS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="px-4 py-2">
            <span className="block text-[10px] font-bold text-slate-500">COUNTRY</span>
            <select
              value={country}
              onChange={(event) => setCountry(event.target.value)}
              className="mt-1 w-full bg-white outline-none"
            >
              <option value={ALL}>All countries</option>
              {COUNTRIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="press rounded-md bg-brand px-8 py-4 font-bold text-white hover:bg-brand-hover lg:py-0"
          >
            Search Lawyers
          </button>
        </form>
      </section>

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
              <Icon icon={faArrowLeft} />
            </button>
            <button
              type="button"
              aria-label="Next featured lawyers"
              onClick={() => scrollFeatured(1)}
              className="h-10 w-10 rounded-full bg-black text-white hover:bg-neutral-800"
            >
              <Icon icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div
          ref={featuredRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {LAWYERS.map((lawyer) => (
            <article
              key={lawyer.id}
              className="flex min-w-[260px] shrink-0 snap-start items-center gap-4 rounded-lg border border-slate-200 p-4 sm:min-w-[calc(50%-10px)] lg:min-w-[calc(25%-15px)]"
            >
              <Image
                src={lawyer.image}
                alt={lawyer.name}
                className="h-16 w-16 rounded-full object-cover"
                sizes="64px"
              />
              <div>
                <span className="text-[10px] font-bold text-brand">FEATURED</span>
                <h3 className="font-bold">{lawyer.name}</h3>
                <p className="text-xs text-slate-500">
                  {lawyer.specialization.replace(" Law", "")} · {lawyer.rating.toFixed(1)} ★
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
                <Icon icon={faSliders} className="mr-2 text-brand" />
                Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
              </span>
              <Icon icon={faChevronDown} className={cn("transition", filtersOpen && "rotate-180")} />
            </button>
            <aside
              className={cn(
                "h-fit rounded-xl border border-slate-200 bg-white p-6 lg:sticky lg:top-[105px] lg:block",
                !filtersOpen && "hidden",
              )}
            >
              <div className="flex justify-between border-b border-slate-200 pb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <button type="button" onClick={clearAll} className="text-xs font-bold text-brand">
                  Clear all
                </button>
              </div>
              <div className="border-b border-slate-200 py-5">
                <p className="mb-4 text-sm font-bold">Availability</p>
                {(
                  [
                    ["now", "Available now"],
                    ["week", "This week"],
                  ] as const
                ).map(([value, label]) => (
                  <label key={value} className="mb-3 flex gap-3 text-sm last:mb-0">
                    <input
                      type="checkbox"
                      className="accent-brand"
                      checked={availability.includes(value)}
                      onChange={() => setAvailability((list) => toggle(list, value))}
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div className="border-b border-slate-200 py-5">
                <div className="flex justify-between text-sm">
                  <p className="font-bold">Price per session</p>
                  <span className="text-slate-500">{maxPrice === PRICE_MAX ? "Any" : `Up to $${maxPrice}`}</span>
                </div>
                <input
                  type="range"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={5}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="mt-5 w-full accent-brand"
                  aria-label="Maximum price per session"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>${PRICE_MIN}</span>
                  <span>${PRICE_MAX}+</span>
                </div>
              </div>
              <div className="border-b border-slate-200 py-5">
                <p className="mb-4 text-sm font-bold">Minimum rating</p>
                <div className="flex gap-2">
                  {[4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setMinRating(rating)}
                      aria-pressed={minRating === rating}
                      className={cn(
                        "rounded border px-3 py-2 text-sm",
                        minRating === rating ? "border-brand bg-brand-mist" : "border-slate-300",
                      )}
                    >
                      {rating === 4 ? "4★+" : "5★"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-5">
                <p className="mb-4 text-sm font-bold">Languages</p>
                {LANGUAGES.map((language) => (
                  <label key={language} className="mb-3 flex gap-3 text-sm last:mb-0">
                    <input
                      type="checkbox"
                      className="accent-brand"
                      checked={languages.includes(language)}
                      onChange={() => setLanguages((list) => toggle(list, language))}
                    />
                    {language}
                  </label>
                ))}
              </div>
            </aside>
          </div>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold">Lawyers for you</h2>
                <p className="mt-1 text-sm text-slate-500" aria-live="polite">
                  Showing {results.length} of {LAWYERS.length} lawyers
                </p>
              </div>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="rounded border border-slate-300 bg-white px-4 py-3 text-sm"
                aria-label="Sort lawyers"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest rated</option>
                <option value="price">Lowest price</option>
              </select>
            </div>

            {results.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <Icon icon={faScaleBalanced} className="text-4xl text-brand" />
                <h3 className="mt-5 font-serif text-2xl font-bold">No lawyers match those filters.</h3>
                <p className="mt-2 text-slate-500">Try widening your search or clearing a few filters.</p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="press mt-6 rounded-md bg-brand px-6 py-3 font-bold text-white"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((lawyer) => (
                  <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(10,37,64,.14)]">
      <div className="relative">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          className={cn("h-64 w-full object-cover", lawyer.imagePosition === "top" && "object-top")}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          placeholder="blur"
        />
        {lawyer.availability === "now" && (
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-brand">
            <Icon icon={faCircle} className="mr-1 text-[7px] text-green-500" /> AVAILABLE NOW
          </span>
        )}
        <div className="absolute inset-x-4 bottom-4 translate-y-2 rounded bg-black/85 p-3 text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {lawyer.languages.join(" · ")} · {lawyer.experience} years experience
        </div>
      </div>
      <div className="p-5">
        <span className="text-[10px] font-bold uppercase text-brand">{lawyer.specialization}</span>
        <h3 className="mt-1 font-serif text-2xl font-bold">{lawyer.name}</h3>
        <p className="text-sm text-slate-500">
          {lawyer.flag} {lawyer.city}, {lawyer.country === "South Africa" ? "SA" : lawyer.country}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">
            {lawyer.rating.toFixed(1)} <span className="text-gold">★</span>
          </span>
          <strong>
            ${lawyer.price} <span className="text-xs font-normal text-slate-400">/ session</span>
          </strong>
        </div>
        <Link
          href={ROUTES.download}
          className="press mt-5 block w-full rounded-md bg-brand py-3 text-center font-bold text-white hover:bg-brand-hover"
        >
          Book Consultation
        </Link>
      </div>
    </article>
  );
}
