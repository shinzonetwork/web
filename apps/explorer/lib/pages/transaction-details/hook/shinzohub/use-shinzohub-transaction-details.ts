import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";
import type { Hex, Transaction } from "viem";

const fetchShinzohubTransactionDetails = async (hash: Hex): Promise<Transaction> => {
  const publicClient = getPublicClient('shinzohub');
  const transaction = await publicClient.getTransaction({ hash });

  return transaction;
};

export const useShinzohubTransactionDetails = (hash: Hex) => {
  return useQuery<Transaction>({
    queryKey: ['shinzohub', 'transaction-details', hash],
    queryFn: () => fetchShinzohubTransactionDetails(hash),
    enabled: !!hash,
  });
};