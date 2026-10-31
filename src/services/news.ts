import "server-only";
import { NEWS_REVALIDATE_SECONDS } from "@/constants/news";
import { classify, hasLegalSignal } from "@/lib/news/classify";
import { parseFeed, stripHtml, type RawFeedItem } from "@/lib/news/rss";
import { activeNewsSources, type NewsSource } from "@/lib/news/sources";
import type { NewsArticle, NewsFeed, NewsSourceStatus } from "@/types/news";

export const NEWS_CACHE_TAG = "news";

const USER_AGENT = "Mozilla/5.0 (compatible; CallLawyaNewsBot/1.0; +https://calllawya.com/news)";
const FETCH_TIMEOUT_MS = 10_000;
const MAX_FEED_BYTES = 2_000_000;
const MAX_ITEMS_PER_SOURCE = 40;
const MAX_ARTICLES = 150;
const MAX_AGE_DAYS = 120;
const SUMMARY_LENGTH = 240;
const PREVIEW_IMAGE_LIMIT = 36;
const PREVIEW_CONCURRENCY = 6;
const PREVIEW_TIMEOUT_MS = 6_000;
const PREVIEW_REVALIDATE_SECONDS = 86_400;
const MAX_PAGE_BYTES = 400_000;
/** Publishers fall back to their logo when a story has no photo; a logo is worse than our own image. */
const GENERIC_IMAGE = /logo|placeholder|default|\/static\/images\/structure\//i;

