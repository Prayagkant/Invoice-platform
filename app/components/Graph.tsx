"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface iAppProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export function Graph({ data }: iAppProps) {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "#0d1b2a",
        },
      }}
      className="min-h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#0d1b2a"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
