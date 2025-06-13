"use client";

import { Button } from "@/components/ui/button";
import { useLevelStore } from "@/stores/levelStore";

export default function ActionButton({ checkAnswer }: { checkAnswer: () => void }) {

    const { showResults, selectedCategory, nextSample, isLastSample } = useLevelStore();

    return (
        <div className="flex justify-center gap-4 mt-8">
            {!showResults ? (
                <Button
                    onClick={checkAnswer}
                    disabled={selectedCategory === ""}
                    className="bg-primary hover:bg-gray-700 px-8 py-2"
                >
                    Antworten überprüfen
                </Button>
            ) : (
                <Button
                    onClick={nextSample}
                    className="bg-primary hover:bg-gray-700 px-8 py-2"
                >
                    {isLastSample ? 'Beenden' : 'Nächste Frage'}
                </Button>
            )}
        </div>
    );
}