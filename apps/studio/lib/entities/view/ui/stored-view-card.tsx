"use client";

import { Loader2 } from "lucide-react";
import { Pagination } from "@shinzo/ui/pagination";
import { Button } from "@/shared/ui/button";
import { getErc20TokenPresetByAddress } from "@/shared/consts/view-config";
import { formatTimestamp, truncateHex } from "@/shared/utils/format";
import { getLensDefinition } from "@/entities/lens";
import {
  STUDIO_QUERY_LIMIT,
  type LensQueryPage,
  type StoredDeployedView,
} from "../model/types";
import { Erc20TransfersResult } from "./result-renderers/erc20-transfers-result";
import { GenericResult } from "./result-renderers/generic-result";

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

const getStoredViewTitle = (view: StoredDeployedView): string => {
  if (view.lensKey === "erc20-transfers") {
    const tokenAddress = view.args.tokenAddress;

    if (typeof tokenAddress === "string") {
      const tokenPreset = getErc20TokenPresetByAddress(tokenAddress);

      return `ERC-20 Transfers by ${tokenPreset?.name ?? truncateHex(tokenAddress)}`;
    }
  }

  return getLensDefinition(view.lensKey)?.title ?? view.lensKey;
};

const getStoredViewTokenMeta = (view: StoredDeployedView): string | null => {
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

const formatResultRange = (result: LensQueryPage): string => {
  if (result.items.length === 0 || result.totalItems === 0) {
    return "No documents found.";
  }

  const start = result.offset + 1;
  const end = result.offset + result.items.length;

  return `Showing ${start}-${end} of ${result.totalItems} documents`;
};

interface StoredViewCardProps {
  view: StoredDeployedView;
  callState: StoredCallState;
  page: number;
  onCall: (view: StoredDeployedView) => void;
}

export const StoredViewCard = ({
  view,
  callState,
  page,
  onCall,
}: StoredViewCardProps) => {
  const lens = getLensDefinition(view.lensKey);
  const tokenMeta = getStoredViewTokenMeta(view);
  const isSelected =
    callState.status !== "idle" && callState.entityName === view.entityName;
  const isLoading = isSelected && callState.status === "loading";
  const canCall = Boolean(lens?.uiSupported);

  return (
    <article className="relative w-full overflow-hidden border border-ui-border bg-white p-5">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[url('/bg-pattern.png')] bg-repeat-x bg-bottom opacity-30" />

      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-mono text-base font-light text-szo-black">
              {getStoredViewTitle(view)}
            </h3>
            <p className="truncate font-mono text-xs text-szo-black/50">
              {view.entityName}
            </p>
          </div>

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
        </div>

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
            <dd className="text-szo-black/70">
              {formatTimestamp(view.deployedAt)}
            </dd>
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

        {isSelected && (
          <div className="flex flex-col gap-3 border-t border-ui-border pt-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="font-mono text-sm font-light text-szo-black">
                  Query Results
                </h4>
                {callState.status === "success" && (
                  <p className="text-xs text-szo-black/50">
                    {formatResultRange(callState.result)}
                  </p>
                )}
              </div>

              <p className="font-mono text-xs uppercase tracking-[0.12em] text-szo-black/40">
                Limit {STUDIO_QUERY_LIMIT} / Offset{" "}
                {(page - 1) * STUDIO_QUERY_LIMIT}
              </p>
            </div>

            {callState.status === "loading" && (
              <div className="flex h-80 items-center justify-center gap-2 border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/70">
                <Loader2 className="size-4 animate-spin" />
                Calling stored deployment...
              </div>
            )}

            {callState.status === "error" && (
              <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {callState.error}
              </div>
            )}

            {callState.status === "success" &&
              (lens?.resultKind === "erc20-transfers" ? (
                <Erc20TransfersResult result={callState.result} />
              ) : (
                <GenericResult result={callState.result} />
              ))}

            {callState.status === "success" &&
              callState.result.totalItems > STUDIO_QUERY_LIMIT && (
                <Pagination
                  className="justify-end"
                  page={page}
                  itemsPerPage={STUDIO_QUERY_LIMIT}
                  totalItems={callState.result.totalItems}
                />
              )}
          </div>
        )}
      </div>
    </article>
  );
};
