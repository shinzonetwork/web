"use client";

import type {
  PersistedMetricsState,
} from "../types/types";

const LOCAL_STORAGE_KEY = "metrics-dashboard-state";
const SESSION_STORAGE_KEY = "metrics-dashboard-session";



function isPersistedState(value: unknown): value is PersistedMetricsState {
  if (!value || typeof value !== "object") return false;
  const persistedState = value as PersistedMetricsState;
  return (
    Array.isArray(persistedState.throughputDataPoints) &&
    Array.isArray(persistedState.blockProgressionDataPoints) &&
    Array.isArray(persistedState.processingTimeHistoryDataPoints) &&
    Array.isArray(persistedState.historicalMetricsData)
  );
}

/**
 * Read persisted state from localStorage. Returns null if missing or invalid.
 * Only call on client (typeof window !== "undefined").
 */
export function getPersistedState(): PersistedMetricsState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isPersistedState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Write metrics state to localStorage for hydration on refresh.
 * Only call on client.
 */
export function savePersistedState(state: PersistedMetricsState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore errors
  }
}

/**
 * Clear persisted state from localStorage. Call on page/tab close.
 */
export function clearPersistedState(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {
    // ignore errors
  }
}

/**
 * True if this tab has already loaded the dashboard (used to detect refresh vs initial load).
 * sessionStorage is cleared when the tab is closed.
 */
export function hasMetricsSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_STORAGE_KEY) === "1";
}

/**
 * Mark this tab as having loaded the metrics dashboard so we treat the next load as a refresh.
 */
export function setMetricsSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
}
