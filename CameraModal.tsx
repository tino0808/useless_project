import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, X, Shield, AlertCircle, FlipHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onCapture }) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [isCapturing, setIsCapturing] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  // Request camera access
  const startCamera = useCallback(async (mode: 'user' | 'environment') => {
    setErrorMessage(null);
    try {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setHasPermission(false);
      setErrorMessage(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Camera permission was denied. Please allow camera access in your browser settings to scan live selfies.'
          : 'Could not connect to camera device. Please verify your camera is connected or select photo upload.'
      );
    }
  }, [stream]);

  // Auto start camera when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  // Flip front/rear camera
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
  };

  // Capture snapshot
  const handleTakeSnapshot = () => {
    if (!videoRef.current) return;
    setIsCapturing(true);

    const video = videoRef.current;
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // If front camera, mirror image for natural selfie feel
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      
      stopCamera();
      onCapture(dataUrl);
      onClose();
    }
    setIsCapturing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Live Kozhi Selfie Scanner
              </h3>
              <p className="text-xs text-slate-400">
                Facing Mode: {facingMode === 'user' ? 'Front Selfie Camera' : 'Rear Camera'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport Area */}
        <div className="relative bg-slate-950 aspect-[4/3] flex items-center justify-center overflow-hidden">
          
          {/* Hidden Canvas */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Active Video Stream */}
          {hasPermission && (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                playsInline
                muted
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Viewfinder Face Target Oval Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-[50%] border-2 border-dashed border-rose-400/70 shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-pulse flex items-center justify-center">
                  <div className="text-center bg-slate-950/75 backdrop-blur-sm px-3 py-1.5 rounded-full border border-rose-500/30">
                    <span className="text-xs font-semibold text-rose-300">
                      Center Your Face Here 🐔
                    </span>
                  </div>
                </div>
              </div>

              {/* Camera Flip Control Button */}
              <button
                onClick={toggleFacingMode}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-md shadow-lg transition-transform hover:scale-105"
                title="Switch Camera (Front/Rear)"
              >
                <FlipHorizontal className="w-5 h-5 text-rose-400" />
              </button>
            </div>
          )}

          {/* Permission Prompt or Loading State */}
          {hasPermission === null && (
            <div className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-white">
                Requesting Camera Permission...
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Please allow camera access in your browser prompt to take a live selfie.
              </p>
            </div>
          )}

          {/* Error State */}
          {hasPermission === false && (
            <div className="p-6 text-center space-y-4 max-w-sm">
              <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-300">
                {errorMessage}
              </p>
              <button
                onClick={() => startCamera(facingMode)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 inline-flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4 text-rose-400" />
                <span>Retry Camera Permission</span>
              </button>
            </div>
          )}

        </div>

        {/* Privacy Assurance Bar */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-center space-x-2 text-xs text-emerald-400">
          <Shield className="w-4 h-4 shrink-0" />
          <span>Local processing only — camera stream is never uploaded or saved</span>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold transition-colors"
          >
            Cancel
          </button>

          {hasPermission && (
            <button
              onClick={handleTakeSnapshot}
              disabled={isCapturing}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-500/30 transition-all flex items-center space-x-2.5 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Camera className="w-5 h-5" />
              <span>Capture Selfie & Scan Score 🐔</span>
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
};
