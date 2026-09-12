import React, { useState, useEffect } from 'react';
import { FUNNY_LOADING_STEPS } from '../data/kozhiTitles';
import { motion } from 'framer-motion';

interface FaceScanProgressProps {
  imageSrc: string;
  onComplete: () => void;
}

export const FaceScanProgress: React.FC<FaceScanProgressProps> = ({
  imageSrc,
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 3200; // 3.2s fun scan animation
    const intervalTime = 50;
    const totalTicks = totalDuration / intervalTime;
    let ticks = 0;

    const timer = setInterval(() => {
      ticks++;
      const currentPct = Math.min(100, Math.round((ticks / totalTicks) * 100));
      setProgress(currentPct);

      const stepIndex = Math.min(
        FUNNY_LOADING_STEPS.length - 1,
        Math.floor((ticks / totalTicks) * FUNNY_LOADING_STEPS.length)
      );
      setCurrentStepIndex(stepIndex);

      if (ticks >= totalTicks) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6 text-center py-6">
      
      {/* Animated Face Scanner Viewport */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-3xl overflow-hidden border-2 border-rose-500/50 shadow-[0_0_35px_rgba(244,63,94,0.4)] bg-slate-950">
        
        {/* User Image */}
        <img
          src={imageSrc}
          alt="Scanning Face"
          className="w-full h-full object-cover filter contrast-105"
        />

        {/* Dark Scanning Overlay */}
        <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]" />

        {/* Laser Radar Line Animation */}
        <motion.div
          animate={{ y: [0, 260, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-amber-400 shadow-[0_0_15px_#f43f5e] z-10"
        />

        {/* Radar Crosshair Corners */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-rose-400 z-20" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-rose-400 z-20" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-rose-400 z-20" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-rose-400 z-20" />

        {/* Center Target Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-32 h-32 rounded-full border border-dashed border-amber-400/80 animate-spin-slow flex items-center justify-center">
            <span className="text-3xl animate-bounce-soft">🐔</span>
          </div>
        </div>

        {/* Status Badge Tag */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-rose-500/40 px-3 py-1 rounded-full text-[11px] font-bold text-rose-300 z-30 shadow-lg">
          ANALYZING KOZHI SIGNALS...
        </div>

      </div>

      {/* Progress Bar & Humorous Step Text */}
      <div className="space-y-3 px-4">
        
        {/* Malayalam Step Message */}
        <div className="h-10 flex items-center justify-center">
          <motion.p
            key={currentStepIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base font-bold text-amber-300 font-heading"
          >
            {FUNNY_LOADING_STEPS[currentStepIndex]}
          </motion.p>
        </div>

        {/* Outer Progress Bar */}
        <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-600 via-amber-500 to-rose-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Display */}
        <p className="text-xs font-semibold text-slate-400">
          Scan Progress: <span className="text-white font-bold">{progress}%</span>
        </p>

      </div>

    </div>
  );
};
