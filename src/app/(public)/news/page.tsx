import type { Metadata } from "next";
import { ROUTES } from "@/constants";
import { pageMetadata } from "@/lib/seo";
import { getTopLawyers } from "@/services/lawyers";
import { getNews } from "@/services/news";
import type { NewsFeed } from "@/types/news";
import { NewsRoom } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Legal News — Africa & Europe",
  description:
    "The latest legal news from Africa and Europe on property, family, criminal, business, human rights and tech law, with links to the original publishers.",
  path: ROUTES.news,
});

// Keep in sync with NEWS_REVALIDATE_SECONDS (route config must be a literal).
export const revalidate = 1800;

export default async function NewsPage() {
  const [feed, topLawyers] = await Promise.all([
    getNews().catch((error): NewsFeed => {
      console.error("News page failed to load feeds", error);
      return { articles: [], sources: [], fetchedAt: new Date().toISOString() };
    }),
    getTopLawyers(2).catch(() => []),
  ]);

  return <NewsRoom feed={feed} topLawyers={topLawyers} />;
}
