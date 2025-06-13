"use client";

import { useLevelStore } from "@/stores/levelStore";
import { ReactNode } from "react"
import GameHeader from "./components/GameHeader";
import QuestionCard from "./components/QuestionCard";
import LevelDashboard from "./LevelDashboard";
import CancelLevel from "./components/CancelLevel";
import { Button } from "@/components/ui/button";

type Props = {
    children: ReactNode
}

export default function LevelLayout({ children }: Props) {

    const { levelComplete, nextSample } = useLevelStore();

    if (levelComplete) {
        return <LevelDashboard />
    }
    return (
        <div className="">
            <CancelLevel className="absolute top-5 left-5" />
            <div className="container mx-auto py-8 px-8">
                <div className="max-w-6xl mx-auto">
                    <GameHeader />
                    <Button onClick={nextSample}>Next</Button>
                    <QuestionCard />
                </div>
                {children}
            </div>
        </div>
    )
}