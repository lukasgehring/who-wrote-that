"use client";

import * as React from "react";

import { TypographyH1, TypographyH3 } from "@/components/ui/typography";
import TutorialCarousel from "./TutorialCarousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SkipTutorial } from "./skipTutorial";
import { useRouter } from "next/navigation";


export default function Tutorial() {

    const router = useRouter();

    return (
        <div className="flex flex-col items-center">
            <div className="mb-5 relative w-full">
                <Button variant="outline" className="rounded-full absolute" onClick={() => router.push("/")}><ArrowLeft />Zurück</Button>
                <TypographyH1>Tutorial</TypographyH1>
                <SkipTutorial>
                    <Button variant="outline" className="rounded-full absolute right-0 top-0">Überspringen<ArrowRight /></Button>
                </SkipTutorial>
            </div>
            <TutorialCarousel />
        </div>
    )
}
