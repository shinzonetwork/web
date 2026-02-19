import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const ShortBlocksQuery = graphql(`
  query ShortBlocks($limit: Int) {
    Block: Ethereum__Mainnet__Block(
      limit: $limit, 
      order: { number: DESC }
    ) {
      number
      miner
      timestamp
      transactions(limit: 1, order: { transactionIndex: DESC }) {
        transactionIndex
      }
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

