"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { ENS_CORE_PACK_LENSES } from "@/entities/lens";
import {
  findHubViewByEntityName,
  useStudioHubViews,
  ViewValidationError,
  useDeployLens,
} from "@/entities/view";
import { parseEnsSearchInput } from "./ens-utils";
import { queryEns, type EnsSearchResult } from "./query-ens";

export interface EnsPackView {
  lensKey: string;
  entityName: string;
  contractAddress: string;
  creator: string;
  height: string;
}

export interface UseEnsStudioStateResult {
  searchInput: string;
  setSearchInput: (value: string) => void;
  result: EnsSearchResult | null;
  searchError: string;
  isSearching: boolean;
  isPackReady: boolean;
  packViews: EnsPackView[];
  deployPack: () => Promise<void>;
  search: () => Promise<void>;
  deployStatus: ReturnType<typeof useDeployLens>["status"];
  deployError: string;
  deployValidationIssues: ReturnType<typeof useDeployLens>["validationIssues"];
  activeDeployTitle: string;
}

export const useEnsStudioState = (): UseEnsStudioStateResult => {
  const {
    deploy,
    status: deployStatus,
    error: deployError,
    activeViewTitle,
    validationIssues: deployValidationIssues,
  } = useDeployLens();
  const { data: studioHubViews = [], refetch: refetchStudioHubViews } =
    useStudioHubViews();
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState<EnsSearchResult | null>(null);
  const [searchError, setSearchError] = useState("");
  const [isSearching, startSearchTransition] = useTransition();

  const packViews = useMemo(
    () =>
      ENS_CORE_PACK_LENSES.flatMap((lens) => {
        const resolvedView = lens.resolveView({});
        const hubView = findHubViewByEntityName(
          studioHubViews,
          resolvedView.entityName
        );

        if (!hubView) {
          return [];
        }

        return [
          {
            lensKey: lens.lensKey,
            entityName: resolvedView.entityName,
            contractAddress: hubView.contractAddress,
            creator: hubView.creator,
            height: hubView.height,
          } satisfies EnsPackView,
        ];
      }),
    [studioHubViews]
  );
  const packViewByLensKey = useMemo(
    () => new Map(packViews.map((view) => [view.lensKey, view] as const)),
    [packViews]
  );

  const isPackReady = ENS_CORE_PACK_LENSES.every((lens) =>
    packViewByLensKey.has(lens.lensKey)
  );

  const deployPack = useCallback(async () => {
    try {
      for (const lens of ENS_CORE_PACK_LENSES) {
        if (packViewByLensKey.has(lens.lensKey)) {
          continue;
        }

        await deploy(lens, {});
      }
    } catch (error) {
      if (!(error instanceof ViewValidationError)) {
        console.error(error);
      }
      throw error;
    } finally {
      await refetchStudioHubViews();
    }
  }, [deploy, packViewByLensKey, refetchStudioHubViews]);

  const search = useCallback(async () => {
    if (!isPackReady) {
      setSearchError("Deploy the ENS Core Index Pack before searching.");
      return;
    }

    const subject = parseEnsSearchInput(searchInput);
    if (!subject) {
      setSearchError("Enter either an ENS name like vitalik.eth or an Ethereum address.");
      return;
    }

    setSearchError("");
    try {
      const nextResult = await queryEns(subject);
      startSearchTransition(() => {
        setResult(nextResult);
      });
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : "ENS search failed unexpectedly."
      );
    }
  }, [isPackReady, searchInput]);

  return {
    searchInput,
    setSearchInput,
    result,
    searchError,
    isSearching,
    isPackReady,
    packViews,
    deployPack,
    search,
    deployStatus,
    deployError,
    deployValidationIssues,
    activeDeployTitle: activeViewTitle,
  };
};
