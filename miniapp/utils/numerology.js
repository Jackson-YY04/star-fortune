const DESCRIPTIONS = {
  lifePath: {
    1: '天生领导者，独立自信，创造力强，具有开拓精神，适合创业。',
    2: '天生合作者，善解人意，和平使者，擅长协调关系。',
    3: '天生表达者，才华横溢，乐观开朗，擅长沟通和艺术。',
    4: '天生建设者，稳重踏实，组织能力强，讲究实际。',
    5: '天生自由者，热爱变化，多才多艺，善于传播。',
    6: '天生关怀者，责任感强，温暖善良，重视家庭。',
    7: '天生思想者，智慧深邃，喜欢探索，善于分析。',
    8: '天生权力者，商业头脑，雄心勃勃，追求成就。',
    9: '天生人道主义，博爱宽容，理想主义，富有同情心。',
    11: '灵性导师，直觉敏锐，具有启示性，适合灵性工作。',
    22: '大师建筑师，天生具备成就大事的能力。',
    33: '基督意识，最高级灵性数字，代表无私奉献。'
  },
  destiny: {
    1: '开拓新领域，成为榜样和领导者。',
    2: '促进和谐，化解冲突，带来和平。',
    3: '分享喜悦，用创造力点亮他人生活。',
    4: '建立稳固基础，创造持久价值。',
    5: '推广自由，带动突破和进步。',
    6: '创造美与爱，让社群更温暖。',
    7: '追求真理，探索未知，启发思考。',
    8: '创造丰饶，带领团队成功。',
    9: '完成循环，给予他人帮助。',
    11: '带来灵性启发，点亮心灵道路。',
    22: '将愿景转化为实在成果。',
    33: '用无私的爱唤醒他人神性。'
  },
  soul: {
    1: '渴望独立，通过努力证明自身价值。',
    2: '渴望连接，在关系中找爱与和谐。',
    3: '渴望表达，创意得到展现与欣赏。',
    4: '渴望安全，建立稳定可靠的生活。',
    5: '渴望自由，体验多彩人生。',
    6: '渴望奉献，照顾他人获得满足。',
    7: '渴望智慧，探寻生命奥秘。',
    8: '渴望成就，留下影响力。',
    9: '渴望给予，完成灵魂成长。',
    11: '渴望开悟，灵性不断提升。',
    22: '渴望创造，改变世界的伟大作品。',
    33: '渴望服务，无条件爱众生。'
  }
};

function reduceNumber(num) {
  if (num === 11 || num === 22 || num === 33) return num;
  let sum = 0;
  let n = num;
  while (n > 0) { sum += n % 10; n = Math.floor(n / 10); }
  if (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) return reduceNumber(sum);
  return sum;
}

function getNameValue(name) {
  const map = {
    a:1,j:1,s:1,b:2,k:2,t:2,c:3,l:3,u:3,d:4,m:4,v:4,
    e:5,n:5,w:5,f:6,o:6,x:6,g:7,p:7,y:7,h:8,q:8,z:8,i:9,r:9
  };
  let sum = 0;
  name.toLowerCase().replace(/\s/g, '').split('').forEach(ch => {
    sum += map[ch] || (ch.charCodeAt(0) % 9 + 1);
  });
  return reduceNumber(sum);
}

function calculateNumerology(name, year, month, day) {
  let lifePathNum = 0;
  String(year).split('').forEach(c => lifePathNum += +c);
  String(month).split('').forEach(c => lifePathNum += +c);
  String(day).split('').forEach(c => lifePathNum += +c);
  const lifePath = reduceNumber(lifePathNum);

  const destiny = getNameValue(name);
  const soul = Math.abs(Math.floor(destiny * 1.618) % 9) + 1;
  const personality = (lifePath + destiny) % 9 + 1;

  const getDesc = (num, dict) => {
    if (dict[num]) return dict[num];
    return dict[num % 9 === 0 ? 9 : num % 9] || '独特的你，走独特的道路。';
  };

  return {
    lifePath, destiny, soul, personality,
    lifePathDesc: getDesc(lifePath, DESCRIPTIONS.lifePath),
    destinyDesc: getDesc(destiny, DESCRIPTIONS.destiny),
    soulDesc: getDesc(soul, DESCRIPTIONS.soul)
  };
}

function isMasterNumber(num) {
  return num === 11 || num === 22 || num === 33;
}

module.exports = { calculateNumerology, isMasterNumber };