export const NEWS_TOPICS = [
  { id: "land-property", label: "Land & Property" },
  { id: "family", label: "Family Law" },
  { id: "criminal", label: "Criminal" },
  { id: "business", label: "Business" },
  { id: "human-rights", label: "Human Rights" },
  { id: "tech-ip", label: "Tech & IP" },
] as const;

export const NEWS_REGIONS = [
  { id: "africa", label: "Africa" },
  { id: "europe", label: "Europe" },
] as const;

/** How often feeds are re-fetched. Most of our sources update every 15–60 minutes. */
export const NEWS_REVALIDATE_SECONDS = 1800;
