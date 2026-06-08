const MEANINGS = {
  lifeLine: {
    long: '生命线深长清晰，生命力旺盛，身体强健，免疫力强，一生健康少病，精力充沛。',
    medium: '生命线中等长度，活力尚可，注意保养身体就能保持健康。',
    short: '生命线较短，体质偏弱，需要特别注意养生，规律作息。'
  },
  headLine: {
    long: '智慧线长而清晰，思维敏捷，判断力强，善于思考和规划。',
    medium: '智慧线长度适中，思维务实，做事稳重，一步一脚印。',
    short: '智慧线较短，直觉敏锐，行事果断，但思考深度不足。'
  },
  heartLine: {
    long: '感情线深长，重感情，人缘好，感情生活丰富，懂得体贴他人。',
    medium: '感情线长度适中，情感平衡，理性对待感情关系。',
    short: '感情线较短，性格独立，不喜欢情感纠葛，内心世界较封闭。'
  },
  fateLine: {
    present: '命运线清晰可见，人生方向明确，早年就能找到奋斗目标。',
    absent: '命运线不明显，人生道路多变，需要不断探索寻找方向。'
  }
};

const LINE_LABELS = {
  lifeLine: '生命线',
  headLine: '智慧线',
  heartLine: '感情线',
  fateLine: '命运线'
};

function generatePalmResult() {
  const lengths = ['long', 'medium', 'short'];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    lifeLine: { length: pick(lengths), meaning: MEANINGS.lifeLine[pick(lengths)] },
    headLine: { length: pick(lengths), meaning: MEANINGS.headLine[pick(lengths)] },
    heartLine: { length: pick(lengths), meaning: MEANINGS.heartLine[pick(lengths)] },
    fateLine: {
      present: Math.random() > 0.5,
      meaning: Math.random() > 0.5 ? MEANINGS.fateLine.present : MEANINGS.fateLine.absent
    }
  };
}

module.exports = { generatePalmResult, LINE_LABELS };