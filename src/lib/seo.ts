import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://calllawya.com").replace(/\/$/, "");
export const SITE_NAME = "CallLawya";
export const DEFAULT_TITLE = "CallLawya | Find Verified Lawyers & Book Legal Consultations in Nigeria";
export const DEFAULT_DESCRIPTION =
  "Find verified Nigerian lawyers, compare consultation fees and book call or chat consultations on CallLawya. Prepare with Lex AI and keep your legal matters organised.";

export const SEO_KEYWORDS = [
  "CallLawya",
  "Call Lawya",
  "find a lawyer in Nigeria",
  "lawyers in Nigeria",
  "verified lawyers",
  "online legal consultation",
  "book a lawyer",
  "legal advice Nigeria",
  "lawyers in Lagos",
  "lawyers in Abuja",
  "Lex AI",
  "legal app Nigeria",
];

export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  images?: string[];
  noIndex?: boolean;
};

const DEFAULT_SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "CallLawya — find verified lawyers and book legal consultations in Nigeria",
};

export function pageMetadata({
  title,
  description,
  path,
  images = [DEFAULT_SHARE_IMAGE.url],
  noIndex,
}: PageMetadataOptions): Metadata {
  const shareImages = images.map((url) => (url === DEFAULT_SHARE_IMAGE.url ? DEFAULT_SHARE_IMAGE : url));
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_NG",
      url: path,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: shareImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: shareImages,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
