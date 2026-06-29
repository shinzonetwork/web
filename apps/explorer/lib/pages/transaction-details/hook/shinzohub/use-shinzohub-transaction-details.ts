import { useQuery } from "@tanstack/react-query";
import type { ShinzohubTransaction } from '@/shared/shinzohub/types';

const fetchShinzohubTransactionDetails = async (hash: string): Promise<ShinzohubTransaction> => {
  const response = await fetch(`/api/shinzohub/transactions/${encodeURIComponent(hash)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch ShinzoHub transaction');
  }
  return response.json() as Promise<ShinzohubTransaction>;
};

export const useShinzohubTransactionDetails = (hash: string) => {
  return useQuery<ShinzohubTransaction>({
    queryKey: ['shinzohub', 'transaction-details', hash],
    queryFn: () => fetchShinzohubTransactionDetails(hash),
    enabled: !!hash,
  });
};
