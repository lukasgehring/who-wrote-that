"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/gameStore";
import { useLevelStore } from "@/stores/levelStore";
import { CheckCircle, XCircle } from "lucide-react";

interface TextCardProps {
    index: number;
    answer: { text: string, category: string };
    handleClick?: () => void;
}

export default function TextCard({ index, answer, handleClick }: TextCardProps) {

    const { selectedCategory, isCorrect, showResults } = useLevelStore();
    const { fontSize, scrollable } = useGameStore();

    const baseStyle = `transition-all duration-300 select-none ${showResults ? isCorrect ? 'bg-green-50 border-green-700' : 'bg-red-50 border-red-700' : ''}`;
    const clickableStyle = `${answer.category === selectedCategory ? "shadow-xl/30" : "bg-muted"} ${!showResults && 'hover:bg-white'}`
    const nonClickableStyle = '';

    const combinedClassName = cn(
        baseStyle,
        handleClick ? clickableStyle : nonClickableStyle
    );

    const categoryLabels: Record<string, string> = {
        human: "Human",
        task: "LLM",
        "improve-human": "Improve-Human",
    };

    return (
        <Card
            key={index}
            className={combinedClassName}
            onClick={handleClick}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <h4 className="font-semibold text-lg">{showResults ? categoryLabels[answer.category] : `Text ${index + 1} `}</h4>
                    {showResults && (
                        <div className="flex items-center gap-2">
                            {isCorrect ?
                                <CheckCircle className="h-6 w-6 text-green-700" /> :
                                <XCircle className="h-6 w-6 text-red-500" />
                            }
                            {!isCorrect && (
                                <Badge variant="destructive" className="text-xs">
                                    Richtig: {categoryLabels[answer.category]}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                <div className="prose prose-sm max-w-none mb-4">
                    <p className={"text-gray-700 leading-relaxed" + (scrollable ? " max-h-150 overflow-auto" : "")} style={{ fontSize: `${fontSize}rem` }}>{answer.text}</p>
                </div>
            </CardContent>
        </Card>
    );
}