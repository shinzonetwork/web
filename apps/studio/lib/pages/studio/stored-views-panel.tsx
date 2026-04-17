"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
import { Pagination } from "@shinzo/ui/pagination";
import { Button } from "@/shared/button";
import { getErc20TokenPresetByAddress } from "@/shared/consts/view-config";
import type { StoredDeployedView } from "./deployed-views-storage";
import { getLensDefinition } from "./lens-catalog";
import {
  STUDIO_QUERY_LIMIT,
  type LensQueryPage,
} from "./query-view";
import { callStoredLensView } from "./studio-actions";

type StoredCallState =
  | { status: "idle" }
  | { status: "loading"; entityName: string; page: number }
  | { status: "success"; entityName: string; page: number; result: LensQueryPage }
  | { status: "error"; entityName: string; page: number; error: string };

type Erc20TransferRow = {
  tokenAddress: string;
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  amount: string;
};

function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

function truncateHex(value: string, visible = 12): string {
  if (value.length <= visible) return value;
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
}

function getPageValue(rawPage: string | null): number {
  const parsed = Number.parseInt(rawPage ?? "1", 10);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
}

function isErc20TransferRow(value: unknown): value is Erc20TransferRow {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<Erc20TransferRow>;

  return (
    typeof candidate.tokenAddress === "string" &&
    typeof candidate.hash === "string" &&
    typeof candidate.blockNumber === "number" &&
    typeof candidate.from === "string" &&
    typeof candidate.to === "string" &&
    typeof candidate.amount === "string"
  );
}

function isErc20TransferResult(items: unknown[]): items is Erc20TransferRow[] {
  return items.every(isErc20TransferRow);
}

function getStoredViewTitle(view: StoredDeployedView): string {
  if (view.lensKey === "erc20-transfers") {
    const tokenAddress = view.args.tokenAddress;

    if (typeof tokenAddress === "string") {
      const tokenPreset = getErc20TokenPresetByAddress(tokenAddress);

      return `ERC-20 Transfers by ${tokenPreset?.name ?? truncateHex(tokenAddress)}`;
    }
  }

  return getLensDefinition(view.lensKey)?.title ?? view.lensKey;
}

function getStoredViewTokenMeta(view: StoredDeployedView): string | null {
  const tokenAddress = view.args.tokenAddress;

  if (typeof tokenAddress !== "string") {
    return null;
  }

  const tokenPreset = getErc20TokenPresetByAddress(tokenAddress);

  if (tokenPreset) {
    return `${tokenPreset.symbol} · ${tokenPreset.address}`;
  }

  return tokenAddress;
}

function formatResultRange(result: LensQueryPage): string {
  if (result.items.length === 0 || result.totalItems === 0) {
    return "No documents found.";
  }

  const start = result.offset + 1;
  const end = result.offset + result.items.length;

  return `Showing ${start}-${end} of ${result.totalItems} documents`;
}

function GenericResult({ result }: { result: LensQueryPage }) {
  return (
    <pre
      className={cn(
        "h-80 overflow-auto border border-ui-border bg-szo-bg p-4",
        "font-mono text-xs leading-relaxed text-szo-black"
      )}
    >
      {JSON.stringify(result.items, null, 2)}
    </pre>
  );
}

function Erc20TransfersResult({ result }: { result: LensQueryPage }) {
  if (result.items.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center border border-ui-border bg-szo-bg p-4 text-sm text-szo-black/60">
        No documents found for this page.
      </div>
    );
  }

  if (!isErc20TransferResult(result.items)) {
    return <GenericResult result={result} />;
  }

  return (
    <div className="h-80 overflow-auto border border-ui-border bg-szo-bg">
      <table className="min-w-[60rem] border-collapse font-mono text-xs text-szo-black">
        <thead className="sticky top-0 bg-white">
          <tr className="border-b border-ui-border text-left text-szo-black/60">
            <th className="px-4 py-3 font-medium">Block</th>
            <th className="px-4 py-3 font-medium">Tx Hash</th>
            <th className="px-4 py-3 font-medium">From</th>
            <th className="px-4 py-3 font-medium">To</th>
            <th className="px-4 py-3 font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {result.items.map((row) => (
            <tr
              key={`${row.hash}-${row.from}-${row.to}-${row.blockNumber}`}
              className="border-b border-ui-border/70 align-top"
            >
              <td className="px-4 py-3">{row.blockNumber}</td>
              <td className="px-4 py-3">{truncateHex(row.hash, 18)}</td>
              <td className="px-4 py-3">{truncateHex(row.from, 18)}</td>
              <td className="px-4 py-3">{truncateHex(row.to, 18)}</td>
              <td className="px-4 py-3">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type StoredViewsPanelProps = {
  storedViews: StoredDeployedView[];
  hostUrl: string;
};

export function StoredViewsPanel({
  storedViews,
  hostUrl,
}: StoredViewsPanelProps) {
  const [callState, setCallState] = useState<StoredCallState>({
    status: "idle",
  });
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
        const { result } = await callStoredLensView({
          view,
          hostUrl,
          limit: STUDIO_QUERY_LIMIT,
          offset,
        });

        if (requestId !== requestIdRef.current) {
          return;
        }

        setCallState({
          status: "success",
          entityName: view.entityName,
          page: pageValue,
          result,
        });
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        setCallState({
          status: "error",
          entityName: view.entityName,
          page: pageValue,
          error: err instanceof Error ? err.message : "Unexpected error",
        });
      }
    },
    [hostUrl]
  );

  const handleCall = useCallback(
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

    if (!activeView) {
      return;
    }

    void fetchViewPage(activeView, page);
  }, [callState, fetchViewPage, page, storedViews]);

  if (storedViews.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-mono text-lg font-light text-szo-black md:text-xl">
          Stored Deployments
        </h2>
        <p className="text-sm leading-relaxed text-szo-black/60">
          Saved registrations stay available after reload so you can call them
          again against the current host after ShinzoHub propagation.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {storedViews.map((view) => {
          const lens = getLensDefinition(view.lensKey);
          const tokenMeta = getStoredViewTokenMeta(view);
          const isSelected =
            callState.status !== "idle" &&
            callState.entityName === view.entityName;
          const isLoading = isSelected && callState.status === "loading";
          const canCall = Boolean(lens?.uiSupported);

          return (
            <article
              key={`${view.entityName}-${view.deployedAt}`}
              className="relative w-full overflow-hidden border border-ui-border bg-white p-5"
            >
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
                    onClick={() => void handleCall(view)}
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
        })}
      </div>
    </section>
  );
}
