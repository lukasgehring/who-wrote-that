"use client";

import { useState } from "react";
import TwoTextLevel from "./TwoTextLevel";

import { Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardData, TutorialCarousel } from "@/components/tutorial-carousel/tutorialcarousel";





export default function Level1() {
    const [tutorialDone, setTutorialDone] = useState(false);

    const handleStartGame = () => {
        setTutorialDone(true);
    }

    const slides: CardData[] = [
        {
            title: "Was ist ein LLM-generierter Text?",
            content: (
                <>
                    <p>
                        Ein LLM-generierter Text ist ein Text, der von einem Large Language Model (<strong>LLM</strong>) (z.B. ChatGPT) erzeugt wurde.
                    </p>
                    <p>
                        Ein LLM ist ein künstliches neuronales Netzwerk, das auf sehr vielen Texten trainiert wurde.
                        Die von diesen Modellen erzeugten Texte basieren auf den aus den Trainingstexten gelernten Wort und Satzwahrscheinlichkeiten.

                    </p>
                    <div>
                        <Badge variant="outline">Beispiel: ChatGPT, Claude, Gemini, Llama</Badge>
                    </div>
                </>
            ),
        },
        {
            title: "Warum ist das Erkennen solcher Texte relevant?",
            content: (
                <>
                    <p>
                        KI-Texte finden sich überall, auch in der Bildung.
                    </p>
                    <p>
                        Auch wenn LLMs hier große Chancen für das individuelle Lernen mitsich bringen, können sie auch dazu verwendet werden, ganze Aufgaben ohne Eigenleistung von Schüler*innen und Studierenden erledigen.
                    </p>
                    <p>
                        Aus diesem Grund ist es wichtig, KI-generierte Texte zu erknnen.
                    </p>
                    <p>
                        Wollen wir mal schauen, wie gut <strong>Du</strong> KI-geschriebene Texte von menschlich-geschrieben Texten unterscheiden kannst!
                    </p>
                </>
            ),
        },
        {
            title: "Spielmechanik – So funktioniert es",
            content: (
                <>
                    <p>
                        In jeder Runde erscheinen zwei Texte:
                    </p>
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                        <li>
                            Einer wurde von einem <User className="inline text-gray-700" /> Menschen geschrieben
                        </li>
                        <li>
                            Der andere von einem <Bot className="inline text-gray-500" /> LLM generiert
                        </li>
                    </ul>
                    <p className="mt-2">
                        Deine Aufgabe: <strong>Klicke auf den Text</strong>, den du für <em>KI-generiert</em> hältst.
                    </p>
                    <Button onClick={handleStartGame}>
                        Spiel starten
                    </Button>
                </>
            ),
        },
    ];

    if (tutorialDone)
        return <TwoTextLevel trueLabel="task" />

    return <TutorialCarousel slides={slides} />
}