type Item = RawFeedItem & { publisher: string; summary: string };

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max * 0.6)).replace(/[\s,.;:–—-]+$/, "")}…`;
}

function safeUrl(value: string, hosts: string[]) {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase();
    if (!hosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) return null;
    url.protocol = "https:";
    url.hash = "";
    [...url.searchParams.keys()].filter((key) => /^utm_|^fbclid$|^gclid$/i.test(key)).forEach((key) => url.searchParams.delete(key));
    return url.toString();
  } catch {
    return null;
  }
}

function safeImage(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Source-specific clean-up: real headline, original publisher and a plain-text summary. */
function normaliseItem(source: NewsSource, item: RawFeedItem): Item {
  const text = stripHtml(item.descriptionHtml);

  if (source.transform === "allafrica") {
    // AllAfrica descriptions start with the original outlet in brackets: "[Premium Times] Summary…"
    const match = /^\[([^\]]{1,80})\]\s*(.*)$/.exec(text);
    const outlet = match?.[1].trim();
    return {
      ...item,
      publisher: !outlet || /^allafrica$/i.test(outlet) ? "AllAfrica" : outlet,
      summary: (match ? match[2] : text).trim(),
    };
  }

  if (source.transform === "curia") {
    // Titles are just "152/2026 : 22 October 2026 - Judgment of the Court in Case C-…"; the readable
    // press-release headline is the last paragraph of the description.
    const paragraphs = [...item.descriptionHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((match) => stripHtml(match[1]));
    const headline = paragraphs.filter(Boolean).at(-1) ?? "";
    const label = item.title.replace(/^\d+\/\d{4}\s*:\s*[^-]+-\s*/, "").trim();
    const cases = stripHtml(item.descriptionHtml.split(/<br\s*\/?>/i)[0] ?? "");
    return {
      ...item,
      title: headline || label || item.title,
      publisher: "Court of Justice of the EU",
      summary: [label, cases].filter(Boolean).join(": "),
    };
  }

  if (source.transform === "europarl") {
    return {
      ...item,
      title: item.title.replace(/^press release\s*-\s*/i, ""),
      publisher: "European Parliament",
      summary: text.replace(/\s*Source\s*:\s*©.*$/i, "").trim(),
    };
  }

  return { ...item, publisher: source.name, summary: text };
}

async function fetchSource(source: NewsSource): Promise<{ status: NewsSourceStatus; articles: NewsArticle[] }> {
  const status: NewsSourceStatus = {
    id: source.id,
    name: source.name,
    url: source.homepage,
    credit: source.credit,
    region: source.region,
    ok: false,
    count: 0,
  };

  try {
    const response = await fetch(source.feedUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/rss+xml, application/rdf+xml, application/atom+xml, application/xml;q=0.9, text/xml;q=0.8",
        "Accept-Language": "en",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: NEWS_REVALIDATE_SECONDS, tags: [NEWS_CACHE_TAG] },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    if (xml.length > MAX_FEED_BYTES) throw new Error("Feed too large");

    const now = Date.now();
    const oldest = now - MAX_AGE_DAYS * 86_400_000;
    const articles: NewsArticle[] = [];

    for (const raw of parseFeed(xml)) {
      if (articles.length >= MAX_ITEMS_PER_SOURCE) break;
      const item = normaliseItem(source, raw);
      const url = safeUrl(item.link, source.linkHosts);
      const published = item.publishedAt?.getTime();
      if (!url || !item.title || !published || published < oldest || published > now + 3_600_000) continue;
      if (source.skipTitle?.test(item.title) && !item.summary) continue;
      if (source.requireLegalSignal && !hasLegalSignal(item.title, item.summary)) continue;

      articles.push({
        id: url,
        title: truncate(item.title, 200),
        url,
        publisher: item.publisher,
        source: { id: source.id, name: source.name, url: source.homepage },
        region: source.region,
        publishedAt: new Date(published).toISOString(),
        summary: item.summary ? truncate(item.summary, SUMMARY_LENGTH) : null,
        image: source.allowImages ? safeImage(item.image) : null,
        topics: classify(item.title, item.summary, item.categories, source.defaultTopics),
      });
    }

    status.ok = true;
    status.count = articles.length;
    return { status, articles };
  } catch (error) {
    console.warn(`News source "${source.id}" unavailable:`, error instanceof Error ? error.message : error);
    return { status, articles: [] };
  }
}

const titleKey = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 90);

/** Same story from two feeds: keep the first copy, but combine the topic suggestions. */
function dedupe(articles: NewsArticle[]) {
  const byKey = new Map<string, NewsArticle>();
  const result: NewsArticle[] = [];
  for (const article of articles) {
    const existing = byKey.get(article.url) ?? byKey.get(titleKey(article.title));
    if (existing) {
      for (const topic of article.topics) {
        const match = existing.topics.find((current) => current.id === topic.id);
        if (!match) existing.topics.push(topic);
        else if (topic.confidence === "strong") match.confidence = "strong";
      }
      continue;
    }
    const copy = { ...article, topics: [...article.topics] };
    byKey.set(article.url, copy);
    byKey.set(titleKey(article.title), copy);
    result.push(copy);
  }
  return result;
}

const decodeEntities = (value: string) =>
  value.replace(/&amp;/g, "&").replace(/&#0?38;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");

/** The share-preview image a publisher sets on a story page (og:image, then twitter:image). */
async function previewImage(articleUrl: string, hosts: string[]) {
  try {
    const response = await fetch(articleUrl, {
      headers: { "User-Agent": USER_AGENT, Accept: "text/html", "Accept-Language": "en" },
      signal: AbortSignal.timeout(PREVIEW_TIMEOUT_MS),
      next: { revalidate: PREVIEW_REVALIDATE_SECONDS, tags: [NEWS_CACHE_TAG] },
    });
    if (!response.ok) return null;
    const html = (await response.text()).slice(0, MAX_PAGE_BYTES);
    const headEnd = html.search(/<\/head>/i);
    const head = headEnd > 0 ? html.slice(0, headEnd) : html;
    for (const property of ["og:image:secure_url", "og:image", "twitter:image"]) {
      for (const [tag] of head.matchAll(/<meta\b[^>]*>/gi)) {
        if (!new RegExp(`(?:property|name)\\s*=\\s*["']${property}["']`, "i").test(tag)) continue;
        const content = /content\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
        const url = content ? safeUrl(decodeEntities(content), hosts) : null;
        if (url && !GENERIC_IMAGE.test(url)) return url;
      }
    }
  } catch {
    // Slow or unreachable story page: the local fallback image is used instead.
  }
  return null;
}

async function addPreviewImages(articles: NewsArticle[], sources: NewsSource[]) {
  const hostsBySource = new Map(sources.map((source) => [source.id, source.previewImageHosts]));
  const pending = articles
    .filter((article) => !article.image && hostsBySource.get(article.source.id)?.length)
    .slice(0, PREVIEW_IMAGE_LIMIT);
  let next = 0;
  const worker = async () => {
    while (next < pending.length) {
      const article = pending[next++];
      article.image = await previewImage(article.url, hostsBySource.get(article.source.id) ?? []);
    }
  };
  await Promise.all(Array.from({ length: PREVIEW_CONCURRENCY }, worker));
}

export async function getNews(): Promise<NewsFeed> {
  const sources = activeNewsSources();
  const results = await Promise.all(sources.map(fetchSource));
  const articles = dedupe(results.flatMap((result) => result.articles))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, MAX_ARTICLES);
  await addPreviewImages(articles, sources);

  return {
    articles,
    sources: results.map((result) => result.status),
    fetchedAt: new Date().toISOString(),
  };
}
