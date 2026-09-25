import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock,
  Menu, 
  X, 
  Lock, 
  Unlock, 
  MessageSquareQuote,
  Maximize2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const { siteConfig, isAdmin, setIsAdmin, setAdminModalOpen, setFlyerLightboxOpen, showToast } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);

  const navTabs = [
    { href: '#flyer-section', label: 'Store Flyer' },
    { href: '#catalog', label: 'Laptops & Stock' },
    { href: '#repairs', label: 'Repair Desk' },
    { href: '#chargers', label: 'Chargers & Batteries' },
    { href: '#contact', label: 'Location & Hours' },
  ];

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'kamsi555888') {
      setIsAdmin(true);
      setLoginPromptOpen(false);
      setPasscode('');
      setPassError(false);
      setAdminModalOpen(true);
      showToast('✓ Admin login successful! Welcome to the Store Management Portal.', 'success');
    } else {
      setPassError(true);
    }
  };

  return (
    <>
      {/* Top Utility Bar - Authentic Brick & Mortar Store Details */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Physical Location & Hours */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span><strong>Metcash Complex: Room 104A</strong> (Next to FNB ATM), Maseru</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-slate-400 hidden lg:flex">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Mon - Fri: 8:00 - 17:30 · Sat: 8:30 - 15:00</span>
            </span>
          </div>

          {/* Contact Numbers & Admin Entry */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a 
              href={`tel:${siteConfig.phones[0]}`} 
              className="flex items-center gap-1 text-slate-200 hover:text-white font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{siteConfig.phones[0]}</span>
            </a>
            <span className="text-slate-600">/</span>
            <a 
              href={`tel:${siteConfig.phones[1]}`} 
              className="text-slate-300 hover:text-white"
            >
              <span>{siteConfig.phones[1]}</span>
            </a>
            <span className="text-slate-600">|</span>
            
            {isAdmin ? (
              <button
                onClick={() => setAdminModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors"
              >
                <Unlock className="w-3 h-3" />
                <span>Admin Panel</span>
              </button>
            ) : (
              <button
                onClick={() => setLoginPromptOpen(true)}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Store Staff Login"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Zone 1: Store Logo */}
            <a 
              href="#flyer-section" 
              className="flex items-center group py-1"
              aria-label="Computer Village - Empowering Your Digital World"
            >
              <BrandLogo heightClass="h-13 sm:h-15" />
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-sm font-semibold text-slate-700">
              {navTabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  className="relative group px-3.5 py-2 rounded-xl text-sm font-bold text-slate-700 hover:text-white transition-all duration-300 overflow-hidden"
                >
                  {/* Glowing gradient background on cursor hover with sky blue theme */}
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl shadow-md shadow-sky-500/25 scale-95 group-hover:scale-100 -z-0" />

                  {/* Elegant light sweep shimmer effect across gradient */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none -z-0" />

                  {/* Tab Label */}
                  <span className="relative z-10 transition-colors duration-200">
                    {tab.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => setFlyerLightboxOpen(true)}
                className="group relative hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-sky-700 hover:text-white rounded-lg border border-sky-300 hover:border-transparent transition-all duration-300 cursor-pointer overflow-hidden shadow-xs hover:shadow-md hover:shadow-sky-500/20"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                <Maximize2 className="w-3.5 h-3.5 relative z-10 transition-transform group-hover:scale-110" />
                <span className="relative z-10">View Flyer</span>
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village, I would like to inquire about laptops, chargers, or repairs.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-50 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1.5 text-sm font-semibold text-slate-800">
              {navTabs.map((tab) => (
                <a
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative group px-4 py-2.5 rounded-xl font-bold text-slate-700 hover:text-white transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <span className="relative z-10">{tab.label}</span>
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFlyerLightboxOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200"
              >
                <Maximize2 className="w-4 h-4" />
                <span>View Full Promotional Flyer</span>
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumbers[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>Chat on WhatsApp: (+266) 57637545</span>
              </a>

              {!isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginPromptOpen(true);
                  }}
                  className="w-full text-center py-2 text-xs text-slate-500 font-medium"
                >
                  Store Staff Admin Access
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Admin Passcode Modal */}
      {loginPromptOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Store Staff & Admin Login
                  </h3>
                  <p className="text-xs text-slate-500">
                    Computer Village Management Portal
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setLoginPromptOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setPassError(false);
                  }}
                  placeholder="Enter passcode"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  autoFocus
                />
                {passError && (
                  <p className="text-xs text-rose-600 mt-1 font-medium">
                    Incorrect passcode. Please check your passcode and try again.
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer"
                >
                  Enter Admin Dashboard
                </button>
              </div>

              <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
                Allows editing inventory, inline price changes, uploading product photos, marking items sold, and updating flyer info.
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
