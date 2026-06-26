/** Abort in-flight health fetches that do not complete within this window. */
export const HEALTH_FETCH_TIMEOUT_MS = 2_000;

/** Fetches a URL and aborts if the response is not received within `timeoutMs`. */
export async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
  init?: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      method: "GET",
      cache: "no-store",
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
