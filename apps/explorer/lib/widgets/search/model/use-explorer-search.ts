"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ExplorerSearchApiError,
  fetchExplorerSearch,
} from "../api/search";
import { classifySearchQuery } from "./search-query";
import { useDebouncedValue } from "./use-debounced-value";

const SEARCH_DEBOUNCE_MS = 300;

/**
 * Coordinates the search as two consecutive stages:
 *
 * 1. `currentQuery` classifies what the user can see in the input immediately.
 *    It opens the dropdown and lets Enter flush a complete value without delay.
 * 2. `query` classifies the debounced value and owns the React Query request.
 *    Until both canonical keys agree, the UI stays in a searching state and
 *    never exposes stale results or an empty-state flash from the prior value.
 */
export function useExplorerSearch() {
  const [input, setInput] = useState("");
  const [submittedInvalid, setSubmittedInvalid] = useState(false);
  const [debouncedInput, flushInput] = useDebouncedValue(
    input,
    SEARCH_DEBOUNCE_MS,
  );
  const currentQuery = useMemo(() => classifySearchQuery(input), [input]);
  const query = useMemo(
    () => classifySearchQuery(debouncedInput),
    [debouncedInput],
  );
  const isDebouncing = currentQuery !== null &&
    currentQuery.cacheKey !== query?.cacheKey;

  const search = useQuery({
    queryKey: ["shinzohub", "search", query?.cacheKey ?? "idle"],
    queryFn: ({ signal }) => {
      if (!query) throw new Error("Search query is incomplete.");
      return fetchExplorerSearch(query, signal);
    },
    enabled: query !== null,
    staleTime: query?.kind === "address" || query?.kind === "view-name"
      ? 60_000
      : Infinity,
    gcTime: query?.kind === "address" || query?.kind === "view-name"
      ? 10 * 60_000
      : 30 * 60_000,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error instanceof ExplorerSearchApiError && error.status < 500) {
        return false;
      }
      return failureCount < 1;
    },
  });

  const results = isDebouncing ? [] : search.data?.results ?? [];
  const error = isDebouncing ? null : search.error;
  const isSearching = isDebouncing || search.isFetching;

  const updateInput = (value: string) => {
    setInput(value);
    setSubmittedInvalid(false);
  };

  const submit = () => {
    if (!currentQuery) {
      setSubmittedInvalid(input.trim().length > 0);
      return false;
    }
    setSubmittedInvalid(false);
    if (currentQuery.cacheKey !== query?.cacheKey) {
      flushInput(input);
      return false;
    }
    return results.length > 0;
  };

  return {
    input,
    updateInput,
    query,
    currentQuery,
    submit,
    submittedInvalid,
    results,
    isSearching,
    error,
    retry: search.refetch,
  };
}
