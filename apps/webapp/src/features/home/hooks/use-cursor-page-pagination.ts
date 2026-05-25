"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getServerPage, type PageParams } from "@shinzo/ui/pagination";
import {
  hasNextCursorPage,
  type CursorPaginationParams,
} from "../lib/pagination";

type CursorKeyStorage = (string | undefined)[];

function readFromCursorKeyStorage(storageKey: string): CursorKeyStorage {
  if (typeof sessionStorage === "undefined") {
    return [undefined];
  }
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return [undefined];
    const parsed = JSON.parse(raw) as CursorKeyStorage;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [undefined];
  } catch {
    return [undefined];
  }
}

function writeToCursorKeyStorage(
  storageKey: string,
  storedKeys: CursorKeyStorage
) {
  if (typeof sessionStorage === "undefined") return;
  sessionStorage.setItem(storageKey, JSON.stringify(storedKeys));
}

type UseCursorPagePaginationOptions = {
  pageParam: string;
  storageKey: string;
  limit: number;
};

/**
 * Maps URL page numbers to Cosmos cursor keys (`pagination.key` / `next_key`).
 * Page 1 uses no key; page N uses the `next_key` saved when page N−1 was fetched.
 */
export function useCursorPagePagination({
  pageParam,
  storageKey,
  limit,
}: UseCursorPagePaginationOptions) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [storedKeys, setStoredKeys] = useState<CursorKeyStorage>(() =>
    readFromCursorKeyStorage(storageKey)
  );

  const { page, offset }: PageParams = useMemo(
    () =>
      getServerPage({
        page: searchParams.get(pageParam) ?? "1",
        limit: String(limit),
      }),
    [searchParams, pageParam, limit]
  );

  /** api is returning `total: 0` on keyed pages when tested; keep the count from page 1. */
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalItems / limit)),
    [totalItems, limit]
  );

  const queryParams: CursorPaginationParams = useMemo(() => {
    if (page <= 1) {
      return { limit, count_total: true };
    }

    const cursorKey = storedKeys[page - 1];
    if (cursorKey) {
      return { key: cursorKey, limit, count_total: true };
    }

    // jump to last page: fall back to offset when cursor for this page was never visited
    if (page === totalPages && totalPages > 1) {
      return { offset: (page - 1) * limit, limit, count_total: true };
    }

    return { limit, count_total: true };
  }, [page, storedKeys, limit, totalPages]);

  const applyPaginationData = useCallback(
    (nextKey: string | null | undefined, total: number) => {
      if (total > 0) {
        setTotalItems(total);
      }
      const effectiveTotal = total > 0 ? total : totalItems;
      const pageCount = Math.max(1, Math.ceil(effectiveTotal / limit));

      if (effectiveTotal > 0 && page > pageCount) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(pageParam, String(pageCount));
        router.replace(`?${params.toString()}`);
        return;
      }

      setStoredKeys((prev) => {
        const next = [...prev];
        next[page] = nextKey ?? undefined;
        writeToCursorKeyStorage(storageKey, next);
        return next;
      });
    },
    [page, limit, pageParam, router, searchParams, storageKey, totalItems]
  );

  const resetToFirstPage = useCallback(() => {
    const resetStoredKeys: CursorKeyStorage = [undefined];
    setTotalItems(0);
    setStoredKeys(resetStoredKeys);
    writeToCursorKeyStorage(storageKey, resetStoredKeys);
    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParam, "1");
    router.replace(`?${params.toString()}`);
  }, [pageParam, router, searchParams, storageKey]);

  useEffect(() => {
    if (page > 1 && !storedKeys[page - 1] && page !== totalPages) {
      resetToFirstPage();
    }
  }, [page, storedKeys, resetToFirstPage, totalPages]);

  const canGoNext = (nextKey: string | null | undefined, total: number) => {
    const effectiveTotal = total > 0 ? total : totalItems;
    const totalPages = Math.max(1, Math.ceil(effectiveTotal / limit));
    return page < totalPages && hasNextCursorPage(nextKey);
  };

  return {
    page,
    offset,
    limit,
    queryParams,
    applyPaginationData,
    canGoNext,
    resetToFirstPage,
    totalItems,
  };
}
