"use client";

import { create } from "zustand";
import { SampleResult, useLevelStore } from "./levelStore";

export interface LevelChunkState {
    permutation: number[];
    currentChunkIndex: number;
}

export interface LevelScores {
    level: string;
    user: number;
    detector: number;
    samples: SampleResult[];
}

interface GameState {
    currentScreen: "menu" | "level" | "statistics" | "settings";
    totalScore: number;
    fontSize: number;
    levelScores: LevelScores[];
    lockedLevels: string[];
    levelStartable: Record<string, boolean>;
    scrollable: boolean;

    chunkState: Record<string, LevelChunkState>;

    setScrollable: (value: boolean) => void;
    unlockNextLevel: () => void;
    setLevelStartable: (level: string, startable: boolean) => void;
    setLevelScore: (data: LevelScores) => void;
    setFontSize: (fontSize: number) => void;
    setCurrentScreen: (screen: GameState["currentScreen"]) => void;
    backToMenu: () => void;

    initPermutations: (level: string, totalSamples: number) => void;
    getCurrentChunk: (level: string, chunkSize: number) => number[];
    advanceChunk: (level: string) => void;
}

function shuffleArray(arr: number[]): number[] {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const useGameStore = create<GameState>((set, get) => ({
    currentScreen: "menu",
    totalScore: 0,
    fontSize: 1,
    levelScores: [],
    lockedLevels: ["level2", "level3"],
    levelStartable: {
        level1: true,
        level2: false,
        level3: false,
    },
    scrollable: false,
    chunkState: {},

    setScrollable: (value) => set({ scrollable: value }),

    unlockNextLevel: () =>

        set((state) => {
            if (state.lockedLevels.length > 0) {
                const nextLevel = state.lockedLevels[0];
                return {
                    lockedLevels: state.lockedLevels.slice(1),
                    levelStartable: {
                        ...state.levelStartable,
                        [nextLevel]: true,
                    },
                };
            }
            return state;
        }),

    setLevelStartable: (level, startable) =>
        set((state) => ({
            levelStartable: {
                ...state.levelStartable,
                [level]: startable,
            },
        })),


    setLevelScore: (data) =>
        set((state) => {
            const updatedScores = [
                ...state.levelScores.filter((score) => score.level !== data.level),
                data,
            ];

            updatedScores.sort((a, b) => {
                const aNum = parseInt(a.level.replace(/\D/g, ""));
                const bNum = parseInt(b.level.replace(/\D/g, ""));
                return aNum - bNum;
            });

            const sum = updatedScores.reduce((acc, obj) => acc + obj.user, 0);

            return {
                levelScores: updatedScores,
                totalScore: sum,
            };
        }),

    setFontSize: (size) => set({ fontSize: size }),
    setCurrentScreen: (screen) => set({ currentScreen: screen }),

    backToMenu: () => {
        const { resetGame, level } = useLevelStore.getState();
        const { chunkState, setLevelStartable } = get();

        if (level && chunkState[level]) {
            const state = chunkState[level];
            const totalChunks = Math.ceil(state.permutation.length / 5); // chunkSize = 5
            const isStartable = state.currentChunkIndex < totalChunks;
            setLevelStartable(level, isStartable);
        }

        resetGame();

        set(() => ({
            currentScreen: "menu",
        }));
    },

    initPermutations: (level, totalSamples) =>
        set((state) => {
            if (!state.chunkState[level]) {
                const indices = Array.from({ length: totalSamples }, (_, i) => i);
                return {
                    chunkState: {
                        ...state.chunkState,
                        [level]: {
                            permutation: shuffleArray(indices),
                            currentChunkIndex: 0,
                        },
                    },
                };
            }
            return state;
        }),

    getCurrentChunk: (level, chunkSize) => {
        const { chunkState } = get();
        const state = chunkState[level];

        if (!state) return [];

        const start = state.currentChunkIndex * chunkSize;
        return state.permutation.slice(start, start + chunkSize);
    },

    advanceChunk: (level) =>
        set((state) => {
            const existing = state.chunkState[level];
            if (!existing) return state;
            return {
                chunkState: {
                    ...state.chunkState,
                    [level]: {
                        ...existing,
                        currentChunkIndex: existing.currentChunkIndex + 1,
                    },
                },
            };
        }),
}));
