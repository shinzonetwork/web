import { getPublicClient } from "@/shared/viem/client";
import { useQuery } from "@tanstack/react-query";
import type { Hex, TransactionReceipt } from "viem";

export type { ShinzohubRpcTransaction } from "./shinzohub-rpc-transaction";

const fetchShinzohubTransactionReceipt = async (hash: Hex): Promise<TransactionReceipt> => {
  const publicClient = getPublicClient('shinzohub');
  const reciept = await publicClient.getTransactionReceipt({ hash });

  return reciept;
};

export const useShinzohubTransactionReceipt = (hash: Hex) => {
  return useQuery<TransactionReceipt>({
    queryKey: ['shinzohub', 'transaction-receipt', hash],
    queryFn: () => fetchShinzohubTransactionReceipt(hash),
    enabled: !!hash,
  });
};