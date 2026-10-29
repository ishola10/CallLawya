// Backend integration for articles is switched off: articles are stored in the browser for now
// (src/lib/articles/store.ts). To restore, uncomment this file and src/app/api/articles, then switch the
// articles pages and ArticleComposer back to their backend versions (kept in comments in those files).
export {};

/*
import "server-only";
import type {
  Article,
  ArticleCategoryCount,
  ArticlePage,
  ArticleSearchParams,
  ArticleSummary,
} from "@/types/article";
import { ApiError, apiGet, apiUrl } from "./api";

export const ARTICLES_CACHE_TAG = "articles";
const CACHE = { revalidate: 60, tags: [ARTICLES_CACHE_TAG] };

// Hosts allowed in next.config.mjs `images.remotePatterns`; anything else would crash next/image.
const COVER_HOSTS = new Set(["callawyamedia.blob.core.windows.net", "calawya.sfo3.digitaloceanspaces.com"]);

type ApiArticle = {
  id: string;
  slug: string;
  title: string;
  category: string;
  authorName: string;
  authorRole?: string | null;
  excerpt: string;
  body?: string;
  tags?: string[] | null;
  coverUrl?: string | null;
  readMinutes?: number;
  reads?: number;
  createdAt: string;
};

type ApiArticlePage = {
  items: ApiArticle[];
  total: number;
  page: number;
  totalPages: number;
};

function safeCover(url?: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && COVER_HOSTS.has(parsed.hostname) ? url : null;
  } catch {
    return null;
  }
}

function toSummary(article: ApiArticle): ArticleSummary {
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    category: article.category,
    authorName: article.authorName,
    authorRole: article.authorRole?.trim() || null,
    excerpt: article.excerpt,
    tags: article.tags ?? [],
    cover: safeCover(article.coverUrl),
    readMinutes: article.readMinutes ?? 1,
    reads: article.reads ?? 0,
    createdAt: article.createdAt,
  };
}

export const toArticle = (article: ApiArticle): Article => ({ ...toSummary(article), body: article.body ?? "" });

export async function listArticles(params: ArticleSearchParams = {}): Promise<ArticlePage> {
  const data = await apiGet<ApiArticlePage>("/articles", params, CACHE);
  return { items: data.items.map(toSummary), total: data.total, page: data.page, totalPages: data.totalPages };
}

export async function getArticleCategories(): Promise<ArticleCategoryCount[]> {
  return apiGet<ArticleCategoryCount[]>("/articles/categories", undefined, CACHE);
}

export async function getArticle(slug: string): Promise<Article | null> {
  try {
    return toArticle(await apiGet<ApiArticle>(`/articles/${encodeURIComponent(slug)}`, undefined, CACHE));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

async function apiPost<T>(path: string, body: BodyInit | undefined, headers: HeadersInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: { Accept: "application/json", ...headers },
    body,
    cache: "no-store",
  });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(response.status, `CallLawya API ${path} responded ${response.status}`, data);
  return data as T;
}

export async function createArticle(form: FormData, forwardedFor: string | null): Promise<Article> {
  const article = await apiPost<ApiArticle>("/articles", form, forwardedFor ? { "X-Forwarded-For": forwardedFor } : {});
  return toArticle(article);
}

export async function recordArticleRead(slug: string): Promise<number> {
  const { reads } = await apiPost<{ reads: number }>(`/articles/${encodeURIComponent(slug)}/read`, undefined, {});
  return reads;
}
*/
