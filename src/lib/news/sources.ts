import type { NewsRegion, NewsTopicId } from "@/types/news";

export type NewsSource = {
  /** Stable id, used by NEWS_DISABLED_SOURCES / NEWS_ENABLED_SOURCES. */
  id: string;
  name: string;
  feedUrl: string;
  /** Home or section page we must link to when crediting the source. */
  homepage: string;
  /** Attribution text shown in the "Sources" panel on /news. */
  credit: string;
  region: NewsRegion;
  /** Article links must be on one of these hosts (or a subdomain); anything else is dropped. */
  linkHosts: string[];
  /** Off by default; can still be switched on with NEWS_ENABLED_SOURCES. */
  enabled: boolean;
  /** Only show feed images when the source's terms allow it. Otherwise a local fallback image is used. */
  allowImages: boolean;
  /**
   * For feeds without images: use the share-preview image (og:image) the publisher sets on each story
   * page, hot-linked from these hosts only.
   */
  previewImageHosts?: string[];
  /** For broad feeds: keep only items with a clear legal angle. */
  requireLegalSignal?: boolean;
  /** Topics implied by the feed itself, applied as weak matches. */
  defaultTopics?: NewsTopicId[];
  /** Headlines matching this are digests/round-ups with no summary, so they are skipped. */
  skipTitle?: RegExp;
  /** Source-specific clean-up of a parsed item. */
  transform?: "allafrica" | "europarl" | "curia";
  terms: { url: string; checked: string; notes: string };
};

/*
 * Adding or replacing a source
 * 1. Add an entry below (RSS 2.0, RSS 1.0 and Atom feeds are supported).
 * 2. Read the publisher's terms first. Only add feeds that permit display on a commercial website,
 *    and record what you found in `terms`. Set `allowImages` only if images may be shown.
 * 3. Set `linkHosts` to the publisher's domain so only genuine article links get through.
 * 4. Disable a source without a code change: NEWS_DISABLED_SOURCES=allafrica-nigeria,europarl
 *    Force-enable an off-by-default source: NEWS_ENABLED_SOURCES=laws-com
 */
