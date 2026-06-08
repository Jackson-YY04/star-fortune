const { calculateNumerology, isMasterNumber } = require('../../utils/numerology');

Page({
  data: {
    name: '',
    years: Array.from({ length: 100 }, (_, i) => 1950 + i),
    months: Array.from({ length: 12 }, (_, i) => i + 1),
    days: Array.from({ length: 31 }, (_, i) => i + 1),
    yi: 40, mi: 0, di: 0,
    loading: false,
    result: null,
    numbers: [],
    readings: []
  },
  onName(e) { this.setData({ name: e.detail.value }); },
  onYear(e) { this.setData({ yi: parseInt(e.detail.value) }); },
  onMonth(e) { this.setData({ mi: parseInt(e.detail.value) }); },
  onDay(e) { this.setData({ di: parseInt(e.detail.value) }); },
  async calculate() {
    if (!this.data.name.trim()) return;
    this.setData({ loading: true });
    await new Promise(r => setTimeout(r, 1200));
    const result = calculateNumerology(
      this.data.name,
      this.data.years[this.data.yi],
      this.data.months[this.data.mi],
      this.data.days[this.data.di]
    );
    const numbers = [
      { key: 'lifePath', label: '生命灵数', value: result.lifePath, master: isMasterNumber(result.lifePath), desc: '核心数字' },
      { key: 'destiny', label: '命运数', value: result.destiny, master: isMasterNumber(result.destiny), desc: '人生使命' },
      { key: 'soul', label: '灵魂数字', value: result.soul, master: isMasterNumber(result.soul), desc: '灵性渴望' },
      { key: 'personality', label: '个性数字', value: result.personality, master: isMasterNumber(result.personality), desc: '外在表现' }
    ];
    const readings = [
      { title: '生命灵数解读', text: result.lifePathDesc },
      { title: '命运使命解读', text: result.destinyDesc },
      { title: '灵魂渴望解读', text: result.soulDesc }
    ];
    this.setData({ loading: false, result, numbers, readings });
  },
  reset() { this.setData({ result: null, loading: false }); }
});