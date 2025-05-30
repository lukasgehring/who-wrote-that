"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH4 } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";


type TextAreaProps = {
    className?: string;
    title: string;
    text: string;
}

export default function TextArea({ className, text, title }: TextAreaProps) {


    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    <TypographyH4>{title}</TypographyH4>
                    <Separator />
                </CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
                <ScrollArea className="h-full">
                    {text}
                </ScrollArea>
            </CardContent>
        </Card >
    );
}