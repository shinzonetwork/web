"use client";

import { getLensDefinition } from "@/entities/lens";
import type { StoredDeployedView } from "../model/types";
import type {
  StoredCallState,
  StoredViewCallOptions,
} from "./use-stored-view-call";
import { DecodedLogViewCard } from "./decoded-log-view-card";
import { Erc20AccountBalancesViewCard } from "./erc20-account-balances-view-card";
import { Erc20TransfersViewCard } from "./erc20-transfers-view-card";
import { GenericStoredViewCard } from "./generic-stored-view-card";

interface StoredViewCardProps {
  view: StoredDeployedView;
  callState: StoredCallState;
  page: number;
  onCall: (view: StoredDeployedView, options?: StoredViewCallOptions) => void;
}

export const StoredViewCard = ({
  view,
  callState,
  page,
  onCall,
}: StoredViewCardProps) => {
  const lens = getLensDefinition(view.lensKey);
  const isSelected =
    callState.status !== "idle" && callState.entityName === view.entityName;
  const isLoading = isSelected && callState.status === "loading";
  const canCall = Boolean(lens?.uiSupported);

  switch (lens?.resultKind) {
    case "decoded-log":
      return (
        <DecodedLogViewCard
          view={view}
          callState={callState}
          page={page}
          isSelected={isSelected}
          isLoading={isLoading}
          canCall={canCall}
          onCall={onCall}
        />
      );

    case "erc20-transfers":
      return (
        <Erc20TransfersViewCard
          view={view}
          callState={callState}
          page={page}
          isSelected={isSelected}
          isLoading={isLoading}
          canCall={canCall}
          onCall={onCall}
        />
      );

    case "erc20-account-balances":
      return (
        <Erc20AccountBalancesViewCard
          view={view}
          callState={callState}
          page={page}
          isSelected={isSelected}
          isLoading={isLoading}
          canCall={canCall}
          onCall={onCall}
        />
      );

    default:
      return (
        <GenericStoredViewCard
          view={view}
          callState={callState}
          page={page}
          isSelected={isSelected}
          isLoading={isLoading}
          canCall={canCall}
          onCall={onCall}
        />
      );
  }
};
