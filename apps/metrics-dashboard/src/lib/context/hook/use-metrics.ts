"use client";

import { useQuery } from "@tanstack/react-query";
import { METRICS_API_URL } from "@/lib/shared/utils/consts";
import { MetricsData, MetricsResponse } from "../types/types";

async function fetchMetrics(): Promise<MetricsData> {
  const response = await fetch(METRICS_API_URL ?? "");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: MetricsResponse = await response.json();

  return {
    ...data,
    ...data.metrics,
    total_errors:
      data.metrics.attestation_errors + data.metrics.signature_failures,
  } as MetricsData;
}

export function useMetrics(intervalMs = 5000) {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    refetchInterval: intervalMs,
    refetchIntervalInBackground: true,
  });
}
