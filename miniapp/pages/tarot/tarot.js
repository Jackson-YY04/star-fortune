const { drawThreeCards } = require('../../utils/tarot');

Page({
  data: {
    phase: 'intro',
    cards: [],
    revealedCount: 0
  },
  async startShuffle() {
    this.setData({ phase: 'shuffling', cards: [], revealedCount: 0 });
    const cards = drawThreeCards();
    this.setData({ cards });

    await new Promise(r => setTimeout(r, 2000));
    this.setData({ phase: 'revealing' });

    for (let i = 0; i < 3; i++) {
      await new Promise(r => setTimeout(r, 1000));
      this.setData({ revealedCount: i + 1 });
    }
  },
  reset() {
    this.setData({ phase: 'intro', cards: [], revealedCount: 0 });
  }
});