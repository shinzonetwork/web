import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const TransactionsCountQuery = graphql(`
  query TransactionsCount {
    txCount: _count(Ethereum__Mainnet__Transaction: {})
  }
`);

export const TRANSACTIONS_COUNT_QUERY_NAME = 'transactions-count';
const TRANSACTIONS_COUNT_QUERY_CACHE_TIME = Infinity;

export const useTransactionsCount = () => {
  return useQuery({
    queryKey: [TRANSACTIONS_COUNT_QUERY_NAME],
    staleTime: TRANSACTIONS_COUNT_QUERY_CACHE_TIME,
    queryFn: async () => {
      const res = await execute(TransactionsCountQuery);
      return res?.txCount ?? 0;
    },
  });
};

