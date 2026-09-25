import React from 'react';
import { 
  Laptop, 
  BatteryCharging, 
  Zap, 
  MapPin, 
  PhoneCall, 
  MessageSquareQuote, 
  Maximize2,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const FlyerHero: React.FC = () => {
  const { siteConfig, setFlyerLightboxOpen, setActiveCategory } = useShop();

  return (
    <section id="flyer-section" className="bg-white border-b border-slate-200 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Real Store Announcement Notice */}
        <div className="mb-8 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="bg-blue-700 text-white font-bold text-[11px] uppercase tracking-wider px-2 py-0.5 rounded">
              Store Notice
            </span>
            <span className="font-semibold text-slate-900">
              {siteConfig.bannerNotice}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 shrink-0">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Room 104A Metcash Complex</span>
            </span>
            <span className="text-slate-300">|</span>
            <a href={`tel:${siteConfig.phones[0]}`} className="hover:text-blue-700 flex items-center gap-1 font-bold">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{siteConfig.phones[0]}</span>
            </a>
          </div>
        </div>

        {/* 2-Column Hero: Authentic Retail Copy & Flyer Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Retail Copy & Direct Pricing */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
                Computer Village (Pty) Ltd · Metcash Complex, Maseru
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Quality Laptops, Sales & Certified Repairs
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
                We deal in tested laptops (8th to 13th Generation in Dell, HP, Lenovo, ASUS & Acer), genuine power chargers, original replacement batteries, and insured same-day computer repairs. Every machine is tested before purchase and backed by warranty.
              </p>
            </div>

            {/* Flyer Price Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              
              <div 
                onClick={() => {
                  setActiveCategory('laptops');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-50 border border-slate-200 hover:border-blue-600 rounded-xl p-4 cursor-pointer transition-all hover:bg-white hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wide">LAPTOPS</span>
                  <Laptop className="w-4 h-4 text-blue-700" />
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono">
                  M3,000 <span className="text-xs font-sans text-slate-500 font-normal">to</span> M7,500
                </div>
                <div className="text-[11px] text-blue-700 mt-1 font-semibold">
                  8th – 13th Gen · All Major Brands
                </div>
              </div>

              <div 
                onClick={() => {
                  setActiveCategory('chargers');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-50 border border-slate-200 hover:border-emerald-600 rounded-xl p-4 cursor-pointer transition-all hover:bg-white hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wide">CHARGERS</span>
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono">
                  M250 <span className="text-xs font-sans text-slate-500 font-normal">to</span> M450
                </div>
                <div className="text-[11px] text-emerald-700 mt-1 font-semibold">
                  Normal M300 · Type-C 65W M450
                </div>
              </div>

              <div 
                onClick={() => {
                  setActiveCategory('batteries');
                  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-50 border border-slate-200 hover:border-amber-600 rounded-xl p-4 cursor-pointer transition-all hover:bg-white hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-bold text-slate-700 uppercase tracking-wide">BATTERIES</span>
                  <BatteryCharging className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-xl font-extrabold text-slate-900 font-mono">
                  M650 <span className="text-xs font-sans text-slate-500 font-normal">to</span> M850
                </div>
                <div className="text-[11px] text-amber-700 mt-1 font-semibold">
                  Tested Original Replacement Cells
                </div>
              </div>

            </div>

            {/* In-store Trust checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Same Day Diagnostics</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Up to 40% OFF For New Clients</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Insured Laptop Repairs</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Dell · HP · Lenovo · ASUS · Acer</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Tested Before Payment</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-4 h-4 text-blue-700 shrink-0" />
                <span>Warranty on Every Machine</span>
              </span>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Browse Available Stock</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village! I saw your promotional flyer and I would like to check available laptops and chargers.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>WhatsApp: (+266) 57637545</span>
              </a>

              <a
                href={`tel:${siteConfig.phones[0]}`}
                className="px-4 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-300 transition-colors flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-slate-600" />
                <span>Call Store</span>
              </a>
            </div>

            {/* Physical Location Pin */}
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Metcash Complex: Room 104A</strong> (Next to FNB ATM), Maseru, Lesotho
              </span>
            </div>

          </div>

          {/* Right Column: The Actual Promotional Flyer */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[420px] bg-slate-100 border border-slate-300 rounded-xl p-2.5 shadow-sm">
              
              {/* Header Bar on Flyer Card */}
              <div className="flex items-center justify-between px-2 py-1.5 text-xs text-slate-700 border-b border-slate-200 mb-2">
                <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wide">
                  Official Store Promotional Flyer
                </span>
                <button
                  onClick={() => setFlyerLightboxOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-700 hover:underline font-semibold cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Flyer</span>
                </button>
              </div>

              {/* Flyer Image Container */}
              <div 
                onClick={() => setFlyerLightboxOpen(true)}
                className="relative aspect-[3/4] bg-slate-200 rounded-lg overflow-hidden cursor-pointer group"
                title="Click to zoom promotional flyer"
              >
                <img
                  src={siteConfig.flyerImageUrl}
                  alt="Computer Village Official Promotional Flyer"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-slate-900 font-bold text-xs px-3.5 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-blue-700" />
                    <span>View Full High-Res Flyer</span>
                  </span>
                </div>
              </div>

              {/* Bottom Quick Store Info */}
              <div className="mt-2.5 px-2 py-1 flex items-center justify-between text-xs text-slate-600">
                <span>Room 104A Metcash Complex</span>
                <span className="font-bold text-slate-800">Tel: +266 57637545</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
