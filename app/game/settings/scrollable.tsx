"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useGameStore } from "@/stores/gameStore";

export default function Scrollable() {

    const { setScrollable, scrollable } = useGameStore();

    return (
        <div className="flex flex-col gap-2 items-center space-x-2">
            <Switch id="airplane-mode" checked={scrollable} onCheckedChange={setScrollable} />
            <Label htmlFor="airplane-mode">Scrollable</Label>
        </div>
    )
}