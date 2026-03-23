import { useCallback } from "react";
import { IndexerWithHealth } from "@/lib/shared/types";

/** Stable key for matching API rows to health results — shared by load + poll hooks. */
export function indexerEntryKey(entry: {
  validatorAddress: string;
  ip: string;
}): string {
  return `${entry.validatorAddress}-${entry.ip}`;
}

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
