"use client";

import { useGameStore } from "@/stores/gameStore";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react";
import { SampleResult } from "@/stores/levelStore";

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

export default function TimeChart() {

    const { levelScores } = useGameStore();
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    const [data, setData] = useState<SampleResult[]>();

    useEffect(() => {
        if (selectedLevel !== null) {
            const data = levelScores[selectedLevel].samples;

            const coloredData = data.map(d => ({
                ...d,
                fill: d.correct ? 'var(--color-green-400)' : 'var(--color-red-400)',
                name: "Test"
            }));
            setData(coloredData);
        }
    }, [selectedLevel])



    return (
        <div className="flex flex-col items-center gap-2">
            <Select
                value={selectedLevel !== null ? selectedLevel.toString() : ''}
                onValueChange={(value) => setSelectedLevel(Number(value))}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Level</SelectLabel>
                        {levelScores.map((data, index) => (
                            <SelectItem key={index} value={index.toString()}>
                                {data.level}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {selectedLevel !== null && data && (
                <div className="flex flex-col gap-2">
                    <div>
                        <p>Durchschnittszeit: {(data.reduce((sum, obj) => sum + obj.time, 0) / data.length).toFixed(2)}s</p>
                    </div>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <BarChart data={data}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="id" />
                            <YAxis dataKey="time" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                                dataKey="time"
                                fill="fill"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            )}
        </div>
    );
}