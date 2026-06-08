import type { NumerologyResult } from '../types';

const LIFE_PATH_DESCRIPTIONS: Record<number, string> = {
  1: '天生领导者，独立自信，创造力强，具有开拓精神，适合创业和领导岗位。',
  2: '天生合作者，善解人意，和平使者，擅长协调关系，适合外交和服务领域。',
  3: '天生表达者，才华横溢，乐观开朗，擅长沟通表达，适合艺术、写作、演讲。',
  4: '天生建设者，稳重踏实，组织能力强，讲究实际，适合管理、工程、建筑。',
  5: '天生自由者，热爱变化，多才多艺，善于传播，适合旅游、传播、销售。',
  6: '天生关怀者，责任感强，温暖善良，重视家庭，适合教育、医疗、艺术。',
  7: '天生思想者，智慧深邃，喜欢探索，善于分析，适合研究、学术、哲学。',
  8: '天生权力者，商业头脑，雄心勃勃，追求成就，适合商业、金融、管理。',
  9: '天生人道主义，博爱宽容，理想主义，富有同情心，适合公益、艺术、治疗。',
  11: '灵性导师，直觉敏锐，具有启示性，适合灵性工作和心理咨询。',
  22: '大师建筑师，天生具备成就大事的能力，能够将梦想变为现实。',
  33: '基督意识，最高级的灵性数字，代表无私奉献和心灵升华。'
};

const DESTINY_DESCRIPTIONS: Record<number, string> = {
  1: '你的使命是开拓新领域，成为榜样和领导者，带领他人走向光明。',
  2: '你的使命是促进和谐，用你的包容和理解化解冲突，带来和平。',
  3: '你的使命是分享喜悦，用你的创造力和表达力点亮他人生活。',
  4: '你的使命是建立稳固基础，用你的踏实和可靠创造持久价值。',
  5: '你的使命是推广自由，用你的多样性和变化带动突破和进步。',
  6: '你的使命是创造美和爱，用你的关怀让家庭和社群更加温暖。',
  7: '你的使命是追求真理，用你的智慧探索未知，启发他人思考。',
  8: '你的使命是掌握权力，在物质世界创造丰饶，带领团队成功。',
  9: '你的使命是完成循环，用你的经验和智慧给予他人帮助。',
  11: '你的使命是带来灵性启发，用直觉点亮他人心灵道路。',
  22: '你的使命是建造大业，将伟大愿景转化为实实在在的成果。',
  33: '你的使命是引导心灵，用无私的爱唤醒他人的神性。'
};

const SOUL_DESCRIPTIONS: Record<number, string> = {
  1: '你的灵魂渴望独立，渴望通过自身努力证明自己的价值。',
  2: '你的灵魂渴望连接，渴望在关系中找到爱与和谐。',
  3: '你的灵魂渴望表达，渴望创意得到展现和欣赏。',
  4: '你的灵魂渴望安全，渴望建立稳定和可靠的生活基础。',
  5: '你的灵魂渴望自由，渴望体验多彩多姿的人生旅程。',
  6: '你的灵魂渴望奉献，渴望通过照顾他人获得满足。',
  7: '你的灵魂渴望智慧，渴望在静默中探寻生命的奥秘。',
  8: '你的灵魂渴望成就，渴望在世上留下影响力和成就。',
  9: '你的灵魂渴望给予，渴望通过分享智慧完成灵魂成长。',
  11: '你的灵魂渴望开悟，渴望在灵性道路上不断提升。',
  22: '你的灵魂渴望创造，渴望创造出改变世界的伟大作品。',
  33: '你的灵魂渴望服务，渴望用无条件的爱服务众生。'
};

// 计算单数字和（降维到个位数，除了11、22、33）
function reduceNumber(num: number): number {
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }
  let sum = 0;
  let n = num;
  while (n > 0) {
    sum += n % 10;
    n = Math.floor(n / 10);
  }
  if (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    return reduceNumber(sum);
  }
  return sum;
}

// 计算姓名中每个字母对应数字
function getAlphabetValue(name: string): number {
  const charMap: Record<string, number> = {
    'a': 1, 'j': 1, 's': 1,
    'b': 2, 'k': 2, 't': 2,
    'c': 3, 'l': 3, 'u': 3,
    'd': 4, 'm': 4, 'v': 4,
    'e': 5, 'n': 5, 'w': 5,
    'f': 6, 'o': 6, 'x': 6,
    'g': 7, 'p': 7, 'y': 7,
    'h': 8, 'q': 8, 'z': 8,
    'i': 9, 'r': 9
  };

  const cleanName = name.toLowerCase().replace(/\s/g, '');
  let sum = 0;
  for (const char of cleanName) {
    if (charMap[char]) {
      sum += charMap[char];
    } else {
      // 中文拼音，按unicode编码简单处理
      sum += char.charCodeAt(0) % 9 + 1;
    }
  }
  return reduceNumber(sum);
}

// 计算生日的生命灵数
export function calculateNumerology(name: string, year: number, month: number, day: number): NumerologyResult {
  // 生命灵数：生日所有数字相加
  let lifePathNum = 0;
  lifePathNum += year.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  lifePathNum += month.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  lifePathNum += day.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  const lifePath = reduceNumber(lifePathNum);

  // 命运数：姓名计算
  const destiny = getAlphabetValue(name);

  // 灵魂冲动数：元音字母计算（简化版）
  const soul = Math.abs(Math.floor(destiny * 1.618) % 9) + 1;

  // 个性数字
  const personality = (lifePath + destiny) % 9 + 1;

  // 获取大师数描述
  const getDescription = (num: number, dict: Record<number, string>): string => {
    if (dict[num]) {
      return dict[num];
    }
    return dict[num % 9 === 0 ? 9 : num % 9] || '独特的你，走独特的道路。';
  };

  return {
    lifePath: lifePath,
    destiny: destiny,
    soul: soul,
    personality: personality,
    lifePathDesc: getDescription(lifePath, LIFE_PATH_DESCRIPTIONS),
    destinyDesc: getDescription(destiny, DESTINY_DESCRIPTIONS),
    soulDesc: getDescription(soul, SOUL_DESCRIPTIONS)
  };
}

export function isMasterNumber(num: number): boolean {
  return num === 11 || num === 22 || num === 33;
}
