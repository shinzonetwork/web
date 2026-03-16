"use client";

import { BlockProgressionDataPoint, useMetricsContext } from "@/lib/context";
import { domainFromDataPoints } from "@/lib/shared/utils/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export function BlockProgressionChart() {
  const { blockProgressionDataPoints, historicalMetricsData } =
    useMetricsContext();
  const cumulativeBlocksProcessed = historicalMetricsData.map(
    (metric) => metric.blocks_processed,
  );
  const minBlock =
    cumulativeBlocksProcessed.length > 0
      ? Math.min(...cumulativeBlocksProcessed)
      : 0;
  const maxBlock =
    cumulativeBlocksProcessed.length > 0
      ? Math.max(...cumulativeBlocksProcessed)
      : 0;
  const blocksProcessed = maxBlock - minBlock;

  const xAxisInterval = Math.max(
    0,
    Math.floor(blockProgressionDataPoints.length / 5),
  );

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">
            Block Progression
          </div>
          <div className="text-xs text-muted-foreground">
            Blockchain height over time (1 hour)
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            +{blocksProcessed.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">blocks synced</div>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={blockProgressionDataPoints}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
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
              domain={domainFromDataPoints<BlockProgressionDataPoint>(
                blockProgressionDataPoints,
                "block",
                10,
              )}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-ui-bg-muted)",
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
            <Line
              type="monotone"
              dataKey="Blocks Processed"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "var(--color-primary)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
