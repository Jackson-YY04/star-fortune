import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  onClick: () => void;
  children: ReactNode;
  color?: 'amber' | 'purple' | 'blue';
  disabled?: boolean;
  className?: string;
}

export default function GlowButton({
  onClick,
  children,
  color = 'amber',
  disabled = false,
  className = ''
}: GlowButtonProps) {
  const colorClasses = {
    amber: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 shadow-[0_0_20px_rgba(217,119,6,0.5)]',
    purple: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(124,58,237,0.5)]',
    blue: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(14,165,233,0.5)]'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${colorClasses[color]} ${className}`}
    >
      {children}
    </motion.button>
  );
}