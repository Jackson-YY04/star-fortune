import type { BaziResult } from '../types';

const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const FIVE_ELEMENTS: Record<string, 'wood' | 'fire' | 'earth' | 'metal' | 'water'> = {
  '甲': 'wood', '乙': 'wood',
  '丙': 'fire', '丁': 'fire',
  '戊': 'earth', '己': 'earth',
  '庚': 'metal', '辛': 'metal',
  '壬': 'water', '癸': 'water',
  '子': 'water', '丑': 'earth', '寅': 'wood', '卯': 'wood',
  '辰': 'earth', '巳': 'fire', '午': 'fire', '未': 'earth',
  '申': 'metal', '酉': 'metal', '戌': 'earth', '亥': 'water'
};

const ANALYSIS_TEMPLATES = {
  balanced: [
    '五行平衡，一生顺遂，性格圆融，待人宽厚，做事稳重。',
    '五行流通，气机顺畅，身体康健，智慧通达，凡事得心应手。'
  ],
  woodStrong: [
    '木气偏旺，性格仁厚，有进取心，创意丰富，但易冲动。',
    '木主仁德，身材挺拔，思维敏捷，肝胆疏泄条畅，但需注意克制脾气。'
  ],
  fireStrong: [
    '火气偏旺，热情开朗，行动力强，富有创造力，但性情急躁。',
    '火主礼，面色红润，精力充沛，热情有礼，但需注意心脏保养。'
  ],
  earthStrong: [
    '土气偏旺，性格稳重，诚实可靠，包容力强，但略显固执。',
    '土主信，为人忠厚，脾胃强健，重信守诺，但需避免过于保守。'
  ],
  metalStrong: [
    '金气偏旺，性格刚毅，果断勇敢，讲义气，但过于刚强。',
    '金主义，为人仗义，筋骨强健，富有决断力，但需避免过于刻薄。'
  ],
  waterStrong: [
    '水气偏旺，聪明机智，适应力强，善变多变，但缺乏恒心。',
    '水主智，智谋深远，肾水充足，应变能力强，但需注意定力培养。'
  ]
};

// 简易计算，非精确算法，用于演示
export function calculateBazi(year: number, month: number, day: number, hour: number): BaziResult {
  // 使用年循环计算天干地支，简化算法
  const yearIndex = (year - 1900) % 60;
  const yearStemIndex = yearIndex % 10;
  const yearBranchIndex = yearIndex % 12;

  // 正月建寅
  const monthIndex = ((month - 1) + 2) % 12;
  const monthStemIndex = ((yearStemIndex * 2 + monthIndex) % 10);
  const monthBranchIndex = monthIndex;

  // 简化计算日干支
  const dayOffset = Math.floor((year - 1900) * 365.25 + (month * 30.4368) + day);
  const dayIndex = dayOffset % 60;
  const dayStemIndex = dayIndex % 10;
  const dayBranchIndex = dayIndex % 12;

  // 时辰计算
  const hourIndex = Math.floor(hour / 2) % 12;
  const hourStemIndex = ((dayStemIndex * 2 + hourIndex) % 10);
  const hourBranchIndex = hourIndex;

  const result: BaziResult = {
    year: { stem: HEAVENLY_STEMS[yearStemIndex], branch: EARTHLY_BRANCHES[yearBranchIndex] },
    month: { stem: HEAVENLY_STEMS[monthStemIndex], branch: EARTHLY_BRANCHES[monthBranchIndex] },
    day: { stem: HEAVENLY_STEMS[dayStemIndex], branch: EARTHLY_BRANCHES[dayBranchIndex] },
    hour: { stem: HEAVENLY_STEMS[hourStemIndex], branch: EARTHLY_BRANCHES[hourBranchIndex] },
    fiveElements: { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 },
    analysis: ''
  };

  // 统计五行数量
  const allStems = [
    result.year.stem, result.year.branch,
    result.month.stem, result.month.branch,
    result.day.stem, result.day.branch,
    result.hour.stem, result.hour.branch
  ];

  allStems.forEach(s => {
    const elem = FIVE_ELEMENTS[s];
    result.fiveElements[elem]++;
  });

  // 生成分析
  let maxCount = 0;
  let maxElement: keyof BaziResult['fiveElements'] | null = null;
  let total = 0;
  let diff = 0;

  Object.entries(result.fiveElements).forEach(([key, count]) => {
    total += count;
    if (count > maxCount) {
      maxCount = count;
      maxElement = key as any;
    }
  });

  // 计算方差
  Object.values(result.fiveElements).forEach(count => {
    diff += Math.pow(count - total / 5, 2);
  });

  const variance = diff / 5;

  if (variance < 0.5) {
    result.analysis = ANALYSIS_TEMPLATES.balanced[Math.floor(Math.random() * ANALYSIS_TEMPLATES.balanced.length)];
  } else {
    switch (maxElement) {
      case 'wood':
        result.analysis = ANALYSIS_TEMPLATES.woodStrong[Math.floor(Math.random() * ANALYSIS_TEMPLATES.woodStrong.length)];
        break;
      case 'fire':
        result.analysis = ANALYSIS_TEMPLATES.fireStrong[Math.floor(Math.random() * ANALYSIS_TEMPLATES.fireStrong.length)];
        break;
      case 'earth':
        result.analysis = ANALYSIS_TEMPLATES.earthStrong[Math.floor(Math.random() * ANALYSIS_TEMPLATES.earthStrong.length)];
        break;
      case 'metal':
        result.analysis = ANALYSIS_TEMPLATES.metalStrong[Math.floor(Math.random() * ANALYSIS_TEMPLATES.metalStrong.length)];
        break;
      case 'water':
        result.analysis = ANALYSIS_TEMPLATES.waterStrong[Math.floor(Math.random() * ANALYSIS_TEMPLATES.waterStrong.length)];
        break;
    }
  }

  return result;
}

export function getElementLabel(elem: string): string {
  const labels: Record<string, string> = {
    wood: '木',
    fire: '火',
    earth: '土',
    metal: '金',
    water: '水'
  };
  return labels[elem] || elem;
}

export function getElementColor(elem: string): string {
  const colors: Record<string, string> = {
    wood: '#3b8c2c',
    fire: '#dc2626',
    earth: '#92400e',
    metal: '#78716c',
    water: '#1e40af'
  };
  return colors[elem] || '#000000';
}

export const YEARS = Array.from({ length: 120 }, (_, i) => 1930 + i);
export const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
export const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
export const HOURS = Array.from({ length: 24 }, (_, i) => i);
