import { notFound } from "next/navigation";

// The article flow is hidden for now and returns "page not found".
// To restore it, delete NewArticlePage below and uncomment the original page underneath.
export default function NewArticlePage() {
  notFound();
}

/*
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArticleComposer } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Write an Article",
  description: "Write and preview an article for the CallLawya Newsroom.",
  path: "/articles/new",
  noIndex: true,
});

export default function NewArticlePage() {
  return <ArticleComposer />;
}
*/
