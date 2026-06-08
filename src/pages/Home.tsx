import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ALTARS = [
  { label: '星座占卜', color: '#93c5fd', desc: '探索今日运势', route: '/zodiac', emoji: '🌟' },
  { label: '塔罗牌', color: '#f9a8d4', desc: '三牌揭示命运', route: '/tarot', emoji: '🔮' },
  { label: '四柱推命', color: '#86efac', desc: '推演八字命盘', route: '/bazi', emoji: '🏯' },
  { label: '看手相', color: '#fdba74', desc: '解读掌纹秘密', route: '/palm', emoji: '🖐️' },
  { label: '数秘术', color: '#c4b5fd', desc: '计算生命灵数', route: '/numerology', emoji: '✨' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A1A] flex flex-col items-center justify-center relative overflow-hidden">
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: Math.random() * 2.5 + 0.5 + 'px',
              height: Math.random() * 2.5 + 0.5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
              animationDelay: Math.random() * 4 + 's',
              animationDuration: (Math.random() * 3 + 2) + 's'
            }}
          />
        ))}
      </div>

      {/* 顶部光晕 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-purple-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 z-10"
      >
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-purple-400 bg-clip-text text-transparent tracking-[0.2em]">
          星命回廊
        </h1>
        <p className="mt-3 text-amber-200/40 text-base tracking-wide">选择一种占卜，开启命运之旅</p>
      </motion.div>

      {/* 卡片网格 */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 z-10 px-4 max-w-[900px]">
        {ALTARS.map((altar, i) => (
          <motion.button
            key={altar.route}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(altar.route)}
            className="relative group w-[160px] md:w-[180px] h-[200px] rounded-2xl overflow-hidden transition-shadow duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(26,26,46,0.95), rgba(12,12,24,0.95))',
              border: '1px solid ' + altar.color + '33',
              boxShadow: '0 4px 24px ' + altar.color + '11'
            }}
          >
            {/* 悬停边框发光 */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 30px ' + altar.color + '22, 0 0 40px ' + altar.color + '18' }}
            />

            {/* 顶部色条 */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, transparent, ${altar.color}, transparent)` }}
            />

            {/* 内容 */}
            <div className="relative h-full flex flex-col items-center justify-center gap-4 p-4">
              <span className="text-5xl md:text-6xl transition-transform duration-300 group-hover:scale-110">
                {altar.emoji}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white/90">{altar.label}</h3>
                <p className="text-stone-500 text-xs mt-1">{altar.desc}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 底部 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 text-stone-600 text-sm z-10"
      >
        ✦ 占卜结果仅供娱乐参考 ✦
      </motion.p>
    </div>
  );
}