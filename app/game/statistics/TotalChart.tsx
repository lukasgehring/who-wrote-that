"use client";

import { Bar, BarChart, CartesianGrid } from "recharts";
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

export default function TotalChart() {

    const { levelScores } = useGameStore();

    const totals = levelScores.reduce(
        (acc, obj) => {
            acc.user += obj.user || 0;
            acc.detector += obj.detector || 0;
            return acc;
        },
        { user: 0, detector: 0 }
    );

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={[totals]}>
                <CartesianGrid vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="user" fill="var(--color-user)" radius={4} />
                <Bar dataKey="detector" fill="var(--color-detector)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}