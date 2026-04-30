"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { LensQueryArgs } from "@/entities/lens";
import { callStoredLensView } from "../api/query-view";
import {
  STUDIO_QUERY_LIMIT,
  type LensQueryPage,
  type StoredDeployedView,
} from "../model/types";

export type StoredViewQueryMode = "browse" | "account";

export type StoredCallState =
  | { status: "idle" }
  | {
      status: "loading";
      entityName: string;
      page: number;
      queryMode: StoredViewQueryMode;
      queryArgs?: LensQueryArgs;
    }
  | {
      status: "success";
      entityName: string;
      page: number;
      queryMode: StoredViewQueryMode;
      queryArgs?: LensQueryArgs;
      result: LensQueryPage;
    }
  | {
      status: "error";
      entityName: string;
      page: number;
      queryMode: StoredViewQueryMode;
      queryArgs?: LensQueryArgs;
      error: string;
    };

export interface StoredViewCallOptions {
  mode?: StoredViewQueryMode;
  queryArgs?: LensQueryArgs;
}

const getPageValue = (rawPage: string | null): number => {
  const parsed = Number.parseInt(rawPage ?? "1", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

export interface UseStoredViewCallResult {
  callState: StoredCallState;
  page: number;
  call: (
    view: StoredDeployedView,
    options?: StoredViewCallOptions
  ) => Promise<void>;
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
    async (
      view: StoredDeployedView,
      pageValue: number,
      options?: StoredViewCallOptions
    ) => {
      const requestId = ++requestIdRef.current;
      const offset = (pageValue - 1) * STUDIO_QUERY_LIMIT;
      const queryMode = options?.mode ?? "browse";
      const queryArgs = options?.queryArgs;

      setCallState({
        status: "loading",
        entityName: view.entityName,
        page: pageValue,
        queryMode,
        queryArgs,
      });

      try {
        const { result } = await callStoredLensView(view, {
          limit: STUDIO_QUERY_LIMIT,
          offset,
          queryArgs,
        });

        if (requestId !== requestIdRef.current) return;

        setCallState({
          status: "success",
          entityName: view.entityName,
          page: pageValue,
          queryMode,
          queryArgs,
          result,
        });
      } catch (err) {
        if (requestId !== requestIdRef.current) return;

        setCallState({
          status: "error",
          entityName: view.entityName,
          page: pageValue,
          queryMode,
          queryArgs,
          error: err instanceof Error ? err.message : "Unexpected error",
        });
      }
    },
    []
  );

  const call = useCallback(
    async (view: StoredDeployedView, options?: StoredViewCallOptions) => {
      if (page !== 1) {
        syncPageParam(1);
      }
      await fetchViewPage(view, 1, options);
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

    void fetchViewPage(activeView, page, {
      mode: callState.queryMode,
      queryArgs: callState.queryArgs,
    });
  }, [callState, fetchViewPage, page, storedViews]);

  return { callState, page, call };
};
