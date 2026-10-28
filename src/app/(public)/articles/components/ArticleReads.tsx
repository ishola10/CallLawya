"use client";

import { useEffect, useState } from "react";
import { EyeIcon } from "@/assets/icons";
import { formatReads } from "@/components/articles";
import { Icon } from "@/components/common";

const storageKey = (slug: string) => `calllawya:read:${slug}`;

function sessionGet(key: string) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function sessionSet(key: string, value: string | null) {
  try {
    if (value === null) window.sessionStorage.removeItem(key);
    else window.sessionStorage.setItem(key, value);
  } catch {
    // Session storage unavailable (e.g. strict privacy mode): reads are still counted, just not de-duplicated.
  }
}

export default function ArticleReads({ slug, initialReads }: { slug: string; initialReads: number }) {
  const [reads, setReads] = useState(initialReads);

  useEffect(() => {
    const key = storageKey(slug);
    const seen = sessionGet(key);
    // Already counted this session. The page can be cached for a minute, so never show fewer reads than last time.
    if (seen !== null) {
      setReads((current) => Math.max(current, Number(seen) || 0));
      return;
    }
    sessionSet(key, String(initialReads));
    fetch(`/api/articles/${encodeURIComponent(slug)}/read`, { method: "POST" })
      .then((response) => (response.ok ? (response.json() as Promise<{ reads: number }>) : null))
      .then((data) => {
        if (typeof data?.reads !== "number") return;
        setReads(data.reads);
        sessionSet(key, String(data.reads));
      })
      .catch(() => sessionSet(key, null));
  }, [slug, initialReads]);

  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
      <Icon icon={EyeIcon} className="text-brand" /> {formatReads(reads)}
    </span>
  );
}
