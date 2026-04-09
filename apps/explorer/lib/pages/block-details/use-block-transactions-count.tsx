import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlockTransactionsCountQuery = graphql(`
  query BlockTransactionsCount($blockNumber: Int) {
    BlockTransactionsCount: Ethereum__Mainnet__Block(
      filter: { number: { _eq: $blockNumber } }
      limit: 1
    ) {
      transactions (order: { transactionIndex: DESC }, limit: 1) {
        transactionIndex
      }
    }
  }
`)
interface UseBlockTransactionsCountOptions {
  blockNumber?: number;
}

export const useBlockTransactionsCount = (options: UseBlockTransactionsCountOptions) => {
  const { blockNumber } = options;

  return useQuery({
    queryKey: ['block-transactions-count', blockNumber],
    enabled: !!blockNumber,
    staleTime: 1000 * 60,
    queryFn: async () => {
      const res = await execute(BlockTransactionsCountQuery, { blockNumber });
      const blocks = res.BlockTransactionsCount ?? [];
      const firstBlock = blocks[0];
      const txCount = Number(firstBlock?.transactions?.[0]?.transactionIndex) > 0 ? Number(firstBlock?.transactions?.[0]?.transactionIndex) + 1 : 0;
      return { txCount } as const;
    },
  });
};
