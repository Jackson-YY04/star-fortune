Page({
  data: {
    altars: [
      { label: '星座占卜', icon: '♈', color: '#93c5fd', desc: '今日运势', route: '/pages/zodiac/zodiac' },
      { label: '塔罗牌', icon: '🃏', color: '#f9a8d4', desc: '三牌阵型', route: '/pages/tarot/tarot' },
      { label: '四柱推命', icon: '📅', color: '#86efac', desc: '八字命盘', route: '/pages/bazi/bazi' },
      { label: '看手相', icon: '✋', color: '#fdba74', desc: '掌纹解读', route: '/pages/palm/palm' },
      { label: '数秘术', icon: '🔢', color: '#c4b5fd', desc: '生命灵数', route: '/pages/numerology/numerology' }
    ],
    stars: []
  },

  onReady() {
    this.drawStarCanvas();
  },

  drawStarCanvas() {
    const query = wx.createSelectorQuery();
    query.select('#starCanvas').fields({ node: true, size: true }).exec((res) => {
      if (!res[0]) return;
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      const dpr = wx.getWindowInfo().pixelRatio;
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);

      const W = res[0].width;
      const H = res[0].height;

      // 生成星星
      const stars = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 2 + 0.5,
          alpha: Math.random(),
          speed: Math.random() * 0.3 + 0.1,
          dx: (Math.random() - 0.5) * 0.4
        });
      }

      const draw = () => {
        ctx.clearRect(0, 0, W, H);

        // 背景渐变
        const bg = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W);
        bg.addColorStop(0, 'rgba(30, 30, 80, 0.3)');
        bg.addColorStop(1, 'rgba(10, 10, 26, 1)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // 中心光晕
        const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.4);
        glow.addColorStop(0, 'rgba(212, 168, 67, 0.08)');
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, H);

        // 5个轨道行星
        for (let a = 0; a < 5; a++) {
          const angle = (a / 5) * Math.PI * 2 + Date.now() / 8000;
          const radius = W * 0.18;
          const cx = W / 2 + Math.cos(angle) * radius;
          const cy = H * 0.55 + Math.sin(angle) * radius * 0.6;

          // 轨道
          ctx.beginPath();
          ctx.ellipse(W / 2, H * 0.55, radius, radius * 0.6, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.05)';
          ctx.stroke();

          const colors = ['#93c5fd', '#f9a8d4', '#86efac', '#fdba74', '#c4b5fd'];
          // 行星
          ctx.beginPath();
          ctx.arc(cx, cy, 8, 0, Math.PI * 2);
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
          g.addColorStop(0, 'white');
          g.addColorStop(0.4, colors[a]);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.fill();

          // 发光环
          ctx.beginPath();
          ctx.arc(cx, cy, 16, 0, Math.PI * 2);
          ctx.fillStyle = colors[a].replace(')', ',0.15)').replace('rgb', 'rgba');
          ctx.fill();
        }

        // 星星
        stars.forEach(s => {
          s.alpha += s.speed * 0.01;
          if (s.alpha > 1) { s.alpha = 0; s.x = Math.random() * W; s.y = Math.random() * H; }
          s.x += s.dx;
          if (s.x < 0) s.x = W;
          if (s.x > W) s.x = 0;

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
          ctx.fill();
        });

        this.animFrame = canvas.requestAnimationFrame(draw);
      };
      draw();
    });
  },

  navigateTo(e) {
    wx.navigateTo({ url: e.currentTarget.dataset.route });
  },

  onUnload() {
    if (this.animFrame) {
      // 清理动画
    }
  }
});