import type { Address } from "viem";

export type IndexerEntry = {
  validatorName?: string;
  validatorAddress: Address;
  ip: string;
  discord?: string;
};

export type IndexerWithHealth = IndexerEntry & {
  health: "healthy" | "unhealthy" | "unknown";
};

export type HealthCheck = {
  key: string;
  health: "healthy" | "unhealthy" | "unknown";
};

export type ValidatorRow = {
  validator_address: string;
  validator_name: string | null;
  validator_public_ip: string;
};
