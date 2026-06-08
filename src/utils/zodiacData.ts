import type { ZodiacResult } from '../types';

const ZODIAC_SIGNS = [
  '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
  '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
];

const LUCKY_COLORS = ['金色', '紫色', '红色', '蓝色', '绿色', '银色', '粉色', '黑色'];
const FORTUNE_TEXTS = {
  good: [
    '今日运势极佳，诸事皆宜，把握机会放手去做吧！',
    '吉星高照，贵人相助，你的努力将得到回报。',
    '财运亨通，桃花运旺，心情愉快的一天。',
    '灵感迸发，创意源源不断，适合开展新计划。',
    '能量充沛，事事顺遂，好运就在不远处等着你。'
  ],
  medium: [
    '整体平稳，小有波折，保持平常心即可度过。',
    '运势尚可，不宜冒进，稳扎稳打方能进步。',
    '需要耐心等待，时机尚未完全成熟。',
    '一半欢喜一半忧，专注重要之事即可。',
    '运势中等，保持低调，不宜张扬。'
  ],
  bad: [
    '今日宜静不宜动，多思考少行动。',
    '运势稍弱，注意保守，避免重大决策。',
    '需要调整心态，困难只是暂时的。',
    '注意沟通方式，避免误会产生。',
    '身体容易疲劳，注意休息养生。'
  ]
};

function getRandomByScore(score: number): string {
  if (score >= 4) {
    return FORTUNE_TEXTS.good[Math.floor(Math.random() * FORTUNE_TEXTS.good.length)];
  } else if (score >= 2.5) {
    return FORTUNE_TEXTS.medium[Math.floor(Math.random() * FORTUNE_TEXTS.medium.length)];
  } else {
    return FORTUNE_TEXTS.bad[Math.floor(Math.random() * FORTUNE_TEXTS.bad.length)];
  }
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function generateZodiacResult(signIndex: number, date: string): ZodiacResult {
  const seed = signIndex + date.split('-').reduce((acc, curr) => acc + parseInt(curr), 0);
  let rng = () => seededRandom(seed + Math.floor(Date.now() / (1000 * 60 * 60 * 24)));

  const overall = {
    score: Math.round((rng() * 4 + 1) * 10) / 10,
    text: ''
  };
  overall.text = getRandomByScore(overall.score);

  const love = {
    score: Math.round((rng() * 5) * 10) / 10,
    text: ''
  };
  love.text = getRandomByScore(love.score);

  const career = {
    score: Math.round((rng() * 5) * 10) / 10,
    text: ''
  };
  career.text = getRandomByScore(career.score);

  const health = {
    score: Math.round((rng() * 5) * 10) / 10,
    text: ''
  };
  health.text = getRandomByScore(health.score);

  const luckyColor = LUCKY_COLORS[Math.floor(rng() * LUCKY_COLORS.length)];
  const luckyNumber = Math.floor(rng() * 36) + 1;

  return {
    sign: ZODIAC_SIGNS[signIndex],
    date,
    overall,
    love,
    career,
    health,
    luckyColor,
    luckyNumber
  };
}

export const ZODIAC_LIST = ZODIAC_SIGNS;

export const DATE_RANGES = [
  { label: '今日', value: 'today' },
  { label: '明日', value: 'tomorrow' },
  { label: '本周', value: 'week' }
];
