"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import { ROUTES } from "@/constants";
import Icon from "./Icon";

export type TickerStory = { id: string; title: string; url: string; publisher: string };

const ROTATE_MS = 20_000;

export default function NewsTicker({ stories }: { stories: TickerStory[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = stories.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % count), ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  if (count === 0) {
    return (
      <Link
        href={ROUTES.lawyers}
        className="page-x flex min-h-[34px] items-center gap-4 bg-brand py-2 text-xs font-bold tracking-wide text-white"
      >
        <span className="shrink-0 bg-white px-2 py-1 text-brand">LEGAL ACCESS</span>
        <span>Now serving clients and lawyers across Nigeria — call or chat in minutes.</span>
        <Icon icon={ArrowRightIcon} className="ml-auto" />
      </Link>
    );
  }

  const story = stories[index % count];
  const step = (delta: number) => setIndex((current) => (current + delta + count) % count);

  return (
    <div
      className="page-x flex min-h-[34px] items-center gap-3 bg-brand py-2 text-xs font-bold tracking-wide text-white sm:gap-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Link href={ROUTES.news} className="shrink-0 bg-white px-2 py-1 text-brand hover:bg-brand-mist">
        LATEST NEWS
      </Link>
      <div className="min-w-0 flex-1 overflow-hidden" aria-live="polite">
        <a
          key={story.id}
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate duration-500 animate-in fade-in slide-in-from-bottom-2 hover:underline motion-reduce:animate-none"
        >
          {story.title}
          <span className="font-semibold text-white/65"> · {story.publisher}</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {count > 1 && (
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <button type="button" onClick={() => step(-1)} aria-label="Previous story" className="rounded p-1 hover:bg-white/15">
            <Icon icon={ChevronLeftIcon} />
          </button>
          <span className="w-10 text-center tabular-nums text-white/70">
            {(index % count) + 1}/{count}
          </span>
          <button type="button" onClick={() => step(1)} aria-label="Next story" className="rounded p-1 hover:bg-white/15">
            <Icon icon={ChevronRightIcon} />
          </button>
        </div>
      )}
      <Link href={ROUTES.news} aria-label="All legal news" className="shrink-0 hover:text-white/70">
        <Icon icon={ArrowRightIcon} />
      </Link>
    </div>
  );
}
