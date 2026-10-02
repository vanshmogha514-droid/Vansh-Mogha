import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Mail } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Welcome to the Circle', 'You have been enrolled in the Crococast VIP Archive.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-300">
      {/* Brand Value Pillars */}
      <div className="border-b border-neutral-900 bg-neutral-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Complimentary Global Freight</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Fully insured express courier delivery on all orders over ₹2,999.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Certified Croc Cast Leather</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Hand-selected European full-grain hides heat-pressed with archival relief plates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">30-Day Bespoke Exchange</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Complimentary size adjustments and prepaid return labels included in every box.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center">
                <span className="font-display font-black text-emerald-400 text-sm">CT</span>
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white uppercase">
                crococast <span className="text-emerald-400 font-semibold lowercase">trends</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
              Pioneering modern luxury through architectural crocodile-embossed leather, avant-garde streetwear footwear, structured totes, and exotic small goods.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <label htmlFor="newsletter" className="block text-xs font-semibold text-neutral-300 mb-2 uppercase tracking-wider">
                Join the Private Cast Archive
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 flex-1"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-sm transition-colors shrink-0 flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[11px] text-neutral-500 mt-2 block">
                Exclusive drop alerts and VIP access only. No spam.
              </span>
            </form>
          </div>

          {/* Catalog Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Collections</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => navigate('shop', null, 'Footwear')} className="hover:text-emerald-400 transition-colors">
                  Footwear & Chelsea Boots
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', null, 'Bags & Luggage')} className="hover:text-emerald-400 transition-colors">
                  Totes & Travel Luggage
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', null, 'Wallets & Clutches')} className="hover:text-emerald-400 transition-colors">
                  Wallets & Cardholders
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', null, 'Watches & Straps')} className="hover:text-emerald-400 transition-colors">
                  Automatic Chrono Watches
                </button>
              </li>
              <li>
                <button onClick={() => navigate('shop', null, 'Apparel & Vests')} className="hover:text-emerald-400 transition-colors">
                  Biker Jackets & Vests
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Concierge</h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Contact Client Services
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Shipping & Customs Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Leather Care & Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">
                  Authentication Certificate
                </button>
              </li>
              <li>
                <button onClick={() => navigate('admin')} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Admin Order Center</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Payment Gateways accepted */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Payment Methods</h4>
            <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
              We support Google Pay QR instant UPI settlement, verified PayPal checkout, and major credit cards.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-300">
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Google Pay QR</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">PayPal</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Apple Pay</span>
              <span className="px-2 py-1 bg-neutral-900 border border-neutral-800 rounded">Visa / MC</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-12 mt-12 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Crococast Trends Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <button onClick={() => navigate('admin')} className="hover:text-emerald-400">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
