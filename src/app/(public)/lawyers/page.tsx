import type { Metadata } from "next";
import { LAWYERS_PAGE_SIZE } from "@/constants";
import { getExpertiseStats, getTopLawyers, searchLawyers } from "@/services/lawyers";
import { LawyerDirectory } from "./components";

export const metadata: Metadata = {
  title: "Lawyers Directory",
  description: "Search verified lawyers by name, practice area, location, availability and consultation fee.",
};

export const revalidate = 300;

export default async function LawyersPage() {
  const [initialPage, featured, expertise] = await Promise.all([
    searchLawyers({ limit: LAWYERS_PAGE_SIZE }).catch(() => null),
    getTopLawyers(8).catch(() => []),
    getExpertiseStats().catch(() => []),
  ]);

  return <LawyerDirectory initialPage={initialPage} featured={featured} expertise={expertise} />;
}
