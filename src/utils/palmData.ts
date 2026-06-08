import type { PalmResult } from '../types';

const LIFELINE_MEANINGS = {
  long: [
    '生命线深长清晰，生命力旺盛，身体强健，免疫力强，一生健康少病，精力充沛。',
    '生命线深长流畅，元气充足，遗传体质优良，即使遭遇疾病也能快速恢复。'
  ],
  medium: [
    '生命线中等长度，活力尚可，注意保养身体就能保持健康。',
    '生命线略显弯曲，生活节奏需要调整，避免过度劳累。'
  ],
  short: [
    '生命线较短，体质偏弱，需要特别注意养生，规律作息。',
    '生命线断续，体质敏感，需要照顾好情绪和身体，避免过度消耗。'
  ]
};

const HEADLINE_MEANINGS = {
  long: [
    '智慧线长而清晰，思维清晰，判断力强，智商出众，善于思考和规划。',
    '智慧线深长，学习能力强，领悟力快，适合从事脑力工作。'
  ],
  medium: [
    '智慧线长度适中，思维务实，做事稳重，一步一个脚印。',
    '智慧线略有分叉，思维灵活，能够兼顾多方面事务。'
  ],
  short: [
    '智慧线较短，直觉敏锐，行事果断，不拖泥带水，但思考深度不足。',
    '智慧线略显杂乱，思绪容易飘移，需要训练专注力。'
  ]
};

const HEARTLINE_MEANINGS = {
  long: [
    '感情线深长，重感情，人缘好，感情生活丰富，懂得体贴他人。',
    '感情线清晰平直，感情专一，对待爱情认真负责。'
  ],
  medium: [
    '感情线长度适中，情感平衡，理性对待感情关系，不会过度情绪化。',
    '感情线略有分支，情感丰富，有多个社交圈子，人缘不错。'
  ],
  short: [
    '感情线较短，性格独立，不喜欢情感纠缠，内心世界较为封闭。',
    '感情线断断续续，感情经历波折，需要更多耐心经营关系。'
  ]
};

const FATE_LINE = {
  present: [
    '命运线清晰可见，人生方向明确，早年就能找到奋斗目标，成就机会大。',
    '命运线深刻连贯，事业发展稳步推进，贵人相助，能够达成目标。'
  ],
  absent: [
    '命运线不明显，人生道路多变，需要不断探索才能找到方向。',
    '命运线较浅，命运掌握在自己手中，通过努力可以改变人生轨迹。'
  ]
};

function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generatePalmResult(): PalmResult {
  const lengths: ('long' | 'medium' | 'short')[] = ['long', 'medium', 'short'];

  const lifeLength = lengths[Math.floor(Math.random() * 3)] as ('long' | 'medium' | 'short');
  const headLength = lengths[Math.floor(Math.random() * 3)] as ('long' | 'medium' | 'short');
  const heartLength = lengths[Math.floor(Math.random() * 3)] as ('long' | 'medium' | 'short');
  const fatePresent = Math.random() > 0.5;

  return {
    lifeLine: {
      length: lifeLength,
      meaning: getRandomFromArray(LIFELINE_MEANINGS[lifeLength])
    },
    headLine: {
      length: headLength,
      meaning: getRandomFromArray(HEADLINE_MEANINGS[headLength])
    },
    heartLine: {
      length: heartLength,
      meaning: getRandomFromArray(HEARTLINE_MEANINGS[heartLength])
    },
    fateLine: {
      present: fatePresent,
      meaning: fatePresent
        ? getRandomFromArray(FATE_LINE.present)
        : getRandomFromArray(FATE_LINE.absent)
    }
  };
}

export const LINE_LABELS = {
  lifeLine: '生命线',
  headLine: '智慧线',
  heartLine: '感情线',
  fateLine: '命运线'
};
