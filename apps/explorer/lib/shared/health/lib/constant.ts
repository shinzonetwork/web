import type { HealthLiveData } from "@shinzo/shinzohub";

export const UNHEALTHY_LIVE_DATA: HealthLiveData = {
    status: "unhealthy",
    uptime: 0,
    uptime_seconds: 0,
    last_processed: "",
    current_block: 0,
    p2p: null,
  };