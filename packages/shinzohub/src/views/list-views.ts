import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { requestJson } from "../internal/fetch";
import {
  buildListViewsUrl,
  type ListViewsWireResponse,
  toPageResponse,
  toView,
} from "./internal";
import type { ShinzoHubView } from "./types";

/**
 * Filters, pagination, and response-shaping options for `listViews`.
 */
export interface ListViewsParameters {
  /** Maximum number of views to return. */
  limit?: number | bigint | string;
  /** Numeric pagination offset for REST gateways that support offset paging. */
  offset?: number | bigint | string;
  /** Opaque pagination key returned as `pagination.nextKey` from a previous response. */
  pageKey?: string;
  /** Ask the REST API to include the total view count in the pagination response. */
  countTotal?: boolean;
  /** Return results in reverse registration order when supported by the REST API. */
  reverse?: boolean;
  /** Include raw viewbundle bytes in each `view.data` field. */
  includeData?: boolean;
  /** Only return views registered at or after this block height. */
  sinceBlock?: number | bigint | string;
  /** Include parsed bundle metadata in each `view.metadata` field. */
  includeMetadata?: boolean;
  /** Filter views by exact registered name. */
  name?: string;
  /** Filter views by creator EVM address. */
  creator?: string;
  /** Filter views by exact metadata root type. */
  metadataRootType?: string;
  /** Filter views that include a lens with this hash. */
  metadataLensHash?: string;
  /** Filter views whose metadata query contains this text. */
  metadataQueryContains?: string;
  /** Filter views whose metadata SDL contains this text. */
  metadataSdlContains?: string;
  /** Filter views whose serialized lens args contain this text. */
  metadataLensArgsContains?: string;
  /** Override the chain's configured Cosmos REST endpoint for this request. */
  cosmosRestUrl?: string;
}

/** Page of registered ShinzoHub views returned by `listViews`. */
export interface ListViewsResult {
  /** Registered views returned for this page. */
  views: readonly ShinzoHubView[];
  /** Pagination data returned by the ShinzoHub REST gateway. */
  pagination: {
    /** Opaque key to pass as `pageKey` for the next page, or `null` when absent. */
    nextKey: string | null;
    /** Total count when `countTotal` was requested and the API returned it. */
    total: bigint | null;
  };
}

/**
 * Lists registered ShinzoHub views through the Cosmos REST gateway.
 */
export async function listViews(
  client: ShinzoHubQueryClient,
  parameters: ListViewsParameters = {},
): Promise<ListViewsResult> {
  const fetchFn = globalThis.fetch?.bind(globalThis);
  if (!fetchFn) {
    throw new Error("No fetch implementation is available.");
  }

  const response = await requestJson<ListViewsWireResponse>(
    fetchFn,
    buildListViewsUrl(getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl), parameters),
  );

  return {
    views: (response.views ?? []).map(toView),
    pagination: toPageResponse(response.pagination),
  };
}
