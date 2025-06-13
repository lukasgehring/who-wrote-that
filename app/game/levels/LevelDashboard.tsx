"use client";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";
import { useLevelStore } from "@/stores/levelStore";
import { Trophy } from "lucide-react";
import { useEffect } from "react";
import ScoreChart from "../statistics/ScoreChart";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LevelDashboard() {

    const { levelComplete, userAnswers, level, score } = useLevelStore();
    const { backToMenu, setLevelScore, unlockNextLevel } = useGameStore();

    useEffect(() => {
        if (levelComplete)
            setLevelScore({ level: level, detector: 5, user: score, samples: userAnswers });

    }, [levelComplete])

    const handleBackToMenu = () => {
        unlockNextLevel();
        backToMenu();
    }

    return (
        <Card className="max-w-4xl mx-auto p-6 text-center">
            <CardHeader>
                <CardTitle className="text-3xl font-bold mb-4 text-gray-800">
                    <Trophy className="mx-auto mb-4" />
                    Spiel beendet!
                </CardTitle>
                <CardDescription>
                    <p className="mb-6 text-gray-600">Endpunktzahl: <span className="font-bold text-primary">{score} Punkte</span></p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScoreChart />
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={handleBackToMenu} className="bg-primary hover:bg-gray-700">
                    Zurück zum Menu
                </Button>
            </CardFooter>
        </Card>
    );
}