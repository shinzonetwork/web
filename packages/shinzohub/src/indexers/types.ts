/** A registered ShinzoHub indexer returned by the Cosmos REST gateway. */
export interface RegisteredIndexer {
  /** Shinzo bech32 indexer address. */
  address: string;
  /** Indexer DID key identifier. */
  did: string;
  /** libp2p multiaddr connection string for the indexer node. */
  connectionString: string;
  /** Source chain name the indexer validates. */
  sourceChain: string;
  /** Source chain ID the indexer validates. */
  sourceChainId: string;
}

/** Pagination and endpoint options for `listIndexers`. */
export interface ListIndexersParameters {
  /** Maximum number of indexers to return. */
  limit?: number | bigint | string;
  /** Numeric pagination offset for REST gateways that support offset paging. */
  offset?: number | bigint | string;
  /** Opaque pagination key returned as `pagination.nextKey` from a previous response. */
  pageKey?: string;
  /** Ask the REST API to include the total indexer count in the pagination response. */
  countTotal?: boolean;
  /** Return results in reverse registration order when supported by the REST API. */
  reverse?: boolean;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Page of registered ShinzoHub indexers returned by `listIndexers`. */
export interface ListIndexersResult {
  /** Registered indexers returned for this page. */
  indexers: readonly RegisteredIndexer[];
  /** Pagination data returned by the ShinzoHub REST gateway. */
  pagination: {
    /** Opaque key to pass as `pageKey` for the next page, or `null` when absent. */
    nextKey: string | null;
    /** Total count when `countTotal` was requested and the API returned it. */
    total: number | null;
  };
}

/** Options for fetching one registered indexer by Shinzo bech32 address. */
export interface GetIndexerParameters {
  /** Shinzo bech32 indexer address to fetch. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Response from fetching one registered indexer by Shinzo bech32 address. */
export interface RegisteredIndexerDetailsResult {
  /** The registered indexer. */
  indexer: RegisteredIndexer;
}
