import React, { useState, useRef } from 'react';
import { Camera, Upload, Image as ImageIcon, Sparkles, ShieldCheck } from 'lucide-react';
import { SAMPLE_PHOTOS } from '../data/kozhiTitles';

interface FileUploadZoneProps {
  onImageSelected: (imageDataUrl: string) => void;
  onOpenCamera: () => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onImageSelected,
  onOpenCamera,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSampleSelect = (url: string) => {
    // Convert sample URL to canvas data URL for seamless client processing
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        onImageSelected(canvas.toDataURL('image/jpeg'));
      }
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Choice Cards: Camera vs File Upload */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Camera Option */}
        <button
          onClick={onOpenCamera}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 to-rose-700 p-6 text-left shadow-xl shadow-rose-600/20 transition-all hover:scale-[1.02] hover:shadow-rose-600/30 border border-rose-400/30 flex flex-col justify-between h-48 sm:h-52"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform" />
          
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide">
              RECOMMENDED 📸
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Use Live Camera
            </h3>
            <p className="text-xs text-rose-100 mt-1 font-medium">
              Take a live selfie on desktop camera or mobile front selfie camera.
            </p>
          </div>

          <div className="text-xs font-bold text-white flex items-center space-x-1.5 pt-2">
            <span>Scan Face Now</span>
            <span>→</span>
          </div>
        </button>

        {/* File Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-3xl bg-slate-900/90 border-2 border-dashed p-6 transition-all hover:scale-[1.02] flex flex-col justify-between h-48 sm:h-52 ${
            isDragging
              ? 'border-amber-400 bg-amber-500/10'
              : 'border-slate-700 hover:border-amber-400/60 hover:bg-slate-800/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs text-slate-400 font-medium">
              JPG, PNG, WebP
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Upload Photo
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Drag & drop a face photo here, or click to browse your device files.
            </p>
          </div>

          <div className="text-xs font-bold text-amber-400 flex items-center space-x-1.5 pt-2">
            <span>Browse Files</span>
            <span>→</span>
          </div>
        </div>

      </div>

      {/* Quick Test Sample Photos Section */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              No photo ready? Try a sample face model:
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {SAMPLE_PHOTOS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSampleSelect(sample.url)}
              className="group relative rounded-2xl overflow-hidden border border-slate-700 hover:border-rose-500/60 transition-all hover:scale-105 bg-slate-950 text-left"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-2 bg-slate-950/90 text-center">
                <p className="text-[11px] font-bold text-slate-200 truncate">
                  {sample.name}
                </p>
                <p className="text-[9px] text-slate-400 truncate">
                  {sample.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Local Privacy Note */}
      <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Photos stay 100% in your browser memory — never saved or uploaded.</span>
      </div>

    </div>
  );
};
