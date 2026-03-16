"use client";

import { useMetricsContext } from "@/lib/context";
import { formatTimeAgo } from "@/lib/shared/utils/utils";

export function SystemInfo() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;
  const { last_document_time, build_tags, schema_type } = currentMetricsData;

  const lastDocDate = new Date(last_document_time);

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
        System Information
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-secondary">
          <span className="text-sm text-muted-foreground">Build Tags</span>
          <span className="text-sm text-primary px-2 py-0.5 bg-primary/10">
            {build_tags ?? ""}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary">
          <span className="text-sm text-muted-foreground">Schema Type</span>
          <span className="text-sm text-primary px-2 py-0.5 bg-primary/10">
            {schema_type ?? ""}
          </span>
        </div>

        <div className="p-3 bg-secondary">
          <p className="text-xs text-muted-foreground mb-1">
            Last Document Received
          </p>
          <p className="text-sm text-foreground">
            {lastDocDate.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {formatTimeAgo(lastDocDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
