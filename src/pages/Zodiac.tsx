import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import GlowButton from '../components/ui/GlowButton';
import StarRating from '../components/ui/StarRating';
import { ZODIAC_LIST, generateZodiacResult } from '../utils/zodiacData';

export default function Zodiac() {
  const [selectedSign, setSelectedSign] = useState<number | null>(null);
  const [result, setResult] = useState<ReturnType<typeof generateZodiacResult> | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFortune = async () => {
    if (selectedSign === null) return;
    setIsLoading(true);
    // 模拟加载动画
    await new Promise(resolve => setTimeout(resolve, 1500));
    const today = new Date().toISOString().split('T')[0];
    const fortune = generateZodiacResult(selectedSign, today);
    setResult(fortune);
    setIsLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setSelectedSign(null);
  };

  return (
    <PageShell title="星座占卜" description="探索今日星座运势，获取专属指引">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold text-amber-200 mb-2">
                选择你的星座
              </h2>
              <p className="text-stone-400">触摸星座符号，连接星空的力量</p>
            </div>

            {/* Constellation Wheel */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* 发光外圈 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/10 to-purple-500/10 blur-xl animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-[spin_reverse_50s_linear_infinite]"></div>
              <div className="absolute inset-2 rounded-full border border-amber-400/20 animate-spin animate-duration-[30s]"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                {ZODIAC_LIST.map((sign, index) => {
                  const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
                  const cx = 50 + 42 * Math.cos(angle);
                  const cy = 50 + 42 * Math.sin(angle);
                  return (
                    <button
                      key={sign}
                      onClick={() => setSelectedSign(index)}
                      className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        selectedSign === index
                          ? 'bg-amber-400 text-black scale-125 shadow-[0_0_20px_rgba(251,191,36,0.6)]'
                          : 'bg-stone-800/80 text-amber-200 hover:bg-amber-500/20 hover:scale-110'
                      }`}
                      style={{
                        top: `${cy}%`,
                        left: `${cx}%`,
                        transform: `translate(-50%, -50%) ${selectedSign === index ? 'scale(1.25)' : 'scale(1)'}`
                      }}
                    >
                      <span className="text-xs md:text-sm">
                        {sign.charAt(0)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <p className="text-amber-200 mb-4">
                {selectedSign !== null
                  ? `已选择：${ZODIAC_LIST[selectedSign]}`
                  : '请点击星盘上的星座'}
              </p>
              <GlowButton onClick={handleFortune} disabled={selectedSign === null || isLoading}>
                {isLoading ? '星盘转动中...' : '开启运势'}
              </GlowButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-2xl mx-auto"
          >
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
                {result.sign}
              </h2>
              <p className="text-stone-400 text-sm">{result.date}</p>
            </div>

            {/* Overall Fortune Card */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-amber-200">综合运势</h3>
                <StarRating score={result.overall.score} />
              </div>
              <p className="text-stone-300 leading-relaxed">{result.overall.text}</p>
            </div>

            {/* Sub Fortunes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['love', 'career', 'health'] as const).map(type => {
                const data = result[type];
                const labels = { love: '爱情运势', career: '事业运势', health: '健康运势' };
                const icons = { love: '💕', career: '💼', health: '💪' };
                return (
                  <div
                    key={type}
                    className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/10 rounded-xl p-4 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{icons[type]}</span>
                      <h4 className="font-bold text-amber-200">{labels[type]}</h4>
                    </div>
                    <StarRating score={data.score} max={5} />
                    <p className="text-stone-400 text-sm mt-2">{data.text}</p>
                  </div>
                );
              })}
            </div>

            {/* Lucky Items */}
            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2 bg-stone-900/50 border border-amber-500/10 rounded-full px-6 py-2">
                <span className="text-stone-400">幸运色：</span>
                <span className="text-amber-300 font-bold">{result.luckyColor}</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-900/50 border border-amber-500/10 rounded-full px-6 py-2">
                <span className="text-stone-400">幸运数字：</span>
                <span className="text-amber-300 font-bold">{result.luckyNumber}</span>
              </div>
            </div>

            <div className="text-center pt-4">
              <GlowButton onClick={handleReset} color="purple">
                再测一次
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}