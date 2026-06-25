import { HEALTH_FETCH_TIMEOUT_MS, UNHEALTHY_LIVE_DATA } from "./constants";
import { fetchWithTimeout } from "./fetch-with-timeout";
import { healthCheckUrls, isIPv4 } from "./sslip";
import type { GetHealthParameters, HealthLiveData } from "./types";

/**
 * Fetches live indexer/host health over sslip.io.
 * Intended for server-side use to avoid browser CORS restrictions.
 */
export async function getHealth(parameters: GetHealthParameters): Promise<HealthLiveData> {
  const ip = parameters.ip.trim();
  const timeoutMs = parameters.timeoutMs ?? HEALTH_FETCH_TIMEOUT_MS;

  if (!isIPv4(ip)) {
    return UNHEALTHY_LIVE_DATA;
  }

  for (const url of healthCheckUrls(ip)) {
    try {
      const res = await fetchWithTimeout(url, timeoutMs);
      if (!res.ok) continue;

      const data = (await res.json()) as HealthLiveData;
      return { ...data, status: data.status || "unhealthy" };
    } catch {
      // timed out or network error — try next candidate port
    }
  }

  return UNHEALTHY_LIVE_DATA;
}
