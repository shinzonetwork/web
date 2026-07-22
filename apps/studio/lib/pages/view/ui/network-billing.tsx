"use client";

import {
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Database,
  RefreshCw,
  Server,
  Wallet,
} from "lucide-react";
import { Skeleton } from "@shinzo/ui/skeleton";
import { cn } from "@shinzo/ui/cn";
import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import { createExplorerAddressLink, ViewAddressChip } from "@/entities/view";
import { Button } from "@/shared/ui/button";
import { formatTokenAmount } from "@/shared/utils/format";
import { useViewPools, type ViewPoolsState } from "../model/use-view-pools";

const SHNZ_DECIMALS = 18;

export const NetworkBilling = ({ viewAddress }: { viewAddress: string }) => {
  const state = useViewPools(viewAddress);

  return (
    <section
      className="flex min-w-0 flex-col gap-3"
      aria-labelledby="network-billing-title"
    >
      <div className="flex flex-col gap-1">
        <h2
          id="network-billing-title"
          className="font-mono text-xl font-normal text-szo-black"
        >
          Network &amp; billing
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-ui-text-muted">
          View registration and network traffic readiness are separate. A
          registered view needs an active pool before it can receive gateway
          traffic.
        </p>
      </div>

      {state.status === "loading" ? <NetworkBillingSkeleton /> : null}
      {state.status === "error" ? <UnavailableState state={state} /> : null}
      {state.status === "success" ? (
        <NetworkBillingContent state={state} />
      ) : null}
    </section>
  );
};

const NetworkBillingSkeleton = () => (
  <div
    className="grid gap-3 border border-ui-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-3"
    aria-label="Loading network and billing state"
  >
    <div className="h-20">
      <Skeleton />
    </div>
    <div className="h-20">
      <Skeleton />
    </div>
    <div className="h-20 sm:col-span-2 lg:col-span-1">
      <Skeleton />
    </div>
  </div>
);

const UnavailableState = ({
  state,
}: {
  state: Extract<ViewPoolsState, { status: "error" }>;
}) => (
  <div className="border border-red-200 bg-red-50 p-5" role="status">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 gap-3">
        <AlertCircle
          className="mt-0.5 size-5 shrink-0 text-red-700"
          aria-hidden="true"
        />
        <div>
          <h3 className="font-mono text-base text-szo-black">
            Pool data unavailable
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-red-800">
            This network is not exposing view pool state right now. The
            registered view and GraphQL playground are still available.
          </p>
          <details className="mt-2 text-xs text-red-700">
            <summary className="cursor-pointer">Technical details</summary>
            <p className="mt-1 break-words font-mono">{state.error}</p>
          </details>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={state.retry}
        className="h-9 shrink-0 gap-2 px-4 text-sm"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        Retry
      </Button>
    </div>
  </div>
);

