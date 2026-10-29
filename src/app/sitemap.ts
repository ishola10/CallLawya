import type { MetadataRoute } from "next";
import { ROUTES } from "@/constants";
import { absoluteUrl } from "@/lib/seo";
import { searchLawyers } from "@/services/lawyers";

export const revalidate = 3600;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" }[] = [
  { path: ROUTES.home, priority: 1, changeFrequency: "weekly" },
  { path: ROUTES.lawyers, priority: 0.9, changeFrequency: "daily" },
  { path: ROUTES.features, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.howItWorks, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.joinAsLawyer, priority: 0.8, changeFrequency: "monthly" },
  { path: ROUTES.download, priority: 0.7, changeFrequency: "monthly" },
  { path: ROUTES.about, priority: 0.7, changeFrequency: "monthly" },
  { path: ROUTES.contact, priority: 0.6, changeFrequency: "yearly" },
  { path: ROUTES.support, priority: 0.6, changeFrequency: "monthly" },
  { path: ROUTES.news, priority: 0.5, changeFrequency: "daily" },
  { path: ROUTES.privacy, priority: 0.3, changeFrequency: "yearly" },
  { path: ROUTES.terms, priority: 0.3, changeFrequency: "yearly" },
  { path: ROUTES.security, priority: 0.3, changeFrequency: "yearly" },
];

const PAGE_SIZE = 50;
const MAX_PAGES = 40;

async function allLawyerIds() {
  const ids: string[] = [];
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const result = await searchLawyers({ limit: PAGE_SIZE, page });
      ids.push(...result.items.map((lawyer) => lawyer.id));
      if (page >= result.totalPages) break;
    }
  } catch (error) {
    console.error("Sitemap: could not load lawyer profiles", error);
  }
  return ids;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const lawyerIds = await allLawyerIds();

  return [
    ...STATIC_ROUTES.map(({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...lawyerIds.map((id) => ({
      url: absoluteUrl(`${ROUTES.lawyers}/${id}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
