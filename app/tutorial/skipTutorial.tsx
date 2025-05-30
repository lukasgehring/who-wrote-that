"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

type ButtonProps = {
    children: ReactElement;
};

export function SkipTutorial({ children }: ButtonProps) {

    const router = useRouter();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Tutorial Überspringen</DialogTitle>
                    <DialogDescription>
                        Bist du Dir sicher, dass du das Tutorial überspringen willst?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Nein
                        </Button>
                    </DialogClose>
                    <Button type="button" variant="destructive" onClick={() => router.push("/game")}>
                        Ja
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
