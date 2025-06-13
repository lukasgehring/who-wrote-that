"use client";

import FontSizeControl from "./fontSize";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Scrollable from "./scrollable";

interface SettingsProps {
    triggerButton: React.ReactElement;
}

export default function Settings({ triggerButton }: SettingsProps) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {triggerButton}
            </DialogTrigger>

            <DialogContent className="p-4 space-y-4 flex flex-col items-center max-w-lg">
                <DialogHeader>
                    <DialogTitle>Einstellungen</DialogTitle>
                    <DialogDescription>
                        Text
                    </DialogDescription>
                </DialogHeader>
                <FontSizeControl />
                <Scrollable />
            </DialogContent>
        </Dialog>
    )
}