"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-1))",
  },
}

export default function DashboardTrendChart({chartData}:{chartData:{
  "lable":string, 
  "value": number
}[]
}) {
  const total = React.useMemo(
    () => chartData?.reduce((acc, curr) => acc + curr.value, 0),
    []
  )

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-6">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>This show vehicle Trend</CardTitle>
          <CardDescription>Showing values by year from 1998 to 2024</CardDescription>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Value</span>
          <span className="text-2xl font-bold">{total.toLocaleString()}</span>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[400px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <BarChart
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
                dataKey="lable"
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                fontSize={12}
                angle={-45}
                textAnchor="end"
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
                  //   valueFormatter={(value) => value.toLocaleString()}
                  />
                }
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}