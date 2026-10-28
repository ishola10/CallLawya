import "server-only";

export type QueryParams = Record<string, string | number | boolean | undefined>;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
  }
}

export function apiUrl(path: string, params?: QueryParams) {
  const base = process.env.API_BASE_URL;
  if (!base) throw new Error("API_BASE_URL is not set. Add it to .env.local (see .env.example).");
  const url = new URL(path, base);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  });
  return url;
}

export async function apiGet<T>(
  path: string,
  params?: QueryParams,
  cache: { revalidate: number; tags?: string[] } = { revalidate: 300 },
): Promise<T> {
  const response = await fetch(apiUrl(path, params), {
    headers: { Accept: "application/json" },
    next: cache,
  });
  if (!response.ok) throw new ApiError(response.status, `CallLawya API ${path} responded ${response.status}`);
  return response.json() as Promise<T>;
}
