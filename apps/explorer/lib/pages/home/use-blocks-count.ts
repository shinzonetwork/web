import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';

const BlocksCountQuery = graphql(`
  query BlocksCount {
    count: _count(Block: {})
  }
`);

export const useBlocksCount = () => {
  return useQuery({
    queryKey: ['blocks-count'],
    queryFn: async () => {
      const res = await execute(BlocksCountQuery);
      return res?.count ?? 0;
    },
  });
};

