"use client";

import { Button } from "@/components/ui/button";
import TextArea from "./textArea";
import AnswerDialog from "./answerDialog";

type SelectionAreaProps = {
    title: string;
    text: string;
    isLLM: boolean;
}

export default function SelectionArea({ title, text, isLLM }: SelectionAreaProps) {

    return (
        <div className="flex flex-col items-center max-w-[400px]">
            <TextArea
                className="h-[400px]"
                title={title}
                text={text}
            />
            <AnswerDialog isCorrect={isLLM}>
                <Button variant="outline" className="w-full mt-6">Dieser Text ist generiert</Button>
            </AnswerDialog>
        </div>
    )
}