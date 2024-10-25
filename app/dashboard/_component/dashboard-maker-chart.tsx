"use client";

import { TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

const DashboardMakerChart = ({chartData}:{chartData:any}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle maker data</CardTitle>
      </CardHeader>
      <CardContent className="mb-4">
        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 10,
                  bottom: 24,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={true}
                  tickLine={true}
                  tickMargin={8}
                  fontSize={12}
                  angle={-90}
                  textAnchor="end"
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  axisLine={true}
                  tickLine={true}
                  tickMargin={8}
                  fontSize={12}
                  tickFormatter={(value) => `${value.toLocaleString()}`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="value"
                      labelFormatter={(value) => `Year: ${value}`}
                      // valueFormatter={(value) => value.toLocaleString()}
                    />
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          This is over all Vehicle maker data<TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardMakerChart;
