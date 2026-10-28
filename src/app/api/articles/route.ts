import { NextResponse } from "next/server";

// The articles API is hidden with the Articles pages and answers "not found".
// To restore it, delete the two handlers below and uncomment the original code underneath.
const hidden = () => NextResponse.json({ error: "Not found" }, { status: 404 });
export { hidden as GET, hidden as POST };

/*
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { ARTICLES_PAGE_SIZE } from "@/constants";
import { ARTICLE_CATEGORIES, COVER_TYPES, MAX_COVER_BYTES, articleSchema, parseTags } from "@/lib/validations";
import { ApiError } from "@/services/api";
import { ARTICLES_CACHE_TAG, createArticle, listArticles } from "@/services/articles";

const querySchema = z.object({
  search: z
    .string()
    .trim()
    .max(100)
    .optional()
    .transform((value) => value || undefined),
  category: z.enum(ARTICLE_CATEGORIES).optional(),
  sort: z.enum(["latest", "most-read"]).default("latest"),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(24).default(ARTICLES_PAGE_SIZE),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search parameters" }, { status: 400 });
  }

  try {
    const page = await listArticles(parsed.data);
    return NextResponse.json(page, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" },
    });
  } catch (error) {
    console.error("Article search failed", error);
    return NextResponse.json({ error: "Articles are unavailable right now" }, { status: 502 });
  }
}

const text = (form: FormData, key: string) => {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
};

function backendMessage(body: unknown) {
  const message = (body as { message?: unknown } | null)?.message;
  if (Array.isArray(message)) return message.filter((item) => typeof item === "string").join(". ");
  return typeof message === "string" ? message : null;
}

export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "Send the article as form data" }, { status: 400 });

  const parsed = articleSchema.safeParse({
    title: text(form, "title"),
    category: text(form, "category"),
    authorName: text(form, "authorName"),
    authorRole: text(form, "authorRole"),
    excerpt: text(form, "excerpt"),
    body: text(form, "body"),
    tags: text(form, "tags"),
    confirmed: text(form, "confirmed") === "true",
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Check the article details" }, { status: 400 });
  }

  const cover = form.get("cover");
  if (cover !== null && !(cover instanceof File)) {
    return NextResponse.json({ error: "The cover must be an image file" }, { status: 400 });
  }
  if (cover && !COVER_TYPES.includes(cover.type)) {
    return NextResponse.json({ error: "Upload a JPG, PNG or WebP image" }, { status: 400 });
  }
  if (cover && cover.size > MAX_COVER_BYTES) {
    return NextResponse.json({ error: "The cover image must be 2 MB or smaller" }, { status: 413 });
  }

  const values = parsed.data;
  const upstream = new FormData();
  upstream.set("title", values.title);
  upstream.set("category", values.category);
  upstream.set("authorName", values.authorName);
  if (values.authorRole) upstream.set("authorRole", values.authorRole);
  upstream.set("excerpt", values.excerpt);
  upstream.set("body", values.body);
  const tags = parseTags(values.tags);
  if (tags.length) upstream.set("tags", tags.join(","));
  upstream.set("confirmed", "true");
  if (cover && cover.size > 0) upstream.set("cover", cover, cover.name || "cover.jpg");

  try {
    const article = await createArticle(upstream, request.headers.get("x-forwarded-for"));
    revalidateTag(ARTICLES_CACHE_TAG, { expire: 0 });
    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    if (error instanceof ApiError && [400, 413, 429].includes(error.status)) {
      const fallback =
        error.status === 429
          ? "You've posted several articles in a short time. Please try again in a few minutes."
          : error.status === 413
            ? "The cover image must be 2 MB or smaller"
            : "Check the article details and try again";
      return NextResponse.json({ error: backendMessage(error.body) ?? fallback }, { status: error.status });
    }
    console.error("Article post failed", error);
    return NextResponse.json({ error: "We couldn't post your article right now. Please try again." }, { status: 502 });
  }
}
*/
