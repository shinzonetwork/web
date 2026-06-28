"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getServerPage, type PageParams } from "@shinzo/ui/pagination";

/** Reads page/limit from URL search params (limit-offset pagination). */
export function useOffsetPagePagination(
  pageParam: string,
  limit: number
): PageParams {
  const searchParams = useSearchParams();

  return useMemo(
    () =>
      getServerPage({
        page: searchParams.get(pageParam) ?? "1",
        limit: String(limit),
      }),
    [searchParams, pageParam, limit]
  );
}
