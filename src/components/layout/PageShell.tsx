import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface PageShellProps {
  title: string;
  children: ReactNode;
  description?: string;
}

export default function PageShell({ title, children, description }: PageShellProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A1A] text-amber-50 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-indigo-900/10 to-transparent"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-amber-500/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-amber-500/10 transition-colors text-amber-300"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-amber-200 to-purple-300 bg-clip-text text-transparent">
              {title}
            </h1>
            {description && (
              <p className="text-amber-200/60 text-sm">{description}</p>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 py-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Decorative element */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
}