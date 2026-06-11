import { Skeleton } from "@shinzo/ui/skeleton";

export const ViewsCardSkeleton = () => (
  <div className="border-2 border-ui-border bg-white p-4">
    <div className="flex flex-col gap-4">
      <div className="h-5 w-3/4">
        <Skeleton />
      </div>
      <div className="h-4 w-full">
        <Skeleton />
      </div>
      <div className="h-4 w-1/2">
        <Skeleton />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="h-4">
          <Skeleton />
        </div>
        <div className="h-4">
          <Skeleton />
        </div>
      </div>
    </div>
  </div>
);
