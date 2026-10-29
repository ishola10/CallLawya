"use client";

import { useSyncExternalStore } from "react";
import type { Article } from "@/types/article";
import { SAMPLE_ARTICLES, SEED_SAMPLE_ARTICLES } from "./samples";

export type NewArticle = Omit<Article, "id" | "slug" | "reads" | "createdAt">;

const STORAGE_KEY = "calllawya:articles";
const SEEDED_KEY = "calllawya:articles-seeded";
const CHANGE_EVENT = "calllawya:articles-changed";
const EMPTY: Article[] = [];

let cachedRaw: string | null = null;
let cachedArticles: Article[] = EMPTY;

function readAll(): Article[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedArticles;
  cachedRaw = raw;
  try {
    cachedArticles = raw ? (JSON.parse(raw) as Article[]) : EMPTY;
  } catch {
    cachedArticles = EMPTY;
  }
  return cachedArticles;
}

function writeAll(articles: Article[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function seedSampleArticles() {
  if (!SEED_SAMPLE_ARTICLES || window.localStorage.getItem(SEEDED_KEY)) return;
  const existing = readAll();
  const existingIds = new Set(existing.map((article) => article.id));
  try {
    writeAll([...existing, ...SAMPLE_ARTICLES.filter((article) => !existingIds.has(article.id))]);
    window.localStorage.setItem(SEEDED_KEY, "1");
  } catch {
    // Storage full or unavailable: carry on without the samples.
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  seedSampleArticles();
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

/** Newest first. Returns [] on the server and before hydration. */
export function useArticles() {
  return useSyncExternalStore(subscribe, readAll, () => EMPTY);
}

export function useArticle(slug: string) {
  const articles = useArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .slice(0, 70)
    .replace(/-+$/, "");

export class ArticleStorageFullError extends Error {}

export function saveArticle(input: NewArticle): Article {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const article: Article = {
    ...input,
    id,
    slug: `${slugify(input.title) || "article"}-${id.slice(-5)}`,
    reads: 0,
    createdAt: new Date().toISOString(),
  };
  try {
    writeAll([article, ...readAll()]);
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new ArticleStorageFullError("There isn't enough browser storage to save this article.");
    }
    throw error;
  }
  return article;
}

/** Counts once per browser session. */
export function recordRead(slug: string) {
  const sessionKey = `calllawya:read:${slug}`;
  if (window.sessionStorage.getItem(sessionKey)) return;
  const articles = readAll();
  if (!articles.some((article) => article.slug === slug)) return;
  window.sessionStorage.setItem(sessionKey, "1");
  writeAll(articles.map((article) => (article.slug === slug ? { ...article, reads: article.reads + 1 } : article)));
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Could not read the image."));
    reader.readAsDataURL(blob);
  });
}
