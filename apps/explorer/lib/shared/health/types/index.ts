export type HealthStatus = "healthy" | "unhealthy" | "unknown";

export type HealthEntryKeyParams = {
  address: string;
  ip: string;
};

export type Peer = {
  id: string;
  addresses: string[];
  public_key: string;
};

export type P2P = {
  enabled: boolean;
  peers: Peer[];
  self: Peer;
};

export type LiveData = {
    status: HealthStatus;
    uptime: number;
    uptime_seconds: number;
    last_processed: string;
    current_block: number;
    p2p: P2P | null;
  };
  
  export type LiveDataWithKey = {key: string; data: LiveData};
