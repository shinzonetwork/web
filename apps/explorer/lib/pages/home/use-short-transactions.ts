import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';
import { Transaction } from '@/shared/graphql/generated/graphql';

const ShortTransactionsQuery = graphql(`
  query ShortTransactions($limit: Int) {
    Transaction(
      limit: $limit, 
      order: { blockNumber: DESC }
    ) {
      hash
      from
      to
      value
    }
  }
`);

export const SHORT_TRANSACTIONS_QUERY_NAME = 'short-transactions';
const SHORT_TRANSACTIONS_QUERY_CACHE_TIME = Infinity;

export const useShortTransactions = () => {
  return useQuery({
    queryKey: [SHORT_TRANSACTIONS_QUERY_NAME],
    staleTime: SHORT_TRANSACTIONS_QUERY_CACHE_TIME,
    queryFn: async () => {
      const res = await execute(ShortTransactionsQuery, { limit: 5 });
      return res.Transaction?.filter(Boolean) as Transaction[];
    },
  });
};

