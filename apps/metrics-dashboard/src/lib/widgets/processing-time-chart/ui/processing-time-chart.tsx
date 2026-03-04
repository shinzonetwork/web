"use client";

import { useMetricsContext } from "@/lib/context";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";

const getColor = (value: number): string => {
  if (value < 10) return "#10b981";
  if (value < 100) return "#f59e0b";
  return "#D01F27";
};

export function ProcessingTimeChart() {
  const { processingTimeHistoryDataPoints } = useMetricsContext();
  const cumulativeLastProcessingTimeMs = processingTimeHistoryDataPoints.map(
    (point) => point.processingTime,
  );
  const hasData = cumulativeLastProcessingTimeMs.length > 0;

  const avgValue = hasData
    ? Math.round(
        cumulativeLastProcessingTimeMs.reduce((sum, t) => sum + t, 0) /
          cumulativeLastProcessingTimeMs.length,
      )
    : 0;
  const maxValue = hasData ? Math.max(...cumulativeLastProcessingTimeMs) : 0;

  return (
    <div className="font-mono font-medium bg-secondary p-8 border border-border h-full">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-sm text-muted-foreground uppercase tracking-wider">
            Processing Time History
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last hour readings (ms)
          </div>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <div className="text-xs text-muted-foreground uppercase">Avg</div>
            <div className="text-lg" style={{ color: getColor(avgValue) }}>
              {avgValue}ms
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground uppercase">Max</div>
            <div className="text-lg" style={{ color: getColor(maxValue) }}>
              {maxValue}ms
            </div>
          </div>
        </div>
      </div>
      <div className="h-[200px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={processingTimeHistoryDataPoints}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="processingGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#D01F27" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#D01F27" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tick={{ fill: "#666", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              interval={9}
            />
            <YAxis
              tick={{ fill: "#666", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e5e5",
                borderRadius: "0",
                fontFamily: "monospace",
              }}
              labelStyle={{ color: "#000" }}
            />
            <ReferenceLine
              y={10}
              stroke="#10b981"
              strokeDasharray="3 3"
              label={{
                value: "Fast (<10ms)",
                position: "right",
                fill: "#10b981",
                fontSize: 10,
              }}
            />
            <ReferenceLine
              y={100}
              stroke="#f59e0b"
              strokeDasharray="3 3"
              label={{
                value: "Medium (<100ms)",
                position: "right",
                fill: "#f59e0b",
                fontSize: 10,
              }}
            />
            <Area
              type="monotone"
              dataKey="processingTime"
              stroke="#D01F27"
              fill="url(#processingGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
