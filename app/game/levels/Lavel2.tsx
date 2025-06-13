"use client";

import { useState } from "react";
import TwoTextLevel from "./TwoTextLevel";
import { Button } from "@/components/ui/button";
import { TutorialCarousel } from "@/components/tutorial-carousel/tutorialcarousel";

export default function Level2() {


    const [tutorialDone, setTutorialDone] = useState(false);

    const handleStartGame = () => {
        setTutorialDone(true);
    };

    const slides = [
        {
            title: "Einfluss der Prompt auf generierten Text",
            content: (
                <>
                    <p>
                        Die Nutzer-Eingabe (engl. <strong>Prompt</strong>) in das LLM hat maßgeblichen Einfluss auf den erzeugten Text
                    </p>
                    <p>
                        Im letzten Level wurden die Texte basierend auf der Aufgabenstellung generiert.
                        In diesem Level wird es schwieriger: Das LLM wurde hier dazu aufgefordert, einen menschen verfassten Text lediglich auf <strong>Grammatik & Rechtschreibung</strong> zu verbessern.
                    </p>
                    <p>
                        Diese Art von <em>korrekturlesen</em> ist somit eine weitere Form, für die LLMs verwendet werden können.
                    </p>
                    <div className="y-space-2">
                        Beispiel:
                        <blockquote className="italic border-l-2 border-gray-300 pl-4 m-2">
                            This is a text with not so good englisch.
                        </blockquote>
                        wird vom LLM verbessert zu
                        <blockquote className="italic border-l-2 border-gray-300 pl-4 m-2">
                            This is a text with not-so-good English.
                        </blockquote>
                    </div>
                </>
            ),
        },
        {
            title: "Kannst du die Texte immernoch unterscheiden?",
            content: (
                <>
                    <p>
                        Du bekommst wieder zwei Texte, wobei einer der <strong>orignale menschliche Text</strong> ist und der andere die <strong>Verbesserung des Textes</strong> durch ein LLM.
                    </p>
                    <p>
                        Deine Aufgabe: Klicke erneut den <em>generierten</em> Text an!
                    </p>
                    <Button onClick={handleStartGame}>
                        Spiel starten
                    </Button>
                </>
            ),
        },
    ];

    if (tutorialDone)
        return <TwoTextLevel trueLabel="improve-human" />

    return <TutorialCarousel slides={slides} />
}