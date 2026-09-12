import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrivacyDisclaimerBanner } from './components/PrivacyDisclaimerBanner';
import { FAQModal } from './components/FAQModal';
import { CameraModal } from './components/CameraModal';
import { FileUploadZone } from './components/FileUploadZone';
import { FaceScanProgress } from './components/FaceScanProgress';
import { ResultCard } from './components/ResultCard';
import { detectFaceSignals } from './utils/faceDetector';
import { calculateKozhiScore, KozhiAnalysisResult } from './utils/kozhiScoreEngine';
import { ShieldCheck, Sparkles, Flame, Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function App() {
  const [step, setStep] = useState<'landing' | 'scanning' | 'result'>('landing');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<KozhiAnalysisResult | null>(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  // Handle image selected from file drop or sample photo
  const handleImageSelected = useCallback(async (imageDataUrl: string) => {
    setSelectedImage(imageDataUrl);
    setStep('scanning');

    // Run client-side face detection & score generator in background
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = async () => {
      const signals = await detectFaceSignals(img);
      const result = calculateKozhiScore(signals, imageDataUrl.slice(-100));
      setAnalysisResult(result);
    };
  }, []);

  // When scan progress completes 3-second animation
  const handleScanAnimationComplete = useCallback(() => {
    setStep('result');
  }, []);

  // Reset to landing view
  const handleRetry = useCallback(() => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setStep('landing');
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 bg-radial-gradient text-slate-100">
      
      {/* Header Bar */}
      <Header onOpenFAQ={() => setIsFAQOpen(true)} />

      {/* Top Privacy & Satire Disclaimer Banner */}
      <PrivacyDisclaimerBanner />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col items-center justify-center">
        
        {/* Step 1: Landing View */}
        {step === 'landing' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 text-center"
          >
            {/* Hero Mascot & Title Banner */}
            <div className="space-y-4 max-w-2xl mx-auto">
              
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-pill border border-rose-500/30 text-rose-300 text-xs sm:text-sm font-bold shadow-lg shadow-rose-500/10">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Kerala's #1 Satirical Flirt Detector App</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight leading-tight">
                How Much of a <br className="hidden xs:inline" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400">
                  "Kozhi"
                </span> Are You? 🐔
              </h1>

              <p className="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
                Scan your selfie or upload a photo to calculate your humorous <strong className="text-white">Kozhi Score</strong> (0–100%). From <span className="text-blue-300 font-semibold">Ice Cold Kozhi</span> to <span className="text-amber-400 font-semibold">Certified Vayanokki</span>!
              </p>

            </div>

            {/* Main Action Zone: Camera or Upload */}
            <FileUploadZone
              onImageSelected={handleImageSelected}
              onOpenCamera={() => setIsCameraOpen(true)}
            />

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 text-left">
              
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">360° Radar Vision</h4>
                <p className="text-xs text-slate-400">
                  Analyzes smile width & eyebrow gestures for funny Malayalam rank copy.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">100% Client-Side</h4>
                <p className="text-xs text-slate-400">
                  Your photo never leaves your device memory. Zero cloud storage or tracking.
                </p>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Shareable Card</h4>
                <p className="text-xs text-slate-400">
                  Generates an Instagram & WhatsApp ready certificate card with 1-click.
                </p>
              </div>

            </div>

          </motion.div>
        )}

        {/* Step 2: Processing View */}
        {step === 'scanning' && selectedImage && (
          <FaceScanProgress
            imageSrc={selectedImage}
            onComplete={handleScanAnimationComplete}
          />
        )}

        {/* Step 3: Result View */}
        {step === 'result' && selectedImage && analysisResult && (
          <ResultCard
            imageSrc={selectedImage}
            result={analysisResult}
            onRetry={handleRetry}
          />
        )}

      </main>

      {/* Footer */}
      <Footer onOpenFAQ={() => setIsFAQOpen(true)} />

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleImageSelected}
      />

      {/* About / FAQ Modal */}
      <FAQModal
        isOpen={isFAQOpen}
        onClose={() => setIsFAQOpen(false)}
      />

    </div>
  );
}
export default App;
