import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import { toGenerator, type GeneratorWire } from "./internal";
import type { ListGeneratorsParameters, ListGeneratorsResult } from "./types";

interface PageResponseWire {
  next_key?: string | null;
  total?: string | number | null;
}

interface ListGeneratorsWireResponse {
  indexers?: GeneratorWire[];
  pagination?: PageResponseWire;
}

/**
 * Lists registered ShinzoHub indexers through the Cosmos REST gateway.
 */
export async function listGenerators(
  client: ShinzoHubQueryClient | Client,
  parameters: ListGeneratorsParameters = {},
): Promise<ListGeneratorsResult> {
  const response = await requestJson<ListGeneratorsWireResponse>(
    getFetch(),
    buildListGeneratorsUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      parameters,
    ),
  );

  return {
    generators: (response.indexers ?? []).map(toGenerator),
    pagination: toPageResponse(response.pagination),
  };
}

function buildListGeneratorsUrl(
  baseUrl: string,
  parameters: ListGeneratorsParameters,
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
): ListGeneratorsResult["pagination"] {
  const total = wire?.total ?? null;
  return {
    nextKey: wire?.next_key ?? null,
    total: total === null ? null : Number(total),
  };
}
