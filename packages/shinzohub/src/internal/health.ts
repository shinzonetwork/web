export type HealthStatus = "healthy" | "unhealthy" | "unknown";

export type HealthPeer = {
  id: string;
  addresses: string[];
  public_key: string;
};

export type HealthP2P = {
  enabled: boolean;
  peers: HealthPeer[];
  self: HealthPeer;
};

/** Live health payload returned by generator/host `/health` endpoints. */
export type HealthLiveData = {
  status: HealthStatus;
  uptime: number;
  uptime_seconds: number;
  last_processed: string;
  current_block: number;
  p2p: HealthP2P | null;
};

/** Options for fetching live health from a generator/host IPv4 address. */
export interface GetHealthParameters {
  /** IPv4 address of the generator or host node. */
  ip: string;
  /** Per-attempt fetch timeout in milliseconds. Defaults to {@link HEALTH_FETCH_TIMEOUT_MS}. */
  timeoutMs?: number;
}

export const UNHEALTHY_LIVE_DATA: HealthLiveData = {
  status: "unhealthy",
  uptime: 0,
  uptime_seconds: 0,
  last_processed: "",
  current_block: 0,
  p2p: null,
};
