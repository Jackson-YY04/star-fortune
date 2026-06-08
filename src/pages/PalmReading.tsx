import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import GlowButton from '../components/ui/GlowButton';
import { generatePalmResult, LINE_LABELS } from '../utils/palmData';
import type { PalmResult } from '../types';

export default function PalmReading() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<PalmResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const palmResult = generatePalmResult();
    setResult(palmResult);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const lineLabels: Record<string, string> = LINE_LABELS;

  return (
    <PageShell title="拍照看手相" description="上传手掌照片，解读手相线条的秘密">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="capture"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto space-y-8"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">✋</div>
              <h2 className="text-2xl font-serif font-bold text-amber-200">上传手掌照片</h2>
              <p className="text-stone-400 text-sm mt-2">
                请确保手掌纹路清晰可见，光线充足
              </p>
            </div>

            {/* Photo upload area */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              id="palm-photo"
            />

            {!image ? (
              <div className="border-2 border-dashed border-amber-500/30 rounded-2xl p-12 text-center group hover:border-amber-400/60 transition-all duration-300 cursor-pointer"
                   onClick={() => fileInputRef.current?.click()}>
                <div className="relative">
                  {/* Scanner lines */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-32 h-32">
                      <div className="absolute top-0 left-0 w-8 h-[1px] bg-amber-500/50"></div>
                      <div className="absolute top-0 left-0 h-8 w-[1px] bg-amber-500/50"></div>
                      <div className="absolute top-0 right-0 w-8 h-[1px] bg-amber-500/50"></div>
                      <div className="absolute top-0 right-0 h-8 w-[1px] bg-amber-500/50"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-amber-500/50"></div>
                      <div className="absolute bottom-0 left-0 h-8 w-[1px] bg-amber-500/50"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-amber-500/50"></div>
                      <div className="absolute bottom-0 right-0 h-8 w-[1px] bg-amber-500/50"></div>
                    </div>
                  </div>
                  <Camera size={48} className="text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-amber-300 text-lg">点击拍照或从相册选择</p>
                  <p className="text-stone-500 text-sm mt-2">支持 JPG / PNG</p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30">
                  {/* Scanning overlay */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <motion.div
                      animate={{ top: ['5%', '95%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                    />
                    <div className="absolute inset-0 border-2 border-amber-400/20"></div>
                  </div>
                  <img
                    src={image}
                    alt="手掌照片"
                    className="w-full max-h-64 object-cover"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setImage(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="px-4 py-2 text-stone-400 hover:text-amber-300 transition-colors"
                  >
                    重新选择
                  </button>
                  <Upload size={16} className="hidden" />
                </div>
              </motion.div>
            )}

            {image && (
              <div className="text-center">
                <GlowButton onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? 'AI 分析中...' : '开始分析'}
                </GlowButton>
              </div>
            )}
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
              <h2 className="text-3xl font-serif font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                手相解读
              </h2>
            </div>

            <div className="space-y-4">
              {Object.entries(result).map(([key, value]) => {
                const title = lineLabels[key];
                if (!title) return null;
                const isPresent = 'present' in (value as any) ? (value as any).present : true;
                const meaning = (value as any).meaning || '';
                const length = (value as any).length || '';

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * Object.keys(result).indexOf(key) }}
                    className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-amber-200">{title}</h3>
                      {length && (
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          length === 'long' ? 'bg-green-500/20 text-green-300' :
                          length === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {length === 'long' ? '深长' : length === 'medium' ? '中等' : '较短'}
                        </span>
                      )}
                      {'present' in (value as any) && (
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          isPresent ? 'bg-green-500/20 text-green-300' : 'bg-stone-500/20 text-stone-400'
                        }`}>
                          {isPresent ? '清晰可见' : '不明显'}
                        </span>
                      )}
                    </div>
                    <p className="text-stone-300 leading-relaxed">{meaning}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <GlowButton onClick={handleReset} color="purple">
                再看一次
              </GlowButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}