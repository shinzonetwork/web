import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import type { ViewPoolsState } from "./use-view-pools";

export type ViewAvailability =
  | { status: "loading" }
  | {
      status: "available";
      activePoolCount: number;
      poolCount: number;
      hostCount: number;
    }
  | {
      status: "waiting";
      poolCount: number;
      hostCount: number;
      requiredHostCount: number;
    }
  | { status: "no-pools" }
  | { status: "unavailable"; error: string; retry: () => void };

export const deriveViewAvailability = (
  state: ViewPoolsState
): ViewAvailability => {
  if (state.status === "loading") {
    return { status: "loading" };
  }

  if (state.status === "error") {
    return {
      status: "unavailable",
      error: state.error,
      retry: state.retry,
    };
  }

  if (state.pools.length === 0) {
    return { status: "no-pools" };
  }

  const activePools = state.pools.filter((pool) => pool.isActive);
  if (activePools.length > 0) {
    return {
      status: "available",
      activePoolCount: activePools.length,
      poolCount: state.pools.length,
      hostCount: countUniqueHosts(activePools),
    };
  }

  const closestPool = [...state.pools].sort(
    (left, right) => right.hosts.length - left.hosts.length
  )[0];

  return {
    status: "waiting",
    poolCount: state.pools.length,
    hostCount: closestPool?.hosts.length ?? 0,
    requiredHostCount: closestPool?.requiredHostCount ?? 3,
  };
};

const countUniqueHosts = (pools: readonly ShinzoHubViewPool[]): number =>
  new Set(
    pools.flatMap((pool) =>
      pool.hosts.map((host) => host.hostAddress.toLowerCase())
    )
  ).size;
