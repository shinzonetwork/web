import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlocksQuery = graphql(`
  query Blocks($offset: Int, $limit: Int) {
    Block: Ethereum__Mainnet__Block(offset: $offset, limit: $limit, order: { number: DESC }) {
      number
      timestamp
      gasUsed
      gasLimit
      miner
      transactions(limit: 1, order: { transactionIndex: DESC }) {
        transactionIndex
      }
    }
  }
`)

interface UseBlocksOptions {
  offset: number;
  limit: number;
}

export const useBlocks = (options: Partial<UseBlocksOptions>) => {
  const { offset, limit } = options;

  return useQuery({
    queryKey: ['blocks', offset, limit],
    queryFn: async () => {
      const res = await execute(BlocksQuery, { offset, limit });
      return {
        blocks: res.Block?.filter(Boolean),
      };
    },
  });
};
