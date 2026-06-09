import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";
import type { Hex } from "viem";

export type UseShinzohubBlockOptions =
  | { number: number; hash?: never }
  | { hash: Hex; number?: never };

const fetchShinzohubBlock = (blockNumber: number | undefined, hash: Hex | undefined) => {
  const publicClient = getPublicClient('shinzohub');
    if (blockNumber) {
      return publicClient.getBlock({ blockNumber: BigInt(blockNumber), includeTransactions: true });
    } else if (hash) {
      return publicClient.getBlock({ blockHash: hash, includeTransactions: true });
    } else {
      throw new Error('blockNumber or hash is required');
    }
};

export function shinzohubBlockQueryKey(blockNumber: number | undefined, hash: Hex | undefined) {
  return ['shinzohub', 'block', blockNumber ?? hash, blockNumber !== undefined ? 'blockNumber' : 'hash'] as const;
}

export function useShinzohubBlock(options: UseShinzohubBlockOptions) {
  const blockNumber = 'number' in options ? options.number : undefined;
  const hash = 'hash' in options ? options.hash : undefined;

  return useQuery({
    queryKey: shinzohubBlockQueryKey(blockNumber, hash),
    queryFn: () => fetchShinzohubBlock(blockNumber, hash),
    enabled: !!blockNumber || !!hash,
    staleTime: 1000 * 60,
  });
}