"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getNetworkUnitPrice,
  listViewPools,
  type ShinzoHubViewPool,
} from "@shinzo/shinzohub/views";
import { useConnection } from "wagmi";
import { getHubCosmosRestUrl, shinzohubPublicClient } from "@/entities/view";

const VIEW_POOLS_REFRESH_MS = 30 * 1000;

type NetworkUnitPriceState =
  | { status: "idle" | "loading" }
  | { status: "error"; error: string; retry: () => void }
  | { status: "success"; value: bigint };

export type ViewPoolsState =
  | { status: "loading" }
  | { status: "error"; error: string; retry: () => void }
  | {
      status: "success";
      pools: readonly ShinzoHubViewPool[];
      activePoolsByAddress: ReadonlyMap<string, ShinzoHubViewPool>;
      connectedAddress: string | null;
      networkUnitPrice: NetworkUnitPriceState;
    };

export function useViewPools(viewAddress: string): ViewPoolsState {
  const { address: connectedAddress } = useConnection();
  const poolsQuery = useQuery({
    queryKey: ["studio-view-pools", viewAddress],
    queryFn: () =>
      listViewPools(shinzohubPublicClient, {
        viewAddress,
        cosmosRestUrl: getHubCosmosRestUrl(),
      }),
    staleTime: VIEW_POOLS_REFRESH_MS,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchInterval: (query) =>
      query.state.status === "success" ? VIEW_POOLS_REFRESH_MS : false,
  });

  const pools = useMemo(
    () => sortViewPools(poolsQuery.data ?? []),
    [poolsQuery.data]
  );
  const pricePoolAddress = pools[0]?.poolAddress ?? null;
  const priceQuery = useQuery({
    queryKey: ["studio-view-network-unit-price", pricePoolAddress],
    queryFn: () => {
      if (!pricePoolAddress) {
        throw new Error(
          "A materialized pool is required to read network price."
        );
      }
      return getNetworkUnitPrice(shinzohubPublicClient, {
        poolAddress: pricePoolAddress,
      });
    },
    enabled: Boolean(pricePoolAddress),
    staleTime: VIEW_POOLS_REFRESH_MS,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchInterval: (query) =>
      query.state.status === "success" ? VIEW_POOLS_REFRESH_MS : false,
  });

  const activePoolsByAddress = useMemo(
    () =>
      new Map(
        pools
          .filter((pool) => pool.isActive)
          .map((pool) => [pool.poolAddress.toLowerCase(), pool] as const)
      ),
    [pools]
  );

  if (poolsQuery.isLoading) {
    return { status: "loading" };
  }

  if (poolsQuery.isError) {
    return {
      status: "error",
      error: toErrorMessage(poolsQuery.error),
      retry: () => {
        void poolsQuery.refetch();
      },
    };
  }

  return {
    status: "success",
    pools,
    activePoolsByAddress,
    connectedAddress: connectedAddress ?? null,
    networkUnitPrice: toNetworkUnitPriceState(priceQuery, pricePoolAddress),
  };
}

function sortViewPools(
  pools: readonly ShinzoHubViewPool[]
): readonly ShinzoHubViewPool[] {
  return [...pools].sort((left, right) => {
    if (left.isActive !== right.isActive) {
      return left.isActive ? -1 : 1;
    }
    if (left.hosts.length !== right.hosts.length) {
      return right.hosts.length - left.hosts.length;
    }
    if (left.config.windowSize !== right.config.windowSize) {
      return left.config.windowSize < right.config.windowSize ? -1 : 1;
    }
    return left.poolAddress.localeCompare(right.poolAddress);
  });
}

function toNetworkUnitPriceState(
  query: {
    isLoading: boolean;
    isError: boolean;
    error: unknown;
    data: bigint | undefined;
    refetch: () => unknown;
  },
  poolAddress: string | null
): NetworkUnitPriceState {
  if (!poolAddress) {
    return { status: "idle" };
  }
  if (query.isLoading) {
    return { status: "loading" };
  }
  if (query.isError) {
    return {
      status: "error",
      error: toErrorMessage(query.error),
      retry: () => {
        void query.refetch();
      },
    };
  }
  if (query.data !== undefined) {
    return { status: "success", value: query.data };
  }
  return { status: "loading" };
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected ShinzoHub error.";
}
