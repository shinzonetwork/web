"use client";

import { useMetricsContext } from "@/lib/context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

export function DocumentsBreakdownChart() {
  const { currentMetricsData } = useMetricsContext();
  if (!currentMetricsData) return null;

  const {
    blocks_processed,
    transactions_processed,
    logs_processed,
    access_lists_processed,
    documents_received,
  } = currentMetricsData;

  const data = [
    {
      name: "Blocks",
      value: blocks_processed,
      color: "var(--color-ui-chart-1)",
    },
    {
      name: "Transactions",
      value: transactions_processed,
      color: "var(--color-ui-chart-2)",
    },
    { name: "Logs", value: logs_processed, color: "var(--color-ui-chart-3)" },
    {
      name: "Access Lists",
      value: access_lists_processed,
      color: "var(--color-ui-chart-4)",
    },
  ];

  return (
    <div className="font-mono font-medium bg-background p-8 border border-border transition-all duration-300 hover:border-primary">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-sm text-muted-foreground mb-1 uppercase tracking-wider">
            Documents Processed Breakdown
          </div>
          <div className="text-base text-muted-foreground">
            Total: {documents_received?.toLocaleString() ?? 0} documents
          </div>
        </div>
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={100}
              tick={{ fill: "#666", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
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
            <Bar dataKey="value" radius={[0, 0, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-3 h-3" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground">{item.name}:</span>
            <span className="text-xs text-foreground">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
