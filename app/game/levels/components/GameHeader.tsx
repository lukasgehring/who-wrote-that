"use client";

import { useLevelStore } from "@/stores/levelStore";

export default function GameHeader() {

    const { score, randomSamples, sampleId, level } = useLevelStore();

    const titleMap: Record<string, string> = {
        level1: "Level 1",
        level2: "Level 2",
        level3: "Level 3",
    };

    return (
        < div className="flex justify-between items-center mb-8 text-white" >
            <div>
                <h1 className="text-2xl font-bold">{titleMap[level]}</h1>
                <p className="text-sm">Frage {sampleId + 1} von {randomSamples.length}</p>
            </div>
            <div className="text-right">
                <h2 className="text-xl font-bold">Punkte</h2>
                <p className="text-sm">{score}</p>
            </div>
        </div >
    );
}