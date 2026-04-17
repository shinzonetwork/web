"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { isStudioSupportedLens } from "@/entities/lens";
import {
  loadStoredDeployedViews,
  upsertStoredDeployedView,
} from "./storage";
import type { StoredDeployedView } from "./types";

export interface UseStoredViewsResult {
  views: StoredDeployedView[];
  upsert: (view: StoredDeployedView) => void;
}

const StoredViewsContext = createContext<UseStoredViewsResult | null>(null);

interface StoredViewsProviderProps {
  children: ReactNode;
}

export const StoredViewsProvider = ({ children }: StoredViewsProviderProps) => {
  const [views, setViews] = useState<StoredDeployedView[]>([]);

  useEffect(() => {
    setViews(
      loadStoredDeployedViews().filter((v) => isStudioSupportedLens(v.lensKey))
    );
  }, []);

  const upsert = useCallback((view: StoredDeployedView) => {
    const next = upsertStoredDeployedView(view);
    setViews(next.filter((v) => isStudioSupportedLens(v.lensKey)));
  }, []);

  const value = useMemo(() => ({ views, upsert }), [views, upsert]);

  return (
    <StoredViewsContext.Provider value={value}>
      {children}
    </StoredViewsContext.Provider>
  );
};

export const useStoredViews = (): UseStoredViewsResult => {
  const ctx = useContext(StoredViewsContext);
  if (!ctx) {
    throw new Error("useStoredViews must be used inside <StoredViewsProvider>");
  }
  return ctx;
};
