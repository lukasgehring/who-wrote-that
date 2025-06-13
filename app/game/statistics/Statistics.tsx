"use client";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";
import ScoreChart from "./ScoreChart";
import TotalChart from "./TotalChart";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import TimeChart from "./TimeChart";

export default function Statistics() {

    const { setCurrentScreen, levelScores } = useGameStore();

    useEffect(() => {
        console.log(levelScores)
    }, [levelScores])

    return (
        <div className="flex flex-col text-center text-gray-600 gap-8 bg-white rounded-xl p-5">
            <h1 className="text-2xl font-bold">Statistiken</h1>
            <div>
                <h2 className="font-semibold">Level Statistiken</h2>
                <ScoreChart />
            </div>
            <div>
                <h2 className="font-semibold">Gesamt Statistiken</h2>
                <TotalChart />
            </div>
            <div>
                <h2 className="font-semibold">Zeit</h2>
                <TimeChart />
            </div>
            <Button variant="ghost" onClick={() => setCurrentScreen("menu")}>
                <ArrowLeft /> Zurück
            </Button>
        </div>
    )
}