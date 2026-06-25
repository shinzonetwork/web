import type { LiveData } from "../types";

/** Abort in-flight health fetches that do not complete within this window. */
export const HEALTH_FETCH_TIMEOUT_MS = 2_000;

export const UNHEALTHY_LIVE_DATA: LiveData = {
  status: "unhealthy",
  uptime: 0,
  uptime_seconds: 0,
  last_processed: "",
  current_block: 0,
  p2p: null,
};
