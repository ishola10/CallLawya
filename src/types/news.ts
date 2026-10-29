import type { NEWS_REGIONS, NEWS_TOPICS } from "@/constants/news";

export type NewsTopicId = (typeof NEWS_TOPICS)[number]["id"];

/** "international" sources appear under "All regions" only. */
export type NewsRegion = (typeof NEWS_REGIONS)[number]["id"] | "international";

export type NewsTopicMatch = {
  id: NewsTopicId;
  /** "strong": the publisher's own category or several keywords agree. "weak": a single keyword hint. */
  confidence: "strong" | "weak";
};

export type NewsArticle = {
  id: string;
  title: string;
  url: string;
  /** The outlet that wrote the story, e.g. "Premium Times". */
  publisher: string;
  /** The feed we got it from, credited alongside the publisher. */
  source: { id: string; name: string; url: string };
  region: NewsRegion;
  publishedAt: string;
  summary: string | null;
  /** Remote image, only for sources whose terms allow showing their images. */
  image: string | null;
  topics: NewsTopicMatch[];
};

export type NewsSourceStatus = {
  id: string;
  name: string;
  url: string;
  credit: string;
  region: NewsRegion;
  ok: boolean;
  count: number;
};

export type NewsFeed = {
  articles: NewsArticle[];
  sources: NewsSourceStatus[];
  fetchedAt: string;
};
