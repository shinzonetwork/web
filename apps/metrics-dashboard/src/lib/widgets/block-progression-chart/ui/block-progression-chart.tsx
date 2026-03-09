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
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={blockProgressionDataPoints}
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
              domain={domainFromDataPoints<BlockProgressionDataPoint>(
                blockProgressionDataPoints,
                "block",
                10,
              )}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "0",
                fontFamily: "monospace",
                fontSize: "12px",
              }}
              labelStyle={{ color: "#000" }}
            />
            <Line
              type="monotone"
              dataKey="block"
              stroke="#D01F27"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#D01F27" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
