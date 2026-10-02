import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order & Shipping Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    showToast('Message Received', 'Our client concierge will respond within 4 business hours.', 'success');
  };

  const faqs = [
    {
      q: 'How do I care for my Crococast crocodile embossed leather?',
      a: 'We recommend gently wiping your piece with the included microfiber dust cloth. Avoid solvent-based leather cleaners or alcohol wipes. Biannual application of a light beeswax leather conditioning cream will preserve the deep luster and pliability of the scales.'
    },
    {
      q: 'What payment options do you support at checkout?',
      a: 'We accept Google Pay QR code payments (instant zero-fee UPI settlement with reference ID verification), direct external PayPal checkout, major international credit and debit cards, and Cash on Delivery (COD) in select territories.'
    },
    {
      q: 'What is the turnaround time for dispatch and delivery?',
      a: 'All orders placed before 2:00 PM EST enter priority courier dispatch on the same business day. Standard Insured Freight typically delivers within 4 to 7 business days. Priority Courier Air arrives within 2 to 3 days with real-time tracking.'
    },
    {
      q: 'How does your 30-day return and size exchange policy work?',
      a: 'Every Crococast Trends delivery includes a pre-printed return envelope and authenticity certificate. If you need a different shoe size or belt length, initiate a complimentary exchange within 30 days of arrival.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
          Concierge Services
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
          Contact Crococast Trends
        </h1>
        <p className="text-sm text-neutral-400 mt-2">
          Connect directly with our dedicated client advisors for sizing assistance, custom orders, or shipping coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-xl">
          <h2 className="font-display font-bold text-xl text-white mb-2">Send an Advisory Message</h2>
          <p className="text-xs text-neutral-400 mb-8">
            Complete the form below and an advisor from our Milan/New York salon will reply promptly.
          </p>

          {submitted ? (
            <div className="p-8 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Message Transmitted</h3>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. A dedicated specialist has received your inquiry and will follow up at <strong>{email}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setPhone('');
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-xl text-xs font-semibold"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Order & Shipping Inquiry">Order & Shipping Inquiry</option>
                    <option value="Sizing & Boot Fitment">Sizing & Boot Fitment</option>
                    <option value="Custom Leather Casting">Custom Leather Casting</option>
                    <option value="VIP Client Services">VIP Client Services</option>
                    <option value="Payment Gateway Help">Payment Gateway Help</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Your Detailed Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about the piece you are considering, custom specifications, or your order requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Concierge</span>
              </button>
            </form>
          )}
        </div>

        {/* Salon Details & Direct Contacts (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-neutral-900/60 border border-neutral-800 rounded-3xl space-y-6">
            <h3 className="font-display font-bold text-lg text-white">Direct Communication</h3>
            
            <div className="space-y-5 text-xs text-neutral-300">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Concierge Email</span>
                  <a href="mailto:concierge@crococasttrends.com" className="text-emerald-400 hover:underline">
                    concierge@crococasttrends.com
                  </a>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">Average reply time under 4 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">VIP Direct Hotline</span>
                  <span className="font-mono text-neutral-200">+1 (800) 894-CROC (2762)</span>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">Mon–Fri: 9:00 AM – 7:00 PM EST</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Flagship Atelier & Showroom</span>
                  <p className="text-neutral-400 leading-relaxed">
                    Crococast Trends Salon<br />
                    450 West 14th Street, Meatpacking District<br />
                    New York, NY 10014
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0 text-emerald-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-white block">Private Appointment Hours</span>
                  <p className="text-neutral-400 leading-relaxed">
                    Tuesday – Saturday: 11:00 AM – 7:00 PM<br />
                    Sunday: Private Appointments Only
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-emerald-950/40 border border-emerald-800/40 rounded-3xl">
            <h4 className="font-display font-bold text-sm text-emerald-300 mb-1">
              Bespoke Made-to-Measure Commissions
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Seeking a custom exotic croc-cast duffle bag colorway or monogrammed brass buckle? Reach out to our design atelier for bespoke commissions with 3-week lead time.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto pt-10 border-t border-neutral-800">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
            Common Inquiries
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-sm text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-emerald-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
