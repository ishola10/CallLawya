import { NextResponse, type NextRequest } from "next/server";
import * as z from "zod";
import { LAWYERS_PAGE_SIZE } from "@/constants";
import { searchLawyers } from "@/services/lawyers";

const optionalText = z
  .string()
  .trim()
  .max(80)
  .optional()
  .transform((value) => value || undefined);

const querySchema = z.object({
  name: optionalText,
  expertise: optionalText,
  location: optionalText,
  maxFee: z.coerce.number().int().positive().max(10_000_000).optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  available: z
    .enum(["true", "false"])
    .optional()
    .transform((value) => (value === "true" ? true : undefined)),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(48).default(LAWYERS_PAGE_SIZE),
});

export async function GET(request: NextRequest) {
  const parsed = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search parameters" }, { status: 400 });
  }

  try {
    const page = await searchLawyers(parsed.data);
    return NextResponse.json(page, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Lawyer search failed", error);
    return NextResponse.json({ error: "Lawyers are unavailable right now" }, { status: 502 });
  }
}
