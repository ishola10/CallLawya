import { notFound } from "next/navigation";

// The "Post an article" page is hidden for now and returns "page not found".
// To restore it, delete NewArticlePage below and uncomment the original page underneath.
export default function NewArticlePage() {
  notFound();
}

/*
import type { Metadata } from "next";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { ArticleComposer } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Post an Article",
  description: "Write, preview and post an article for the CallLawya Newsroom.",
  path: ROUTES.writeArticle,
  noIndex: true,
});

export default function NewArticlePage() {
  return <ArticleComposer />;
}
*/
