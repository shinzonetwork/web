import { ChevronDown } from "lucide-react";
import type { ViewPageRecord } from "../model/types";
import type { ViewPoolsState } from "../model/use-view-pools";
import { PoolTechnicalDetails } from "./pool-technical-details";
import { ViewDefinitionDetails } from "./view-definition-details";

export const TechnicalDetails = ({
  view,
  poolState,
}: {
  view: ViewPageRecord;
  poolState: ViewPoolsState;
}) => (
  <section aria-labelledby="technical-details-title">
    <details className="group min-w-0 border border-ui-border bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 marker:hidden sm:px-6 [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h2
            id="technical-details-title"
            className="font-mono text-lg font-normal text-szo-black"
          >
            Technical details
          </h2>
          <p className="mt-1 text-xs text-ui-text-muted">
            View identity, lens hashes, pools, hosts, demand, and reported
            statistics.
          </p>
        </div>
        <ChevronDown
          className="size-5 shrink-0 text-ui-text-muted transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="border-t border-ui-border">
        <ViewDefinitionDetails view={view} />
        <PoolTechnicalDetails state={poolState} />
      </div>
    </details>
  </section>
);
