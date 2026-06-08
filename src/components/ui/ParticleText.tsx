import { motion } from 'framer-motion';

interface ParticleTextProps {
  text: string;
  className?: string;
}

export default function ParticleText({ text, className = '' }: ParticleTextProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative inline-block ${className}`}
    >
      <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-purple-400 bg-clip-text text-transparent">
        {text}
      </span>
      <div className="absolute -inset-1 blur-xl bg-gradient-to-r from-amber-400 via-yellow-500 to-purple-500 opacity-20 -z-10 rounded-xl"></div>
    </motion.h2>
  );
}