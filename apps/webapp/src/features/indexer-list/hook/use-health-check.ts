import { useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useCallback } from "react";
import { LiveDataWithKey, HealthStatus, Peer } from "@/shared/types";
import { indexerEntryKey } from "@/shared/lib";

type IndexerHealthEntry = {
  validatorAddress: string;
  ip: string;
};

type IndexerHealthResponse = {
  status?: string;
  p2p: {
    enabled: boolean;
    peers: Peer[];
    self: Peer;
  };
};

export const indexerHealthQueryKey = (entry: IndexerHealthEntry): QueryKey =>
  ["indexer-health", indexerEntryKey(entry)] as const;

const HEALTH_CHECK_TIMEOUT_MS = 5000;

async function fetchIndexerHealth(
  entry: IndexerHealthEntry
): Promise<LiveDataWithKey> {
  const key = indexerEntryKey(entry);

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    HEALTH_CHECK_TIMEOUT_MS
  );

  try {
    const res = await fetch(`/api/health?ip=${encodeURIComponent(entry.ip)}`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) {
      return { key, data: { health: "unhealthy", peers: null } };
    }

    const data = (await res.json()) as IndexerHealthResponse;
    const peers = data.p2p?.self ? data.p2p.self : null;
    const health: HealthStatus =
      data.status === "healthy" ? "healthy" : "unhealthy";

    return { key, data: { health, peers } };
  } catch {
    return { key, data: { health: "unhealthy", peers: null } };
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
