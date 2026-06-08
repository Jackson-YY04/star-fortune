const { calculateBazi, YEARS, MONTHS, DAYS, HOURS, LABELS, COLORS } = require('../../utils/bazi');

Page({
  data: {
    years: YEARS, months: MONTHS, days: DAYS, hours: HOURS,
    yi: 60, mi: 0, di: 0, hi: 12,
    loading: false,
    result: null,
    elems: []
  },
  onYear(e) { this.setData({ yi: parseInt(e.detail.value) }); },
  onMonth(e) { this.setData({ mi: parseInt(e.detail.value) }); },
  onDay(e) { this.setData({ di: parseInt(e.detail.value) }); },
  onHour(e) { this.setData({ hi: parseInt(e.detail.value) }); },
  async calculate() {
    this.setData({ loading: true });
    await new Promise(r => setTimeout(r, 1200));
    const result = calculateBazi(YEARS[this.data.yi], MONTHS[this.data.mi], DAYS[this.data.di], HOURS[this.data.hi]);
    const elems = Object.entries(result.fiveElements).map(([k, c]) => ({
      key: k, label: LABELS[k], color: COLORS[k], count: c,
      pct: Math.round((c / 8) * 100)
    }));
    this.setData({ loading: false, result, elems });
  },
  reset() { this.setData({ result: null, loading: false }); }
});