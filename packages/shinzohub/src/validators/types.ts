import type { Hex } from "viem";

/** Consensus public key metadata returned for a ShinzoHub validator. */
export interface ShinzoHubValidatorPubKey {
  type: string;
  value: string;
}

/** A normalized ShinzoHub consensus validator. */
export interface ShinzoHubValidator {
  address: Hex;
  pubKey: ShinzoHubValidatorPubKey;
  votingPower: bigint;
  proposerPriority: bigint;
}

/** Options for listing validators through Comet RPC. */
export interface ListValidatorsParameters {
  cometRpcUrl?: string;
  height?: number | bigint | string;
  page?: number | bigint | string;
  perPage?: number | bigint | string;
}

/** Current validator set plus Comet pagination metadata. */
export interface ListValidatorsResult {
  blockHeight: bigint;
  validators: readonly ShinzoHubValidator[];
  count: number;
  total: number;
}
