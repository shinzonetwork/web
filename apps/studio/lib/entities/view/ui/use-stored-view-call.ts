"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { callStoredLensView } from "../api/query-view";
import {
  STUDIO_QUERY_LIMIT,
  type LensQueryPage,
  type StoredDeployedView,
} from "../model/types";

type StoredCallState =
  | { status: "idle" }
  | { status: "loading"; entityName: string; page: number }
  | {
      status: "success";
      entityName: string;
      page: number;
      result: LensQueryPage;
    }
  | {
      status: "error";
      entityName: string;
      page: number;
      error: string;
    };

const getPageValue = (rawPage: string | null): number => {
  const parsed = Number.parseInt(rawPage ?? "1", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

export interface UseStoredViewCallResult {
  callState: StoredCallState;
  page: number;
  call: (view: StoredDeployedView) => Promise<void>;
}

export const useStoredViewCall = (
  storedViews: StoredDeployedView[]
): UseStoredViewCallResult => {
  const [callState, setCallState] = useState<StoredCallState>({ status: "idle" });
  const requestIdRef = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = getPageValue(searchParams.get("page"));

  const syncPageParam = useCallback(
    (nextPage: number) => {
      const nextParams = new URLSearchParams(searchParams.toString());

      if (nextPage <= 1) {
        nextParams.delete("page");
      } else {
        nextParams.set("page", String(nextPage));
      }

      const nextQuery = nextParams.toString();

      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );

  const fetchViewPage = useCallback(
    async (view: StoredDeployedView, pageValue: number) => {
      const requestId = ++requestIdRef.current;
      const offset = (pageValue - 1) * STUDIO_QUERY_LIMIT;

      setCallState({
        status: "loading",
        entityName: view.entityName,
        page: pageValue,
      });

      try {
        const { result } = await callStoredLensView(view, {
          limit: STUDIO_QUERY_LIMIT,
          offset,
        });

        if (requestId !== requestIdRef.current) return;

        setCallState({
          status: "success",
          entityName: view.entityName,
          page: pageValue,
          result,
        });
      } catch (err) {
        if (requestId !== requestIdRef.current) return;

        setCallState({
          status: "error",
          entityName: view.entityName,
          page: pageValue,
          error: err instanceof Error ? err.message : "Unexpected error",
        });
      }
    },
    []
  );

  const call = useCallback(
    async (view: StoredDeployedView) => {
      if (page !== 1) {
        syncPageParam(1);
      }
      await fetchViewPage(view, 1);
    },
    [fetchViewPage, page, syncPageParam]
  );

  useEffect(() => {
    if (
      callState.status === "idle" ||
      callState.status === "loading" ||
      callState.page === page
    ) {
      return;
    }

    const activeView = storedViews.find(
      (view) => view.entityName === callState.entityName
    );
    if (!activeView) return;

    void fetchViewPage(activeView, page);
  }, [callState, fetchViewPage, page, storedViews]);

  return { callState, page, call };
};
