import { METRICS_API_URL } from '@/shared/utils/consts';
import { useQuery } from '@tanstack/react-query';
import { MetricsResponse } from '../home/use-blocks-and-transactions-count';

interface TransactionsCountResponse {
  totalTransactions: number;
}

const TRANSACTIONS_COUNT_QUERY_NAME = 'transactions-count';

export const useTransactionsCount = () => {

  return useQuery({
    queryKey: [TRANSACTIONS_COUNT_QUERY_NAME],
    queryFn: async (): Promise<TransactionsCountResponse> => {
      const response = await fetch(METRICS_API_URL ?? '');
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      const data: MetricsResponse= await response.json();
      return {
        totalTransactions: data.metrics.transactions_processed,
      } as const;
    },
  });
};
