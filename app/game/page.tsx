"use client";

import { TypographyH1 } from "@/components/ui/typography";
import TextArea from "./textArea";
import SelectionArea from "./selectionArea";

import data from "../../data/essays.json";
import { motion } from "framer-motion";

export default function Game() {

    const idx: number = 0;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <TypographyH1>Game</TypographyH1>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-6 max-w-[800px]">
                <TextArea
                    className="col-span-1 md:col-span-2 h-[150px] bg-gray-100 text-center"
                    title="Aufgabenstellung"
                    text={data[0].question}
                />
                <SelectionArea title="Text 1" text={data[0].llm} isLLM={true} />

                <SelectionArea title="Text 2" text={data[0].human} isLLM={false} />
            </div>
        </motion.div>
    )
}