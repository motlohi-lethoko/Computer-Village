import React, { useState } from 'react';
import { 
  Zap, 
  BatteryCharging, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquareQuote, 
  PhoneCall, 
  MapPin, 
  Check
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ChargersSection: React.FC = () => {
  const { siteConfig, setActiveCategory } = useShop();
  const [selectedBrand, setSelectedBrand] = useState('HP');

  const brandTips: Record<string, { title: string; connector: string; wattage: string; normalPrice: number; typeCPrice: number; compatibility: string }> = {
    HP: {
      title: "HP Smart AC Power Adapter",
      connector: "4.5mm Blue Tip & 7.4mm Big Pin",
      wattage: "65W / 90W / 120W",
      normalPrice: 300,
      typeCPrice: 450,
      compatibility: "HP Pavilion, EliteBook 840/850, ProBook 450, Envy, Omen"
    },
    Dell: {
      title: "Dell Genuine Power Adapter",
      connector: "4.5mm Small Pin & 7.4mm Big Barrel",
      wattage: "65W / 90W / 130W",
      normalPrice: 300,
      typeCPrice: 450,
      compatibility: "Dell Latitude 3000/5000/7000, Inspiron 15, XPS 13/15, Vostro"
    },
    Lenovo: {
      title: "Lenovo ThinkPad & IdeaPad Charger",
      connector: "Yellow Rectangular USB Tip & Round Tip",
      wattage: "65W / 90W",
      normalPrice: 300,
      typeCPrice: 450,
      compatibility: "ThinkPad T440/T470/T480/T490, IdeaPad 3/5, ThinkBook, Yoga"
    },
    ASUS: {
      title: "ASUS ZenBook & Vivobook Charger",
      connector: "4.0mm / 4.5mm Micro Tip & Type-C",
      wattage: "45W / 65W / 90W",
      normalPrice: 300,
      typeCPrice: 450,
      compatibility: "ASUS VivoBook, ZenBook, TUF Gaming, ROG Strix"
    },
    Acer: {
      title: "Acer Aspire & TravelMate Charger",
      connector: "3.0mm / 5.5mm Barrel Tip",
      wattage: "45W / 65W",
      normalPrice: 300,
      typeCPrice: 450,
      compatibility: "Acer Aspire 3/5, Swift, Spin, TravelMate, Extensa"
    },
    Toshiba: {
      title: "Toshiba Dynabook & Satellite Charger",
      connector: "5.5mm x 2.5mm Barrel Tip",
      wattage: "65W / 75W / 90W",
      normalPrice: 300,
      typeCPrice: 450,
      compatibility: "Toshiba Satellite, Portege, Tecra, Dynabook"
    }
  };

  const current = brandTips[selectedBrand] || brandTips['HP'];

  return (
    <section id="chargers" className="py-16 bg-slate-100/60 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
            Original Power Supplies & Tested Cells
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Laptop Chargers & Replacement Batteries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Never damage your laptop motherboard with generic unverified power bricks. We carry original specification chargers with surge protection and tested high-density replacement battery cells.
          </p>
        </div>

        {/* Pricing Comparison Cards directly from the flyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Card 1: Normal Pin Chargers */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Standard Tip Chargers
                </span>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Popular Stock
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Brand Pin Power Adapters
              </h3>

              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                <span className="text-base font-bold text-slate-500 mr-1">M</span>
                300
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated connectors for HP (blue pin / big pin), Dell (small pin / big pin), Lenovo (square yellow tip), ASUS, Acer, and Toshiba.
              </p>

              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Exact OEM voltage & amperage rating</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>3-Pin Clover power cable included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>3-Month Replacement Guarantee</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village, I need a standard pin laptop charger (M300).")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Inquire Standard Charger (M300)</span>
            </a>
          </div>

          {/* Card 2: 65W Type-C Fast Chargers */}
          <div className="bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                  Type-C Power Delivery
                </span>
                <span className="text-xs font-bold text-white bg-blue-700 px-2 py-0.5 rounded uppercase">
                  Fast Charging
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                65W USB-C Smart Charger
              </h3>

              <div className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                <span className="text-base font-bold text-slate-500 mr-1">M</span>
                450
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Universal Type-C power delivery charger compatible with modern HP EliteBook, Dell XPS/Latitude, Lenovo ThinkPad Gen 9-13, MacBook, and tablets.
              </p>

              <ul className="space-y-1.5 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>Smart auto-voltage (5V/9V/15V/20V 3.25A)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>Braided heavy-duty USB-C cable</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                  <span>6-Month Replacement Guarantee</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village, I need a 65W Type-C fast charger (M450).")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>Inquire Type-C 65W Charger (M450)</span>
            </a>
          </div>

        </div>

        {/* Interactive Compatibility Finder */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Check Charger Compatibility By Brand
              </h3>
              <p className="text-xs text-slate-500">
                Select your laptop make to view connector type, pin size, and price.
              </p>
            </div>

            {/* Brand Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {Object.keys(brandTips).map(brand => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-blue-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Pin & Tip Specifications
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                {current.title}
              </h4>
              <p className="text-xs text-slate-600">
                Connector Pin: <strong className="text-slate-900">{current.connector}</strong>
              </p>
              <p className="text-xs text-slate-600">
                Wattage Range: <strong className="text-slate-900">{current.wattage}</strong>
              </p>
            </div>

            <div className="space-y-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Compatible Series
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {current.compatibility}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Normal Tip:</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">M{current.normalPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Type-C (65W):</span>
                  <span className="text-lg font-bold text-blue-700 font-mono">M{current.typeCPrice}</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent(`Hello Computer Village, I need a ${selectedBrand} charger (${current.connector}) for my laptop.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Order {selectedBrand} Charger</span>
              </a>
            </div>

          </div>
        </div>

        {/* Batteries Info Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <BatteryCharging className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Laptop Replacement Batteries (M650 to M850)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Internal and external battery packs for HP, Dell, Lenovo, and Acer. Tested for full capacity and standby endurance with warranty.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveCategory('batteries');
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 transition-colors cursor-pointer"
            >
              Browse Batteries
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village, I would like to inquire about a replacement battery for my laptop.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              Check Battery Price on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
