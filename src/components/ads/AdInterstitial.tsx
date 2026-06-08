import { motion } from 'framer-motion';
import { useState } from 'react';

interface AdInterstitialProps {
  show: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export default function AdInterstitial({ show, onClose, onComplete }: AdInterstitialProps) {
  const [countdown, setCountdown] = useState(5);

  if (!show) return null;

  // 模拟倒计时
  const startCountdown = () => {
    setCountdown(5);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete?.();
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center"
    >
      <div className="text-center space-y-6">
        <div className="text-4xl animate-pulse">📢</div>
        <p className="text-amber-200 text-lg font-serif">广告时间</p>
        <p className="text-stone-400 text-sm">观看广告支持我们继续提供免费占卜</p>
        <div className="w-48 h-32 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl border border-amber-500/20 flex items-center justify-center">
          <span className="text-amber-500/30 text-sm">广告内容</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => startCountdown()}
            className="bg-amber-500/20 text-amber-300 px-6 py-2 rounded-full text-sm hover:bg-amber-500/30 transition-colors"
          >
            {countdown < 5 ? `${countdown}秒后关闭` : '观看广告'}
          </button>
          <button
            onClick={onClose}
            className="text-stone-500 text-sm hover:text-stone-300 transition-colors"
          >
            跳过
          </button>
        </div>
      </div>
    </motion.div>
  );
}