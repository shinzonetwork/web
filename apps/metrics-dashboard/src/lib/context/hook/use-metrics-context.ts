"use client";

import { MetricsContext } from "../model/metrics-context";
import { useContext } from "react";

/**
 * The hook to use the metrics context.
 */
export const useMetricsContext = () => {
  return useContext(MetricsContext);
};
