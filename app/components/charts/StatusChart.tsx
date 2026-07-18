"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatusData = {
  status: string;
  count: number;
};

type StatusChartProps = {
  data: StatusData[];
};

export default function StatusChart({ data }: StatusChartProps) {
  if (data.length === 0) {
    return (
      <p
        style={{
          margin: 0,
          color: "var(--muted)",
        }}
      >
        Add an application to start seeing analytics.
      </p>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: 320,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            dataKey="status"
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
            cursor={{
              fill: "rgba(255, 255, 255, 0.04)",
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

          <Bar
            dataKey="count"
            name="Applications"
            fill="var(--yellow)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
