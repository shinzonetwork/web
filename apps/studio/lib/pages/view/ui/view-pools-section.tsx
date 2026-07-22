import { Button } from "@/shared/ui/button";
import type { ViewPoolsState } from "../model/use-view-pools";
import { EmptyViewPools } from "./empty-view-pools";
import { ViewPoolsContent } from "./view-pools-content";
import { ViewPoolsSkeleton } from "./view-pools-skeleton";
import { ViewPoolsUnavailable } from "./view-pools-unavailable";

export const ViewPoolsSection = ({ state }: { state: ViewPoolsState }) => (
  <section
    className="flex min-w-0 flex-col gap-5"
    aria-labelledby="view-pools-title"
  >
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ui-text-accent">
          Network
        </p>
        <h2
          id="view-pools-title"
          className="mt-2 font-mono text-2xl font-normal text-szo-black"
        >
          Pools
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-ui-text-muted">
          A pool connects this view to its hosts. It becomes active when at
          least three hosts join. Registering the first demand creates the pool.
        </p>
      </div>
      {state.status === "success" &&
      state.pools.some((pool) => pool.isActive) ? (
        <div className="shrink-0">
          <Button type="button" variant="secondary" disabled>
            Register demand
          </Button>
          <p className="mt-2 text-right text-xs text-ui-text-muted">
            Coming soon
          </p>
        </div>
      ) : null}
    </div>

    {state.status === "loading" ? <ViewPoolsSkeleton /> : null}
    {state.status === "error" ? (
      <ViewPoolsUnavailable error={state.error} retry={state.retry} />
    ) : null}
    {state.status === "success" && state.pools.length === 0 ? (
      <EmptyViewPools />
    ) : null}
    {state.status === "success" && state.pools.length > 0 ? (
      <ViewPoolsContent state={state} />
    ) : null}
  </section>
);
