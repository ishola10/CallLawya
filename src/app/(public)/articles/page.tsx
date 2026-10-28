import { notFound } from "next/navigation";

// The Articles page is hidden for now and returns "page not found".
// To restore it, delete ArticlesPage below and uncomment the original page underneath
// (and the matching files in articles/[slug], articles/new and api/articles).
export default function ArticlesPage() {
  notFound();
}

/*
import type { Metadata } from "next";
import { ARTICLES_PAGE_SIZE, ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { getArticleCategories, listArticles } from "@/services/articles";
import { ArticlesList } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Articles",
  description: "Practical legal guides and insights from the CallLawya Newsroom.",
  path: ROUTES.articles,
  noIndex: true,
});

export const revalidate = 60;

export default async function ArticlesPage() {
  const [initialPage, categories] = await Promise.all([
    listArticles({ limit: ARTICLES_PAGE_SIZE }).catch(() => null),
    getArticleCategories().catch(() => []),
  ]);

  return <ArticlesList initialPage={initialPage} categories={categories} />;
}
*/
