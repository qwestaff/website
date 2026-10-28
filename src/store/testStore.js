import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import fkrQuestions from '../data/questions.fkr.json';
import kregerQuestions from '../data/questions.kreger.json';
import sedyhQuestions from '../data/questions.sedyh.json';
import filatovaQuestions from '../data/questions.filatova.json';

const testSources = {
  fkr: fkrQuestions,
  kreger: kregerQuestions,
  sedyh: sedyhQuestions,
  filatova: filatovaQuestions,
};

function getQuestionsBySlug(slug) {
  if (slug === 'all') {
    return [
      ...fkrQuestions,
      ...kregerQuestions,
      ...sedyhQuestions,
      ...filatovaQuestions,
    ].map((q, index) => ({ ...q, id: index + 1 }));
  }
  return testSources[slug] ?? [];
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const useTestStore = create(persist(
  (set, get) => ({
  answers: {},
  sliders: {},
  touchedSliders: new Set(),
  currentIndex: 0,
  questions: [],
  testSlug: null,
  fio: '',
  lastResult: null,

  loadTest: (slug) => {
    const state = get();
    const sameTest = state.testSlug === slug;
    const questions = getQuestionsBySlug(slug);

    let currentIndex = 0;
    if (sameTest && questions.length) {
      currentIndex = Math.min(
        Math.max(state.currentIndex, 0),
        questions.length - 1
      );
    }

    set({
      answers: sameTest ? state.answers : {},
      sliders: sameTest ? state.sliders : {},
      touchedSliders: sameTest ? state.touchedSliders : new Set(),
      currentIndex,
      questions,
      testSlug: slug,
      fio: sameTest ? state.fio : '',
    });
  },

  setAnswer: (id, value) =>
    set((state) => ({ answers: { ...state.answers, [id]: value } })),

  markTouched: (id) =>
    set((state) => {
      if (state.touchedSliders.has(id)) return state;
      const next = new Set(state.touchedSliders);
      next.add(id);
      return { touchedSliders: next };
    }),

  setSlider: (id, value) => {
    get().markTouched(id);
    set((state) => ({
      sliders: { ...state.sliders, [id]: clamp(value, 0, 1) },
    }));
  },

  next: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    })),

  prev: () =>
    set((state) => ({ currentIndex: Math.max(state.currentIndex - 1, 0) })),

  goTo: (index) =>
    set((state) => ({
      currentIndex: clamp(index, 0, state.questions.length - 1),
    })),

  setFio: (value) => set({ fio: value }),

  saveLastResult: () => {
    const { fio, testSlug, answers, sliders, touchedSliders } = get();
    if (!testSlug || !fio) return;
    set({
      lastResult: {
        fio,
        testSlug,
        answers: { ...answers },
        sliders: { ...sliders },
        touchedSliders: [...touchedSliders],
        completedAt: new Date().toISOString(),
      },
    });
  },

  loadLastResult: () => {
    const { lastResult } = get();
    if (!lastResult) return;
    set({
      fio: lastResult.fio,
      testSlug: lastResult.testSlug,
      answers: { ...lastResult.answers },
      sliders: { ...lastResult.sliders },
      touchedSliders: new Set(lastResult.touchedSliders ?? []),
      currentIndex: 0,
      questions: getQuestionsBySlug(lastResult.testSlug),
    });
  },

  reset: () => {
    set({
      answers: {},
      sliders: {},
      touchedSliders: new Set(),
      currentIndex: 0,
      questions: [],
      testSlug: null,
      fio: '',
    });
  },

  getProgress: () => {
    const { answers, sliders, questions } = get();
    if (!questions.length) return 0;
    const answered = questions.filter((q) =>
      q.type === 'choice'
        ? answers[q.id] != null
        : sliders[q.id] != null && sliders[q.id] !== 0.5
    ).length;
    return (answered / questions.length) * 100;
  },
  }),
  {
    name: 'mvpror-test-storage',
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      answers: state.answers,
      sliders: state.sliders,
      touchedSliders: [...state.touchedSliders],
      currentIndex: state.currentIndex,
      testSlug: state.testSlug,
      fio: state.fio,
      lastResult: state.lastResult,
    }),
    merge: (persisted, current) => ({
      ...current,
      ...(persisted || {}),
      touchedSliders: new Set(persisted?.touchedSliders || []),
    }),
  }));
