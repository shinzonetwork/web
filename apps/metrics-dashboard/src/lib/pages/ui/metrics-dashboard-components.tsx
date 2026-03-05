import {
    Overview,
    PerformanceAnalytics,
    ErrorStatus,
    DocumentsStatistics,
    SystemAnalytics,
  } from "@/lib/features";
  
  export function MetricsDashboardComponents() {
    return (
      <>
        {/* Overview Section */}
        <Overview />
        {/* Performance Charts Section */}
        <PerformanceAnalytics />
        {/* TODO: Add Processing Analytics once the metrics api is wired with uptodate last_processing_time_ms */}
        {/* Processing Time Section */}
        {/* <ProcessingAnalytics /> */}
        {/* Error Status Section */}
        <ErrorStatus />
        {/* Documents Statistics Section */}
        <DocumentsStatistics />
        {/* System Analytics Section */}
        <SystemAnalytics />
      </>
    );
  }
  