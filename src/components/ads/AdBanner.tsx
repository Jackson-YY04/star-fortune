import { motion } from 'framer-motion';

interface AdBannerProps {
  type: 'banner' | 'reward';
  className?: string;
}

export default function AdBanner({ type, className = '' }: AdBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/20 rounded-xl p-3 text-center ${className}`}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-amber-400/60 text-xs">📢</span>
        <span className="text-amber-300/40 text-xs">
          {type === 'banner' ? '广告位 · 流量主变现' : '激励视频广告 · 解锁更多内容'}
        </span>
      </div>
      <div className="h-8 bg-amber-500/5 rounded-lg mt-2 flex items-center justify-center">
        <span className="text-amber-500/30 text-xs">广告内容区域</span>
      </div>
    </motion.div>
  );
}