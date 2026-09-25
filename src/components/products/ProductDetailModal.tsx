import React from 'react';
import { 
  X, 
  Laptop, 
  MessageSquareQuote, 
  PhoneCall, 
  MapPin, 
  CheckCircle2, 
  Video, 
  ShieldCheck, 
  Tag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductForModal, 
    setSelectedProductForModal, 
    siteConfig, 
    isAdmin, 
    toggleMarkSold 
  } = useShop();

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const isSold = product.status === 'sold';

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hello Computer Village, I would like to inquire about testing / purchasing the ${product.title} (Price: M${product.price.toLocaleString()}) at Metcash Complex Room 104A.`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-700">
              {product.brand} · {product.category}
            </span>
            {isSold && (
              <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-200 uppercase">
                SOLD OUT
              </span>
            )}
          </div>
          
          <button
            onClick={() => setSelectedProductForModal(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Product Media Gallery */}
            <div className="lg:col-span-6 space-y-3">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = '/assets/images/laptops_showcase_row_1790265301779.jpg';
                  }}
                />
              </div>

              {/* Video Demo (if available) */}
              {product.videoUrl && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Video className="w-4 h-4 text-blue-700" />
                    <span>Watch Video Demo</span>
                  </div>
                  <div className="aspect-video rounded-xl overflow-hidden bg-black border border-slate-200 shadow-inner">
                    <video
                      src={product.videoUrl}
                      controls
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Product Details & Specs Table */}
            <div className="lg:col-span-6 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Condition:
                  </span>
                  <span className="text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {product.condition}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                  {product.title}
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Retail Price:</span>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                    <span className="text-sm font-bold text-slate-500 mr-1">M</span>
                    {product.price.toLocaleString()}
                  </div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-xs text-slate-400 line-through mt-0.5">
                      Regular: M{product.originalPrice.toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-blue-700 block">
                    {product.specs.warranty || '6 Months Warranty'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Tested in store before sale
                  </span>
                </div>
              </div>

              {/* Hardware Specifications Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Technical Specifications
                </h4>

                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                  {product.specs.processor && (
                    <div className="grid grid-cols-3 p-2.5 bg-white">
                      <span className="text-slate-500 font-medium">Processor</span>
                      <span className="col-span-2 text-slate-900 font-semibold font-mono">{product.specs.processor}</span>
                    </div>
                  )}

                  {product.specs.ram && (
                    <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                      <span className="text-slate-500 font-medium">System RAM</span>
                      <span className="col-span-2 text-slate-900 font-semibold font-mono">{product.specs.ram}</span>
                    </div>
                  )}

                  {product.specs.storage && (
                    <div className="grid grid-cols-3 p-2.5 bg-white">
                      <span className="text-slate-500 font-medium">Solid State Drive</span>
                      <span className="col-span-2 text-slate-900 font-semibold font-mono">{product.specs.storage}</span>
                    </div>
                  )}

                  {product.specs.os && (
                    <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                      <span className="text-slate-500 font-medium">Operating System</span>
                      <span className="col-span-2 text-slate-900 font-semibold">{product.specs.os}</span>
                    </div>
                  )}

                  {product.specs.screenSize && (
                    <div className="grid grid-cols-3 p-2.5 bg-white">
                      <span className="text-slate-500 font-medium">Display Size</span>
                      <span className="col-span-2 text-slate-900 font-semibold">{product.specs.screenSize}</span>
                    </div>
                  )}

                  {product.specs.voltage && (
                    <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                      <span className="text-slate-500 font-medium">Voltage / Power</span>
                      <span className="col-span-2 text-slate-900 font-semibold font-mono">{product.specs.voltage}</span>
                    </div>
                  )}

                  {product.specs.tipType && (
                    <div className="grid grid-cols-3 p-2.5 bg-white">
                      <span className="text-slate-500 font-medium">Connector Tip</span>
                      <span className="col-span-2 text-slate-900 font-semibold">{product.specs.tipType}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-3 p-2.5 bg-slate-50/60">
                    <span className="text-slate-500 font-medium">Store Location</span>
                    <span className="col-span-2 text-slate-900 font-semibold">
                      Room 104A, Metcash Complex, Maseru
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${getWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs text-white shadow-xs transition-colors ${
                    isSold
                      ? 'bg-slate-300 text-slate-500 pointer-events-none'
                      : 'bg-emerald-600 hover:bg-emerald-700'
                  }`}
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>
                    {isSold ? 'Item Marked Sold' : 'Inquire / Order on WhatsApp (+266 57637545)'}
                  </span>
                </a>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <a
                    href={`tel:${siteConfig.phones[0]}`}
                    className="flex items-center gap-1.5 hover:text-blue-700 font-medium"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
                    <span>Call Store: {siteConfig.phones[0]}</span>
                  </a>

                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>Metcash Room 104A</span>
                  </span>
                </div>

                {/* Admin Quick Switch */}
                {isAdmin && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Admin Control:</span>
                    <button
                      onClick={() => toggleMarkSold(product.id)}
                      className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                        isSold
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {isSold ? 'Mark Available in Shop' : 'Mark as Sold'}
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
