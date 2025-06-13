"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { useGameStore } from "@/stores/gameStore";

const chartConfig = {
    user: {
        label: "User",
        color: "#2563eb",
    },
    detector: {
        label: "Detektor",
        color: "#60a5fa",
    },
} satisfies ChartConfig;

export default function ScoreChart() {

    const { levelScores } = useGameStore();

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={levelScores}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="level"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 10)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="user" fill="var(--color-user)" radius={4} />
                <Bar dataKey="detector" fill="var(--color-detector)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}