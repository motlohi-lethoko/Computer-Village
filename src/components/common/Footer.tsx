import React from 'react';
import { 
  Laptop, 
  MapPin, 
  Phone, 
  Clock, 
  MessageSquareQuote, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Zap,
  Wrench
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer: React.FC = () => {
  const { siteConfig, isAdmin, setAdminModalOpen, setFlyerLightboxOpen } = useShop();

  return (
    <footer id="contact" className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-auto bg-white rounded-lg p-1 flex items-center justify-center shadow-xs">
                <img
                  src="/assets/images/computer_village_logo.jpg"
                  alt="Computer Village Logo"
                  className="h-10 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight">
                  COMPUTER <span className="text-blue-400">VILLAGE</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                  {siteConfig.companyLegalName} · Empowering Your Digital World
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Quality laptops & computer sales, insured component-level motherboard repairs, original power chargers, tested replacement batteries, and office peripherals. Every device is tested before purchase.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>8th to 13th Gen Laptops</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Original Chargers</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px]">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>Fast Insured Repairs</span>
              </span>
            </div>
          </div>

          {/* Location & Visiting */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Store Location & Hours
            </h4>
            
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{siteConfig.room}</strong>
                  <span>{siteConfig.address}</span>
                  <span className="text-amber-400 block text-[11px] font-medium mt-0.5">
                    ({siteConfig.landmark})
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 block">{siteConfig.businessHours}</span>
                  <span className="text-slate-500 text-[11px]">Closed on Sundays & Public Holidays</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact & Calls */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Call & WhatsApp Store
            </h4>

            <div className="space-y-2">
              <a
                href={`tel:${siteConfig.phones[0]}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono">{siteConfig.phones[0]}</span>
              </a>

              <a
                href={`tel:${siteConfig.phones[1]}`}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono">{siteConfig.phones[1]}</span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumbers[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold pt-1"
              >
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>WhatsApp: (+266) 57637545</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setFlyerLightboxOpen(true)}
                className="text-xs text-blue-400 hover:underline font-semibold cursor-pointer"
              >
                View Official Promotional Flyer →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright and Admin Login */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {siteConfig.companyLegalName}. All Rights Reserved. Metcash Complex Room 104A, Maseru, Lesotho.
          </div>

          <div className="flex items-center gap-4">
            <a href="#flyer-section" className="hover:text-slate-300">Home</a>
            <a href="#catalog" className="hover:text-slate-300">Laptops</a>
            <a href="#repairs" className="hover:text-slate-300">Repairs</a>
            <a href="#chargers" className="hover:text-slate-300">Chargers</a>
            <span className="text-slate-700">|</span>
            {isAdmin ? (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Unlock className="w-3 h-3" />
                <span>Admin Portal</span>
              </button>
            ) : (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Staff Login</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
