import { useQuery } from '@tanstack/react-query';
import { METRICS_API_URL } from '@/shared/utils/consts';
import { MetricsResponse } from '../home/use-blocks-and-transactions-count';

interface BlocksCountResponse {
  totalBlocks: number;
}

const BLOCKS_COUNT_QUERY_NAME = 'blocks-count';

export const useBlocksCount = () => {

  return useQuery({
    queryKey: [BLOCKS_COUNT_QUERY_NAME],
    queryFn: async (): Promise<BlocksCountResponse> => {
      const response = await fetch(METRICS_API_URL ?? '');
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      const data: MetricsResponse = await response.json();
      return {
        totalBlocks: data.metrics.blocks_processed,
      } as const;
    },
  });
};
