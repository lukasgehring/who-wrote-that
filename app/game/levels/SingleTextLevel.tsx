import { useMemo } from "react";
import TextCard from "./components/TextCard";
import LevelLayout from "./LevelLayout";
import { Button } from "@/components/ui/button";
import { useLevelStore } from "@/stores/levelStore";
import ActionButton from "./components/ActionButton";

export default function SingleTextLevel() {

    const { answers, showResults, setShowResults, selectCategory, selectedCategory, setIsCorrect, addScore } = useLevelStore();

    const shuffledAnswers = useMemo(() => {
        return [...answers].sort(() => Math.random() - 0.5);
    }, [answers]);

    const checkAnswer = () => {
        const isCorrect = (["human", "improve-human"].includes(shuffledAnswers[0].category) && selectedCategory === "human") || shuffledAnswers[0].category === selectedCategory;
        setIsCorrect(isCorrect);

        addScore(isCorrect ? 1 : 0)
        setShowResults(true)
    }

    function handleClick(category: string) {
        if (!showResults)
            selectCategory(category);
    }

    return (
        <LevelLayout>
            <div>
                <TextCard answer={shuffledAnswers[0]} index={0} />
                <div className="flex justify-center gap-4 mt-3">
                    <Button variant="outline" className={selectedCategory === "task" ? "bg-muted" : "bg-white"} onClick={() => handleClick("task")}>
                        Task
                    </Button>
                    <Button variant="outline" className={selectedCategory === "human" ? "bg-muted" : "bg-white"} onClick={() => handleClick("human")}>
                        Human
                    </Button>
                </div>
            </div>
            <ActionButton checkAnswer={checkAnswer} />

        </LevelLayout>
    )
}