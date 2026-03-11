export type MetricsResponse = {
  current_block: number;
  metrics: {
    attestations_created: number;
    attestation_errors: number;
    signature_verifications: number;
    signature_failures: number;
    batch_sig_events_received: number;
    blocks_received: number;
    documents_received: number;
    blocks_processed: number;
    transactions_processed: number;
    logs_processed: number;
    access_lists_processed: number;
    batch_signatures_processed: number;
    unique_blocks: number;
    unique_transactions: number;
    unique_logs: number;
    unique_access_lists: number;
    views_registered: number;
    views_active: number;
    processing_queue_size: number;
    view_queue_size: number;
    last_processing_time_ms: number;
    start_time: string;
    last_document_time: string;
    most_recent_block: number;
    build_tags: string;
    schema_type: string;
  };
  timestamp: number;
  uptime_human: string;
  uptime_seconds: number;
};

/** Metrics object type with unique_*, processing_queue_size, and view_queue_size omitted */
type FilteredMetricsData = Omit<
  MetricsResponse["metrics"],
  | "unique_blocks"
  | "unique_transactions"
  | "unique_logs"
  | "unique_access_lists"
  | "processing_queue_size"
  | "view_queue_size"
> & {
  total_errors: number;
};

/** Full response type with metrics narrowed to MetricsDataMetrics */
export type MetricsData = Omit<MetricsResponse, "metrics" | "current_block"> &
  FilteredMetricsData;

export type HistoricalMetricsData = MetricsData[];

export type ThroughputDataPoint = {
  time: string;
  documents_received: number;
  documents_processed: number;
};
export type BlockProgressionDataPoint = {
  time: string;
  block: number;
};
export type ProcessingTimeHistoryDataPoint = {
  time: string;
  processingTime: number;
};

export type MetricsContextType = {
  currentMetricsData: MetricsData | undefined;
  throughputDataPoints: ThroughputDataPoint[];
  blockProgressionDataPoints: BlockProgressionDataPoint[];
  processingTimeHistoryDataPoints: ProcessingTimeHistoryDataPoint[];
  historicalMetricsData: HistoricalMetricsData;
  isLoading: boolean;
  error: Error | null;
};

/**
 * Serializable snapshot of metrics context used for persistence.
 * Used to hydrate state on page refresh (not on initial load or after tab close).
 */
export type PersistedMetricsState = {
  currentMetricsData: MetricsData | null;
  throughputDataPoints: ThroughputDataPoint[];
  blockProgressionDataPoints: BlockProgressionDataPoint[];
  processingTimeHistoryDataPoints: ProcessingTimeHistoryDataPoint[];
  historicalMetricsData: HistoricalMetricsData;
};
