import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";
import type { Block } from "viem";

const fetchShinzohubBlockByBlockNumber = async (blockNumber: bigint): Promise<Block> => {
  const publicClient = getPublicClient('shinzohub');
  return publicClient.getBlock({ blockNumber });
};

export const useShinzohubBlockByBlocknumber = (blockNumber: bigint | undefined) => {
  return useQuery<Block>({
    queryKey: ['shinzohub', 'block-by-blocknumber', blockNumber?.toString()],
    queryFn: () => fetchShinzohubBlockByBlockNumber(blockNumber ?? BigInt(0)),
    enabled: blockNumber != null,
  });
};