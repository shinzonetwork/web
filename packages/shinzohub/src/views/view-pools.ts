import { getAddress, type Address, type Client } from "viem";
import { shinzoAddressToHex } from "../addresses/index";
import { getFetch } from "../internal/comet";
import {
  getRpcEndpoint,
  type ShinzoHubQueryClient,
} from "../internal/endpoints";
import { buildUrl, requestJson } from "../internal/fetch";
import { normalizeViewAddress } from "./internal";

const REQUIRED_HOST_COUNT = 3;

type IntegerWire = string | number | bigint;

interface ViewPoolWire {
  pool_address?: string;
  view_address?: string;
  config?: {
    window_size?: IntegerWire;
  };
  created_at?: IntegerWire;
}

interface ViewPoolHostWire {
  host_address?: string;
  host?: {
    joined_at?: IntegerWire;
  };
}

interface ViewPoolDemandWire {
  registrant_address?: string;
  demand?: {
    bond?: IntegerWire;
    price_pref?: IntegerWire;
    binding?: boolean;
    expires_at?: IntegerWire;
  };
}

interface ViewPoolStatsWire {
  price?: IntegerWire;
  utilization?: IntegerWire;
  total_queries?: IntegerWire;
  total_rewards?: IntegerWire;
  last_updated_epoch?: IntegerWire;
}

interface ViewPoolDetailWire {
  pool?: ViewPoolWire;
  hosts?: ViewPoolHostWire[];
  demands?: ViewPoolDemandWire[];
  stats?: ViewPoolStatsWire;
  is_active?: boolean;
}

interface ListViewPoolsWireResponse {
  details?: ViewPoolDetailWire[];
}

/** Parameters for listing every pool materialized for a registered view. */
export interface ListViewPoolsParameters {
  /** Registered deterministic view address in EVM hex or Shinzo bech32 form. */
  viewAddress: string;
  /** Override the chain's configured Cosmos REST endpoint. */
  cosmosRestUrl?: string;
}

/**
 * Consumer-oriented snapshot of one pool attached to a ShinzoHub view.
 *
 * The model deliberately separates the last settlement-reported price in
 * `stats.reportedUnitPrice` from the live network price returned by
 * `getNetworkUnitPrice`.
 */
export interface ShinzoHubViewPool {
  poolAddress: Address;
  viewAddress: Address;
  config: {
    windowSize: bigint;
  };
  /** Hub block height at which the pool was created. */
  createdAtHeight: bigint;
  hosts: readonly {
    hostAddress: Address;
    /** Hub block height at which the host joined. */
    joinedAtHeight: bigint;
  }[];
  demands: readonly {
    registrantAddress: Address;
    bond: bigint;
    /** `null` means the demand has no price preference. */
    pricePreference: bigint | null;
    binding: boolean;
    /** `null` means the demand has no configured expiry. */
    expiresAt: bigint | null;
  }[];
  stats: {
    /** Last settlement-reported unit price, not the current network price. */
    reportedUnitPrice: bigint | null;
    utilizationPercent: bigint;
    totalQueries: bigint;
    totalRewards: bigint;
    lastUpdatedEpoch: bigint;
  };
  requiredHostCount: number;
  /** Derived from current membership rather than protobuf JSON conventions. */
  isActive: boolean;
}

/**
 * Lists every denormalized pool snapshot associated with a registered view.
 *
 * This performs exactly one Cosmos REST request. The returned addresses are
 * normalized for direct comparison with EVM wallet addresses and all Hub
 * integer fields are represented without precision loss.
 */
export async function listViewPools(
  client: ShinzoHubQueryClient | Client,
  parameters: ListViewPoolsParameters,
): Promise<readonly ShinzoHubViewPool[]> {
  const viewAddress = normalizeViewAddress(parameters.viewAddress);
  const url = buildUrl(
    getRpcEndpoint(client, "cosmosRest", parameters.cosmosRestUrl),
    `/shinzonetwork/pool/v1/views/${encodeURIComponent(viewAddress)}/pools`,
  );
  const response = await requestJson<ListViewPoolsWireResponse>(
    getFetch(),
    url,
  );

  return (response.details ?? []).map(decodeViewPool);
}

