import React, { useState } from 'react';
import { KozhiAnalysisResult } from '../utils/kozhiScoreEngine';
import { ScoreMeterGauge } from './ScoreMeterGauge';
import { generateShareCard } from '../utils/canvasGenerator';
import { Share2, Download, RotateCcw, ShieldCheck, Sparkles, CheckCircle2, AlertTriangle, Eye, Smile, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultCardProps {
  imageSrc: string;
  result: KozhiAnalysisResult;
  onRetry: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ imageSrc, result, onRetry }) => {
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [generatedCardUrl, setGeneratedCardUrl] = useState<string | null>(null);

  const handleDownloadShareCard = async () => {
    setIsGeneratingCard(true);
    try {
      let cardUrl = generatedCardUrl;
      if (!cardUrl) {
        cardUrl = await generateShareCard(imageSrc, result);
        setGeneratedCardUrl(cardUrl);
      }

      // Download helper
      const link = document.createElement('a');
      link.href = cardUrl;
      link.download = `Kozhi-Meter-Score-${result.score}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Share card generation error:', err);
      alert('Failed to generate share card image. Please try again.');
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const handleWebShare = async () => {
    try {
      let cardUrl = generatedCardUrl;
      if (!cardUrl) {
        cardUrl = await generateShareCard(imageSrc, result);
        setGeneratedCardUrl(cardUrl);
      }

      const res = await fetch(cardUrl);
      const blob = await res.blob();
      const file = new File([blob], `Kozhi-Score-${result.score}.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Kozhi Meter Score 🐔',
          text: `I got ${result.score}% (${result.tier.title}) on Kozhi Meter! Scan your selfie at Kozhi Meter.`,
          files: [file],
        });
      } else {
        handleDownloadShareCard();
      }
    } catch (err) {
      handleDownloadShareCard();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      
      {/* Main Glass Card Container */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Kozhi Glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

        {/* Certificate Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-rose-500/60 shadow-md">
              <img src={imageSrc} alt="User Selfie" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
                Kozhi Certificate 🐔
              </h2>
              <p className="text-xs text-slate-400">
                Verified Satire ID: <span className="text-amber-400 font-mono">{result.checksum}</span>
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-bold border border-rose-500/30">
              {result.timestamp}
            </span>
          </div>
        </div>

        {/* Central Score Meter Gauge */}
        <ScoreMeterGauge score={result.score} tier={result.tier} />

        {/* Tier Description & Funny Quote */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Malayalam Character Analysis (Satire)</span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {result.tier.description}
          </p>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 italic text-xs sm:text-sm text-rose-200 flex items-start space-x-2">
            <span className="text-xl leading-none">“</span>
            <span>{result.funnyQuote}</span>
            <span className="text-xl leading-none">”</span>
          </div>
        </div>

        {/* Playful Detected Face Signals Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>PLAYFUL VISUAL MARKERS (FUN HEURISTICS ONLY)</span>
            <span className="text-emerald-400 text-[11px] font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% On-Device</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <Smile className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">Smile Curvature</p>
              <p className="text-sm font-bold text-white">{result.signals.smileWidth}%</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <Eye className="w-4 h-4 text-rose-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">360° Radar Vision</p>
              <p className="text-sm font-bold text-white">{result.signals.eyeOpenness}%</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <Flame className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">Eyebrow Charm</p>
              <p className="text-sm font-bold text-white">{result.signals.eyebrowRaise}%</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
              <Sparkles className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <p className="text-[10px] text-slate-400">Swagger Tilt</p>
              <p className="text-sm font-bold text-white">{result.signals.faceAngle}%</p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Share & Download Card vs Retry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          
          <button
            onClick={handleWebShare}
            disabled={isGeneratingCard}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-600/25 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {isGeneratingCard ? (
              <span className="animate-pulse">Generating Card...</span>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share / Download Card</span>
              </>
            )}
          </button>

          <button
            onClick={onRetry}
            className="w-full py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>Scan Another Photo</span>
          </button>

        </div>

        {/* Mandatory Visible Satire Disclaimer Under Result */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex items-start space-x-2.5 text-xs text-amber-300/90">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-amber-300 font-semibold">Satire Disclaimer:</strong> Just for fun — not a real personality or character assessment. Kozhi Meter results are generated with client-side playful heuristics.
          </p>
        </div>

      </div>

    </motion.div>
  );
};
