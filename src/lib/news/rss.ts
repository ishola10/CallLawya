import "server-only";

/** A feed item before any source-specific clean-up. All text is plain (no HTML). */
export type RawFeedItem = {
  title: string;
  link: string;
  /** Description as delivered, after entity decoding (may still contain HTML). */
  descriptionHtml: string;
  categories: string[];
  publishedAt: Date | null;
  image: string | null;
};

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  hellip: "…",
  eacute: "é",
  egrave: "è",
  agrave: "à",
  ccedil: "ç",
  ocirc: "ô",
  uuml: "ü",
  ouml: "ö",
  auml: "ä",
};

export function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : match;
    }
    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/** Unwraps CDATA or decodes XML entities, giving the element's real text content. */
function xmlText(raw: string) {
  const cdata = /^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/.exec(raw);
  return cdata ? cdata[1] : decodeEntities(raw);
}

export function stripHtml(html: string) {
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<(br|\/p|\/div|\/li|\/h\d)\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

const escapeTag = (name: string) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function elements(xml: string, name: string) {
  const tag = escapeTag(name);
  return [...xml.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "gi"))].map((match) => match[1]);
}

function firstElement(xml: string, names: string[]) {
  for (const name of names) {
    const [value] = elements(xml, name);
    if (value !== undefined && value.trim()) return xmlText(value).trim();
  }
  return "";
}

/** Attribute values of an element, e.g. url="…" on <media:content/>. */
function attributes(xml: string, name: string, attribute: string) {
  const tag = escapeTag(name);
  return [...xml.matchAll(new RegExp(`<${tag}\\s[^>]*?${attribute}\\s*=\\s*["']([^"']+)["'][^>]*>`, "gi"))].map(
    (match) => ({ value: decodeEntities(match[1]), element: match[0] }),
  );
}

function parseDate(value: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function itemImage(block: string) {
  const candidates = [
    ...attributes(block, "media:content", "url").filter(({ element }) => !/medium\s*=\s*["'](?!image)/i.test(element)),
    ...attributes(block, "media:thumbnail", "url"),
    ...attributes(block, "enclosure", "url").filter(({ element }) => /type\s*=\s*["']image\//i.test(element)),
  ];
  return candidates[0]?.value ?? null;
}

function parseItem(block: string, isAtom: boolean): RawFeedItem {
  const atomLink =
    attributes(block, "link", "href").find(({ element }) => !/rel\s*=\s*["'](?!alternate)/i.test(element))?.value ?? "";
  return {
    title: stripHtml(firstElement(block, ["title"])),
    link: isAtom ? atomLink : firstElement(block, ["link", "guid"]) || atomLink,
    descriptionHtml: firstElement(block, ["description", "summary", "content:encoded", "content"]),
    categories: [
      ...elements(block, "category").map((value) => stripHtml(xmlText(value))),
      ...attributes(block, "category", "term").map(({ value }) => value),
    ].filter(Boolean),
    publishedAt: parseDate(firstElement(block, ["pubDate", "dc:date", "published", "updated"])),
    image: itemImage(block),
  };
}

/** Parses RSS 2.0, RSS 1.0 (RDF) and Atom. Never throws: malformed input yields no items. */
export function parseFeed(xml: string): RawFeedItem[] {
  const items = elements(xml, "item");
  if (items.length) return items.map((block) => parseItem(block, false));
  return elements(xml, "entry").map((block) => parseItem(block, true));
}