const NetworkBillingContent = ({
  state,
}: {
  state: Extract<ViewPoolsState, { status: "success" }>;
}) => {
  const activeCount = state.activePoolsByAddress.size;
  const hasPools = state.pools.length > 0;

  return (
    <div className="flex min-w-0 flex-col gap-3" aria-live="polite">
      <div className="grid border border-ui-border bg-white sm:grid-cols-2 lg:grid-cols-3">
        <StatusCell
          label="View Registry"
          value="Registered"
          description="The view completed its Hub registration lifecycle."
          tone="ready"
          icon={CheckCircle2}
        />
        <StatusCell
          label="Gateway readiness"
          value={
            activeCount > 0
              ? "Ready"
              : hasPools
                ? "Waiting for hosts"
                : "No pools"
          }
          description={readinessDescription(state.pools, activeCount)}
          tone={activeCount > 0 ? "ready" : "waiting"}
          icon={activeCount > 0 ? Activity : Clock3}
        />
        <PriceCell state={state.networkUnitPrice} hasPools={hasPools} />
      </div>

      {!hasPools ? <EmptyPoolsState /> : null}
      {hasPools ? (
        <div className="grid min-w-0 gap-3 xl:grid-cols-2">
          {state.pools.map((pool) => (
            <PoolCard
              key={pool.poolAddress}
              pool={pool}
              connectedAddress={state.connectedAddress}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

const StatusCell = ({
  label,
  value,
  description,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  tone: "ready" | "waiting";
  icon: typeof CheckCircle2;
}) => (
  <div className="min-w-0 border-b border-ui-border p-4 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
    <p className="text-xs uppercase tracking-wide text-ui-text-muted">
      {label}
    </p>
    <p
      className={cn(
        "mt-2 flex items-center gap-2 font-mono text-base",
        tone === "ready" ? "text-emerald-700" : "text-amber-700"
      )}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      {value}
    </p>
    <p className="mt-1 text-xs leading-5 text-ui-text-muted">{description}</p>
  </div>
);

const PriceCell = ({
  state,
  hasPools,
}: {
  state: Extract<ViewPoolsState, { status: "success" }>["networkUnitPrice"];
  hasPools: boolean;
}) => (
  <div className="min-w-0 p-4 sm:col-span-2 lg:col-span-1">
    <p className="text-xs uppercase tracking-wide text-ui-text-muted">
      Network unit price
    </p>
    {!hasPools || state.status === "idle" ? (
      <p className="mt-2 font-mono text-base text-ui-text-muted">
        Not available
      </p>
    ) : null}
    {state.status === "loading" ? (
      <p className="mt-2 flex items-center gap-2 font-mono text-base text-ui-text-muted">
        <RefreshCw className="size-4 animate-spin" aria-hidden="true" />
        Loading price…
      </p>
    ) : null}
    {state.status === "success" ? (
      <p className="mt-2 font-mono text-base text-szo-black">
        {formatShnz(state.value)} SHNZ
        <span className="ml-1 font-sans text-xs text-ui-text-muted">
          / metered unit
        </span>
      </p>
    ) : null}
    {state.status === "error" ? (
      <div className="mt-2">
        <p className="flex items-center gap-2 font-mono text-base text-amber-700">
          <AlertCircle className="size-4" aria-hidden="true" />
          Price unavailable
        </p>
        <button
          type="button"
          onClick={state.retry}
          className="mt-1 text-xs font-medium text-szo-black underline underline-offset-2"
          title={state.error}
        >
          Retry price read
        </button>
      </div>
    ) : null}
    <p className="mt-1 text-xs leading-5 text-ui-text-muted">
      This is not a per-query quote. The final metering and debit formula is not
      yet fixed.
    </p>
  </div>
);

const EmptyPoolsState = () => (
  <div className="border border-dashed border-ui-border bg-ui-bg p-6 text-center">
    <Database
      className="mx-auto size-6 text-ui-text-muted"
      aria-hidden="true"
    />
    <h3 className="mt-3 font-mono text-base text-szo-black">
      No network pools yet
    </h3>
    <p className="mx-auto mt-1 max-w-xl text-sm leading-6 text-ui-text-muted">
      This view is registered, but no demand pool has been created for it. It is
      not ready to receive gateway traffic.
    </p>
  </div>
);

const PoolCard = ({
  pool,
  connectedAddress,
}: {
  pool: ShinzoHubViewPool;
  connectedAddress: string | null;
}) => {
  const ownDemand = connectedAddress
    ? pool.demands.find(
        (demand) =>
          demand.registrantAddress.toLowerCase() ===
          connectedAddress.toLowerCase()
      )
    : null;
  const hasStatistics =
    pool.stats.reportedUnitPrice !== null ||
    pool.stats.totalQueries > 0n ||
    pool.stats.totalRewards > 0n ||
    pool.stats.lastUpdatedEpoch > 0n;

  return (
    <article className="flex min-w-0 flex-col border border-ui-border bg-white">
      <div className="flex min-w-0 items-start justify-between gap-3 border-b border-ui-border p-4">
        <div className="min-w-0">
          <p className="mb-1 text-xs uppercase tracking-wide text-ui-text-muted">
            Pool address
          </p>
          <ViewAddressChip link={createExplorerAddressLink(pool.poolAddress)} />
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
            pool.isActive
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          )}
        >
          {pool.isActive ? (
            <CheckCircle2 className="size-3.5" aria-hidden="true" />
          ) : (
            <Clock3 className="size-3.5" aria-hidden="true" />
          )}
          {pool.isActive ? "Active" : "Waiting"}
        </span>
      </div>

      <dl className="grid grid-cols-2 text-sm sm:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4">
        <Metric
          label="Hosts"
          value={`${pool.hosts.length} of ${pool.requiredHostCount}`}
        />
        <Metric label="Window size" value={pool.config.windowSize.toString()} />
        <Metric label="Demands" value={pool.demands.length.toString()} />
        <Metric label="Created at" value={`#${pool.createdAtHeight}`} />
      </dl>

      <div className="flex min-w-0 items-start gap-3 border-b border-ui-border bg-ui-bg/50 p-4">
        <Wallet
          className="mt-0.5 size-4 shrink-0 text-ui-text-muted"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-ui-text-muted">
            Connected wallet demand
          </p>
          {!connectedAddress ? (
            <p className="mt-1 text-sm text-ui-text-muted">
              Connect a wallet to identify its demand.
            </p>
          ) : ownDemand ? (
            <p className="mt-1 font-mono text-sm text-szo-black">
              {formatShnz(ownDemand.bond)} SHNZ bonded
            </p>
          ) : (
            <p className="mt-1 text-sm text-ui-text-muted">
              No demand registered by this wallet.
            </p>
          )}
        </div>
      </div>

      <details className="group min-w-0">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 marker:hidden [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2 text-sm font-medium text-szo-black">
            <Server className="size-4 text-ui-text-muted" aria-hidden="true" />
            Pool details
          </span>
          <ChevronDown
            className="size-4 text-ui-text-muted transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="grid gap-5 border-t border-ui-border p-4 sm:grid-cols-2">
          <div className="min-w-0">
            <h4 className="text-xs uppercase tracking-wide text-ui-text-muted">
              Host members
            </h4>
            <ul className="mt-2 space-y-2">
              {pool.hosts.map((host) => (
                <li
                  key={host.hostAddress}
                  className="flex min-w-0 items-center justify-between gap-2 text-xs"
                >
                  <ViewAddressChip
                    link={createExplorerAddressLink(host.hostAddress)}
                  />
                  <span className="shrink-0 font-mono text-ui-text-muted">
                    #{host.joinedAtHeight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className="text-xs uppercase tracking-wide text-ui-text-muted">
              Latest statistics
            </h4>
            {!hasStatistics ? (
              <p className="mt-2 text-xs leading-5 text-ui-text-muted">
                No settlement statistics reported yet.
              </p>
            ) : null}
            <dl className="mt-2 space-y-2 text-xs">
              <DetailRow
                label="Reported unit price"
                value={
                  pool.stats.reportedUnitPrice === null
                    ? "Not reported"
                    : `${formatShnz(pool.stats.reportedUnitPrice)} SHNZ`
                }
              />
              <DetailRow
                label="Utilization"
                value={`${pool.stats.utilizationPercent}%`}
              />
              <DetailRow
                label="Total queries"
                value={formatCount(pool.stats.totalQueries)}
              />
              <DetailRow
                label="Total rewards"
                value={`${formatShnz(pool.stats.totalRewards)} SHNZ`}
              />
              <DetailRow
                label="Last epoch"
                value={
                  pool.stats.lastUpdatedEpoch > 0n
                    ? pool.stats.lastUpdatedEpoch.toString()
                    : "Not reported"
                }
              />
            </dl>
          </div>
        </div>
      </details>
    </article>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0 border-b border-r border-ui-border p-3">
    <dt className="text-xs text-ui-text-muted">{label}</dt>
    <dd
      className="mt-1 truncate font-mono text-sm text-szo-black"
      title={value}
    >
      {value}
    </dd>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-3">
    <dt className="text-ui-text-muted">{label}</dt>
    <dd className="break-words text-right font-mono text-szo-black">{value}</dd>
  </div>
);

function readinessDescription(
  pools: readonly ShinzoHubViewPool[],
  activeCount: number
): string {
  if (activeCount > 0) {
    return `${activeCount} of ${pools.length} ${pools.length === 1 ? "pool is" : "pools are"} active.`;
  }
  if (pools.length === 0) {
    return "The registered view has no demand pool.";
  }
  const closest = Math.max(...pools.map((pool) => pool.hosts.length));
  const requiredHostCount = pools[0]?.requiredHostCount ?? 3;
  const missing = Math.max(0, requiredHostCount - closest);
  return `${pools.length} ${pools.length === 1 ? "pool needs" : "pools need"} more supply; the closest needs ${missing} more ${missing === 1 ? "host" : "hosts"}.`;
}

function formatShnz(value: bigint): string {
  return formatTokenAmount(value.toString(), SHNZ_DECIMALS);
}

function formatCount(value: bigint): string {
  return new Intl.NumberFormat().format(value);
}
