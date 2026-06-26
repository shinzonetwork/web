import { fetchWithTimeout, HEALTH_FETCH_TIMEOUT_MS } from "../internal/fetch-with-timeout";
import { healthCheckUrls, isIPv4 } from "../internal/sslip";
import type { GetHealthParameters, HealthLiveData } from "../internal/health";

export const UNHEALTHY_LIVE_DATA: HealthLiveData = {
  status: "unhealthy",
  uptime: 0,
  uptime_seconds: 0,
  last_processed: "",
  current_block: 0,
  p2p: null,
};

/**
 * Fetches live indexer health over sslip.io.
 * Intended for server-side use to avoid browser CORS restrictions.
 */
export async function getIndexerHealth(parameters: GetHealthParameters): Promise<HealthLiveData> {
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
