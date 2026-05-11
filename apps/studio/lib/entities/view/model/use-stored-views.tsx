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
import { isStudioKnownLens } from "@/entities/lens";
import {
  loadStoredDeployedViews,
  upsertStoredDeployedView,
} from "./storage";
import { isCurrentStoredView } from "./current-view";
import type { StoredDeployedView } from "./types";

export interface UseStoredViewsResult {
  views: StoredDeployedView[];
  upsert: (view: StoredDeployedView) => void;
}

const StoredViewsContext = createContext<UseStoredViewsResult | null>(null);

interface StoredViewsProviderProps {
  children: ReactNode;
}

const filterStudioViews = (views: StoredDeployedView[]): StoredDeployedView[] =>
  views.filter(
    (view) => isStudioKnownLens(view.lensKey) && isCurrentStoredView(view)
  );

export const StoredViewsProvider = ({ children }: StoredViewsProviderProps) => {
  const [views, setViews] = useState<StoredDeployedView[]>([]);

  useEffect(() => {
    setViews(filterStudioViews(loadStoredDeployedViews()));
  }, []);

  const upsert = useCallback((view: StoredDeployedView) => {
    const next = upsertStoredDeployedView(view);
    setViews(filterStudioViews(next));
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
