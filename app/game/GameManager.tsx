"use client";

import { useGameStore } from '@/stores/gameStore'
import GameMenu from './GameMenu';
import { useLevelStore } from '@/stores/levelStore';
import Level1 from './levels/Level1';
import Level2 from './levels/Lavel2';
import Level3 from './levels/Level3';
import Statistics from './statistics/Statistics';

export default function GameManager() {

    const { currentScreen } = useGameStore();
    const { level } = useLevelStore();

    switch (currentScreen) {
        case 'menu':
            return <GameMenu />
        case 'level':
            switch (level) {
                case 'level1':
                    return <Level1 />
                case 'level2':
                    return <Level2 />
                case 'level3':
                    return <Level3 />
                default:
                    return <p>Kein Level ausgewählt</p>
            }
        case 'statistics':
            return <Statistics />
        default:
            return <p>Unbekannter Bildschirm</p>
    }
}

