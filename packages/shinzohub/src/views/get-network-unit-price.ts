import { getAddress, type Address, type Client } from "viem";
import { readContract } from "viem/actions";
import { normalizeViewAddress } from "./internal";

export const poolRegistryReadAddress =
  "0x0000000000000000000000000000000000000213" as const;

export const poolRegistryReadAbi = [
  {
    type: "function",
    name: "getPool",
    stateMutability: "view",
    inputs: [{ name: "poolAddress", type: "address" }],
    outputs: [
      {
        name: "pool",
        type: "tuple",
        components: [
          { name: "poolAddress", type: "address" },
          { name: "viewAddress", type: "address" },
          {
            name: "config",
            type: "tuple",
            components: [{ name: "windowSize", type: "uint64" }],
          },
          { name: "isActive", type: "bool" },
          { name: "price", type: "uint256" },
        ],
      },
    ],
  },
] as const;

const zeroAddress = getAddress("0x0000000000000000000000000000000000000000");

/** Parameters for reading the current network unit price through a known pool. */
export interface GetNetworkUnitPriceParameters {
  /** Address of a materialized pool returned by `listViewPools`. */
  poolAddress: string;
}

/**
 * Reads the current global network unit price through PoolRegistry `getPool`.
 *
 * The Hub currently exposes the global price through each materialized pool.
 * This is distinct from the last settlement-reported price in pool statistics.
 */
export async function getNetworkUnitPrice(
  client: Client,
  parameters: GetNetworkUnitPriceParameters,
): Promise<bigint> {
  const requestedAddress = normalizeViewAddress(parameters.poolAddress);
  const pool = decodePoolRegistryResult(
    await readContract(client, {
      address: poolRegistryReadAddress,
      abi: poolRegistryReadAbi,
      functionName: "getPool",
      args: [requestedAddress],
    }),
  );

  if (getAddress(pool.poolAddress) === zeroAddress) {
    throw new Error(`ShinzoHub pool was not found: ${requestedAddress}.`);
  }

  return BigInt(pool.price);
}

interface PoolRegistryResult {
  poolAddress: Address;
  price: bigint;
}

function decodePoolRegistryResult(value: unknown): PoolRegistryResult {
  if (Array.isArray(value)) {
    return {
      poolAddress: String(value[0] ?? zeroAddress) as Address,
      price: BigInt(String(value[4] ?? 0)),
    };
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return {
      poolAddress: String(record.poolAddress ?? zeroAddress) as Address,
      price: BigInt(String(record.price ?? 0)),
    };
  }

  throw new Error("PoolRegistry getPool returned an invalid response.");
}
