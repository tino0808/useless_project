import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const PrivacyDisclaimerBanner: React.FC = () => {
  return (
    <div className="w-full bg-slate-900/90 border-y border-rose-500/20 py-2.5 px-4 text-center">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs sm:text-sm">
        
        <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Privacy Guaranteed: Photo stays 100% on your device</span>
        </div>

        <span className="hidden sm:inline text-slate-700">•</span>

        <div className="flex items-center space-x-1.5 text-amber-300/90 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>Just for fun — randomized satire, not a real personality test</span>
        </div>

      </div>
    </div>
  );
};
