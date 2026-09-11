import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { KozhiTier } from '../data/kozhiTitles';
import { motion } from 'framer-motion';

interface ScoreMeterGaugeProps {
  score: number;
  tier: KozhiTier;
}

export const ScoreMeterGauge: React.FC<ScoreMeterGaugeProps> = ({ score, tier }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1600; // 1.6s gauge count animation
    const steps = 40;
    const stepTime = duration / steps;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);

        // Fire festive party confetti if Kozhi score is > 55
        if (score > 55) {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#f59e0b', '#8b5cf6', '#10b981']
          });
        }
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG Gauge calculations (Arc from 135deg to 405deg = 270deg total arc)
  const radius = 100;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * 0.75; // 270 degrees arc
  const strokeDashoffset = arcLength - (animatedScore / 100) * arcLength;

  return (
    <div className="flex flex-col items-center space-y-4">
      
      {/* SVG Arc Meter */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
        
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
          
          {/* Background Track Arc */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="rgba(30, 41, 59, 0.8)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Animated Value Arc */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            stroke="url(#kozhiGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out filter drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="kozhiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Score Counter Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-0.5"
          >
            <span className="text-5xl sm:text-6xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-100 to-amber-300">
              {animatedScore}%
            </span>
            <p className="text-xs font-bold text-rose-400 tracking-wider uppercase">
              Kozhi Score
            </p>
          </motion.div>
        </div>

      </div>

      {/* Title & Malayalam Rank Badge */}
      <div className="text-center space-y-2 max-w-sm">
        <div className={`inline-block px-4 py-1.5 rounded-full border text-sm font-extrabold shadow-lg ${tier.badgeColor}`}>
          {tier.title}
        </div>
        <p className="text-sm font-semibold text-slate-300">
          {tier.malayalamTitle}
        </p>
      </div>

    </div>
  );
};
