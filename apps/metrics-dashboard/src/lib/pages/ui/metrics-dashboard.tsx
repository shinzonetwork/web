import { useMetricsContext } from "@/lib/context";
import { MetricsDashboardComponents } from "./metrics-dashboard-components";
import { MetricsDashboardSkeleton } from "./metrics-dashboard-skeleton";


export default function MetricsDashboard() {
  const { isLoading, currentMetricsData } = useMetricsContext();
  const showSkeleton = isLoading || !currentMetricsData;

  if (showSkeleton) return <MetricsDashboardSkeleton />;

  return (
    <>
      <MetricsDashboardComponents />
    </>
  );
}