"use client";
import { ReactNode, useMemo, useEffect, useState } from "react";
import { MetricsContext } from "../model/metrics-context";
import {
  MetricsContextType,
  ThroughputDataPoint,
  BlockProgressionDataPoint,
  ProcessingTimeHistoryDataPoint,
  HistoricalMetricsData,
} from "../types/types";
import { useMetrics } from "../hook/use-metrics";

const MAX_DATA_POINTS = 720; // 720 points = 12 hours
/**
 * The provider for the metrics dashboard context.
 */
export const MetricsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data: currentMetricsData, isLoading, error } = useMetrics();

  const [throughputDataPoints, setThroughputDataPoints] = useState<
    ThroughputDataPoint[]
  >([]);
  const [blockProgressionDataPoints, setBlockProgressionDataPoints] = useState<
    BlockProgressionDataPoint[]
  >([]);
  const [processingTimeHistoryDataPoints, setProcessingTimeHistoryDataPoints] =
    useState<ProcessingTimeHistoryDataPoint[]>([]);
  const [historicalMetricsData, setHistoricalMetricsData] =
    useState<HistoricalMetricsData>([]);

  useEffect(() => {
    if (!currentMetricsData) return;

    const {
      blocks_processed,
      transactions_processed,
      logs_processed,
      access_lists_processed,
      documents_received,
      last_processing_time_ms,
    } = currentMetricsData;

    const timeFromTimestamp = new Date();
    const ampm = timeFromTimestamp.getHours() >= 12 ? "PM" : "AM";

    const time: string =
      timeFromTimestamp.getHours().toString().padStart(2, "0") +
      ":" +
      timeFromTimestamp.getMinutes().toString().padStart(2, "0") +
      ":" +
      timeFromTimestamp.getSeconds().toString().padStart(2, "0") +
      " " +
      ampm;

    const throughputPoint: ThroughputDataPoint = {
      time,
      documents_received: documents_received ?? 0,
      documents_processed:
        (blocks_processed ?? 0) +
        (transactions_processed ?? 0) +
        (logs_processed ?? 0) +
        (access_lists_processed ?? 0),
    };

    const blockPoint: BlockProgressionDataPoint = {
      time,
      block: blocks_processed ?? 0,
    };

    const processingTimePoint: ProcessingTimeHistoryDataPoint = {
      time,
      processingTime: last_processing_time_ms ?? 0,
    };

    setThroughputDataPoints((prev) =>
      [...prev, throughputPoint].slice(-MAX_DATA_POINTS),
    );
    setBlockProgressionDataPoints((prev) =>
      [...prev, blockPoint].slice(-MAX_DATA_POINTS),
    );
    setProcessingTimeHistoryDataPoints((prev) =>
      [...prev, processingTimePoint].slice(-MAX_DATA_POINTS),
    );
    setHistoricalMetricsData((prev) =>
      [...prev, currentMetricsData].slice(-MAX_DATA_POINTS),
    );
  }, [currentMetricsData]);

  const context: MetricsContextType = useMemo(() => {
    return {
      currentMetricsData,
      throughputDataPoints,
      blockProgressionDataPoints,
      processingTimeHistoryDataPoints,
      historicalMetricsData,
      isLoading,
      error,
    };
  }, [
    currentMetricsData,
    isLoading,
    error,
    throughputDataPoints,
    blockProgressionDataPoints,
    processingTimeHistoryDataPoints,
    historicalMetricsData,
  ]);

  return (
    <MetricsContext.Provider value={context}>
      {children}
    </MetricsContext.Provider>
  );
};
