import "server-only";

const hits = new Map<string, number[]>();

/** In-memory, per server instance. A soft brake on form spam, not a security boundary. */
export function isRateLimited(key: string, max: number, windowMs: number) {
  const cutoff = Date.now() - windowMs;
  const recent = (hits.get(key) ?? []).filter((time) => time > cutoff);
  const limited = recent.length >= max;
  if (!limited) recent.push(Date.now());
  hits.set(key, recent);
  return limited;
}

export function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
