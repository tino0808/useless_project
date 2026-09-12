import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenFAQ: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenFAQ }) => {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Privacy Note */}
        <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-emerald-400 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Your photo never leaves your browser memory. Zero cloud storage or server uploads.</span>
        </div>

        {/* Entertainment Framing Disclaimer */}
        <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
          <strong className="text-slate-400">Disclaimer:</strong> Kozhi Meter is a lighthearted satirical novelty party-trick application. 
          The "Kozhi Score" is generated via a client-side weighted-random algorithm using playful image heuristics. 
          It has <span className="underline decoration-rose-500 decoration-wavy">no scientific or psychological basis</span> and makes zero genuine claims about anyone's personality or character.
        </p>

        {/* Links & Copyright */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-900">
          <button onClick={onOpenFAQ} className="hover:text-rose-400 transition-colors">
            What is a Kozhi? (FAQ)
          </button>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Kerala humor & laughter</span>
          </span>
          <span>•</span>
          <span>Kozhi Meter © 2026</span>
        </div>

      </div>
    </footer>
  );
};
