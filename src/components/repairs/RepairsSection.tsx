import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  Monitor, 
  HardDrive, 
  Zap, 
  Search, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  MessageSquareQuote, 
  PhoneCall, 
  MapPin, 
  ArrowRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const RepairsSection: React.FC = () => {
  const { repairServices, siteConfig, createRepairBooking, showToast } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceType, setDeviceType] = useState('Laptop');
  const [model, setModel] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent (Same Day)'>('Urgent (Same Day)');
  const [formError, setFormError] = useState('');
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-blue-700" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-blue-700" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-blue-700" />;
      case 'Zap': return <Zap className="w-5 h-5 text-blue-700" />;
      default: return <Wrench className="w-5 h-5 text-blue-700" />;
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !model.trim() || !issueDescription.trim()) {
      setFormError('Please enter your name, contact phone number, device model, and issue description.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);
    setTimeout(() => {
      const bookingId = createRepairBooking({
        customerName,
        phone,
        deviceType,
        model,
        issueDescription,
        urgency
      });
      setIsSubmitting(false);
      setBookingSuccessId(bookingId);
      showToast(`✓ Diagnostic booking submitted! Ticket #${bookingId}`, 'success');
    }, 450);
  };

  const getWhatsAppBookingUrl = () => {
    const text = encodeURIComponent(
      `Hello Computer Village Repairs Department! I have a repair inquiry / booking (#${bookingSuccessId || 'REPAIR'}).\nName: ${customerName}\nDevice: ${deviceType} (${model})\nIssue: ${issueDescription}\nUrgency: ${urgency}\nPlease confirm drop-off at Room 104A Metcash Complex.`
    );
    return `https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${text}`;
  };

  return (
    <section id="repairs" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner Section matching the Repairs Flyer */}
        <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Official Repair Desk · Metcash Complex Room 104A
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Fast, Insured Laptop & Computer Repairs
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Computer Village (Pty) Ltd provides same-day diagnostic tests, component-level micro-soldering, broken hinge rebuilds, liquid damage cleaning, and screen replacements right at Metcash Complex Room 104A (Next to FNB ATM).
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-800 border border-slate-700 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Same Day Diagnosis</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Quick test bench report within 1 to 2 hours of drop-off.
                  </p>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Insured Handling</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Your machine and private data are protected with signed job cards.
                  </p>
                </div>

                <div className="bg-slate-800 border border-slate-700 p-3.5 rounded-xl">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Up to 40% OFF</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Special promotional discount on diagnostics for new clients.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Box on Banner */}
            <div className="lg:col-span-4 bg-slate-800 border border-slate-700 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-blue-400" />
                <span>Technician Direct Line</span>
              </div>

              <div>
                <a 
                  href={`tel:${siteConfig.phones[0]}`}
                  className="text-2xl font-mono font-bold text-white hover:text-blue-400 block"
                >
                  {siteConfig.phones[0]}
                </a>
                <span className="text-xs text-slate-400">
                  Alternate: {siteConfig.phones[1]}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-1 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Room 104A Metcash Complex</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Drop-offs: 8:00 AM - 5:30 PM (Mon-Fri)</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village Repair Desk! I need a repair diagnostic for my laptop.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageSquareQuote className="w-4 h-4" />
                <span>WhatsApp Technician</span>
              </a>
            </div>

          </div>
        </div>

        {/* 2-Column: Services Pricing & Repair Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services List with Transparent Pricing */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Common Laptop & PC Repair Services
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Transparent pricing with no hidden costs. We quote before proceeding with any repair.
              </p>
            </div>

            <div className="space-y-3">
              {repairServices.map(service => (
                <div 
                  key={service.id}
                  className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-700 shrink-0 mt-0.5">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {service.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Turnaround: {service.turnaround}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 flex sm:flex-col items-center sm:items-end justify-between">
                    <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                      From M{service.startingPrice.toLocaleString()}
                    </span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent(`Hello Computer Village, I'd like to book ${service.name} (from M${service.startingPrice}) for my laptop.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-700 hover:underline font-semibold"
                    >
                      Book on WhatsApp →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online Repair Assessment Booking Desk */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>Drop-Off Registration</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Book a Diagnostic Assessment
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Register your machine before bringing it to Metcash Complex Room 104A to skip the queue.
              </p>
            </div>

            {bookingSuccessId ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Assessment Ticket Registered!</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <p>Ticket Reference: <strong className="font-mono text-slate-900">{bookingSuccessId}</strong></p>
                  <p>Customer: <strong>{customerName}</strong> ({phone})</p>
                  <p>Device: <strong>{deviceType} - {model}</strong></p>
                </div>
                <p className="text-xs text-slate-600">
                  Please bring your device to <strong>Metcash Complex Room 104A</strong> (Next to FNB ATM). Our technician will perform the assessment report.
                </p>
                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={getWhatsAppBookingUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquareQuote className="w-4 h-4" />
                    <span>Send Details to WhatsApp (+266 57637545)</span>
                  </a>

                  <button
                    onClick={() => {
                      setBookingSuccessId(null);
                      setCustomerName('');
                      setPhone('');
                      setModel('');
                      setIssueDescription('');
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 underline text-center"
                  >
                    Register another device
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                {formError && (
                  <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Thabo Molapo"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number (Call / WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+266 5763 7545"
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Device Type
                    </label>
                    <select
                      value={deviceType}
                      onChange={(e) => setDeviceType(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    >
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop PC">Desktop PC</option>
                      <option value="MacBook">MacBook</option>
                      <option value="Printer">Printer</option>
                      <option value="Charger / Adapter">Charger / Adapter</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Brand & Model *
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="HP 840 G5 / Dell 5400"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Describe Problem / Symptoms *
                  </label>
                  <textarea
                    rows={3}
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Screen cracked, not turning on, Windows blue screen, battery draining fast..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUrgency('Urgent (Same Day)')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        urgency === 'Urgent (Same Day)'
                          ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-transparent shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Urgent (Same Day)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUrgency('Normal')}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        urgency === 'Normal'
                          ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white border-transparent shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      Normal (24-48 hrs)
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-lg text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitting 
                      ? 'bg-sky-700 opacity-90 cursor-wait' 
                      : 'bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-600/25 active:scale-[0.99]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Submitting Diagnostic Booking...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Diagnostic Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
