import type { ViewPoolsState } from "../model/use-view-pools";
import { PoolTechnicalCard } from "./pool-technical-card";

export const PoolTechnicalDetails = ({ state }: { state: ViewPoolsState }) => {
  if (state.status === "loading") {
    return (
      <p className="p-5 text-sm text-ui-text-muted">Loading pool details…</p>
    );
  }

  if (state.status === "error") {
    return (
      <p className="p-5 text-sm text-ui-text-muted">
        Pool technical details are unavailable: {state.error}
      </p>
    );
  }

  if (state.pools.length === 0) {
    return (
      <p className="p-5 text-sm text-ui-text-muted">
        No pool exists for this view.
      </p>
    );
  }

  return (
    <div className="divide-y divide-ui-border">
      {state.pools.map((pool, index) => (
        <PoolTechnicalCard key={pool.poolAddress} pool={pool} index={index} />
      ))}
    </div>
  );
};
