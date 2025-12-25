import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const ShortBlocksQuery = graphql(`
  query ShortBlocks($limit: Int) {
    Block(
      limit: $limit, 
      order: { number: DESC }
    ) {
      number
      miner
      timestamp
      txCount: _count(transactions: {})
    }
  }
`);

export const SHORT_BLOCKS_QUERY_NAME = 'short-blocks';
const SHORT_BLOCKS_QUERY_CACHE_TIME = Infinity;

export const useShortBlocks = () => {
  return useQuery({
    queryKey: [SHORT_BLOCKS_QUERY_NAME],
    staleTime: SHORT_BLOCKS_QUERY_CACHE_TIME,
    queryFn: async () => {
      const res = await execute(ShortBlocksQuery, { limit: 5 });
      return res.Block?.filter(Boolean);
    },
  });
};

