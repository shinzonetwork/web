"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { ThroughputDataPoint, useMetricsContext } from "@/lib/context";
import { domainFromDataPoints } from "@/lib/shared/utils/utils";

export function ThroughputChart() {
  const { throughputDataPoints } = useMetricsContext();
  if (throughputDataPoints.length === 0) return null;
  const domainDataReceived = domainFromDataPoints<ThroughputDataPoint>(
    throughputDataPoints,
    "documents_received",
  );
  const xAxisInterval = Math.max(
    0,
    Math.floor(throughputDataPoints.length / 5),
  );

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">
        Throughput Over Time
      </div>
      <div className="text-xs text-muted-foreground mb-6">
        Documents processed per 5 secs (1 hour)
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={throughputDataPoints}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="documentsGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{
                fill: "var(--color-muted-foreground)",
                fontSize: "var(--text-xs)",
              }}
              axisLine={false}
              tickLine={false}
              interval={xAxisInterval}
            />
            <YAxis
              tick={{
                fill: "var(--color-muted-foreground)",
                fontSize: "var(--text-xs)",
              }}
              axisLine={false}
              tickLine={false}
              domain={domainDataReceived}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-muted)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
              }}
              labelStyle={{
                color: "var(--color-muted-foreground)",
                marginBottom: "4px",
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "var(--text-xs)",
                fontFamily: "var(--font-mono)",
              }}
              iconType="square"
            />
            <Area
              type="monotone"
              dataKey="documents_received"
              stroke="var(--color-ui-primary)"
              fill="url(#documentsGradient)"
              strokeWidth={2}
              name="Documents Received"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
