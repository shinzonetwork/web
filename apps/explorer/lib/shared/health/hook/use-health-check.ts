import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useCallback } from "react";
import { LiveDataWithKey, HealthStatus, LiveData, HealthEntryKeyParams } from "../types";
import { createHealthEntryKey } from "../lib/utils";

export const healthQueryKey = (entry: HealthEntryKeyParams): QueryKey =>
  ["health", createHealthEntryKey(entry)] as const;

const HEALTH_PROXY_URL =
  process.env.NEXT_PUBLIC_HEALTH_PROXY_URL ||
  "https://shinzo-health-proxy.fly.dev";

async function fetchHealthStatus(
  entry: HealthEntryKeyParams
): Promise<LiveDataWithKey> {
  const key = createHealthEntryKey(entry);

  try {
    const res = await fetch(
      `${HEALTH_PROXY_URL}/health?ip=${encodeURIComponent(entry.ip)}`,
      { method: "GET", cache: "no-store" }
    );

    if (!res.ok) {
      return { key, status: "unhealthy" };
    }

    const data = (await res.json()) as LiveData;
    const status: HealthStatus =
      data.status === "healthy" ? "healthy" : "unhealthy";

    return { key, status };
  } catch {
    return { key, status: "unhealthy" };
  }
}

export const useHealthCheck = () => {
  const queryClient = useQueryClient();

  const fetchHealth = useCallback(
    async (entry: HealthEntryKeyParams): Promise<LiveDataWithKey> => {
      return queryClient.fetchQuery({
        queryKey: healthQueryKey(entry),
        queryFn: () => fetchHealthStatus(entry),
        staleTime: 0,
      });
    },
    [queryClient]
  );

  return { fetchHealth };
};