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
import { Frown, PartyPopper } from "lucide-react";
import { ReactElement } from "react";

type CorrectScreenProps = {
    children: ReactElement;
    isCorrect: boolean;
};

export default function AnswerDialog({ children, isCorrect }: CorrectScreenProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isCorrect ?
                            <div className="flex flex-row items-center gap-2">
                                <span>Richtig!</span>
                                <PartyPopper />
                            </div>
                            :
                            <div className="flex flex-row items-center gap-2">
                                <span>Leider falsch...</span>
                                <Frown />
                            </div>
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {isCorrect ?
                            'Du hast den richtigen Text gewählt!'
                            :
                            'Der von Dir gewählte Text ist Menschen-geschrieben.'
                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Weiter
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}