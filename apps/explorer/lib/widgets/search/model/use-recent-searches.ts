"use client";

import { useCallback, useEffect, useState } from "react";
import type { ExplorerSearchResult } from "./search-query";
import {
  getExplorerSearchResultKey,
  isExplorerSearchResult,
} from "./search-result";

const RECENT_SEARCHES_STORAGE_KEY = "shinzohub:explorer-search:recent";
const RECENT_SEARCHES_LIMIT = 5;

export interface RecentSearch {
  key: string;
  result: ExplorerSearchResult;
  selectedAt: number;
}

function sortRecentSearches(searches: RecentSearch[]): RecentSearch[] {
  return [...searches]
    .sort((left, right) => right.selectedAt - left.selectedAt)
    .slice(0, RECENT_SEARCHES_LIMIT);
}

function isRecentSearch(value: unknown): value is RecentSearch {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;
  return typeof candidate.key === "string" &&
    typeof candidate.selectedAt === "number" &&
    isExplorerSearchResult(candidate.result);
}

function readRecentSearches(): RecentSearch[] {
  try {
    const serialized = window.localStorage.getItem(
      RECENT_SEARCHES_STORAGE_KEY,
    );
    if (!serialized) return [];

    const parsed = JSON.parse(serialized) as unknown;
    if (!Array.isArray(parsed)) return [];

    return sortRecentSearches(parsed.filter(isRecentSearch));
  } catch {
    return [];
  }
}

function writeRecentSearches(searches: RecentSearch[]) {
  try {
    window.localStorage.setItem(
      RECENT_SEARCHES_STORAGE_KEY,
      JSON.stringify(searches),
    );
  } catch {
    // Recent searches are a convenience layer; blocked storage must not break
    // the core explorer search/navigation flow.
  }
}

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    setRecentSearches(readRecentSearches());
  }, []);

  const rememberSearchResult = useCallback((result: ExplorerSearchResult) => {
    setRecentSearches((currentSearches) => {
      const key = getExplorerSearchResultKey(result);
      const nextSearches = sortRecentSearches([
        { key, result, selectedAt: Date.now() },
        ...currentSearches.filter((search) => search.key !== key),
      ]);

      writeRecentSearches(nextSearches);
      return nextSearches;
    });
  }, []);

  return {
    recentSearches,
    rememberSearchResult,
  };
}
