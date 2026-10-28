export type ArticleSort = "latest" | "most-read";

export type ArticleSummary = {
  id: string;
  slug: string;
  title: string;
  category: string;
  authorName: string;
  authorRole: string | null;
  excerpt: string;
  tags: string[];
  cover: string | null;
  readMinutes: number;
  reads: number;
  createdAt: string;
};

export type Article = ArticleSummary & {
  body: string;
};

export type ArticleSearchParams = {
  search?: string;
  category?: string;
  sort?: ArticleSort;
  page?: number;
  limit?: number;
};

export type ArticlePage = {
  items: ArticleSummary[];
  total: number;
  page: number;
  totalPages: number;
};

export type ArticleCategoryCount = {
  category: string;
  count: number;
};
