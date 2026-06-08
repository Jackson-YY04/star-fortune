// 星座运势
export interface ZodiacResult {
  sign: string;
  date: string;
  overall: { score: number; text: string };
  love: { score: number; text: string };
  career: { score: number; text: string };
  health: { score: number; text: string };
  luckyColor: string;
  luckyNumber: number;
}

// 塔罗牌
export interface TarotCard {
  id: number;
  name: string;
  nameCN: string;
  image: string;
  upright: string;
  reversed: string;
  isReversed: boolean;
  position: 'past' | 'present' | 'future';
}

export interface TarotResult {
  cards: TarotCard[];
}

// 四柱推命
export interface BaziResult {
  year: { stem: string; branch: string };
  month: { stem: string; branch: string };
  day: { stem: string; branch: string };
  hour: { stem: string; branch: string };
  fiveElements: { wood: number; fire: number; earth: number; metal: number; water: number };
  analysis: string;
}

// 手相
export interface PalmResult {
  lifeLine: { length: string; meaning: string };
  headLine: { length: string; meaning: string };
  heartLine: { length: string; meaning: string };
  fateLine: { present: boolean; meaning: string };
}

// 数秘术
export interface NumerologyResult {
  lifePath: number;
  destiny: number;
  soul: number;
  personality: number;
  lifePathDesc: string;
  destinyDesc: string;
  soulDesc: string;
}

// 全局状态
export interface FortuneStore {
  currentView: 'scene' | 'zodiac' | 'tarot' | 'bazi' | 'palm' | 'numerology';
  zodiacResult: ZodiacResult | null;
  tarotResult: TarotResult | null;
  baziResult: BaziResult | null;
  palmResult: PalmResult | null;
  numerologyResult: NumerologyResult | null;
  setCurrentView: (view: FortuneStore['currentView']) => void;
  setResult: (type: keyof Omit<FortuneStore, 'currentView' | 'setCurrentView' | 'setResult'>, result: any) => void;
  resetAll: () => void;
}
