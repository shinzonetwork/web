"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import type { StoredDeployedView } from "../model/types";
import type {
  StoredCallState,
  StoredViewCallOptions,
} from "./use-stored-view-call";
import { GenericResult } from "./result-renderers/generic-result";
import {
  StoredViewCardLayout,
  StoredViewMetadata,
  StoredViewResults,
  getStoredViewDefaultTitle,
} from "./stored-view-card-shared";

interface GenericStoredViewCardProps {
  view: StoredDeployedView;
  callState: StoredCallState;
  page: number;
  isSelected: boolean;
  isLoading: boolean;
  canCall: boolean;
  onCall: (view: StoredDeployedView, options?: StoredViewCallOptions) => void;
}

export const GenericStoredViewCard = ({
  view,
  callState,
  page,
  isSelected,
  isLoading,
  canCall,
  onCall,
}: GenericStoredViewCardProps) => (
  <StoredViewCardLayout
    title={getStoredViewDefaultTitle(view)}
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

    {isSelected && callState.status !== "idle" && (
      <StoredViewResults
        callState={callState}
        page={page}
        renderSuccess={(successState) => (
          <GenericResult result={successState.result} />
        )}
      />
    )}
  </StoredViewCardLayout>
);
