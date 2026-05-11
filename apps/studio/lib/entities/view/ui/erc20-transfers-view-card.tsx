"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import type { StoredDeployedView } from "../model/types";
import type {
  StoredCallState,
  StoredViewCallOptions,
} from "./use-stored-view-call";
import { Erc20TransfersResult } from "./result-renderers/erc20-transfers-result";
import {
  StoredViewCardLayout,
  StoredViewMetadata,
  StoredViewResults,
  getStoredViewTokenName,
} from "./stored-view-card-shared";

interface Erc20TransfersViewCardProps {
  view: StoredDeployedView;
  callState: StoredCallState;
  page: number;
  isSelected: boolean;
  isLoading: boolean;
  canCall: boolean;
  onCall: (view: StoredDeployedView, options?: StoredViewCallOptions) => void;
}

export const Erc20TransfersViewCard = ({
  view,
  callState,
  page,
  isSelected,
  isLoading,
  canCall,
  onCall,
}: Erc20TransfersViewCardProps) => {
  const tokenName = getStoredViewTokenName(view);
  const tokenAddress =
    typeof view.args.tokenAddress === "string" ? view.args.tokenAddress : null;

  return (
    <StoredViewCardLayout
      title={`ERC-20 Transfers by ${tokenName ?? view.lensKey}`}
      entityName={view.entityName}
      action={
        <Button
          type="button"
          variant="secondary"
          onClick={() => onCall(view)}
          disabled={!canCall || isLoading}
          className="h-9 px-5 text-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Calling...
            </>
          ) : (
            "Call"
          )}
        </Button>
      }
    >
      <StoredViewMetadata view={view} />

      {isSelected && tokenAddress && callState.status !== "idle" && (
        <StoredViewResults
          callState={callState}
          page={page}
          renderSuccess={(successState) => (
            <Erc20TransfersResult
              result={successState.result}
              tokenAddress={tokenAddress}
            />
          )}
        />
      )}
    </StoredViewCardLayout>
  );
};
