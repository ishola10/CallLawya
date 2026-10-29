import type { NewsTopicId, NewsTopicMatch } from "@/types/news";

type TopicRule = {
  /** Whole words or phrases matched against the publisher's own categories. */
  categories: string[];
  /** Whole words or phrases matched against headline and summary. */
  keywords: string[];
};

const RULES: Record<NewsTopicId, TopicRule> = {
  "land-property": {
    categories: ["land", "property", "housing", "real estate", "urban"],
    keywords: [
      "land", "lands", "landlord", "landlords", "tenant", "tenants", "tenancy", "eviction", "evictions", "evicted",
      "property", "properties", "real estate", "housing", "mortgage", "title deed", "certificate of occupancy",
      "land grabbing", "demolition", "demolitions", "rent", "lease", "estate developers", "land use act",
    ],
  },
  family: {
    categories: ["family", "children"],
    keywords: [
      "divorce", "custody", "child support", "marriage", "married", "matrimonial", "inheritance", "widow", "widows",
      "domestic violence", "adoption", "alimony", "child marriage", "family court", "guardianship", "paternity",
      "spouse", "will and testament", "succession", "early marriage", "protective order", "protective orders",
      "protection order", "protection orders",
    ],
  },
  criminal: {
    categories: ["crime", "corruption", "terrorism"],
    keywords: [
      "arrest", "arrested", "arrests", "police", "prosecution", "prosecute", "prosecuted", "prosecutor", "charged",
      "convicted", "conviction", "sentenced", "sentence", "murder", "murdered", "fraud", "robbery", "kidnap",
      "kidnapped", "kidnapping", "trafficking", "drug", "drugs", "cannabis", "prison", "prisons", "jail", "jailed",
      "bail", "detained", "detention", "extradition", "efcc", "icpc", "ndlea", "criminal", "homicide", "theft",
      "cybercrime", "terrorism", "terrorist", "money laundering", "suspect", "suspects", "remand", "custodial",
    ],
  },
  business: {
    categories: ["business", "economy", "trade", "company", "companies", "banking", "finance", "competition"],
    keywords: [
      "company", "companies", "corporate", "merger", "mergers", "acquisition", "antitrust", "competition law",
      "contract", "contracts", "tax", "taxes", "taxation", "bank", "banks", "banking", "securities", "insolvency",
      "bankruptcy", "investors", "investment", "trade", "commercial", "cac", "procurement", "state aid", "consumer",
      "consumers", "tariff", "tariffs", "shareholders", "fccpc", "sec",
    ],
  },
  "human-rights": {
    categories: ["human rights", "civil liberties", "refugees", "migration", "gender", "press freedom", "democracy"],
    keywords: [
      "human rights", "rights", "freedom", "freedoms", "abuse", "abuses", "torture", "asylum", "refugee", "refugees",
      "discrimination", "equality", "gender", "journalist", "journalists", "press freedom", "protest", "protesters",
      "disappeared", "extrajudicial", "rule of law", "civil liberties", "migrants", "sakharov", "democracy",
      "fundamental rights", "hrw", "amnesty", "accountability", "free speech", "freedom of expression",
    ],
  },
  "tech-ip": {
    categories: ["technology", "science", "ict", "digital", "telecom", "intellectual property", "innovation"],
    keywords: [
      "technology", "digital", "data protection", "privacy", "cyber", "artificial intelligence", "ai", "copyright",
      "patent", "patents", "trademark", "trademarks", "intellectual property", "software", "internet", "social media",
      "telecom", "telecoms", "online platforms", "gdpr", "ndpc", "fintech", "crypto", "cryptocurrency", "startup",
      "startups", "app", "apps", "algorithm", "deepfake", "chatbot",
    ],
  },
};

/** Words that show a story has a legal angle, used to filter broad (non-legal) feeds. */
const LEGAL_SIGNALS = [
  "court", "courts", "judge", "judges", "judgment", "judgement", "ruling", "ruled", "tribunal", "supreme court",
  "high court", "court of appeal", "court of justice", "lawyer", "lawyers", "legal", "law", "laws", "lawsuit", "sue",
  "sued", "legislation", "constitution", "constitutional", "amendment", "regulation", "regulations", "directive",
  "prosecution", "prosecutor", "prosecutors", "arrest", "arrested", "charged", "convicted", "sentenced", "bail",
  "trial", "verdict", "attorney", "attorney-general", "ministry of justice", "human rights", "fundamental rights",
  "civil liberties", "rule of law", "efcc", "icpc", "ndlea", "police", "detained", "data protection", "gdpr",
];

const normalise = (text: string) => ` ${text.toLowerCase().replace(/[^a-z0-9'&-]+/g, " ")} `;
const hasTerm = (text: string, term: string) => text.includes(` ${term} `);

export function hasLegalSignal(title: string, summary: string) {
  const text = normalise(`${title} ${summary}`);
  return LEGAL_SIGNALS.some((term) => hasTerm(text, term));
}

/**
 * Suggests topics from the publisher's categories and keywords. Scores: publisher category 3,
 * keyword in headline 2, keyword in summary 1 (counted once per field). 3+ is "strong", 2 is "weak".
 */
export function classify(
  title: string,
  summary: string,
  categories: string[],
  defaultTopics: NewsTopicId[] = [],
): NewsTopicMatch[] {
  const headline = normalise(title);
  const body = normalise(summary);
  const feedCategories = categories.map(normalise);

  const scored = (Object.entries(RULES) as [NewsTopicId, TopicRule][]).map(([id, rule]) => {
    let score = 0;
    if (feedCategories.some((category) => rule.categories.some((term) => hasTerm(category, term)))) score += 3;
    if (rule.keywords.some((term) => hasTerm(headline, term))) score += 2;
    if (rule.keywords.some((term) => hasTerm(body, term))) score += 1;
    if (defaultTopics.includes(id)) score = Math.max(score, 2);
    return { id, score };
  });

  return scored
    .filter((topic) => topic.score >= 2)
    .sort((a, b) => b.score - a.score)
    .map(({ id, score }) => ({ id, confidence: score >= 3 ? "strong" : "weak" }));
}
