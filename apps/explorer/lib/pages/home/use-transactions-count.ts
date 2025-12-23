import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const TransactionsCountQuery = graphql(`
  query TransactionsCount {
    txCount: _count(Transaction: {})
  }
`);

export const useTransactionsCount = () => {
  return useQuery({
    queryKey: ['transactions-count'],
    queryFn: async () => {
      const res = await execute(TransactionsCountQuery);
      return res?.txCount ?? 0;
    },
  });
};

