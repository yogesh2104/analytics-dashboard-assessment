"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "name",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const DashboardModelChart = ({chartData}:{chartData:any}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicle Model data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              width={chartData.length * 20}
              height={200}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={true}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 1)}
              />
              <YAxis scale="log" domain={[1, "auto"]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent  />}
              />
              <Bar dataKey="value" fill="var(--color-desktop)" radius={0} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          This is over all Vehicle Model data<TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DashboardModelChart;
