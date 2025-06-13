"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameStore } from "@/stores/gameStore";
import { useLevelStore } from "@/stores/levelStore";

export default function QuestionCard() {

    const { questionText, questionId } = useLevelStore();
    const { fontSize } = useGameStore();

    return (
        <Card className="mb-8 bg-gradient-to-br from-gray-100 via-white to-gray-200">
            <CardContent className="p-4">
                <CardHeader className="text-center text-gray-600">
                    <CardTitle>Aufgabenstellung</CardTitle>
                </CardHeader>
                <h2 className={`font-semibold mb-4 text-center`} style={{ fontSize: `${fontSize}rem` }}>{questionText}</h2>
            </CardContent>
            <CardFooter className="flex justify-center">
                <CardDescription className="text-sm">
                    ID {questionId}
                </CardDescription>
            </CardFooter>
        </Card>
    );
}