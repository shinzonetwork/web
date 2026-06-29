import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";
import type { Hex, TransactionReceipt } from "viem";

const fetchShinzohubTransactionReceipt = async (hash: Hex): Promise<TransactionReceipt> => {
  const publicClient = getPublicClient('shinzohub');
  const receipt = await publicClient.getTransactionReceipt({ hash });

  return receipt;
};

export const useShinzohubTransactionReceipt = (hash?: Hex | null) => {
  return useQuery<TransactionReceipt>({
    queryKey: ['shinzohub', 'transaction-receipt', hash],
    queryFn: () => {
      if (!hash) {
        throw new Error('EVM transaction hash is required');
      }
      return fetchShinzohubTransactionReceipt(hash);
    },
    enabled: !!hash,
  });
};
