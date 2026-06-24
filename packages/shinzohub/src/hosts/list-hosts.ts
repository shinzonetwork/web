import type { Client } from "viem";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import type { ListHostsParameters, ListHostsResult, RegisteredHost } from "./types";

interface HostWire {
  address?: string;
  did?: string;
  connection_string?: string;
  endpoint_address?: string;
}

interface PageResponseWire {
  next_key?: string | null;
  total?: string | number | null;
}

interface ListHostsWireResponse {
  hosts?: HostWire[];
  pagination?: PageResponseWire;
}

/**
 * Lists registered ShinzoHub hosts through the Cosmos REST gateway.
 *
 * The method reads the REST endpoint from `client.chain.rpcUrls.cosmosRest`
 * when available. Pass `cosmosRestUrl` for custom deployments, tests, or
 * clients whose chain definition only contains EVM RPC URLs.
 */
export async function listHosts(
  client: ShinzoHubQueryClient | Client,
  parameters: ListHostsParameters = {},
): Promise<ListHostsResult> {
  const response = await requestJson<ListHostsWireResponse>(
    getFetch(),
    buildListHostsUrl(
      getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
      parameters,
    ),
  );

  return {
    hosts: (response.hosts ?? []).map(toHost),
    pagination: toPageResponse(response.pagination),
  };
}

function buildListHostsUrl(baseUrl: string, parameters: ListHostsParameters): URL {
  const url = buildUrl(baseUrl, "/shinzonetwork/host/v1/hosts");
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
): ListHostsResult["pagination"] {
  const total = wire?.total ?? null;
  return {
    nextKey: wire?.next_key ?? null,
    total: total === null ? null : Number(total),
  };
}

function toHost(wire: HostWire): RegisteredHost {
  if (!wire.address) {
    throw new Error("Host response is missing address.");
  }
  if (!wire.did) {
    throw new Error("Host response is missing did.");
  }
  if (!wire.connection_string) {
    throw new Error("Host response is missing connection_string.");
  }

  return {
    address: wire.address,
    did: wire.did,
    connectionString: wire.connection_string,
    endpointAddress: wire.endpoint_address,
  };
}