function decodeViewPool(detail: ViewPoolDetailWire): ShinzoHubViewPool {
  const pool = requireValue(detail.pool, "pool");
  const hosts = (detail.hosts ?? []).map(decodeHost);

  return {
    poolAddress: decodeEvmAddress(pool.pool_address, "pool.pool_address"),
    viewAddress: decodeEvmAddress(pool.view_address, "pool.view_address"),
    config: {
      windowSize: decodeInteger(
        pool.config?.window_size,
        "pool.config.window_size",
      ),
    },
    createdAtHeight: decodeInteger(pool.created_at, "pool.created_at"),
    hosts,
    demands: (detail.demands ?? []).map(decodeDemand),
    stats: decodeStats(detail.stats),
    requiredHostCount: REQUIRED_HOST_COUNT,
    isActive: hosts.length >= REQUIRED_HOST_COUNT,
  };
}

function decodeHost(
  host: ViewPoolHostWire,
): ShinzoHubViewPool["hosts"][number] {
  return {
    hostAddress: decodeShinzoAccount(host.host_address, "hosts[].host_address"),
    joinedAtHeight: decodeInteger(
      host.host?.joined_at,
      "hosts[].host.joined_at",
    ),
  };
}

function decodeDemand(
  entry: ViewPoolDemandWire,
): ShinzoHubViewPool["demands"][number] {
  const demand = requireValue(entry.demand, "demands[].demand");

  return {
    registrantAddress: decodeShinzoAccount(
      entry.registrant_address,
      "demands[].registrant_address",
    ),
    bond: decodeInteger(demand.bond, "demands[].demand.bond"),
    pricePreference: decodeOptionalInteger(
      demand.price_pref,
      "demands[].demand.price_pref",
    ),
    binding: demand.binding ?? false,
    expiresAt: decodeOptionalInteger(
      demand.expires_at,
      "demands[].demand.expires_at",
    ),
  };
}

function decodeStats(
  stats: ViewPoolStatsWire | undefined,
): ShinzoHubViewPool["stats"] {
  return {
    reportedUnitPrice: decodeOptionalInteger(stats?.price, "stats.price"),
    utilizationPercent: decodeInteger(
      stats?.utilization ?? 0,
      "stats.utilization",
    ),
    totalQueries: decodeInteger(
      stats?.total_queries ?? 0,
      "stats.total_queries",
    ),
    totalRewards: decodeInteger(
      stats?.total_rewards ?? 0,
      "stats.total_rewards",
    ),
    lastUpdatedEpoch: decodeInteger(
      stats?.last_updated_epoch ?? 0,
      "stats.last_updated_epoch",
    ),
  };
}

function decodeEvmAddress(value: unknown, field: string): Address {
  try {
    return normalizeViewAddress(requireText(value, field));
  } catch (error) {
    throw invalidField(field, error);
  }
}

function decodeShinzoAccount(value: unknown, field: string): Address {
  try {
    return getAddress(shinzoAddressToHex(requireText(value, field)));
  } catch (error) {
    throw invalidField(field, error);
  }
}

function decodeInteger(value: unknown, field: string): bigint {
  try {
    return BigInt(requireText(value, field));
  } catch (error) {
    throw invalidField(field, error);
  }
}

function decodeOptionalInteger(value: unknown, field: string): bigint | null {
  if (value === undefined || value === null || value === "") {
    return null;
  }
  const parsed = decodeInteger(value, field);
  return parsed === 0n ? null : parsed;
}

function requireText(value: unknown, field: string): string {
  if (
    (typeof value !== "string" &&
      typeof value !== "number" &&
      typeof value !== "bigint") ||
    String(value).trim() === ""
  ) {
    throw new Error(`${field} is missing.`);
  }
  return String(value);
}

function requireValue<T>(value: T | null | undefined, field: string): T {
  if (value === null || value === undefined) {
    throw new Error(`${field} is missing.`);
  }
  return value;
}

function invalidField(field: string, cause: unknown): Error {
  const reason = cause instanceof Error ? cause.message : String(cause);
  return new Error(`Invalid ShinzoHub view pool field ${field}: ${reason}`);
}
