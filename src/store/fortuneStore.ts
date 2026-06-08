import { create } from 'zustand';
import type { FortuneStore, ZodiacResult, TarotResult, BaziResult, PalmResult, NumerologyResult } from '../types';

export const useFortuneStore = create<FortuneStore>((set) => ({
  currentView: 'scene',
  zodiacResult: null,
  tarotResult: null,
  baziResult: null,
  palmResult: null,
  numerologyResult: null,
  setCurrentView: (view) => set({ currentView: view }),
  setResult: (type, result) => {
    switch (type) {
      case 'zodiacResult':
        set({ zodiacResult: result as ZodiacResult });
        break;
      case 'tarotResult':
        set({ tarotResult: result as TarotResult });
        break;
      case 'baziResult':
        set({ baziResult: result as BaziResult });
        break;
      case 'palmResult':
        set({ palmResult: result as PalmResult });
        break;
      case 'numerologyResult':
        set({ numerologyResult: result as NumerologyResult });
        break;
    }
  },
  resetAll: () => set({
    zodiacResult: null,
    tarotResult: null,
    baziResult: null,
    palmResult: null,
    numerologyResult: null
  })
}));