import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";

const fetchShinzohubBlock = async (blockNumber: string) => {
    const publicClient = getPublicClient('shinzohub');
    return publicClient.getBlock({ blockNumber: BigInt(blockNumber), includeTransactions: true });
};

export function shinzohubBlockQueryKey(blockNumber: string) {
  return ['shinzohub', 'block', blockNumber] as const;
}

export function useShinzohubBlock(blockNumber: string) {
  return useQuery({
    queryKey: shinzohubBlockQueryKey(blockNumber),
    queryFn: () => fetchShinzohubBlock(blockNumber),
    enabled: !!blockNumber,
    staleTime: 1000 * 60,
  });
}