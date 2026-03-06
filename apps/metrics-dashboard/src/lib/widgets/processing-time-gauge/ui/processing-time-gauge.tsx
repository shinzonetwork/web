"use client";

import { useMetricsContext } from "@/lib/context";

function getProcessingStatus(ms: number): {
  label: string;
  color: string;
  percentage: number;
} {
  if (ms < 10) {
    return {
      label: "Fast",
      color: "#10b981",
      percentage: Math.min((ms / 10) * 33, 33),
    };
  }
  if (ms < 100) {
    return {
      label: "Medium",
      color: "#f59e0b",
      percentage: 33 + ((ms - 10) / 90) * 33,
    };
  }
  if (ms < 1000) {
    return {
      label: "Slow",
      color: "#D01F27",
      percentage: 66 + ((ms - 100) / 900) * 34,
    };
  }
  return {
    label: "Very Slow",
    color: "#D01F27",
    percentage: 100,
  };
}

export function ProcessingTimeGauge() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;

  const { last_processing_time_ms } = currentMetricsData;
  const status = getProcessingStatus(last_processing_time_ms);

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
        Last Processing Time
      </div>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-2xl" style={{ color: status.color }}>
          {last_processing_time_ms}
        </span>
        <span className="text-sm text-muted-foreground">ms</span>
        <span
          className="ml-auto text-xs font-medium px-2 py-1"
          style={{ backgroundColor: `${status.color}15`, color: status.color }}
        >
          {status.label}
        </span>
      </div>

      <div className="space-y-3">
        <div className="h-2 bg-muted overflow-hidden">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${status.percentage}%`,
              backgroundColor: status.color,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{"< 10ms"}</span>
          <span>{"< 100ms"}</span>
          <span>{"< 1000ms"}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-4 mt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Fast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Slow</span>
        </div>
      </div>
    </div>
  );
}
