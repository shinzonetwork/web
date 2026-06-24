import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import { toIndexer, type IndexerWire } from "./internal";
import type { ListIndexersParameters, ListIndexersResult } from "./types";

interface PageResponseWire {
  next_key?: string | null;
  total?: string | number | null;
}

interface ListIndexersWireResponse {
  indexers?: IndexerWire[];
  pagination?: PageResponseWire;
}

/**
 * Lists registered ShinzoHub indexers through the Cosmos REST gateway.
 */
export async function listIndexers(
  client: ShinzoHubQueryClient | Client,
  parameters: ListIndexersParameters = {},
): Promise<ListIndexersResult> {
  const response = await requestJson<ListIndexersWireResponse>(
    getFetch(),
    buildListIndexersUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      parameters,
    ),
  );

  return {
    indexers: (response.indexers ?? []).map(toIndexer),
    pagination: toPageResponse(response.pagination),
  };
}

function buildListIndexersUrl(
  baseUrl: string,
  parameters: ListIndexersParameters,
): URL {
  const url = buildUrl(baseUrl, "/shinzonetwork/indexer/v1/indexers");
  setOptional(url, "pagination.key", parameters.pageKey);
  setOptional(url, "pagination.offset", parameters.offset);
  setOptional(url, "pagination.limit", parameters.limit);
  setOptional(url, "pagination.count_total", parameters.countTotal);
  setOptional(url, "pagination.reverse", parameters.reverse);
  return url;
}

function setOptional(
  url: URL,
  key: string,
  value: string | number | bigint | boolean | undefined,
): void {
  if (value === undefined || value === "") {
    return;
  }
  url.searchParams.set(key, String(value));
}

function toPageResponse(
  wire: PageResponseWire | null | undefined,
): ListIndexersResult["pagination"] {
  const total = wire?.total ?? null;
  return {
    nextKey: wire?.next_key ?? null,
    total: total === null ? null : Number(total),
  };
}
