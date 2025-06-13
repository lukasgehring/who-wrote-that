"use client";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function FontSizeControl() {
    const [disablePlus, setDisablePlus] = useState(false);
    const [disableMinus, setDisableMinus] = useState(false);
    const { fontSize, setFontSize } = useGameStore();

    const handleFontSizeChange = (amount: number) => {
        const newSize = Math.round((fontSize + amount) * 100) / 100;
        if (newSize > 2 || newSize < 0.75) return;
        setFontSize(newSize);
    };

    useEffect(() => {
        setDisablePlus(fontSize >= 2);
        setDisableMinus(fontSize <= 0.75);
    }, [fontSize]);

    return (
        <div className="flex flex-col text-center gap-4 w-5/6 mx-auto">
            <div className="flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleFontSizeChange(0.05)}
                    disabled={disablePlus}
                >
                    <Plus className="w-4 h-4" />
                </Button>

                <span className="text-base w-10 text-center">{fontSize.toFixed(2)}</span>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleFontSizeChange(-0.05)}
                    disabled={disableMinus}
                >
                    <Minus className="w-4 h-4" />
                </Button>
            </div>

            <span
                className="bg-muted px-3 py-2 rounded-xl mx-auto truncate whitespace-nowrap overflow-hidden text-ellipsis text-center  w-4/5 h-[45px] leading-[45px]"
                style={{
                    fontSize: `${fontSize}rem`,
                    width: "80%",
                    height: "45px",
                }}
            >
                Beispieltext zum bestimmen der Schriftgröße
            </span>
        </div>
    );
}
