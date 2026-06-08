const TAROT_CARDS = [
  { id: 0, name: 'The Fool', nameCN: '愚人', upright: '新开始、纯真、冒险', reversed: '鲁莽、冒险、犹豫不决' },
  { id: 1, name: 'The Magician', nameCN: '魔术师', upright: '创造力、能力、行动力', reversed: '能力不足、计划失败' },
  { id: 2, name: 'The High Priestess', nameCN: '女祭司', upright: '直觉、潜意识、神秘', reversed: '隐藏秘密、直觉失灵' },
  { id: 3, name: 'The Empress', nameCN: '皇后', upright: '丰饶、美丽、自然', reversed: '依赖、空虚、创造力不足' },
  { id: 4, name: 'The Emperor', nameCN: '皇帝', upright: '权威、秩序、领导力', reversed: '专制、僵化、滥用权力' },
  { id: 5, name: 'The Hierophant', nameCN: '教皇', upright: '传统、信仰、指导', reversed: '不守规矩、新思想' },
  { id: 6, name: 'The Lovers', nameCN: '恋人', upright: '爱情、选择、和谐', reversed: '关系不和、错误选择' },
  { id: 7, name: 'The Chariot', nameCN: '战车', upright: '意志、胜利、掌控', reversed: '失败、失控、被击败' },
  { id: 8, name: 'Strength', nameCN: '力量', upright: '勇气、毅力、信心', reversed: '懦弱、怀疑、缺乏自信' },
  { id: 9, name: 'The Hermit', nameCN: '隐士', upright: '内省、指引、孤独', reversed: '拒绝指导、孤立' },
  { id: 10, name: 'Wheel of Fortune', nameCN: '命运之轮', upright: '命运、机遇、改变', reversed: '坏运气、停滞、抵抗改变' },
  { id: 11, name: 'Justice', nameCN: '正义', upright: '公正、真理、平衡', reversed: '不公、偏见、不平衡' },
  { id: 12, name: 'The Hanged Man', nameCN: '倒吊人', upright: '牺牲、等待、新视角', reversed: '拒绝牺牲、停滞' },
  { id: 13, name: 'Death', nameCN: '死神', upright: '结束、转变、新生', reversed: '抗拒改变、停滞' },
  { id: 14, name: 'Temperance', nameCN: '节制', upright: '平衡、调和、耐心', reversed: '失衡、急躁、冲突' },
  { id: 15, name: 'The Devil', nameCN: '恶魔', upright: '束缚、欲望、物质主义', reversed: '解脱、自由、打破束缚' },
  { id: 16, name: 'The Tower', nameCN: '高塔', upright: '灾难、突变、解放', reversed: '恐惧、灾难推迟' },
  { id: 17, name: 'The Star', nameCN: '星星', upright: '希望、灵感、宁静', reversed: '失望、沮丧、偏离目标' },
  { id: 18, name: 'The Moon', nameCN: '月亮', upright: '直觉、幻想、不确定', reversed: '误解、恐惧、隐藏恐惧' },
  { id: 19, name: 'The Sun', nameCN: '太阳', upright: '快乐、活力、成功', reversed: '阴霾、悲伤、延迟' },
  { id: 20, name: 'Judgement', nameCN: '审判', upright: '觉醒、召唤、重生', reversed: '恐惧、懦弱、拒绝改变' },
  { id: 21, name: 'The World', nameCN: '世界', upright: '完成、圆满、成功', reversed: '不完整、停滞' }
];

const POSITION_NAMES = { past: '过去', present: '现在', future: '未来' };

function drawThreeCards() {
  const positions = ['past', 'present', 'future'];
  const selected = [];
  const available = [...TAROT_CARDS];

  for (let i = 0; i < 3; i++) {
    const idx = Math.floor(Math.random() * available.length);
    const card = available.splice(idx, 1)[0];
    selected.push({
      ...card,
      isReversed: Math.random() > 0.5,
      position: positions[i]
    });
  }
  return selected;
}

module.exports = { TAROT_CARDS, POSITION_NAMES, drawThreeCards };