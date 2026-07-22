import type { ViewPoolsState } from "../model/use-view-pools";
import { NetworkRate } from "./network-rate";
import { PoolCard } from "./pool-card";

type LoadedViewPoolsState = Extract<ViewPoolsState, { status: "success" }>;

export const ViewPoolsContent = ({
  state,
}: {
  state: LoadedViewPoolsState;
}) => {
  const activeCount = state.activePoolsByAddress.size;

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-col gap-3 border border-ui-border bg-ui-bg-muted px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-ui-text-muted">
          <span className="font-mono text-szo-black">
            {activeCount} of {state.pools.length}
          </span>{" "}
          {state.pools.length === 1 ? "pool is" : "pools are"} active.
        </p>
        <NetworkRate state={state.networkUnitPrice} />
      </div>

      <div className="grid min-w-0 gap-px border border-ui-border bg-ui-border lg:grid-cols-2">
        {state.pools.map((pool, index) => (
          <PoolCard
            key={pool.poolAddress}
            pool={pool}
            index={index}
            connectedAddress={state.connectedAddress}
          />
        ))}
      </div>
    </div>
  );
};
