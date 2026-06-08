import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdBanner from '../components/ads/AdBanner';

const ALTARS = [
  { label: '星座占卜', color: '#93c5fd', desc: '探索今日运势', route: '/zodiac', emoji: '🌟' },
  { label: '塔罗牌', color: '#f9a8d4', desc: '三牌揭示命运', route: '/tarot', emoji: '🔮' },
  { label: '四柱推命', color: '#86efac', desc: '推演八字命盘', route: '/bazi', emoji: '🏯' },
  { label: '看手相', color: '#fdba74', desc: '解读掌纹秘密', route: '/palm', emoji: '🖐️' },
  { label: '数秘术', color: '#c4b5fd', desc: '计算生命灵数', route: '/numerology', emoji: '✨' },
];

export default function MobileHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A1A] flex flex-col items-center relative overflow-hidden">
      {/* 星空 */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 2 + 0.5 + 'px',
              height: Math.random() * 2 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: Math.random() * 4 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-10 pb-3 px-4 z-10"
      >
        <h1 className="text-3xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-purple-400 bg-clip-text text-transparent tracking-[0.15em]">
          星命回廊
        </h1>
        <p className="mt-1.5 text-amber-200/35 text-xs">选择一种占卜，开启命运之旅</p>
      </motion.div>

      {/* 广告 */}
      <div className="w-full px-4 mb-3 z-10">
        <AdBanner type="banner" />
      </div>

      {/* 卡片 */}
      <div className="grid grid-cols-3 gap-2.5 px-3 z-10 pb-24">
        {ALTARS.map((altar, i) => (
          <motion.button
            key={altar.route}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08 * i, duration: 0.4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(altar.route)}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, rgba(26,26,46,0.95), rgba(12,12,24,0.95))',
              border: '1px solid ' + altar.color + '28',
              width: 'calc((100vw - 44px) / 3)',
              maxWidth: '130px',
              aspectRatio: '1/1.3'
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, transparent, ${altar.color}, transparent)` }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-2">
              <span className="text-3xl">{altar.emoji}</span>
              <span className="text-sm font-bold text-white/85" style={{ color: altar.color }}>{altar.label}</span>
              <span className="text-stone-500 text-[10px]">{altar.desc}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 底部 */}
      <div className="fixed bottom-0 left-0 w-full z-10 pb-3">
        <div className="px-3 mb-2">
          <AdBanner type="reward" />
        </div>
        <p className="text-center text-stone-700 text-[10px]">
          ✦ 占卜结果仅供娱乐参考 ✦
        </p>
      </div>
    </div>
  );
}