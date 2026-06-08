import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import GlowButton from '../components/ui/GlowButton';
import { calculateBazi, YEARS, MONTHS, DAYS, HOURS, getElementLabel, getElementColor } from '../utils/baziData';
import type { BaziResult } from '../types';

export default function Bazi() {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [result, setResult] = useState<BaziResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const bazi = calculateBazi(year, month, day, hour);
    setResult(bazi);
    setIsLoading(false);
  };

  const handleReset = () => {
    setResult(null);
  };

  const selectClass = "w-full bg-stone-900 border border-amber-500/20 rounded-lg px-4 py-3 text-amber-200 appearance-none cursor-pointer hover:border-amber-500/40 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

  return (
    <PageShell title="四柱推命" description="输入生年日月时，推演你的命运命盘">
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
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-serif font-bold text-amber-200">输入生辰八字</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-200/70 text-sm mb-2">出生年份</label>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className={selectClass}
                >
                  {YEARS.map(y => (
                    <option key={y} value={y}>{y}年</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-amber-200/70 text-sm mb-2">出生月份</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className={selectClass}
                >
                  {MONTHS.map(m => (
                    <option key={m} value={m}>{m}月</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-amber-200/70 text-sm mb-2">出生日期</label>
                <select
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className={selectClass}
                >
                  {DAYS.map(d => (
                    <option key={d} value={d}>{d}日</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-amber-200/70 text-sm mb-2">出生时辰</label>
                <select
                  value={hour}
                  onChange={(e) => setHour(Number(e.target.value))}
                  className={selectClass}
                >
                  {HOURS.map(h => (
                    <option key={h} value={h}>{h.toString().padStart(2, '0')}时</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center">
              <GlowButton onClick={handleCalculate} disabled={isLoading}>
                {isLoading ? '天干地支推演中...' : '推演命盘'}
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
              <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-amber-200 to-green-300 bg-clip-text text-transparent">
                四柱命盘
              </h2>
            </div>

            {/* 四柱表格 */}
            <div className="grid grid-cols-4 gap-3">
              {(['year', 'month', 'day', 'hour'] as const).map((pillar) => {
                const labels = { year: '年柱', month: '月柱', day: '日柱', hour: '时柱' };
                const data = result[pillar];
                return (
                  <div
                    key={pillar}
                    className="bg-gradient-to-b from-stone-900 to-stone-950 border border-amber-500/20 rounded-xl p-4 text-center hover:border-amber-500/40 transition-all duration-300"
                  >
                    <p className="text-amber-200/60 text-xs mb-2">{labels[pillar]}</p>
                    <p className="text-2xl font-bold text-amber-100">{data.stem}</p>
                    <p className="text-sm text-stone-400 mt-1">{data.branch}</p>
                  </div>
                );
              })}
            </div>

            {/* 五行统计 */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-200 mb-4">五行分布</h3>
              <div className="space-y-3">
                {Object.entries(result.fiveElements).map(([elem, count]) => (
                  <div key={elem} className="flex items-center gap-3">
                    <span className="w-8 text-sm text-amber-200/70">{getElementLabel(elem)}</span>
                    <div className="flex-1 h-6 bg-stone-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / 8) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: getElementColor(elem) }}
                      />
                    </div>
                    <span className="text-stone-400 text-sm">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 分析 */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-amber-200 mb-3">命盘解析</h3>
              <p className="text-stone-300 leading-relaxed">
                {result.analysis}
              </p>
            </div>

            <div className="text-center pt-4">
              <GlowButton onClick={handleReset} color="purple">
                重排命盘
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}