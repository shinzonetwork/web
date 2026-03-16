"use client";

import { createContext } from "react";
import { MetricsData, MetricsContextType } from "../types/types";

/**
 * The context for the metrics dashboard.
 */
export const MetricsContext = createContext<MetricsContextType>({
  currentMetricsData: undefined as MetricsData | undefined,
  throughputDataPoints: [],
  blockProgressionDataPoints: [],
  processingTimeHistoryDataPoints: [],
  historicalMetricsData: [],
  isLoading: false,
  error: null,
});
