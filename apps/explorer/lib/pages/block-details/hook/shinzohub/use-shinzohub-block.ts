import { useQuery } from "@tanstack/react-query";
import type { ShinzohubBlock } from "@/shared/shinzohub/types";
import type { Hex } from "viem";

export type UseShinzohubBlockOptions =
  | { number: number; hash?: never }
  | { hash: Hex; number?: never };

export async function fetchShinzohubBlock(
  id: string,
): Promise<ShinzohubBlock> {
  const response = await fetch(
    `/api/shinzohub/blocks/${encodeURIComponent(id)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Shinzohub block");
  }

  return response.json() as Promise<ShinzohubBlock>;
}

export function shinzohubBlockQueryKey(
  blockNumber: number | undefined,
  hash: Hex | undefined,
) {
  return [
    "shinzohub",
    "block",
    blockNumber ?? hash,
    blockNumber !== undefined ? "blockNumber" : "hash",
  ] as const;
}

export function useShinzohubBlock(
  options: UseShinzohubBlockOptions,
  queryOptions?: { enabled?: boolean },
) {
  const blockNumber = "number" in options ? options.number : undefined;
  const hash = "hash" in options ? options.hash : undefined;
  const id = blockNumber !== undefined ? String(blockNumber) : hash;

  return useQuery({
    queryKey: shinzohubBlockQueryKey(blockNumber, hash),
    queryFn: () => fetchShinzohubBlock(id!),
    enabled:
      (queryOptions?.enabled ?? true) &&
      id !== undefined &&
      (!!blockNumber || !!hash),
    staleTime: 1000 * 60,
  });
}
