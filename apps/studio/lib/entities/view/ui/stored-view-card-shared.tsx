"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Pager } from "./pager";
import { getLensDefinition } from "@/entities/lens";
import { getErc20TokenPresetByAddress } from "@/shared/consts/view-config";
import { formatTimestamp, truncateHex } from "@/shared/utils/format";
import type { StoredDeployedView } from "../model/types";
import type { StoredCallState } from "./use-stored-view-call";

export const getStoredViewTokenMeta = (
  view: StoredDeployedView
): string | null => {
  const tokenAddress = view.args.tokenAddress;

  if (typeof tokenAddress !== "string") {
    return null;
  }

  const tokenPreset = getErc20TokenPresetByAddress(tokenAddress);

  if (tokenPreset) {
    return `${tokenPreset.symbol} · ${tokenPreset.address}`;
  }

  return tokenAddress;
};

export const getStoredViewTokenName = (
  view: StoredDeployedView
): string | null => {
  const tokenAddress = view.args.tokenAddress;

  if (typeof tokenAddress !== "string") {
    return null;
  }

  const tokenPreset = getErc20TokenPresetByAddress(tokenAddress);
  return tokenPreset?.name ?? truncateHex(tokenAddress);
};

export const getStoredViewDefaultTitle = (view: StoredDeployedView): string =>
  getLensDefinition(view.lensKey)?.title ?? view.lensKey;

const formatResultRange = (
  callState: Extract<StoredCallState, { status: "success" }>
): string => {
  const { result } = callState;

  if (result.items.length === 0) {
    return callState.queryMode === "account"
      ? "No matching account row found."
      : "No documents found.";
  }

  const start = result.offset + 1;
  const end = result.offset + result.items.length;

  if (callState.queryMode === "account" && callState.queryArgs?.account) {
    return `Showing ${start}-${end} for ${truncateHex(
      callState.queryArgs.account,
      18
    )}`;
  }

  return `Showing ${start}-${end}`;
};

interface StoredViewCardLayoutProps {
  title: string;
  entityName: string;
  action: ReactNode;
  children: ReactNode;
}

export const StoredViewCardLayout = ({
  title,
  entityName,
  action,
  children,
}: StoredViewCardLayoutProps) => (
  <article className="relative w-full overflow-hidden border border-ui-border bg-white p-5">
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/bg-pattern.png')] bg-repeat-x bg-bottom opacity-30" />

    <div className="relative z-10 flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-mono text-base font-light text-szo-black">
            {title}
          </h3>
          <p className="truncate font-mono text-xs text-szo-black/50">
            {entityName}
          </p>
        </div>

        {action}
      </div>

      {children}
    </div>
  </article>
);

interface StoredViewMetadataProps {
  view: StoredDeployedView;
}

export const StoredViewMetadata = ({ view }: StoredViewMetadataProps) => {
  const tokenMeta = getStoredViewTokenMeta(view);

  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
      {tokenMeta && (
        <div className="flex min-w-0 flex-col gap-1">
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
            Token
          </dt>
          <dd className="truncate font-mono text-xs text-szo-black/70">
            {tokenMeta}
          </dd>
        </div>
      )}

      <div className="flex min-w-0 flex-col gap-1">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
          Source
        </dt>
        <dd className="text-szo-black/70">
          {view.source === "deployed"
            ? "Registered by Studio"
            : "Already on ShinzoHub"}
        </dd>
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
          Saved
        </dt>
        <dd className="text-szo-black/70">{formatTimestamp(view.deployedAt)}</dd>
      </div>

      {view.contractAddress && (
        <div className="flex min-w-0 flex-col gap-1">
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
            Contract
          </dt>
          <dd className="font-mono text-xs text-szo-black/70">
            {truncateHex(view.contractAddress)}
          </dd>
        </div>
      )}

      {view.txHash && (
        <div className="flex min-w-0 flex-col gap-1">
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
            Tx Hash
          </dt>
          <dd className="font-mono text-xs text-szo-black/70">
            {truncateHex(view.txHash)}
          </dd>
        </div>
      )}
    </dl>
  );
};

interface StoredViewResultsProps {
  callState: Exclude<StoredCallState, { status: "idle" }>;
  page: number;
  renderSuccess: (
    callState: Extract<StoredCallState, { status: "success" }>
  ) => ReactNode;
}

export const StoredViewResults = ({
  callState,
  page,
  renderSuccess,
}: StoredViewResultsProps) => (
  <div className="flex flex-col gap-3 border-t border-ui-border pt-4">
    <div>
      <h4 className="font-mono text-sm font-light text-szo-black">
        Query Results
      </h4>
      {callState.status === "success" && (
        <p className="text-xs text-szo-black/50">
          {formatResultRange(callState)}
        </p>
      )}
    </div>

    {callState.status === "loading" && (
      <div className="flex h-80 min-h-80 items-center justify-center gap-2 border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/70">
        <Loader2 className="size-4 animate-spin" />
        Calling stored deployment...
      </div>
    )}

    {callState.status === "error" && (
      <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        {callState.error}
      </div>
    )}

    {callState.status === "success" && renderSuccess(callState)}

    {callState.status === "success" && (page > 1 || callState.result.hasMore) && (
      <Pager
        className="justify-end"
        page={page}
        hasMore={callState.result.hasMore}
      />
    )}
  </div>
);
