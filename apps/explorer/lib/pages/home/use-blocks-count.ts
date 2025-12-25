import { execute, graphql } from '@/shared/graphql';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getQueryClient } from '@/shared/utils/get-query-client';
import { SHORT_BLOCKS_QUERY_NAME } from './use-short-blocks';
import { TRANSACTIONS_COUNT_QUERY_NAME } from './use-transactions-count';
import { SHORT_TRANSACTIONS_QUERY_NAME } from './use-short-transactions';

const BlocksCountQuery = graphql(`
  query BlocksCount {
    count: _count(Block: {})
  }
`);

const BLOCKS_COUNT_QUERY_NAME = 'blocks-count';
const BLOCKS_COUNT_QUERY_CACHE_TIME = 3 * 1000;

export const useBlocksCount = () => {
  const queryClient = getQueryClient();

  const query = useQuery({
    queryKey: [BLOCKS_COUNT_QUERY_NAME],
    staleTime: BLOCKS_COUNT_QUERY_CACHE_TIME,
    refetchInterval: BLOCKS_COUNT_QUERY_CACHE_TIME,
    queryFn: async () => {
      const res = await execute(BlocksCountQuery);
      return res?.count ?? 0;
    },
  });

  // on new blocks, re-request short blocks
  useEffect(() => {
    if (typeof query.data !== 'undefined') {
      void Promise.all([
        queryClient.invalidateQueries({
          queryKey: [SHORT_BLOCKS_QUERY_NAME],
        }),
        queryClient.invalidateQueries({
          queryKey: [TRANSACTIONS_COUNT_QUERY_NAME],
        }),
        queryClient.invalidateQueries({
          queryKey: [SHORT_TRANSACTIONS_QUERY_NAME],
        }),
      ])
    }
  }, [query.data, queryClient]);

  return query;
};

