import { CircleDashed } from "lucide-react";

export const EmptyViewPools = () => (
  <div className="border border-ui-border bg-ui-bg-muted px-5 py-8 sm:px-8">
    <CircleDashed className="size-6 text-ui-text-accent" aria-hidden="true" />
    <h3 className="mt-4 font-mono text-xl font-normal text-szo-black">
      No pools yet
    </h3>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-ui-text-muted">
      No demand has been registered for this view. The first demand creates a
      pool that hosts can join.
    </p>
  </div>
);
