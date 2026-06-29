import { fetchWithTimeout, HEALTH_FETCH_TIMEOUT_MS } from "../internal/fetch-with-timeout";
import { healthCheckUrl, isIPv4 } from "../internal/sslip";
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
 * Fetches live generator health over sslip.io.
 * Intended for server-side use to avoid browser CORS restrictions.
 */
export async function getGeneratorHealth(parameters: GetHealthParameters): Promise<HealthLiveData> {
  const ip = parameters.ip.trim();
  const timeoutMs = parameters.timeoutMs ?? HEALTH_FETCH_TIMEOUT_MS;

  if (!isIPv4(ip)) {
    return UNHEALTHY_LIVE_DATA;
  }

  try {
      const res = await fetchWithTimeout(healthCheckUrl(ip), timeoutMs);
      if (!res.ok) {
        return UNHEALTHY_LIVE_DATA;
      }

      const data = (await res.json()) as HealthLiveData;
      return { ...data, status: data.status || "unhealthy" };
  } catch {
    return UNHEALTHY_LIVE_DATA;
  }
}
