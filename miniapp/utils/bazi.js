const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const ELEMENTS = {
  '甲':'wood','乙':'wood','丙':'fire','丁':'fire','戊':'earth','己':'earth',
  '庚':'metal','辛':'metal','壬':'water','癸':'water',
  '子':'water','丑':'earth','寅':'wood','卯':'wood','辰':'earth','巳':'fire',
  '午':'fire','未':'earth','申':'metal','酉':'metal','戌':'earth','亥':'water'
};

const ANALYSIS = {
  balanced: '五行平衡，一生顺遂，性格圆融，待人宽厚，做事稳重。',
  wood: '木气偏旺，性格仁厚，有进取心，创意丰富，但易冲动。',
  fire: '火气偏旺，热情开朗，行动力强，富有创造力，但性情急躁。',
  earth: '土气偏旺，性格稳重，诚实可靠，包容力强，但略显固执。',
  metal: '金气偏旺，性格刚毅，果断勇敢，讲义气，但过于刚强。',
  water: '水气偏旺，聪明机智，适应力强，善变多变，但缺乏恒心。'
};

function calculateBazi(year, month, day, hour) {
  const yearIndex = (year - 1900) % 60;
  const yearStem = STEMS[yearIndex % 10];
  const yearBranch = BRANCHES[yearIndex % 12];

  const monIdx = ((month - 1) + 2) % 12;
  const monthStem = STEMS[((yearIndex % 10) * 2 + monIdx) % 10];
  const monthBranch = BRANCHES[monIdx];

  const dayOffset = Math.floor((year - 1900) * 365.25 + month * 30.4368 + day);
  const dayIdx = dayOffset % 60;
  const dayStem = STEMS[dayIdx % 10];
  const dayBranch = BRANCHES[dayIdx % 12];

  const hrIdx = Math.floor(hour / 2) % 12;
  const hourStem = STEMS[((dayIdx % 10) * 2 + hrIdx) % 10];
  const hourBranch = BRANCHES[hrIdx];

  const elems = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  [yearStem, yearBranch, monthStem, monthBranch, dayStem, dayBranch, hourStem, hourBranch]
    .forEach(s => elems[ELEMENTS[s]]++);

  let result = {
    year: { stem: yearStem, branch: yearBranch },
    month: { stem: monthStem, branch: monthBranch },
    day: { stem: dayStem, branch: dayBranch },
    hour: { stem: hourStem, branch: hourBranch },
    fiveElements: elems,
    analysis: ''
  };

  let maxCount = 0, maxElem = 'wood', total = 0, diff = 0;
  Object.entries(elems).forEach(([k, c]) => {
    total += c;
    if (c > maxCount) { maxCount = c; maxElem = k; }
  });
  Object.values(elems).forEach(c => diff += Math.pow(c - total / 5, 2));

  result.analysis = diff < 0.5 ? ANALYSIS.balanced : ANALYSIS[maxElem];
  return result;
}

const LABELS = { wood: '木', fire: '火', earth: '土', metal: '金', water: '水' };
const COLORS = { wood: '#3b8c2c', fire: '#dc2626', earth: '#92400e', metal: '#78716c', water: '#1e40af' };

module.exports = {
  calculateBazi,
  LABELS, COLORS,
  YEARS: Array.from({ length: 120 }, (_, i) => 1930 + i),
  MONTHS: Array.from({ length: 12 }, (_, i) => i + 1),
  DAYS: Array.from({ length: 31 }, (_, i) => i + 1),
  HOURS: Array.from({ length: 24 }, (_, i) => i)
};