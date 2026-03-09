"use client";
import { ReactNode, useMemo, useEffect, useState } from "react";
import { MetricsContext } from "../model/metrics-context";
import {
  MetricsContextType,
  ThroughputDataPoint,
  BlockProgressionDataPoint,
  ProcessingTimeHistoryDataPoint,
  HistoricalMetricsData,
  MetricsData,
} from "../types/types";
import { useMetrics } from "../hook/use-metrics";
import {
  getPersistedState,
  savePersistedState,
  clearPersistedState,
  hasMetricsSession,
  setMetricsSession,
} from "../storage/metrics-context-storage";

const MAX_DATA_POINTS = 720; // 720 points = 12 hours

function getStoredSnapshot(): ReturnType<typeof getPersistedState> {
  if (typeof window === "undefined" || !hasMetricsSession()) return null;
  return getPersistedState();
}

/**
 * The provider for the metrics dashboard context.
 * - Initial load (new tab): no sessionStorage flag → clear any stale localStorage, then set session; no hydrate.
 * - Page refresh: sessionStorage flag present → hydrate from localStorage; live fetch then takes over.
 * - Tab close: sessionStorage is cleared by the browser; localStorage is cleared on next initial load (new tab).
 */
export const MetricsContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [throughputDataPoints, setThroughputDataPoints] = useState<
    ThroughputDataPoint[]
  >(() => getStoredSnapshot()?.throughputDataPoints ?? []);
  const [blockProgressionDataPoints, setBlockProgressionDataPoints] =
    useState<BlockProgressionDataPoint[]>(
      () => getStoredSnapshot()?.blockProgressionDataPoints ?? [],
    );
  const [processingTimeHistoryDataPoints, setProcessingTimeHistoryDataPoints] =
    useState<ProcessingTimeHistoryDataPoint[]>(
      () => getStoredSnapshot()?.processingTimeHistoryDataPoints ?? [],
    );
  const [historicalMetricsData, setHistoricalMetricsData] =
    useState<HistoricalMetricsData>(
      () => getStoredSnapshot()?.historicalMetricsData ?? [],
    );

  const { data: currentMetricsData, isLoading, error } = useMetrics();

  // On refresh, show stored currentMetricsData until the first fetch resolves.
  const [hydratedCurrentData, setHydratedCurrentData] = useState<MetricsData | undefined>(() => getStoredSnapshot()?.currentMetricsData ?? undefined);
  const effectiveCurrentData = currentMetricsData ?? hydratedCurrentData;
  useEffect(() => {
    if (currentMetricsData) setHydratedCurrentData(undefined);
  }, [currentMetricsData]);

  useEffect(() => {
    if (!effectiveCurrentData) return;

    const {
      blocks_processed,
      transactions_processed,
      logs_processed,
      access_lists_processed,
      documents_received,
      last_processing_time_ms,
    } = effectiveCurrentData;

    const timeFromTimestamp = new Date();
    const hours = timeFromTimestamp.getHours() >= 12 ? timeFromTimestamp.getHours() - 12 : timeFromTimestamp.getHours();
    const ampm = timeFromTimestamp.getHours() >= 12 ? "PM" : "AM";

    const time: string =
      hours.toString().padStart(2, "0") +
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
      [...prev, effectiveCurrentData].slice(-MAX_DATA_POINTS),
    );
  }, [effectiveCurrentData]);

  // Set session flag so refresh is detected next time. On initial load (no session
  // yet), clear any stale localStorage from a previous tab that was closed.
  useEffect(() => {
    if (!hasMetricsSession()) clearPersistedState();
    setMetricsSession();
  }, []);

  // Persist state to localStorage for hydration on refresh.
  useEffect(() => {
    savePersistedState({
      currentMetricsData: effectiveCurrentData ?? null,
      throughputDataPoints,
      blockProgressionDataPoints,
      processingTimeHistoryDataPoints,
      historicalMetricsData,
    });
  }, [
    effectiveCurrentData,
    throughputDataPoints,
    blockProgressionDataPoints,
    processingTimeHistoryDataPoints,
    historicalMetricsData,
  ]);

  const context: MetricsContextType = useMemo(() => {
    return {
      currentMetricsData: effectiveCurrentData,
      throughputDataPoints,
      blockProgressionDataPoints,
      processingTimeHistoryDataPoints,
      historicalMetricsData,
      isLoading,
      error,
    };
  }, [
    effectiveCurrentData,
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
