import type { GetHealthParameters, HealthLiveData, HealthP2P, HealthPeer } from "../internal/health";

/** A registered ShinzoHub generator returned by the Cosmos REST gateway. */
export interface Generator {
  /** Source chain name the generator validates. */
  sourceChain: string;
  /** Source chain ID the generator validates. */
  sourceChainId: string;
  /** Validator public key for the generator. */
  validatorPublicKey: string;
  /** Assertion authority for the generator. */
  assertionAuthority: string;
  /** Nonce for the generator. */
  nonce: string;
  /** Chain-specific payload for the generator. */
  chainSpecific: string;
  /** Operator Shinzo bech32 address for the generator. */
  operatorAddress: string;
  /** Payout Shinzo bech32 address for the generator. */
  payoutAddress: string;
  /** Registered status of the generator. */
  registered: boolean;
  /** DID key identifier for the generator. */
  did: string;
  /** Connection string for the generator. */
  connectionString: string;
}

/** Pagination and endpoint options for `listGenerators`. */
export interface ListGeneratorsParameters {
  /** Maximum number of generators to return. */
  limit?: number | bigint | string;
  /** Numeric pagination offset for REST gateways that support offset paging. */
  offset?: number | bigint | string;
  /** Opaque pagination key returned as `pagination.nextKey` from a previous response. */
  pageKey?: string;
  /** Ask the REST API to include the total generator count in the pagination response. */
  countTotal?: boolean;
  /** Return results in reverse registration order when supported by the REST API. */
  reverse?: boolean;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Page of registered ShinzoHub generators returned by `listGenerators`. */
export interface ListGeneratorsResult {
  /** Registered generators returned for this page. */
  generators: readonly Generator[];
  /** Pagination data returned by the ShinzoHub REST gateway. */
  pagination: {
    /** Opaque key to pass as `pageKey` for the next page, or `null` when absent. */
    nextKey: string | null;
    /** Total count when `countTotal` was requested and the API returned it. */
    total: number | null;
  };
}

/** Options for fetching one registered generator by Shinzo bech32 address. */
export interface GetGeneratorParameters {
  /** Shinzo bech32 generator address to fetch. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

  /** Response from fetching one registered generator by Shinzo bech32 address. */
export interface GeneratorDetailsResult {
  /** The registered generator. */
  generator: Generator;
}

export type GetGeneratorHealthParameters = GetHealthParameters;
export type GeneratorHealthData = HealthLiveData;
export type GeneratorHealthP2P = HealthP2P;
export type GeneratorHealthPeer = HealthPeer;

/** Options for fetching generator assertions by validator public key. */
export interface GetAssertionParameters {
  /** Validator public key to look up assertions for. */
  validatorPublicKey: string;
  /** Source chain ID the generator validates. */
  sourceChainId: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Parameters for signing and broadcasting a generator assertion. */
export type SubmitGeneratorAssertionParameters = {
  /** Admin private key used to sign the assertion transaction. */
  privateKey: string;
  /** CometBFT RPC endpoint used for account queries and broadcast. */
  rpcEndpoint: string;
  /** Cosmos chain ID. Defaults to the ID from the Comet RPC `/status` endpoint. */
  chainId?: string;
  /** Validator public key for the generator. */
  validatorPublicKey: string;
  /** Source chain name (e.g. `ethereum`). */
  sourceChain: string;
  /** Source chain numeric id. */
  sourceChainId: number;
  /** Withdrawal address for the source chain. */
  assertionAuthority: string;
  /** Nonce for the assertion. */
  nonce: string | number;
  /** Optional chain-specific payload (empty string when unused). */
  chainSpecific: string;
  /** Operator Shinzo bech32 address for the generator. */
  operatorAddress: string;
  /** Payout Shinzo bech32 address for the generator. */
  payoutAddress: string;
};

/** Result of broadcasting a generator assertion transaction. */
export type SubmitGeneratorAssertionResult = {
  hash: string;
  code: number;
  log: string;
};

