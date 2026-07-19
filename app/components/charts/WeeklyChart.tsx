"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type WeeklyData = {
  label: string;
  count: number;
};

type WeeklyChartProps = {
  data: WeeklyData[];
};

export default function WeeklyChart({ data }: WeeklyChartProps) {
  if (data.every((item) => item.count === 0)) {
    return (
      <p style={{ margin: 0, color: "var(--muted)" }}>
        Add applications to start seeing activity over time.
      </p>
    );
  }

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 10,
          }}
        >
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="label"
            tick={{
              fill: "var(--muted)",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{
              fill: "var(--muted)",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [Number(value), "Applications"]}
            cursor={{
              stroke: "var(--border)",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              color: "var(--text)",
            }}
            labelStyle={{
              color: "var(--text)",
              fontWeight: 700,
            }}
          />

          <Line
            type="monotone"
            dataKey="count"
            name="Applications"
            stroke="var(--yellow)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "var(--yellow)",
              strokeWidth: 0,
            }}
            activeDot={{
              r: 6,
            }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
