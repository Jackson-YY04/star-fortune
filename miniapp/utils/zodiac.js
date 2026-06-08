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

function getRandomByScore(score) {
  let pool;
  if (score >= 4) pool = FORTUNE_TEXTS.good;
  else if (score >= 2.5) pool = FORTUNE_TEXTS.medium;
  else pool = FORTUNE_TEXTS.bad;
  return pool[Math.floor(Math.random() * pool.length)];
}

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function generateZodiacResult(signIndex, date) {
  const seed = signIndex + date.split('-').reduce((a, c) => a + parseInt(c), 0);
  const rng = () => seededRandom(seed + Math.floor(Date.now() / 86400000));

  return {
    sign: ZODIAC_SIGNS[signIndex],
    date,
    overall: {
      score: Math.round((rng() * 4 + 1) * 10) / 10,
      text: ''
    },
    love: { score: Math.round(rng() * 5 * 10) / 10, text: '' },
    career: { score: Math.round(rng() * 5 * 10) / 10, text: '' },
    health: { score: Math.round(rng() * 5 * 10) / 10, text: '' },
    luckyColor: LUCKY_COLORS[Math.floor(rng() * LUCKY_COLORS.length)],
    luckyNumber: Math.floor(rng() * 36) + 1
  };
}

module.exports = { ZODIAC_SIGNS, generateZodiacResult };