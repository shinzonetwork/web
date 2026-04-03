import type { Address } from "viem";

export type IndexerEntry = {
  validatorName?: string;
  validatorAddress: Address;
  ip: string;
  discord?: string;
};

export type HealthStatus = "healthy" | "unhealthy" | "unknown";

export type Peer = {
  id: string;
  addresses: string[];
  public_key: string;
};

export type LiveData = {
  health?: HealthStatus;
  peers?: Peer | null;
};

export type LiveDataWithKey = {
  key: string;
  data: LiveData;
};

export type LiveIndexer = IndexerEntry & LiveData;

export type ValidatorRow = {
  validator_address: Address;
  validator_public_ip: string;
  validator_name?: string;
};
