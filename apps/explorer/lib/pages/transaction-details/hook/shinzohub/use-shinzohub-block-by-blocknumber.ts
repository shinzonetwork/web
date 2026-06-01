import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";
import type { Hex, Block } from "viem";

export type { ShinzohubRpcTransaction } from "./shinzohub-rpc-transaction";

const fetchShinzohubBlockByBlocknumber = async (hash: Hex): Promise<Block> => {
  const publicClient = getPublicClient('shinzohub');
  const transaction = await publicClient.getTransaction({ hash });
  const block = await publicClient.getBlock({ blockNumber: transaction.blockNumber });

  return block;
};

export const useShinzohubBlockByBlocknumber = (hash: Hex) => {
  return useQuery<Block>({
    queryKey: ['shinzohub', 'block-by-blocknumber', hash],
    queryFn: () => fetchShinzohubBlockByBlocknumber(hash),
    enabled: !!hash,
  });
};