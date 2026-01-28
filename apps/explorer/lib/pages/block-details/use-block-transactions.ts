import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlockTransactionsQuery = graphql(`
  query BlockTransactions($offset: Int, $limit: Int, $blockNumber: Int) {
    BlockTransactions: Ethereum__Mainnet__Block(
      filter: { number: { _eq: $blockNumber } }
      limit: 1
    ) {
      timestamp
      transactions (offset: $offset, limit: $limit) {
        hash
        from
        to
        value
        gasPrice
      }
    }
  }
`)
interface UseBlockTransactionsOptions {
  offset?: number;
  limit?: number;
  blockNumber?: number;
}

export const useBlockTransactions = (options: UseBlockTransactionsOptions) => {
  const { offset, limit, blockNumber } = options;

  return useQuery({
    queryKey: ['block-transactions', blockNumber],
    enabled: !!blockNumber,
    staleTime: 1000 * 60,
    queryFn: async () => {
      const res = await execute(BlockTransactionsQuery, { offset, limit, blockNumber });
      const blocks = res.BlockTransactions ?? [];
      const firstBlock = blocks[0];

      const transactions = firstBlock?.transactions?.filter((txn): txn is NonNullable<typeof txn> => txn !== null) ?? [];
      return { 
        transactions,
        timestamp: firstBlock?.timestamp
     } as const;
    },
  });
};
