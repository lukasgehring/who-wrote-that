"use client";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import React from "react";
import { TypographyH3 } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";

interface TutorialCarouselProps {
    slides: Array<{ title: string, content: React.ReactNode }>

}

export default function TutorialCarousel({ slides }: TutorialCarouselProps) {

    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(1);

    React.useEffect(() => {
        if (api) {
            api.on("select", () => {
                setCurrent(api.selectedScrollSnap() + 1)
            })
        }
    }, [api])

    return (
        <div className="flex flex-col items-center">
            <Carousel className="w-full max-w-xl" setApi={setApi}>
                <CarouselContent>
                    {slides.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card className="h-[50vh] w-full">
                                    <CardHeader>
                                        <CardTitle>
                                            <TypographyH3>{slide.title}</TypographyH3>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
                                        {slide.content}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex flex-col items-center text-muted-foreground py-2 text-center text-sm">
                <Progress value={100 / slides.length * current} className="w-full fg-white" />
                Seite {current} von {slides.length}

            </div>
        </div>
    )
}