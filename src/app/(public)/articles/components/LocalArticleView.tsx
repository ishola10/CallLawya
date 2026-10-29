"use client";

import Link from "next/link";
import { useEffect, useSyncExternalStore } from "react";
import { ArrowLeftIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";
import { recordRead, useArticle, useArticles } from "@/lib/articles/store";
import ArticleView from "./ArticleView";

const subscribeNoop = () => () => {};

/** Loads the article from browser storage (backend integration switched off). */
export default function LocalArticleView({ slug }: { slug: string }) {
  const article = useArticle(slug);
  const articles = useArticles();
  const hydrated = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    if (article) recordRead(slug);
  }, [article, slug]);

  if (!hydrated) return <div className="min-h-[60vh] bg-paper" />;

  if (!article) {
    return (
      <section className="page-x section-y bg-paper">
        <div className="mx-auto max-w-xl rounded-xl bg-white p-10 text-center shadow-sm">
          <h1 className="font-serif text-3xl font-bold">Article not found.</h1>
          <p className="mt-3 text-slate-600">
            This article may have been removed, or it was posted from a different browser or device.
          </p>
          <Link
            href={ROUTES.articles}
            className="press mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover"
          >
            <Icon icon={ArrowLeftIcon} /> All articles
          </Link>
        </div>
      </section>
    );
  }

  const more = articles.filter((item) => item.slug !== slug).slice(0, 3);
  return <ArticleView article={article} more={more} />;
}
