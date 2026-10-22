import "server-only";
import type {
  ExpertiseStat,
  LawyerPage,
  LawyerProfile,
  LawyerReview,
  LawyerSearchParams,
  LawyerSummary,
} from "@/types/lawyer";

const REVALIDATE_SECONDS = 300;

type ApiLawyer = {
  id: string;
  fullName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  bio?: string | null;
  expertiseAreas?: string[] | null;
  location?: string | null;
  consultationFee?: number | null;
  isAvailable?: boolean;
  isDemo?: boolean;
  avatarImage?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  sessionsCount?: number | null;
  tier?: string | null;
  yearOfCall?: string | null;
  reviews?: ApiReview[];
};

type ApiReview = {
  id: string;
  raterRole?: string;
  rating?: number;
  comment?: string | null;
  tags?: string[] | null;
  createdAt: string;
};

type ApiLawyerPage = {
  items: ApiLawyer[];
  total: number;
  page: number;
  totalPages: number;
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

function apiUrl(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("API_BASE_URL is not set. Add it to .env.local (see .env.example).");
  const url = new URL(path, base);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  });
  return url;
}

async function apiGet<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T> {
  const response = await fetch(apiUrl(path, params), {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new ApiError(response.status, `CallLawya API ${path} responded ${response.status}`);
  return response.json() as Promise<T>;
}

const titleCaseShouting = (name: string) =>
  name
    .split(/\s+/)
    .map((word) => (word.length > 1 && word === word.toUpperCase() ? word[0] + word.slice(1).toLowerCase() : word))
    .join(" ");

function displayName(lawyer: ApiLawyer) {
  const raw = lawyer.fullName?.trim() || [lawyer.firstName, lawyer.lastName].filter(Boolean).join(" ").trim();
  return raw ? titleCaseShouting(raw) : "CallLawya Lawyer";
}

const initialsOf = (name: string) =>
  name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

function toSummary(lawyer: ApiLawyer): LawyerSummary {
  const name = displayName(lawyer);
  const reviewCount = lawyer.reviewCount ?? 0;
  return {
    id: lawyer.id,
    name,
    initials: initialsOf(name) || "CL",
    bio: lawyer.bio?.trim() || null,
    expertiseAreas: lawyer.expertiseAreas ?? [],
    location: lawyer.location?.trim() || null,
    fee: lawyer.consultationFee && lawyer.consultationFee > 0 ? lawyer.consultationFee : null,
    isAvailable: Boolean(lawyer.isAvailable),
    avatar: lawyer.avatarImage || null,
    rating: reviewCount > 0 && lawyer.rating ? Math.round(lawyer.rating * 10) / 10 : null,
    reviewCount,
    sessionsCount: lawyer.sessionsCount ?? 0,
  };
}

function toReview(review: ApiReview): LawyerReview {
  return {
    id: review.id,
    rating: review.rating ?? 0,
    comment: review.comment?.trim() || null,
    tags: review.tags ?? [],
    createdAt: review.createdAt,
  };
}

export async function searchLawyers(params: LawyerSearchParams = {}): Promise<LawyerPage> {
  const data = await apiGet<ApiLawyerPage>("/lawyers", { verified: true, ...params });
  return {
    items: data.items.filter((lawyer) => !lawyer.isDemo).map(toSummary),
    total: data.total,
    page: data.page,
    totalPages: data.totalPages,
  };
}

export async function getLawyer(id: string): Promise<LawyerProfile | null> {
  try {
    const lawyer = await apiGet<ApiLawyer>(`/lawyers/${encodeURIComponent(id)}`);
    if (lawyer.isDemo) return null;
    const yearOfCall = lawyer.yearOfCall && /^\d{4}$/.test(lawyer.yearOfCall.trim()) ? lawyer.yearOfCall.trim() : null;
    return {
      ...toSummary(lawyer),
      tier: lawyer.tier ?? null,
      yearOfCall,
      reviews: (lawyer.reviews ?? []).filter((review) => review.raterRole === "CLIENT").map(toReview),
    };
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) return null;
    throw error;
  }
}

export async function getExpertiseStats(): Promise<ExpertiseStat[]> {
  return apiGet<ExpertiseStat[]>("/lawyers/expertise-stats");
}

export async function getTopLawyers(count: number): Promise<LawyerSummary[]> {
  const { items } = await searchLawyers({ limit: 50 });
  return [...items]
    .sort(
      (a, b) =>
        (b.rating ?? 0) - (a.rating ?? 0) ||
        b.reviewCount - a.reviewCount ||
        Number(Boolean(b.avatar)) - Number(Boolean(a.avatar)),
    )
    .slice(0, count);
}
