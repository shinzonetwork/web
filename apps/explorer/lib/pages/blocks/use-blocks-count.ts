import { useQuery } from '@tanstack/react-query';

interface BlocksCountResponse {
  totalBlocks: number;
}

const BLOCKS_COUNT_QUERY_NAME = 'blocks-count';
const METRICS_API_URL = process.env.NEXT_PUBLIC_METRICS_URL;

export const useBlocksCount = () => {

  const query = useQuery({
    queryKey: [BLOCKS_COUNT_QUERY_NAME],
    queryFn: async (): Promise<BlocksCountResponse> => {
      const response = await fetch(METRICS_API_URL ?? '');
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      const data = await response.json();
      return {
        totalBlocks: data.metrics.blocks_processed,
      };
    },
  });

  return query;
};

export { BLOCKS_COUNT_QUERY_NAME };

