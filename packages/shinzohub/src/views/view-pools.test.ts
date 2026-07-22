import { afterEach, describe, expect, it, vi } from "vitest";
import { getAddress } from "viem";
import { hexToShinzoAddress } from "../addresses/index";
import { shinzoHubTestClient } from "../internal/test-utils";
import { listViewPools } from "./index";

const originalFetch = globalThis.fetch;
const viewAddress = "0xEAc245f905e0aAcF3b9Fe27153F2AaF485dc1B48";
const poolAddress = "0xDbc3bE7CBd8Dc8901E3BbbeA1A740BE490dAe23B";
const hostAddresses = [
  "0x000102030405060708090a0b0c0d0e0f10111213",
  "0x1111111111111111111111111111111111111111",
  "0x2222222222222222222222222222222222222222",
] as const;
const registrantAddress = "0x3333333333333333333333333333333333333333";

afterEach(() => {
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("listViewPools", () => {
  it("returns a normalized active pool snapshot for a registered view", async () => {
    globalThis.fetch = vi.fn(async (input: RequestInfo | URL) => {
      expect(String(input)).toBe(
        `https://rest.example/shinzonetwork/pool/v1/views/${viewAddress}/pools`,
      );
      return Response.json({
        details: [
          {
            pool: {
              pool_address: poolAddress.toLowerCase(),
              view_address: viewAddress.toLowerCase(),
              config: { window_size: "100" },
              created_at: "81734",
            },
            hosts: hostAddresses.map((address, index) => ({
              host_address: hexToShinzoAddress(address),
              host: { joined_at: String(81848 + index) },
            })),
            demands: [
              {
                registrant_address: hexToShinzoAddress(registrantAddress),
                demand: {
                  bond: "100000000000000000",
                  price_pref: "0",
                  binding: false,
                  expires_at: "0",
                },
              },
            ],
            stats: {
              price: "100000000000000",
              utilization: "42",
              total_queries: "9007199254740993",
              total_rewards: "5000000000000000000",
              last_updated_epoch: "12",
            },
            // Readiness is intentionally derived from the three host records.
            is_active: false,
          },
        ],
      });
    }) as typeof fetch;

    await expect(
      listViewPools(shinzoHubTestClient, {
        viewAddress: viewAddress.toLowerCase(),
        cosmosRestUrl: "https://rest.example",
      }),
    ).resolves.toEqual([
      {
        poolAddress,
        viewAddress,
        config: { windowSize: 100n },
        createdAtHeight: 81734n,
        hosts: hostAddresses.map((address, index) => ({
          hostAddress: getAddress(address),
          joinedAtHeight: BigInt(81848 + index),
        })),
        demands: [
          {
            registrantAddress: getAddress(registrantAddress),
            bond: 100000000000000000n,
            pricePreference: null,
            binding: false,
            expiresAt: null,
          },
        ],
        stats: {
          reportedUnitPrice: 100000000000000n,
          utilizationPercent: 42n,
          totalQueries: 9007199254740993n,
          totalRewards: 5000000000000000000n,
          lastUpdatedEpoch: 12n,
        },
        requiredHostCount: 3,
        isActive: true,
      },
    ]);
  });
});
