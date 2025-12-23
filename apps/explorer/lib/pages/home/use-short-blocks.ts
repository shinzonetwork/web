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
    }
  }
`);

export const useShortBlocks = () => {
  return useQuery({
    queryKey: ['short-blocks'],
    queryFn: async () => {
      const res = await execute(ShortBlocksQuery, { limit: 5 });
      return res.Block?.filter(Boolean);
    },
  });
};

