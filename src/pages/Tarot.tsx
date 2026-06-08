import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageShell from '../components/layout/PageShell';
import GlowButton from '../components/ui/GlowButton';
import { drawThreeCards, POSITION_NAMES, generateReading } from '../utils/tarotData';
import type { TarotCard } from '../types';

export default function Tarot() {
  const [phase, setPhase] = useState<'intro' | 'shuffling' | 'revealing' | 'done'>('intro');
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [reading, setReading] = useState('');

  const handleShuffle = async () => {
    setPhase('shuffling');
    const drawn = drawThreeCards();
    setCards(drawn);
    setRevealedCount(0);
    setReading('');

    await new Promise(resolve => setTimeout(resolve, 2000));
    setPhase('revealing');

    for (let i = 0; i < 3; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRevealedCount(prev => prev + 1);
    }

    // 生成解读结果
    const result = generateReading(drawn);
    setReading(result);
    setPhase('done');
  };

  const handleReset = () => {
    setPhase('intro');
    setCards([]);
    setRevealedCount(0);
    setReading('');
  };

  return (
    <PageShell title="塔罗牌占卜" description="三牌阵型，揭示过去·现在·未来">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-8"
          >
            <div className="space-y-4">
              <div className="text-8xl animate-bounce">🃏</div>
              <h2 className="text-3xl font-serif font-bold text-amber-200">
                经典三牌阵
              </h2>
              <p className="text-stone-400 max-w-md mx-auto leading-relaxed">
                集中思绪，在心中默念你的问题。三张牌将带你看清过去的影响、现在的处境与未来的指引。
              </p>
            </div>

            <div className="flex justify-center gap-12 py-4">
              {(['past', 'present', 'future'] as const).map((pos) => (
                <div key={pos} className="text-center">
                  <div className="w-16 h-24 bg-gradient-to-b from-purple-900/50 to-indigo-900/50 border border-amber-500/20 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-amber-400/50 text-2xl">★</span>
                  </div>
                  <span className="text-amber-200/70 text-sm">{POSITION_NAMES[pos]}</span>
                </div>
              ))}
            </div>

            <GlowButton onClick={handleShuffle}>
              开始抽牌
            </GlowButton>
          </motion.div>
        )}

        {phase === 'shuffling' && (
          <motion.div
            key="shuffling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center space-y-8 py-12"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  y: [0, -20, 0]
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 2 },
                  y: { repeat: Infinity, duration: 1 }
                }}
                className="w-24 h-36 mx-auto bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl border-2 border-amber-400/50 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              >
                <div className="h-full flex items-center justify-center">
                  <span className="text-4xl">✦</span>
                </div>
              </motion.div>
            </div>
            <p className="text-amber-200 text-lg animate-pulse">牌组正在洗牌中...</p>
            <p className="text-stone-400 text-sm">命运正在选择属于你的牌</p>
          </motion.div>
        )}

        {(phase === 'revealing' || phase === 'done') && (
          <motion.div
            key="revealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* 三张牌 */}
            <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
              {cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={
                    index < revealedCount
                      ? { rotateY: 0, opacity: 1 }
                      : { rotateY: 180, opacity: 0.5 }
                  }
                  transition={{ duration: 0.6 }}
                  className="w-36 md:w-44"
                >
                  {index < revealedCount ? (
                    <div className="bg-gradient-to-br from-stone-900 to-stone-950 border-2 border-amber-500/30 rounded-xl p-4 text-center space-y-3">
                      <div className="text-3xl">
                        {card.isReversed ? '🔄' : '✨'}
                      </div>
                      <h3 className="text-lg font-bold text-amber-200">
                        {card.nameCN}
                      </h3>
                      <p className="text-xs text-amber-400">
                        {card.isReversed ? '逆位' : '正位'}
                      </p>
                      <p className="text-stone-400 text-xs leading-relaxed">
                        {card.isReversed ? card.reversed : card.upright}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-amber-500/20 rounded-xl h-56 flex items-center justify-center">
                      <span className="text-amber-400/60 text-3xl">?</span>
                    </div>
                  )}
                  <div className="text-center mt-2">
                    <span className="text-amber-200/60 text-sm">
                      {POSITION_NAMES[card.position]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 综合解读 */}
            {phase === 'done' && reading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-gradient-to-br from-stone-900/95 to-stone-950/95 border-2 border-amber-500/20 rounded-2xl p-6 md:p-8 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔮</span>
                    <h3 className="text-xl font-bold text-amber-200">占卜结果</h3>
                  </div>

                  {reading.split('\n\n').map((paragraph, i) => {
                    const isTitle = paragraph.startsWith('【');
                    if (isTitle) {
                      return (
                        <h4 key={i} className="text-lg font-bold text-purple-300 mt-2 first:mt-0">
                          {paragraph}
                        </h4>
                      );
                    }
                    // 根据内容给不同段落不同颜色
                    const isPast = paragraph.includes('过去');
                    const isPresent = paragraph.includes('现在');
                    const isFuture = paragraph.includes('未来');
                    let borderColor = 'border-amber-500/15';
                    let bgColor = '';
                    if (isPast) { borderColor = 'border-blue-500/20'; bgColor = 'bg-blue-500/3'; }
                    if (isPresent) { borderColor = 'border-purple-500/20'; bgColor = 'bg-purple-500/3'; }
                    if (isFuture) { borderColor = 'border-green-500/20'; bgColor = 'bg-green-500/3'; }

                    return (
                      <div
                        key={i}
                        className={`border-l-2 pl-4 py-2 rounded-r-lg ${borderColor} ${bgColor}`}
                      >
                        <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                          {paragraph}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <GlowButton onClick={handleReset} color="purple">
                    再测一次
                  </GlowButton>
                  <GlowButton onClick={handleReset}>
                    重新抽牌
                  </GlowButton>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}