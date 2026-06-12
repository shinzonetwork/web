import { useQuery } from "@tanstack/react-query";
import type { ShinzohubBlock } from "@/shared/shinzohub/types";
import { isValidBlockId } from "@/shared/utils/block-route";

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

export function shinzohubBlockQueryKey(id: string) {
  return ["shinzohub", "block", id] as const;
}

export function useShinzohubBlock(
  id: string,
  queryOptions?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: shinzohubBlockQueryKey(id),
    queryFn: () => fetchShinzohubBlock(id),
    enabled: (queryOptions?.enabled ?? true) && isValidBlockId(id),
    staleTime: 1000 * 60,
  });
}
