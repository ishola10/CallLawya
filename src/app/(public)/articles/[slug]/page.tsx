import { notFound } from "next/navigation";

// Article pages are hidden for now and return "page not found".
// To restore them, delete ArticlePage below and uncomment the original page underneath.
export default function ArticlePage() {
  notFound();
}

/*
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { getArticle, listArticles } from "@/services/articles";
import { ArticleView } from "../components";

export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

const SLUG_PATTERN = /^[a-z0-9-]{1,100}$/;

const loadArticle = cache(async (slug: string) => (SLUG_PATTERN.test(slug) ? getArticle(slug) : null));

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await loadArticle(slug).catch(() => null);
  if (!article) return { title: "Article", robots: { index: false, follow: true } };
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `${ROUTES.articles}/${article.slug}`,
    ...(article.cover ? { images: [article.cover] } : {}),
    noIndex: true,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await loadArticle(slug);
  if (!article) notFound();

  const more = await listArticles({ limit: 4 })
    .then((page) => page.items.filter((item) => item.slug !== article.slug).slice(0, 3))
    .catch(() => []);

  return <ArticleView article={article} more={more} />;
}
*/
