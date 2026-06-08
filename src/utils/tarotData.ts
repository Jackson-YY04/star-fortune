import type { TarotCard } from '../types';

export const TAROT_CARDS: Omit<TarotCard, 'isReversed' | 'position'>[] = [
  { id: 0, name: 'The Fool', nameCN: '愚人', image: '', upright: '新开始、纯真、冒险', reversed: '鲁莽、冒险、犹豫不决' },
  { id: 1, name: 'The Magician', nameCN: '魔术师', image: '', upright: '创造力、能力、行动力', reversed: '能力不足、计划失败' },
  { id: 2, name: 'The High Priestess', nameCN: '女祭司', image: '', upright: '直觉、潜意识、神秘', reversed: '隐藏秘密、直觉失灵' },
  { id: 3, name: 'The Empress', nameCN: '皇后', image: '', upright: '丰饶、美丽、自然', reversed: '依赖、空虚、创造力不足' },
  { id: 4, name: 'The Emperor', nameCN: '皇帝', image: '', upright: '权威、秩序、领导力', reversed: '专制、僵化、滥用权力' },
  { id: 5, name: 'The Hierophant', nameCN: '教皇', image: '', upright: '传统、信仰、指导', reversed: '不守规矩、新思想' },
  { id: 6, name: 'The Lovers', nameCN: '恋人', image: '', upright: '爱情、选择、和谐', reversed: '关系不和、错误选择' },
  { id: 7, name: 'The Chariot', nameCN: '战车', image: '', upright: '意志、胜利、掌控', reversed: '失败、失控、被击败' },
  { id: 8, name: 'Strength', nameCN: '力量', image: '', upright: '勇气、毅力、信心', reversed: '懦弱、怀疑、缺乏自信' },
  { id: 9, name: 'The Hermit', nameCN: '隐士', image: '', upright: '内省、指引、孤独', reversed: '拒绝指导、孤立' },
  { id: 10, name: 'Wheel of Fortune', nameCN: '命运之轮', image: '', upright: '命运、机遇、改变', reversed: '坏运气、停滞、抵抗改变' },
  { id: 11, name: 'Justice', nameCN: '正义', image: '', upright: '公正、真理、平衡', reversed: '不公、偏见、不平衡' },
  { id: 12, name: 'The Hanged Man', nameCN: '倒吊人', image: '', upright: '牺牲、等待、新视角', reversed: '拒绝牺牲、停滞' },
  { id: 13, name: 'Death', nameCN: '死神', image: '', upright: '结束、转变、新生', reversed: '抗拒改变、停滞' },
  { id: 14, name: 'Temperance', nameCN: '节制', image: '', upright: '平衡、调和、耐心', reversed: '失衡、急躁、冲突' },
  { id: 15, name: 'The Devil', nameCN: '恶魔', image: '', upright: '束缚、欲望、物质主义', reversed: '解脱、自由、打破束缚' },
  { id: 16, name: 'The Tower', nameCN: '高塔', image: '', upright: '灾难、突变、解放', reversed: '恐惧、灾难推迟' },
  { id: 17, name: 'The Star', nameCN: '星星', image: '', upright: '希望、灵感、宁静', reversed: '失望、沮丧、偏离目标' },
  { id: 18, name: 'The Moon', nameCN: '月亮', image: '', upright: '直觉、幻想、不确定', reversed: '误解、恐惧、隐藏恐惧' },
  { id: 19, name: 'The Sun', nameCN: '太阳', image: '', upright: '快乐、活力、成功', reversed: '阴霾、悲伤、延迟' },
  { id: 20, name: 'Judgement', nameCN: '审判', image: '', upright: '觉醒、召唤、重生', reversed: '恐惧、懦弱、拒绝改变' },
  { id: 21, name: 'The World', nameCN: '世界', image: '', upright: '完成、圆满、成功', reversed: '不完整、停滞' }
];

export function drawThreeCards(): TarotCard[] {
  const positions: ('past' | 'present' | 'future')[] = ['past', 'present', 'future'];
  const selected: TarotCard[] = [];
  const available = [...TAROT_CARDS];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    const card = available.splice(randomIndex, 1)[0];
    selected.push({
      ...card,
      isReversed: Math.random() > 0.5,
      position: positions[i]
    });
  }

  return selected;
}

export const POSITION_NAMES = {
  past: '过去',
  present: '现在',
  future: '未来'
};

// 生成综合解读
export function generateReading(cards: TarotCard[]): string {
  const past = cards.find(c => c.position === 'past')!;
  const present = cards.find(c => c.position === 'present')!;
  const future = cards.find(c => c.position === 'future')!;

  const getEnergy = (card: TarotCard) => card.isReversed ? '消极' : '积极';
  const pastEnergy = getEnergy(past);
  const presentEnergy = getEnergy(present);
  const futureEnergy = getEnergy(future);

  // 根据牌的组合生成不同的解读
  const allPositive = pastEnergy === '积极' && presentEnergy === '积极' && futureEnergy === '积极';
  const allNegative = pastEnergy === '消极' && presentEnergy === '消极' && futureEnergy === '消极';

  const readings = [
    `过去，${past.nameCN}（${pastEnergy}）象征着${past.isReversed ? '你曾经历的挑战与考验' : '你积累的智慧与经验'}。${past.isReversed ? '这段经历虽然艰难，却为你的成长埋下了种子。' : '这段经历为你现在的生活奠定了坚实的基础。'}`,

    `现在，${present.nameCN}（${presentEnergy}）代表着你当前的处境。${present.isReversed
      ? '你可能正面临一些困惑或阻力，但这正是重新审视自我的契机。'
      : '你正处于一个充满机遇与能量的阶段，请珍惜当下的每一刻。'}`,

    `未来，${future.nameCN}（${futureEnergy}）预示着${future.isReversed
      ? '前方可能存在不确定性与挑战，需要你保持警惕与耐心。'
      : '美好的转变即将到来，请保持信心与勇气。'}${future.isReversed ? '但请记住，逆位的牌并非厄运，而是提醒你做好准备。' : ''}`
  ];

  let overall = '';
  if (allPositive) {
    overall = '三张牌皆为积极的能量，这是命运的馈赠！整体运势非常乐观，过去、现在、未来形成了一条清晰的上升路径。建议你自信地迈出每一步，宇宙正在为你铺路。';
  } else if (allNegative) {
    overall = '三张牌都呈现逆位，暗示你正经历一段反思与调整的时期。这并非坏事——逆位牌是内在力量的召唤。暂停脚步，审视内心，你将发现真正的方向。';
  } else {
    overall = '三张牌的能-量交织，有光有影，正如人生本身。过去与现在的经历正在塑造一个独特而重要的未来。接纳每一面的自己，平衡内心的力量，你会在波动中找到属于自己的节奏。';
  }

  return `【综合解读】\n\n${overall}\n\n${readings.join('\n\n')}`;
}
