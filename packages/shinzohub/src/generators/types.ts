import type { GetHealthParameters, HealthLiveData, HealthP2P, HealthPeer } from "../internal/health";

/** A registered ShinzoHub generator returned by the Cosmos REST gateway. */
export interface RegisteredGenerator {
  /** Shinzo bech32 generator address. */
  address: string;
  /** Generator DID key identifier. */
  did: string;
  /** libp2p multiaddr connection string for the generator node. */
  connectionString: string;
  /** Source chain name the generator validates. */
  sourceChain: string;
  /** Source chain ID the generator validates. */
  sourceChainId: string;
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
  generators: readonly RegisteredGenerator[];
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
export interface RegisteredGeneratorDetailsResult {
  /** The registered generator. */
  generator: RegisteredGenerator;
}

export type GetGeneratorHealthParameters = GetHealthParameters;
export type GeneratorHealthData = HealthLiveData;
export type GeneratorHealthP2P = HealthP2P;
export type GeneratorHealthPeer = HealthPeer;

/** Generator assertion returned by the ShinzoHub Cosmos REST gateway. */
export interface GeneratorAssertion {
  /** Unique assertion identifier. */
  assertionId: string;
  /** Consensus public key associated with the assertion. */
  consensusPubKey: string;
  /** Shinzo bech32 delegate address the assertion belongs to. */
  delegateAddress: string;
  /** Source chain name the generator validates. */
  sourceChain: string;
  /** Source chain ID the generator validates. */
  sourceChainId: string;
}

/** Options for fetching generator assertions by delegate address. */
export interface GetAssertionParameters {
  /** Shinzo bech32 delegate address to look up assertions for. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Assertions for one delegate address returned by `getAssertion`. */
export interface GetAssertionResult {
  /** Matching assertions for the requested delegate address. */
  assertions: readonly GeneratorAssertion[];
}
