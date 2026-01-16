import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { getQueryClient } from '@/shared/utils/get-query-client';
import { SHORT_BLOCKS_QUERY_NAME } from './use-short-blocks';
import { SHORT_TRANSACTIONS_QUERY_NAME } from './use-short-transactions';

interface MetricsData {
  attestations_created: number;
  attestation_errors: number;
  signature_verifications: number;
  signature_failures: number;
  documents_received: number;
  documents_processed: number;
  documents_dropped: number;
  documents_skipped: number;
  blocks_processed: number;
  transactions_processed: number;
  logs_processed: number;
  access_lists_processed: number;
  unique_blocks: number;
  unique_transactions: number;
  unique_logs: number;
  unique_access_lists: number;
  views_registered: number;
  views_active: number;
  view_processing_jobs: number;
  average_processing_time_ms: number;
  start_time: string;
  last_document_time: string;
  most_recent_block: number;
  build_tags: string;
  schema_type: string;
}

interface MetricsResponse {
  metrics: MetricsData;
  timestamp: number;
  uptime_human: string;
  uptime_seconds: number;
}

const METRICS_QUERY_NAME = 'blocks-transactions-count';
const METRICS_QUERY_CACHE_TIME = 3 * 1000;
const METRICS_API_URL = process.env.NEXT_PUBLIC_METRICS_URL;

export const useBlocksAndTransactionsCount = () => {
  const queryClient = getQueryClient();
  const previousBlocksProcessed = useRef<number | undefined>(undefined);

  const query = useQuery({
    queryKey: [METRICS_QUERY_NAME],
    staleTime: METRICS_QUERY_CACHE_TIME,
    refetchInterval: METRICS_QUERY_CACHE_TIME,
    queryFn: async (): Promise<MetricsResponse> => {
      const response = await fetch(METRICS_API_URL ?? '');
      if (!response.ok) {
        throw new Error(`Failed to fetch metrics: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    },
  });

  // Only invalidate queries when blocks_processed changes
  useEffect(() => {
    if (typeof query.data !== 'undefined') {
      const currentBlocksProcessed = query.data.metrics.blocks_processed;
      
      // Check if blocks_processed has actually changed
      if (
        previousBlocksProcessed.current !== undefined &&
        previousBlocksProcessed.current !== currentBlocksProcessed
      ) {
        // Blocks processed changed, invalidate related queries
        void Promise.all([
          queryClient.invalidateQueries({
            queryKey: [SHORT_BLOCKS_QUERY_NAME],
          }),
          queryClient.invalidateQueries({
            queryKey: [SHORT_TRANSACTIONS_QUERY_NAME],
          }),
        ]);
      }
      
      // Update the ref with the current value
      previousBlocksProcessed.current = currentBlocksProcessed;
    }
  }, [query.data, queryClient]);

  return query;
};

export { METRICS_QUERY_NAME };

