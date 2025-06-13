"use client";

import TextCard from "./components/TextCard";
import { useLevelStore } from "@/stores/levelStore";
import { useMemo } from "react";
import LevelLayout from "./LevelLayout";
import ActionButton from "./components/ActionButton";

export default function TwoTextLevel({ trueLabel }: { trueLabel: string }) {

    const { answers, showResults, selectCategory, setShowResults, setIsCorrect, selectedCategory, addScore, isCorrect, } = useLevelStore();

    const shuffledAnswers = useMemo(() => {
        return [...answers].sort(() => Math.random() - 0.5);
    }, [answers]);

    const checkAnswer = () => {
        setIsCorrect(selectedCategory === trueLabel)
        addScore(isCorrect ? 1 : 0)
        setShowResults(true)
    }

    function handleClick(category: string) {
        if (!showResults)
            selectCategory(category);
    }

    return (
        <LevelLayout>
            <div className="grid md:grid-cols-2 gap-6">
                {shuffledAnswers.map((answer, index) => (
                    <TextCard answer={answer} index={index} key={index} handleClick={() => handleClick(answer.category)} />
                ))}
            </div>
            <ActionButton checkAnswer={checkAnswer} />
        </LevelLayout>
    );

}