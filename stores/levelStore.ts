"use client";

import { create } from "zustand";
import { useGameStore } from "./gameStore";

import level1Data from "../data/level1.json";
import level2Data from "../data/level2.json";
import level3Data from "../data/level3.json";

const TOTAL_SAMPLES = 5;

const levelDataMap: Record<string, any[]> = {
    level1: level1Data,
    level2: level2Data,
    level3: level3Data,
};

export interface SampleResult {
    id: number;
    correct: boolean;
    time: number;
}

interface LevelData {
    score: number;
    level: string;
    sampleId: number;
    randomSamples: number[];
    levelComplete: boolean;
    isLastSample: boolean;
    questionText: string;
    questionId: number;
    answers: Array<{ text: string; category: string }>;
    startTime: number;
    endTime: number;
    userAnswers: SampleResult[];
    showResults: boolean;
    selectedCategory: string;
    isCorrect: boolean;

    setLevel: (level: string) => void;
    setIsCorrect: (isCorrect: boolean) => void;
    setShowResults: (show: boolean) => void;
    selectCategory: (category: string) => void;
    nextSample: () => void;
    addScore: (add: number) => void;
    resetGame: () => void;
}

export const useLevelStore = create<LevelData>((set) => ({
    score: 0,
    level: "",
    sampleId: 0,
    randomSamples: [],
    levelComplete: false,
    isLastSample: false,
    questionText: "",
    questionId: 0,
    answers: [],
    startTime: 0,
    endTime: 0,
    userAnswers: [],
    selectedCategory: "",
    showResults: false,
    isCorrect: false,

    setLevel: (level: string) => {
        const data = levelDataMap[level];
        const total = data.length;

        const {
            initPermutations,
            getCurrentChunk,
            advanceChunk,
        } = useGameStore.getState();

        initPermutations(level, total);
        const currentChunk = getCurrentChunk(level, TOTAL_SAMPLES);

        const first = currentChunk[0];
        set({
            level,
            score: 0,
            sampleId: 0,
            randomSamples: currentChunk,
            levelComplete: false,
            isLastSample: false,
            questionText: data[first].question,
            questionId: data[first].id,
            answers: data[first].answers,
            userAnswers: [],
            selectedCategory: "",
            showResults: false,
            isCorrect: false,
            startTime: Date.now(),
        });

        advanceChunk(level);
    },

    setShowResults: (show: boolean) =>
        set({
            showResults: show,
            endTime: Date.now(),
        }),

    selectCategory: (category: string) =>
        set({
            selectedCategory: category,
            isCorrect: category !== "human",
        }),

    setIsCorrect: (isCorrect: boolean) =>
        set({
            isCorrect,
        }),

    nextSample: () =>
        set((state) => {
            const currentData = levelDataMap[state.level];
            const time = (state.endTime - state.startTime) / 1000;
            const answerEntry: SampleResult = {
                correct: state.isCorrect,
                time,
                id: state.sampleId,
            };

            if (state.sampleId < TOTAL_SAMPLES - 1) {
                const nextSampleId = state.sampleId + 1;
                const selectIndex = state.randomSamples[nextSampleId];

                return {
                    userAnswers: [...state.userAnswers, answerEntry],
                    questionText: currentData[selectIndex].question,
                    questionId: currentData[selectIndex].id,
                    answers: currentData[selectIndex].answers,
                    sampleId: nextSampleId,
                    selectedCategory: "",
                    showResults: false,
                    isCorrect: false,
                    isLastSample: nextSampleId === TOTAL_SAMPLES - 1,
                    startTime: Date.now(),
                };
            }

            return {
                userAnswers: [...state.userAnswers, answerEntry],
                levelComplete: true,
            };
        }),

    addScore: (add: number) =>
        set((state) => ({
            score: state.score + add,
        })),

    resetGame: () =>
        set((state) => {
            const data = levelDataMap[state.level];
            return {
                score: 0,
                sampleId: 0,
                levelComplete: false,
                isLastSample: false,
                questionText: data[state.randomSamples[0]].question,
                questionId: data[state.randomSamples[0]].id,
                answers: data[state.randomSamples[0]].answers,
                selectedCategory: "",
                showResults: false,
                isCorrect: false,
                userAnswers: [],
                startTime: Date.now(),
            };
        }),
}));