export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "allafrica-legal",
    name: "AllAfrica",
    feedUrl: "https://allafrica.com/tools/headlines/rdf/legalaffairs/headlines.rdf",
    homepage: "https://allafrica.com/legalaffairs/",
    credit: "Headlines via AllAfrica — Legal and Judicial Affairs",
    region: "africa",
    linkHosts: ["allafrica.com"],
    enabled: true,
    allowImages: false,
    previewImageHosts: ["cdn.allafrica.com"],
    skipTitle: /all of africa today|news briefs/i,
    transform: "allafrica",
    terms: {
      url: "https://allafrica.com/misc/tools/rss.html",
      checked: "2026-10-31",
      notes:
        "Headlines may be shown on a website if formatting is kept, AllAfrica is credited and the site links to allafrica.com or the category page. Commercial use is not addressed explicitly, and the stories belong to the originating publishers, so we show headline + short summary only and link out. The feed has no images; we show each story's own share-preview image (og:image), linked back to the story, as social link previews do. Confirm with AllAfrica if you need more certainty.",
    },
  },
  {
    id: "allafrica-human-rights",
    name: "AllAfrica",
    feedUrl: "https://allafrica.com/tools/headlines/rdf/humanrights/headlines.rdf",
    homepage: "https://allafrica.com/humanrights/",
    credit: "Headlines via AllAfrica — Human Rights",
    region: "africa",
    linkHosts: ["allafrica.com"],
    enabled: true,
    allowImages: false,
    previewImageHosts: ["cdn.allafrica.com"],
    defaultTopics: ["human-rights"],
    skipTitle: /all of africa today|news briefs/i,
    transform: "allafrica",
    terms: {
      url: "https://allafrica.com/misc/tools/rss.html",
      checked: "2026-10-29",
      notes: "Same terms as the AllAfrica legal feed.",
    },
  },
  {
    id: "allafrica-nigeria",
    name: "AllAfrica",
    feedUrl: "https://allafrica.com/tools/headlines/rdf/nigeria/headlines.rdf",
    homepage: "https://allafrica.com/nigeria/",
    credit: "Headlines via AllAfrica — Nigeria",
    region: "africa",
    linkHosts: ["allafrica.com"],
    enabled: true,
    allowImages: false,
    previewImageHosts: ["cdn.allafrica.com"],
    requireLegalSignal: true,
    skipTitle: /all of africa today|news briefs/i,
    transform: "allafrica",
    terms: {
      url: "https://allafrica.com/misc/tools/rss.html",
      checked: "2026-10-29",
      notes: "Same terms as the AllAfrica legal feed. General Nigeria news, filtered to stories with a legal angle.",
    },
  },
  {
    id: "curia",
    name: "Court of Justice of the EU",
    feedUrl: "https://curia.europa.eu/site/rss.jsp?lang=en&secondLang=fr",
    homepage: "https://curia.europa.eu/site/jcms/d2_5158/en/press-releases",
    credit: "Press releases: Court of Justice of the European Union (summaries shortened)",
    region: "europe",
    linkHosts: ["curia.europa.eu"],
    enabled: true,
    allowImages: false,
    transform: "curia",
    terms: {
      url: "https://curia.europa.eu/site/jcms/qua1_6625/en/copyright",
      checked: "2026-10-29",
      notes:
        "Editorial content may be reproduced if the source (“Court of Justice of the European Union”) is acknowledged, the meaning is not distorted and changes are indicated. We shorten summaries, so the credit says so.",
    },
  },
  {
    id: "europarl",
    name: "European Parliament",
    feedUrl: "https://www.europarl.europa.eu/rss/doc/press-releases/en.xml",
    homepage: "https://www.europarl.europa.eu/news/en",
    credit: "Press releases: © European Union – Source: European Parliament",
    region: "europe",
    linkHosts: ["europarl.europa.eu"],
    enabled: true,
    allowImages: false,
    requireLegalSignal: true,
    transform: "europarl",
    terms: {
      url: "https://www.europarl.europa.eu/legal-notice/en/",
      checked: "2026-10-29",
      notes:
        "Reuse, including commercial, is authorised if the source is acknowledged; partial reproductions must link to the full item. The EP logo and trademarks may not be used, so we don't. All press releases, filtered to ones with a legal angle.",
    },
  },
  {
    id: "laws-com",
    name: "LAWS.com",
    feedUrl: "https://laws.com/news/rss.xml",
    homepage: "https://laws.com/news",
    credit: "Legal news via LAWS.com",
    region: "international",
    linkHosts: ["laws.com"],
    // Off: the feed sits behind a Vercel bot challenge that only lets browsers through (HTTP 429 for our
    // server, tested 2026-10-29). We won't spoof a browser to get past it. LAWS.com invites sites to use
    // its feeds, so ask pr@laws.com to allow "CallLawyaNewsBot", then set NEWS_ENABLED_SOURCES=laws-com.
    enabled: false,
    allowImages: true,
    terms: {
      url: "https://laws.com/rss",
      checked: "2026-10-29",
      notes:
        "Free feeds explicitly offered for use on other websites, with headline, summary, image and link. US-focused, so it appears under “All regions”.",
    },
  },
  /*
   * Considered and not used:
   * - Law Society Gazette (lawgazette.co.uk): site terms forbid commercial use without a licence (via PLSclear).
   * - Law.com: requires "From Law.com" attribution and ALM can withdraw it at any time; mostly paywalled US content.
   */
];

function idList(value: string | undefined) {
  return new Set(
    (value ?? "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean),
  );
}

export function activeNewsSources() {
  const disabled = idList(process.env.NEWS_DISABLED_SOURCES);
  const forced = idList(process.env.NEWS_ENABLED_SOURCES);
  return NEWS_SOURCES.filter((source) => !disabled.has(source.id) && (source.enabled || forced.has(source.id)));
}
