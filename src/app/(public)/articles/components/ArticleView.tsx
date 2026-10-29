import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, EyeIcon, InfoIcon, PlusIcon } from "@/assets/icons";
import { ArticleBody, ArticleCard, articleDate, formatReads } from "@/components/articles";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";
import type { Article, ArticleSummary } from "@/types/article";

export default function ArticleView({ article, more }: { article: Article; more: ArticleSummary[] }) {
  return (
    <>
      <article className="page-x section-y bg-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href={ROUTES.articles}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-brand"
          >
            <Icon icon={ArrowLeftIcon} /> All articles
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-widest text-brand">{article.category}</p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">{article.title}</h1>
          <p className="mt-5 text-xl leading-8 text-slate-600">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-slate-200 py-4 text-sm text-slate-500">
            <span className="font-bold text-navy">{article.authorName}</span>
            {article.authorRole && <span>{article.authorRole}</span>}
            <span>{articleDate.format(new Date(article.createdAt))}</span>
            <span>{article.readMinutes} min read</span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600">
              <Icon icon={EyeIcon} className="text-brand" /> {formatReads(article.reads)}
            </span>
          </div>
          {article.cover && (
            <div className="relative mt-8 h-72 overflow-hidden rounded-lg md:h-[420px]">
              <Image src={article.cover} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" preload />
            </div>
          )}
          <div className="mt-8">
            <ArticleBody body={article.body} />
          </div>
          {article.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-slate-600">
                  #{tag}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-10 flex gap-3 rounded-lg border border-slate-200 bg-paper p-4 text-sm leading-6 text-slate-600">
            <Icon icon={InfoIcon} className="mt-0.5 text-base text-brand" />
            This article provides general legal information and is not legal advice. For advice about your situation,
            speak to a qualified lawyer.
          </p>
        </div>
      </article>

      <section className="page-x section-y bg-paper">
        <div className="flex flex-col gap-4 border-t-4 border-black pt-5 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{more.length ? "More articles" : "Share your expertise"}</h2>
          <Link
            href={ROUTES.writeArticle}
            className="press inline-flex items-center gap-2 self-start rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover"
          >
            <Icon icon={PlusIcon} /> Post an article
          </Link>
        </div>
        {more.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {more.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
