import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import GlowButton from '../components/ui/GlowButton';
import { calculateNumerology, isMasterNumber } from '../utils/numerologyData';
import type { NumerologyResult } from '../types';

export default function Numerology() {
  const [name, setName] = useState('');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    if (!name.trim()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const numResult = calculateNumerology(name, year, month, day);
    setResult(numResult);
    setIsLoading(false);
  };

  const handleReset = () => {
    setResult(null);
  };

  const selectClass = "w-full bg-stone-900 border border-amber-500/20 rounded-lg px-4 py-3 text-amber-200 appearance-none cursor-pointer hover:border-amber-500/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

  return (
    <PageShell title="数秘术" description="计算生命灵数，探索数字的奥秘">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="input"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto space-y-8"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🔢</div>
              <h2 className="text-2xl font-serif font-bold text-amber-200">探索生命数字</h2>
              <p className="text-stone-400 text-sm mt-2">
                数字蕴含着宇宙的秘密，通过你的姓名和生日，揭示属于你的数字密码。
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-amber-200/70 text-sm mb-2">姓名</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入你的姓名"
                  className="w-full bg-stone-900 border border-amber-500/20 rounded-lg px-4 py-3 text-amber-200 placeholder-stone-500 hover:border-amber-500/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-amber-200/70 text-xs mb-2">年份</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className={selectClass}
                  >
                    {Array.from({ length: 100 }, (_, i) => 1950 + i).map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-amber-200/70 text-xs mb-2">月份</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className={selectClass}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-amber-200/70 text-xs mb-2">日期</label>
                  <select
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    className={selectClass}
                  >
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center">
              <GlowButton
                onClick={handleCalculate}
                disabled={!name.trim() || isLoading}
              >
                {isLoading ? '数字计算中...' : '计算灵数'}
              </GlowButton>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-amber-200 to-violet-300 bg-clip-text text-transparent">
                你的数字命运
              </h2>
            </div>

            {/* 主要数字 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {([
                { label: '生命灵数', value: result.lifePath, desc: '核心数字' },
                { label: '命运数', value: result.destiny, desc: '人生使命' },
                { label: '灵魂数字', value: result.soul, desc: '灵性渴望' },
                { label: '个性数字', value: result.personality, desc: '外在表现' }
              ]).map((item) => (
                <div
                  key={item.label}
                  className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/20 rounded-xl p-4 text-center hover:border-amber-500/30 transition-all duration-300"
                >
                  <p className="text-amber-200/60 text-xs mb-2">{item.label}</p>
                  <p className={`text-3xl md:text-4xl font-bold ${
                    isMasterNumber(item.value)
                      ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
                      : 'text-amber-100'
                  }`}>
                    {item.value}
                  </p>
                  {isMasterNumber(item.value) && (
                    <span className="text-xs text-purple-400">大师数</span>
                  )}
                  <p className="text-stone-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 详细解读 */}
            <div className="space-y-4">
              {([
                { title: '生命灵数解读', value: result.lifePathDesc },
                { title: '命运使命解读', value: result.destinyDesc },
                { title: '灵魂渴望解读', value: result.soulDesc }
              ]).map((section) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-amber-200 mb-3">{section.title}</h3>
                  <p className="text-stone-300 leading-relaxed">{section.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center pt-4">
              <GlowButton onClick={handleReset} color="purple">
                重新计算
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}