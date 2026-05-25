import type { ViewsPageItem } from "../model/types";
import { ViewsCard } from "./views-card";
import { ViewsCardSkeleton } from "./views-card-skeleton";

interface ViewsGridProps {
  items: readonly ViewsPageItem[];
}

export const ViewsGrid = ({ items }: ViewsGridProps) => {
  if (items.length === 0) {
    return (
      <div className="flex min-h-64 items-center justify-center border border-ui-border bg-ui-bg-accent p-8 text-center">
        <div className="flex max-w-sm flex-col gap-2">
          <h2 className="font-mono text-lg font-light text-szo-black">
            No views found
          </h2>
          <p className="text-sm leading-relaxed text-szo-black/55">
            Try a different search term or loosen the current filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ViewsCard key={item.id} view={item} />
      ))}
    </div>
  );
};

export const ViewsGridSkeleton = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 9 }).map((_, index) => (
      <ViewsCardSkeleton key={index} />
    ))}
  </div>
);
