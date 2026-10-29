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

export default function ArticlesPage() {
  return <ArticlesList />;
}
