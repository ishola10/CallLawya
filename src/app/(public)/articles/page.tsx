import type { Metadata } from "next";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { ArticlesList } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Articles",
  description: "Practical legal guides and insights from the CallLawya Newsroom.",
  path: ROUTES.articles,
  noIndex: true,
});

// Articles are read from browser storage while the backend integration is switched off.
export default function ArticlesPage() {
  return <ArticlesList />;
}

/* Backend version (switched off). To restore: replace ArticlesPage above with this, restore the backend
   ArticlesList from git, and uncomment src/services/articles.ts and src/app/api/articles.

import { ARTICLES_PAGE_SIZE } from "@/constants";
import { getArticleCategories, listArticles } from "@/services/articles";

export const revalidate = 60;

export default async function ArticlesPage() {
  const [initialPage, categories] = await Promise.all([
    listArticles({ limit: ARTICLES_PAGE_SIZE }).catch(() => null),
    getArticleCategories().catch(() => []),
  ]);

  return <ArticlesList initialPage={initialPage} categories={categories} />;
}
*/
