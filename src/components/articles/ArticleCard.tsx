import Image from "next/image";
import Link from "next/link";
import { EyeIcon, PenLineIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import type { ArticleSummary } from "@/types/article";

export const articleDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" });

export const formatReads = (reads: number) => `${reads.toLocaleString("en-US")} ${reads === 1 ? "read" : "reads"}`;

export default function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(10,37,64,.12)]"
    >
      <div className="relative h-48 overflow-hidden">
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-end bg-navy p-6">
            <Icon icon={PenLineIcon} strokeWidth={1.25} className="text-5xl text-brand-light" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">{article.category}</p>
        <h3 className="mt-2 line-clamp-2 font-serif text-2xl font-bold leading-snug group-hover:text-brand">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{article.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
          <span className="min-w-0 truncate">
            <strong className="text-navy">{article.authorName}</strong> · {articleDate.format(new Date(article.createdAt))}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-slate-600">
            <Icon icon={EyeIcon} className="text-brand" /> {formatReads(article.reads)}
          </span>
        </div>
      </div>
    </Link>
  );
}
