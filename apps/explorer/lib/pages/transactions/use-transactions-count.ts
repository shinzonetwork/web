import { useQuery } from '@tanstack/react-query';

interface TransactionsCountResponse {
  totalTransactions: number;
}

const TRANSACTIONS_COUNT_QUERY_NAME = 'transactions-count';
const METRICS_API_URL = process.env.NEXT_PUBLIC_METRICS_URL;

export const useTransactionsCount = () => {

  const query = useQuery({
    queryKey: [TRANSACTIONS_COUNT_QUERY_NAME],
    queryFn: async (): Promise<TransactionsCountResponse> => {
      const response = await fetch(METRICS_API_URL ?? '');
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        totalTransactions: data.metrics.transactions_processed,
      };
    },
  });

  return query;
};

export { TRANSACTIONS_COUNT_QUERY_NAME };

