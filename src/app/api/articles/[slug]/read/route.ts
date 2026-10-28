import { NextResponse } from "next/server";

// Hidden with the Articles pages: answers "not found".
// To restore it, delete the handler below and uncomment the original code underneath.
export function POST() {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

/*
import { NextResponse } from "next/server";
import { ApiError } from "@/services/api";
import { recordArticleRead } from "@/services/articles";

const SLUG_PATTERN = /^[a-z0-9-]{1,100}$/;

export async function POST(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUG_PATTERN.test(slug)) return NextResponse.json({ error: "Article not found" }, { status: 404 });

  try {
    return NextResponse.json({ reads: await recordArticleRead(slug) });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    console.error("Recording an article read failed", error);
    return NextResponse.json({ error: "Couldn't record the read" }, { status: 502 });
  }
}
*/
