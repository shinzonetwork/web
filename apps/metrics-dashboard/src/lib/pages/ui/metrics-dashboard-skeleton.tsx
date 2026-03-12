import { Skeleton } from "@shinzo/ui/skeleton";

export function MetricsDashboardSkeleton() {
  return (
    <div className="space-y-10">
      {/* Overview skeleton */}
      <section className="py-8">
        <div className="h-4 w-32 bg-muted rounded mb-6">
          <Skeleton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="bg-muted/70 border border-border h-28 rounded"
            >
              <Skeleton />
            </div>
          ))}
        </div>
      </section>

      {/* Performance charts skeleton */}
      <section className="py-8">
        <div className="h-4 w-40 bg-muted rounded mb-6">
          <Skeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2 bg-muted/70 border border-border h-64 rounded">
            <Skeleton />
          </div>
          <div className="lg:col-span-2 bg-muted/70 border border-border h-64 rounded">
            <Skeleton />
          </div>
        </div>
      </section>

      {/* Error status skeleton */}
      <section className="py-8">
        <div className="h-4 w-32 bg-muted rounded mb-6">
          <Skeleton />
        </div>
        <div className="bg-muted/70 border border-border h-32 rounded">
          <Skeleton />
        </div>
      </section>

      {/* Documents statistics skeleton */}
      <section className="py-8">
        <div className="h-4 w-48 bg-muted rounded mb-6">
          <Skeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-muted/70 border border-border h-56 rounded">
            <Skeleton />
          </div>
          <div className="bg-muted/70 border border-border h-56 rounded">
            <Skeleton />
          </div>
        </div>
      </section>

      {/* System analytics skeleton */}
      <section className="py-8">
        <div className="h-4 w-40 bg-muted rounded mb-6">
          <Skeleton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="bg-muted/70 border border-border h-24 rounded animate-pulse"
            >
              <Skeleton />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
