"use client";

import { useQuery } from "@tanstack/react-query";
import { METRICS_API_URL } from "@/lib/shared/utils/consts";
import { MetricsData, MetricsResponse } from "../types/types";

async function fetchMetrics(): Promise<MetricsData> {
  const response = await fetch(METRICS_API_URL ?? '');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: MetricsResponse = await response.json();

  return {
    attestations_created: data.metrics.attestations_created,
    attestation_errors: data.metrics.attestation_errors,
    signature_verifications: data.metrics.signature_verifications,
    signature_failures: data.metrics.signature_failures,
    total_errors:
      data.metrics.attestation_errors + data.metrics.signature_failures,
    batch_sig_events_received: data.metrics.batch_sig_events_received,
    blocks_received: data.metrics.blocks_received,
    documents_received: data.metrics.documents_received,
    blocks_processed: data.metrics.blocks_processed,
    transactions_processed: data.metrics.transactions_processed,
    logs_processed: data.metrics.logs_processed,
    access_lists_processed: data.metrics.access_lists_processed,
    batch_signatures_processed: data.metrics.batch_signatures_processed,
    views_registered: data.metrics.views_registered,
    views_active: data.metrics.views_active,
    last_processing_time_ms: data.metrics.last_processing_time_ms,
    start_time: data.metrics.start_time,
    last_document_time: data.metrics.last_document_time,
    most_recent_block: data.metrics.most_recent_block,
    build_tags: data.metrics.build_tags,
    schema_type: data.metrics.schema_type,
    timestamp: data.timestamp,
    uptime_human: data.uptime_human,
    uptime_seconds: data.uptime_seconds,
  };
}

export function useMetrics(intervalMs = 5000) {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
  });
}
