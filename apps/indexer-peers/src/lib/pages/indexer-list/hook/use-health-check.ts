import { useCallback } from "react";
import { IndexerWithHealth } from "@/lib/shared/types";
import { indexerEntryKey } from "@/lib/shared/helpers";

export const useHealthCheck = () => {
  const fetchHealth = useCallback(
    async (entry: { validatorAddress: string; ip: string }) => {
      try {
        const res = await fetch(
          `/api/health?ip=${encodeURIComponent(entry.ip)}`,
        );
        const data = (await res.json()) as { healthy?: string };
        return {
          key: indexerEntryKey(entry),
          health: data.healthy as IndexerWithHealth["health"],
        };
      } catch {
        return {
          key: indexerEntryKey(entry),
          health: "unhealthy" as const,
        };
      }
    },
    [],
  );

  return { fetchHealth };
};
