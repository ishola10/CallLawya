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
