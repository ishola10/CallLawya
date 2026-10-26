import type { Metadata } from "next";
import { JsonLd } from "@/components/common";
import { LAWYERS_PAGE_SIZE, ROUTES } from "@/constants";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { getExpertiseStats, getTopLawyers, searchLawyers } from "@/services/lawyers";
import { LawyerDirectory } from "./components";

export const metadata: Metadata = pageMetadata({
  title: "Find a Lawyer in Nigeria — Verified Lawyers Directory",
  description:
    "Search verified Nigerian lawyers by name, practice area, location, availability and consultation fee. Compare profiles and book a consultation on CallLawya.",
  path: ROUTES.lawyers,
});

export const revalidate = 300;

export default async function LawyersPage() {
  const [initialPage, featured, expertise] = await Promise.all([
    searchLawyers({ limit: LAWYERS_PAGE_SIZE }).catch(() => null),
    getTopLawyers(8).catch(() => []),
    getExpertiseStats().catch(() => []),
  ]);

  const directoryStructuredData = initialPage && {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verified lawyers on CallLawya",
    numberOfItems: initialPage.total,
    itemListElement: initialPage.items.map((lawyer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`${ROUTES.lawyers}/${lawyer.id}`),
      name: lawyer.name,
    })),
  };

  return (
    <>
      {directoryStructuredData && <JsonLd data={directoryStructuredData} />}
      <LawyerDirectory initialPage={initialPage} featured={featured} expertise={expertise} />
    </>
  );
}
