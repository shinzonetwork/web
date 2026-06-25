import type { LiveData } from "../types";
import { HEALTH_FETCH_TIMEOUT_MS, UNHEALTHY_LIVE_DATA } from "./constants";
import { fetchWithTimeout } from "./fetch-with-timeout";
import { healthCheckUrls, isIPv4 } from "./sslip";

export { UNHEALTHY_LIVE_DATA };

/** Fetches indexer/host health over sslip.io from the server (no browser CORS). */
export async function fetchHealthLiveData(ip: string): Promise<LiveData> {
  if (!isIPv4(ip)) {
    return UNHEALTHY_LIVE_DATA;
  }

  for (const url of healthCheckUrls(ip)) {
    try {
      const res = await fetchWithTimeout(url, HEALTH_FETCH_TIMEOUT_MS);
      if (!res.ok) continue;

      const data = (await res.json()) as LiveData;
      return { ...data, status: data.status || "unhealthy" };
    } catch {
      // timed out or network error — try next candidate port if time remains
    }
  }

  return UNHEALTHY_LIVE_DATA;
}
