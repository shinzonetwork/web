import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlocksQuery = graphql(`
  query Blocks($offset: Int, $limit: Int) {
    blockCount: _count(Ethereum__Mainnet__Block: {})
    Block: Ethereum__Mainnet__Block(offset: $offset, limit: $limit, order: { number: DESC }) {
      hash
      number
      timestamp
      gasUsed
      gasLimit
      miner
      size
      txCount: _count(transactions: {})
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
        totalCount: res.blockCount,
      };
    },
  });
};
