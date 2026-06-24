/** A registered ShinzoHub host returned by the Cosmos REST gateway. */
export interface RegisteredHost {
  /** Shinzo bech32 host address. */
  address: string;
  /** Host DID key identifier. */
  did: string;
  /** libp2p multiaddr connection string for the host node. */
  connectionString: string;
  /** Optional HTTP endpoint advertised by the host. */
  endpointAddress?: string;
}

/** Pagination and endpoint options for `listHosts`. */
export interface ListHostsParameters {
  /** Maximum number of hosts to return. */
  limit?: number | bigint | string;
  /** Numeric pagination offset for REST gateways that support offset paging. */
  offset?: number | bigint | string;
  /** Opaque pagination key returned as `pagination.nextKey` from a previous response. */
  pageKey?: string;
  /** Ask the REST API to include the total host count in the pagination response. */
  countTotal?: boolean;
  /** Return results in reverse registration order when supported by the REST API. */
  reverse?: boolean;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Page of registered ShinzoHub hosts returned by `listHosts`. */
export interface ListHostsResult {
  /** Registered hosts returned for this page. */
  hosts: readonly RegisteredHost[];
  /** Pagination data returned by the ShinzoHub REST gateway. */
  pagination: {
    /** Opaque key to pass as `pageKey` for the next page, or `null` when absent. */
    nextKey: string | null;
    /** Total count when `countTotal` was requested and the API returned it. */
    total: number | null;
  };
}

/** Options for fetching one registered host by Shinzo bech32 address. */
export interface GetHostParameters {
  /** Shinzo bech32 host address to fetch. */
  address: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Response from fetching one registered host by Shinzo bech32 address. */
export interface RegisteredHostDetailsResult {
  /** The registered host. */
  host: RegisteredHost;
}