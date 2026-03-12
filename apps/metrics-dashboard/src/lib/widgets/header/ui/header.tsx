"use client";

import { useMetricsContext } from "@/lib/context";
import { formatTimeAgo } from "@/lib/shared/utils/utils";

export function Header() {
  const { currentMetricsData, isLoading } = useMetricsContext();
  if (!currentMetricsData) return null;
  const showLoading = isLoading || !currentMetricsData;

  const { last_document_time } = currentMetricsData;
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex items-center justify-between min-h-[80px] py-5">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-foreground">
              Metrics Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Blockchain Document Processing
            </p>
          </div>
          <div className="flex flex-col items-end font-mono text-sm text-muted-foreground">
            <p className="text-xs text-muted-foreground mb-1">
              Last Document Received
            </p>
            <p className="text-sm text-foreground">
              {showLoading
                ? "--"
                : new Date(last_document_time).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {showLoading ? "--" : formatTimeAgo(new Date(last_document_time))}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
