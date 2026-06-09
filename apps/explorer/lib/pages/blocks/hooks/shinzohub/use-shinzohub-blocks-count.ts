import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";

const fetchShinzohubBlocksCount = async (): Promise<bigint> => {
  const publicClient = getPublicClient('shinzohub');
  return publicClient.getBlockNumber({ cacheTime: 0 });
};

export const useShinzohubBlocksCount = () => {
  return useQuery<bigint>({
    queryKey: ['shinzohub', 'blocks-count'],
    queryFn: () => fetchShinzohubBlocksCount(),
  });
};