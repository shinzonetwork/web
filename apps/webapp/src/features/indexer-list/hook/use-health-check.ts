import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useCallback } from "react";
import { IndexerWithHealth } from "@/shared/types";
import { indexerEntryKey } from "@/shared/lib";

export type IndexerHealthEntry = {
  validatorAddress: string;
  ip: string;
};

export const indexerHealthQueryKey = (entry: IndexerHealthEntry): QueryKey =>
  ["indexer-health", indexerEntryKey(entry)] as const;

const HEALTH_CHECK_TIMEOUT_MS = 5000;

async function fetchIndexerHealth(
  entry: IndexerHealthEntry
): Promise<{ key: string; health: IndexerWithHealth["health"] }> {
  const key = indexerEntryKey(entry);
  const host = entry.ip.includes(":") ? `[${entry.ip}]` : entry.ip;

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    HEALTH_CHECK_TIMEOUT_MS
  );

  try {
    const res = await fetch(`https://${host}/health`, {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      return { key, health: "unhealthy" };
    }

    const data = (await res.json()) as { status?: string };
    const raw = data.status;
    const health: IndexerWithHealth["health"] =
      raw === "healthy" ? "healthy" : "unhealthy";

    return { key, health };
  } catch {
    return { key, health: "unhealthy" };
  } finally {
    clearTimeout(timeoutId);
  }
}

export const useHealthCheck = () => {
  const queryClient = useQueryClient();

  const fetchHealth = useCallback(
    async (entry: IndexerHealthEntry) => {
      return queryClient.fetchQuery({
        queryKey: indexerHealthQueryKey(entry),
        queryFn: () => fetchIndexerHealth(entry),
        staleTime: 0,
      });
    },
    [queryClient]
  );

  return { fetchHealth };
};
