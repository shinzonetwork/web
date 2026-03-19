export type IndexerEntry = {
  walletAddress: string;
  ip: string;
  discord?: string;
};

export type IndexerWithHealth = IndexerEntry & {
  health: "healthy" | "unhealthy" | "unknown";
};
