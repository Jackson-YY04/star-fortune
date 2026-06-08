const { generatePalmResult, LINE_LABELS } = require('../../utils/palm');

Page({
  data: {
    image: '',
    analyzing: false,
    result: null,
    lines: []
  },
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => this.setData({ image: res.tempFilePaths[0] })
    });
  },
  async analyze() {
    this.setData({ analyzing: true });
    await new Promise(r => setTimeout(r, 1800));
    const result = generatePalmResult();
    const lines = Object.entries(result).map(([key, val]) => {
      const label = LINE_LABELS[key];
      if (!label) return null;
      if (key === 'fateLine') {
        return {
          key, name: label,
          meaning: val.meaning,
          badgeText: val.present ? '清晰可见' : '不明显',
          badgeColor: val.present ? 'yes' : 'no'
        };
      }
      return {
        key, name: label,
        meaning: val.meaning,
        badgeText: val.length === 'long' ? '深长' : val.length === 'medium' ? '中等' : '较短',
        badgeColor: val.length
      };
    }).filter(Boolean);
    this.setData({ analyzing: false, result, lines });
  },
  reset() { this.setData({ result: null, image: '', analyzing: false }); }
});