"use client";

import { useMetricsContext } from "@/lib/context";

export function ViewsStat() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;
  const { views_registered, views_active } = currentMetricsData;

  const percentage =
    views_registered > 0 ? (views_active / views_registered) * 100 : 0;

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">
        Views Status
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Registered</p>
          <p className="text-2xl text-foreground">{views_registered}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Active</p>
          <p className="text-2xl text-success">{views_active}</p>
        </div>
      </div>

      {views_registered > 0 ? (
        <div className="space-y-2 pt-4 border-t border-border">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Active Rate</span>
            <span>{percentage.toFixed(1)}%</span>
          </div>
          <div className="h-2 bg-muted overflow-hidden">
            <div
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground pt-4 border-t border-border">
          No views registered yet
        </div>
      )}
    </div>
  );
}
