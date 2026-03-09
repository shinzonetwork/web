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
  const domainDataProcessed = domainFromDataPoints<ThroughputDataPoint>(
    throughputDataPoints,
    "documents_processed",
  );
  const domainData = [domainDataReceived, domainDataProcessed];
  const domainMin = Math.min(...domainData.map((d) => d[0]));
  const domainMax = Math.max(...domainData.map((d) => d[1]));
  const domain = [domainMin, domainMax];

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">
        Throughput Over Time
      </div>
      <div className="text-xs text-muted-foreground mb-6">
        Documents processed per 5 secs (1 hour)
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={throughputDataPoints}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey="time"
              tick={{ fill: "#666", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#666", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={domain}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "0",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#000", marginBottom: "4px" }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", fontFamily: "monospace" }}
              iconType="square"
            />
            <Area
              type="monotone"
              dataKey="documents_received"
              stroke="#D01F27"
              fill="none"
              strokeWidth={2}
              name="Documents Received"
            />
            <Area
              type="monotone"
              dataKey="documents_processed"
              stroke="#10b981"
              fill="none"
              strokeWidth={2}
              name="Documents Processed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
