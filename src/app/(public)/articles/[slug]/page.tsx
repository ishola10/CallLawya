import type { Metadata } from "next";
import { LocalArticleView } from "../components";

export const metadata: Metadata = {
  title: "Article",
  robots: { index: false, follow: true },
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <LocalArticleView slug={slug} />;
}
