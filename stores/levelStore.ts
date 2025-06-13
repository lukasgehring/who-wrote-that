"use client";

import { create } from 'zustand';


import level1Data from '../data/level1.json';
import level2Data from '../data/level2.json';
import level3Data from '../data/level3.json';

function getUniqueRandomNumbers(count: number, max: number): number[] {
    if (count > max + 1) {
        throw new Error("Zu viele eindeutige Zahlen angefordert.");
    }

    const numbers = new Set<number>();

    while (numbers.size < count) {
        const rand = Math.floor(Math.random() * (max + 1));
        numbers.add(rand);
    }

    return Array.from(numbers);
}

const TOTAL_SAMPLES: number = 5;

const levelDataMap: Record<string, any> = {
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
    answers: Array<{
        text: string;
        category: string;
    }>;
    startTime: number;
    endTime: number;
    userAnswers: Array<SampleResult>;
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
    sampleId: 0,
    startTime: 0,
    endTime: 0,
    randomSamples: [],
    levelComplete: false,
    isLastSample: false,
    questionText: '',
    questionId: 0,
    answers: [],
    userAnswers: [],
    selectedCategory: '',
    showResults: false,
    isCorrect: false,
    level: '',


    setLevel: (level: string) => set(() => {
        const data = levelDataMap[level];
        const randomSamples = getUniqueRandomNumbers(TOTAL_SAMPLES, data.length) ?? []
        return {
            level: level,
            score: 0,
            sampleId: 0,
            randomSamples: randomSamples,
            levelComplete: false,
            isLastSample: false,
            questionText: data[randomSamples[0]].question,
            questionId: data[randomSamples[0]].id,
            answers: data[randomSamples[0]].answers,
            userAnswers: [],
            selectedCategory: "",
            showResults: false,
            isCorrect: false,
            startTime: Date.now(),
        };
    }),
    setShowResults: (show: boolean) => set(() => {
        return { showResults: show, endTime: Date.now() }
    }),
    selectCategory: (category: string) => set(() => {
        return { selectedCategory: category, isCorrect: category !== "human" }
    }),
    setIsCorrect: (isCorrect: boolean) => set(() => {
        return { isCorrect: isCorrect }
    }),
    nextSample: () => set((state) => {
        const currentData = levelDataMap[state.level];
        const time = (state.endTime - state.startTime) / 1000;

        const answerEntry = {
            correct: state.isCorrect,
            time: time,
            id: state.sampleId
        };

        if (state.sampleId < TOTAL_SAMPLES - 1) {
            const nextSampleId = state.sampleId + 1
            const selectIndex = state.randomSamples[nextSampleId]

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
            }
        }
        return {
            userAnswers: [...state.userAnswers, answerEntry],
            levelComplete: true
        };
    }),
    addScore: (add: number) => set((state) => {

        return {
            score: state.score + add
        }
    }),
    resetGame: () => set((state) => {
        const data = levelDataMap[state.level];
        return {
            score: 0,
            sampleId: 0,
            totalSamples: data.length,
            levelComplete: false,
            isLastSample: false,
            questionText: data[0].question,
            answers: data[0].answers,
            selectedCategory: "",
            showResults: false,
            isCorrect: false,
            userAnswers: [],
            startTime: Date.now(),
        };
    }),
}));