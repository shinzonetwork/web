import { CheckCircle2, Clock3, WalletCards } from "lucide-react";
import { cn } from "@shinzo/ui/cn";
import type { ShinzoHubViewPool } from "@shinzo/shinzohub/views";
import {
  findConnectedWalletDemand,
  formatShnz,
  pluralize,
} from "../model/view-pool-utils";
import { PoolMetric } from "./pool-metric";

export const PoolCard = ({
  pool,
  index,
  connectedAddress,
}: {
  pool: ShinzoHubViewPool;
  index: number;
  connectedAddress: string | null;
}) => {
  const ownDemand = findConnectedWalletDemand(pool, connectedAddress);
  const poolStatusCopy = pool.isActive
    ? `Active with ${pool.hosts.length} ${pluralize(pool.hosts.length, "host")}.`
    : `Waiting for hosts — ${pool.hosts.length} of ${pool.requiredHostCount} joined.`;

  return (
    <article className="flex min-w-0 flex-col bg-white p-5 sm:p-6">
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-ui-text-muted">
            Pool {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-mono text-lg font-normal text-szo-black">
            {poolStatusCopy}
          </h3>
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

      <dl className="mt-6 grid grid-cols-2 gap-px border border-gray-200 bg-gray-200">
        <PoolMetric
          label="Hosts"
          value={`${pool.hosts.length} / ${pool.requiredHostCount}`}
        />
        <PoolMetric label="Demands" value={pool.demands.length.toString()} />
      </dl>

      {ownDemand ? (
        <div className="mt-4 flex min-w-0 items-start gap-3 border border-szo-primary/20 bg-ui-bg-accent p-4">
          <WalletCards
            className="mt-0.5 size-4 shrink-0 text-ui-text-accent"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-ui-text-muted">
              Your demand
            </p>
            <p className="mt-1 font-mono text-sm text-szo-black">
              {formatShnz(ownDemand.bond)} SHNZ bonded
            </p>
          </div>
        </div>
      ) : null}
    </article>
  );
};
