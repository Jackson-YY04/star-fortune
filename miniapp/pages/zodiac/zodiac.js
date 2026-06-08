const { ZODIAC_SIGNS, generateZodiacResult } = require('../../utils/zodiac');

Page({
  data: {
    signs: [],
    selectedIndex: null,
    loading: false,
    result: null,
    types: [],
    overallFull: 0
  },
  onLoad() {
    const signs = ZODIAC_SIGNS.map((name, i) => {
      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
      return {
        name,
        char: name.charAt(0),
        top: 50 + 44 * Math.sin(angle),
        left: 50 + 44 * Math.cos(angle)
      };
    });
    this.setData({ signs });
  },
  selectSign(e) {
    this.setData({ selectedIndex: parseInt(e.currentTarget.dataset.index) });
  },
  async doFortune() {
    if (this.data.selectedIndex === null) return;
    this.setData({ loading: true });
    await new Promise(r => setTimeout(r, 1200));
    const date = new Date().toISOString().split('T')[0];
    const result = generateZodiacResult(this.data.selectedIndex, date);
    result.overall.text = this.getRandomText(result.overall.score);
    const types = [
      { key: 'love', label: '爱情运势', icon: '💕', full: Math.floor(result.love.score), text: this.getRandomText(result.love.score) },
      { key: 'career', label: '事业运势', icon: '💼', full: Math.floor(result.career.score), text: this.getRandomText(result.career.score) },
      { key: 'health', label: '健康运势', icon: '💪', full: Math.floor(result.health.score), text: this.getRandomText(result.health.score) }
    ];
    this.setData({
      loading: false,
      result,
      types,
      overallFull: Math.floor(result.overall.score)
    });
  },
  getRandomText(score) {
    const good = ['好运连连！', '把握机会，放手去做！', '诸事皆宜！', '能量充沛的一天！', '吉星高照！'];
    const mid = ['保持平常心', '稳扎稳打', '耐心等待', '专注重要之事', '小有波折但无大碍'];
    const bad = ['宜静不宜动', '注意保守行事', '调整心态', '避免重大决策', '注意休息'];
    const pool = score >= 4 ? good : score >= 2.5 ? mid : bad;
    return pool[Math.floor(Math.random() * pool.length)];
  },
  reset() {
    this.setData({ result: null, selectedIndex: null, loading: false });
  }
});