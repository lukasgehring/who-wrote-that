"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useGameStore } from "@/stores/gameStore";
import { X } from "lucide-react";

export default function CancelLevel({ className }: { className?: string }) {

    const { backToMenu } = useGameStore();

    return (
        <div className={className}>
            <AlertDialog>
                <AlertDialogTrigger>
                    <X />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>
                        Level abbrechen?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Dein Levelfortschritt geht dabei verloren.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Zurück
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={backToMenu}>
                            Abbrechen
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}