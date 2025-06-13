"use client";

import { useState } from "react";
import SingleTextLevel from "./SingleTextLevel";
import TutorialCarousel from "../tutorial/TutorialCarousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";





export default function Level3() {
    const [tutorialDone, setTutorialDone] = useState(false);

    const handleStartGame = () => {
        setTutorialDone(true);
    }

    const slides = [
        {
            title: "Realitätsnahes Setting",
            content: (
                <>
                    <p>
                        Bisher hattes Du immer zwei Texte nebeneinander, von denen du einen auswählen solltest.
                    </p>
                    <p>
                        In der Realität ist das ganze jedoch deutlich schwieiriger,
                        weil Du nicht aus zwei Texten wählen musst, sondern es für einen einzigen Text bestimmen musst.
                    </p>
                    <p>
                        In dieser Aufgabe sollst du versuchen, für einen einzelen Text festzulegen, ob dieser generiert oder menschlich geschrieben ist.
                        Du kennst ja bereichts schon Texte der Kategoien <Badge variant="outline">Task, Human, Improve-Human</Badge>.
                        In dieser Aufgabe erlauben wir kleine Verbesserungen druch ein LLM, weshalb <Badge variant="outline">Improve-Human</Badge>
                        jetzt zum <Badge variant="outline">Human</Badge> Label gezählt wird.
                    </p>
                    <p>Deine Aufgabe: Bestimmt, ob ein gegebener Text <em>menschlich</em> oder <em>generiert</em> ist.</p>
                    <Button onClick={handleStartGame}>
                        Spiel starten
                    </Button>
                </>
            ),
        },
    ];

    if (tutorialDone)
        return <SingleTextLevel />

    return <TutorialCarousel slides={slides} />
}