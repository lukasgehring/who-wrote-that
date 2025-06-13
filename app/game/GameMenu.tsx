"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";
import Settings from "./settings/Settings";
import { useLevelStore } from "@/stores/levelStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { LineChart, Lock, Play, Settings2 } from "lucide-react";

const levels = ['level1', 'level2', 'level3'];

export default function GameMenu() {
    const { setCurrentScreen, totalScore, lockedLevels, levelScores } = useGameStore();
    const { setLevel } = useLevelStore();


    const [completedLevels, setCompletedLevels] = useState<string[]>([]);

    function selectLevel(level: string) {
        setLevel(level);
        setCurrentScreen("level");
    }

    useEffect(() => {
        levelScores.forEach((level) => {
            setCompletedLevels(prev =>
                prev.includes(level.level) ? prev : [...prev, level.level]
            );
        })
    }, [levelScores])

    return (
        <Card className="flex flex-col items-center gap-6 w-full max-w-2xl min-h-[400px] px-12 sm:px-24 py-12 shadow-xl rounded-2xl bg-white select-none">
            <CardHeader className="w-full min-w-[300px] text-center space-y-2">
                <CardTitle>
                    <h1 className="text-3xl font-bold text-primary">Who Wrote This?</h1>
                    <h2 className="text-lg text-muted-foreground font-medium">Level auswählen</h2>
                </CardTitle>
            </CardHeader>

            <CardContent className="w-full flex flex-col items-center gap-6">
                <div className="text-2xl font-semibold text-primary">Punkte: {totalScore}</div>

                <div className="flex flex-col w-full gap-3">
                    {levels.map((level) => {
                        const isLocked = lockedLevels.includes(level);
                        const isCompleted = completedLevels.includes(level);
                        return (
                            <motion.div
                                key={level}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full"
                            >
                                <Button
                                    variant={isLocked ? "ghost" : "outline"}
                                    className={`w-full py-3 text-lg font-semibold transition-colors ${isLocked
                                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                        : isCompleted ? "text-primary border-gray-500 hover:bg-gray-500/10 text-gray-500" : "text-primary border-primary hover:bg-primary/10"
                                        }`}
                                    onClick={() => selectLevel(level)}
                                    disabled={isLocked}
                                >
                                    {isLocked ? <Lock /> : <Play />} Level {level.slice(5)}
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="w-full pt-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={() => setCurrentScreen("statistics")}
                            variant="ghost"
                            className="w-full text-gray-600 hover:text-primary font-medium"
                        >
                            <LineChart /> Statistiken
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Settings
                            triggerButton={
                                <Button
                                    variant="ghost"
                                    className="w-full text-gray-600 hover:text-primary font-medium"
                                >
                                    <Settings2 /> Einstellungen
                                </Button>
                            }
                        />
                    </motion.div>


                </div>
            </CardContent>
        </Card>
    );
}
