"use client";

import { create } from 'zustand'
import { SampleResult, useLevelStore } from './levelStore';

export interface LevelScores {
    level: string;
    user: number;
    detector: number;
    samples: SampleResult[];
}

interface GameState {
    currentScreen: 'menu' | 'level' | 'statistics' | 'settings';
    totalScore: number;
    fontSize: number;
    levelScores: Array<LevelScores>;
    lockedLevels: Array<string>;
    scrollable: boolean;
    setScrollable: (value: boolean) => void;
    unlockNextLevel: () => void;
    setLevelScore: (data: LevelScores) => void;
    setFontSize: (fontSize: number) => void;
    setCurrentScreen: (screen: GameState['currentScreen']) => void;
    backToMenu: () => void;
}

export const useGameStore = create<GameState>((set) => ({
    currentScreen: 'menu',
    totalScore: 0,
    fontSize: 1,
    levelScores: [],
    lockedLevels: ['level2', 'level3'],
    scrollable: false,
    setScrollable: (value) => set((state) => {
        return { ...state, scrollable: value }
    }),
    unlockNextLevel: () => set((state) => {
        if (state.lockedLevels.length > 0)
            return { ...state, lockedLevels: state.lockedLevels.slice(1) }
        return state
    }),
    setLevelScore: (data) => set((state) => {
        const updatedScores = [
            ...state.levelScores.filter(score => score.level !== data.level),
            data,
        ];


        updatedScores.sort((a, b) => {
            const aNum = parseInt(a.level.replace(/\D/g, ""));
            const bNum = parseInt(b.level.replace(/\D/g, ""));
            return aNum - bNum;
        });

        const sum = updatedScores.reduce((acc, obj) => acc + obj.user, 0);



        return {
            ...state,
            levelScores: updatedScores,
            totalScore: sum
        };
    }),
    setFontSize: (size) => set({ fontSize: size }),
    setCurrentScreen: (screen) => set({ currentScreen: screen }),
    backToMenu: () => {
        const { resetGame } = useLevelStore.getState();

        set(() => ({
            currentScreen: 'menu',
            currentLevel: null,
        }));

        resetGame();
    },
}))
