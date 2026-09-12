import React from 'react';
import { ShieldCheck, HelpCircle, Flame } from 'lucide-react';

interface HeaderProps {
  onOpenFAQ: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFAQ }) => {
  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Logo & Mascot */}
        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-xl sm:text-2xl">
              🐔
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 to-amber-500">
                Kozhi Meter
              </h1>
              <span className="hidden xs:inline-block px-2 py-0.5 text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                SATIRE v1.0
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium hidden sm:block">
              Malayalam Novelty & Flirt Detector • Just for fun!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Client-Side Privacy</span>
          </div>

          <button
            onClick={onOpenFAQ}
            className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all hover:border-rose-500/50 hover:text-white"
            title="About & FAQ"
          >
            <HelpCircle className="w-4 h-4 text-rose-400" />
            <span>About / FAQ</span>
          </button>
        </div>

      </div>
    </header>
  );
};
