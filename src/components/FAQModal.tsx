import React from 'react';
import { X, Shield, Sparkles, HelpCircle, Lock, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl">
                  🐔
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-heading">
                    About Kozhi Meter & FAQ
                  </h3>
                  <p className="text-xs text-rose-400 font-medium">
                    Malayalam Pop Culture Satire Guide
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto py-6 space-y-6 pr-2 custom-scrollbar text-slate-300 text-sm leading-relaxed">
              
              {/* Question 1 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Smile className="w-4 h-4 text-amber-400" />
                  <span>What is a "Kozhi" or "Vayanokki"?</span>
                </h4>
                <p className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300">
                  In Malayalam slang, <strong className="text-amber-300">"Kozhi"</strong> (literally rooster/chicken) is a lighthearted, playful term for a harmless flirt or charmer. The phrase <strong className="text-rose-300">"vayanokki"</strong> refers to someone who is always playfully eyeing people around (at tea stalls, bus stops, or college fests). It's a beloved staple of Kerala meme culture!
                </p>
              </div>

              {/* Question 2 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>Is this a real personality assessment?</span>
                </h4>
                <p className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Absolutely NOT!</strong> Kozhi Meter is 100% satire and entertainment. The app detects basic visual facial markers (like smile width or eyebrow raise) purely to seed funny Malayalam-English joke titles and randomized score numbers. It has zero scientific or psychological validity.
                </p>
              </div>

              {/* Question 3 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Is my camera photo safe and private?</span>
                </h4>
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs sm:text-sm space-y-2">
                  <p className="text-emerald-400 font-semibold flex items-center space-x-1.5">
                    <Shield className="w-4 h-4" />
                    <span>100% Client-Side Privacy Guarantee</span>
                  </p>
                  <p className="text-slate-300">
                    Your photo is processed locally inside your browser using JavaScript and HTML5 Canvas. No photos are ever uploaded, saved to disk, or transmitted over the internet to any server. When you refresh or close the page, the image memory is instantly cleared.
                  </p>
                </div>
              </div>

              {/* Question 4 */}
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  <span>How do I share my Kozhi Score?</span>
                </h4>
                <p className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300">
                  On the results page, click the <strong className="text-rose-400">"Share / Download Card"</strong> button. The app automatically compiles your photo, score gauge, title, and funny quote into a high-resolution certificate card ready to save or send on WhatsApp, Instagram, or Twitter!
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-semibold text-sm shadow-lg shadow-rose-500/25 transition-all"
              >
                Got It! Back to Kozhi Scanning 🐔
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
