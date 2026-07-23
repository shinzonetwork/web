import { Skeleton } from "@shinzo/ui/skeleton";

export const ViewPoolsSkeleton = () => (
  <div
    className="grid gap-px border border-ui-border bg-ui-border lg:grid-cols-2"
    aria-label="Loading pools"
  >
    <div className="h-44 bg-white p-5">
      <Skeleton />
    </div>
    <div className="h-44 bg-white p-5">
      <Skeleton />
    </div>
  </div>
);
