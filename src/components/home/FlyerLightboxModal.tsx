import React, { useState } from 'react';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  MessageSquareQuote, 
  PhoneCall, 
  MapPin, 
  Laptop
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FlyerLightboxModal: React.FC = () => {
  const { siteConfig, flyerLightboxOpen, setFlyerLightboxOpen } = useShop();
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!flyerLightboxOpen) return null;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Computer Village Official Promotional Flyer
              </h3>
              <p className="text-xs text-slate-400">
                Metcash Complex Room 104A · Tel: (+266) 57637545 / 57402325
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-slate-700 rounded-lg p-1 border border-slate-600">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 text-xs font-mono text-slate-200 cursor-pointer"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2.5}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            <a
              href={siteConfig.flyerImageUrl}
              download="Computer-Village-Official-Flyer.jpg"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-medium border border-slate-600 transition-colors"
              title="Download full size image"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download</span>
            </a>

            <button
              onClick={() => {
                setFlyerLightboxOpen(false);
                setZoomLevel(1);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content: Flyer Viewer */}
        <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-8 flex items-center justify-center min-h-[50vh] max-h-[70vh]">
          <div 
            className="transition-transform duration-200 ease-out origin-center select-none"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={siteConfig.flyerImageUrl}
              alt="Computer Village Full Resolution Flyer"
              className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl border border-slate-800 pointer-events-auto"
            />
          </div>
        </div>

        {/* Footer Bar with Flyer Details & Direct Order Actions */}
        <div className="bg-slate-900 border-t border-slate-800 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Metcash Complex Room 104A (Next to FNB ATM)</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a 
              href={`tel:${siteConfig.phones[0]}`}
              className="flex items-center gap-1 hover:text-white font-mono font-bold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{siteConfig.phones[0]}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village, I would like to inquire about the promotional flyer offers (Laptops M3000-M7500, Chargers M300/M450).")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Order via WhatsApp (+266 57637545)</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
