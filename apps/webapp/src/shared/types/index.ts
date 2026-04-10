import type { Address, Hex } from "viem";
import { EntityRole } from "../lib";

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

// Shinzohub v2

export type RegistrationFormDataV2 = {
  entity: EntityRole;
  message: Hex | string;
  defraPublicKey: Hex | string;
  defraSignedMessage: Hex | string;
};  

export type IndexerRegistrationFormData = RegistrationFormDataV2 & {
  connectionString: string;
  sourceChain: string;
  sourceChainId: number;
};

export type HostRegistrationFormData = RegistrationFormDataV2 & {
  connectionString?: string | undefined;
};

export type RegistrationFormDataByEntity<T extends EntityRole> = T extends EntityRole.Indexer ? IndexerRegistrationFormData : HostRegistrationFormData;