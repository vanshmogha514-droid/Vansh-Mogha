import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  ExternalLink, 
  Copy, 
  Check, 
  Truck, 
  Lock, 
  ArrowRight, 
  CheckCircle,
  Package,
  ShoppingBag,
  Info
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod, CustomerInfo, Order } from '../types';
import { CrocImage } from '../components/CrocImage';
import paymentQrCodeAsset from '../assets/images/payment_qr_code_1790960932255.jpg';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal, 
    placeOrder, 
    navigate,
    showToast 
  } = useStore();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('India');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [orderNotes, setOrderNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('gpay_qr');
  const [transactionRef, setTransactionRef] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [showQrZoom, setShowQrZoom] = useState(false);

  // Card Inputs (if card selected)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const shippingCost = shippingMethod === 'express' ? 299 : 0;
  const finalTotal = cartTotal + shippingCost;
  const userUpiId = 'vanshmogha514@okhdfcbank';
  const userBeneficiaryName = 'VANSH MOGHA';
  const qrImagePath = paymentQrCodeAsset || '/images/payment_qr_code.jpg';

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(userUpiId);
    setCopiedUpi(true);
    showToast('UPI ID Copied', `Copied ${userUpiId} to clipboard.`, 'success');
    setTimeout(() => setCopiedUpi(false), 3000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0 && !confirmedOrder) {
      navigate('shop');
      return;
    }

    if (!fullName || !email || !phone || !street || !city || !state || !postalCode) {
      showToast('Missing Details', 'Please fill in all required shipping address fields.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const customerInfo: CustomerInfo = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        street: street.trim(),
        apartment: apartment.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        country
      };

      const newOrder = placeOrder(
        customerInfo,
        paymentMethod,
        shippingMethod,
        transactionRef.trim() || undefined,
        orderNotes.trim() || undefined
      );

      setIsProcessing(false);
      setConfirmedOrder(newOrder);
      showToast('Order Confirmed!', `Order ${newOrder.orderNumber} successfully received.`, 'success');
    }, 1000);
  };

  // Order Confirmed State
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
            <CheckCircle className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2">
            Payment & Order Authorized
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-2">
            Thank You, {confirmedOrder.customer.fullName}
          </h1>
          <p className="text-neutral-400 text-sm max-w-lg mx-auto mb-8">
            Your Crococast Trends order has been placed into our artisan queue and registered in the dispatch database.
          </p>

          <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl text-left space-y-4 mb-8">
            <div className="flex flex-wrap items-center justify-between pb-4 border-b border-neutral-800 gap-2">
              <div>
                <span className="text-xs text-neutral-400 block">Order Identifier</span>
                <span className="font-mono font-bold text-lg text-emerald-400">{confirmedOrder.orderNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-400 block">Payment Method</span>
                <span className="font-mono text-sm font-semibold text-white capitalize">
                  {confirmedOrder.paymentMethod === 'gpay_qr' ? 'Google Pay QR (UPI)' : confirmedOrder.paymentMethod}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-400 block font-semibold mb-1">Shipping To:</span>
                <p className="text-neutral-300">
                  {confirmedOrder.customer.fullName}<br />
                  {confirmedOrder.customer.street} {confirmedOrder.customer.apartment}<br />
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.state} {confirmedOrder.customer.postalCode}<br />
                  {confirmedOrder.customer.country}
                </p>
              </div>
              <div>
                <span className="text-neutral-400 block font-semibold mb-1">Order Details:</span>
                <p className="text-neutral-300">
                  Total Paid: <strong className="font-mono text-emerald-400">₹{confirmedOrder.total.toLocaleString('en-IN')} INR</strong><br />
                  Status: <strong className="text-white">{confirmedOrder.orderStatus}</strong><br />
                  Reference: <span className="font-mono text-neutral-400">{confirmedOrder.transactionRef}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate('admin')}
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-emerald-400" />
              <span>View in Admin Dashboard</span>
            </button>

            <button
              onClick={() => navigate('shop')}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl text-sm font-bold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-2">No items to checkout</h2>
        <p className="text-neutral-400 text-sm mb-6">Your shopping cart is currently empty.</p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-emerald-500 text-neutral-950 font-bold rounded-xl text-sm cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
          Secure Gateway
        </div>
        <h1 className="font-display font-bold text-3xl text-white">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Form Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Step 1: Customer Contact Info */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-center font-bold">1</span>
              Customer Contact Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Sterling"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="jordan@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number (with country code) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination Address */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-center font-bold">2</span>
              Shipping Destination
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="1245 Fifth Avenue"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Apartment, Suite, Unit (optional)</label>
                <input
                  type="text"
                  placeholder="Penthouse 4B"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">State / Province *</label>
                  <input
                    type="text"
                    required
                    placeholder="NY"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Postal / ZIP Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="10029"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">Country *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Japan">Japan</option>
                  <option value="India">India</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              {/* Shipping Method */}
              <div className="pt-2">
                <span className="block text-xs font-semibold text-neutral-300 mb-2">Freight Option:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label 
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      shippingMethod === 'standard' 
                        ? 'border-emerald-500 bg-emerald-950/40 text-white' 
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-emerald-500 mt-0.5"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Insured Standard Freight</div>
                      <div className="text-[11px] text-neutral-400">4–7 Business Days · Free</div>
                    </div>
                  </label>

                  <label 
                    className={`p-3 rounded-xl border cursor-pointer flex items-start gap-3 transition-colors ${
                      shippingMethod === 'express' 
                        ? 'border-emerald-500 bg-emerald-950/40 text-white' 
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-emerald-500 mt-0.5"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Priority Courier Air</div>
                      <div className="text-[11px] text-neutral-400">2–3 Days Priority · +₹299</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Gateway Section (Prominently featured Google Pay QR & PayPal) */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center justify-center font-bold">3</span>
                Payment Gateway Selection
              </h3>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Verified Merchant
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('gpay_qr')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === 'gpay_qr'
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <QrCode className="w-5 h-5 text-emerald-400" />
                <span>Google Pay QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === 'paypal'
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <div className="font-black text-sm tracking-tight text-blue-400">Pay<span className="text-sky-300">Pal</span></div>
                <span>PayPal Link</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-neutral-300" />
                <span>Debit / Credit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Truck className="w-5 h-5 text-amber-400" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* PAYMENT TAB: GOOGLE PAY & PHONEPE QR CODE */}
            {paymentMethod === 'gpay_qr' && (
              <div className="p-6 bg-neutral-950 border border-emerald-500/30 rounded-2xl space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  
                  {/* Google Pay / PhonePe QR Code Visual Card */}
                  <div className="relative group shrink-0">
                    <div 
                      onClick={() => setShowQrZoom(true)}
                      className="w-56 bg-neutral-900 border-2 border-emerald-500/60 rounded-2xl p-4 shadow-2xl flex flex-col items-center justify-between cursor-pointer hover:border-emerald-400 transition-all hover:scale-[1.02]"
                    >
                      {/* Brand Header */}
                      <div className="w-full flex items-center justify-between pb-2 border-b border-neutral-800">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                            पे
                          </div>
                          <span className="font-display font-bold text-xs text-white">PhonePe / GPay</span>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-emerald-400">ACCEPTED</span>
                      </div>

                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider py-1.5 font-semibold">
                        Scan & Pay Using Any UPI App
                      </div>

                      {/* Display QR code image */}
                      <div className="relative w-44 h-44 rounded-xl overflow-hidden bg-black border border-neutral-700 flex items-center justify-center p-1">
                        <img
                          src={qrImagePath}
                          alt="Google Pay / PhonePe QR Code - Vansh Mogha"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/images/payment_qr_code.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[10px] font-semibold text-white bg-neutral-950/90 px-2 py-1 rounded border border-neutral-700">
                            Click to Enlarge
                          </span>
                        </div>
                      </div>

                      {/* Account Holder Name */}
                      <div className="pt-2 text-center w-full">
                        <span className="font-display font-black text-xs text-white tracking-wider block">
                          {userBeneficiaryName}
                        </span>
                        <span className="text-[9px] text-neutral-500 font-mono block">
                          Verified Official Merchant
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details & Confirmation Form */}
                  <div className="flex-1 space-y-4 text-xs text-neutral-300 w-full">
                    <div>
                      <div className="font-bold text-white text-base mb-1">
                        Pay ₹{finalTotal.toLocaleString('en-IN')} INR via Google Pay or Any UPI App
                      </div>
                      <p className="text-neutral-400 text-xs leading-relaxed">
                        1. Open <strong>Google Pay</strong>, <strong>PhonePe</strong>, or any UPI payment app on your smartphone.<br />
                        2. Scan the QR code shown here, or transfer to the verified UPI ID below.<br />
                        3. Enter your <strong>12-digit UTR / Reference Number</strong> to verify and immediately confirm your order dispatch.
                      </p>
                    </div>

                    {/* Copy UPI ID Box */}
                    <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                          Official Merchant UPI ID:
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">Verified Account</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 font-mono font-bold text-emerald-400 text-sm bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 truncate">
                          {userUpiId}
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                        </button>
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Beneficiary Name: <strong className="text-white">{userBeneficiaryName}</strong>
                      </div>
                    </div>

                    {/* Reference ID input */}
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Transaction UTR / Reference ID * (from Google Pay / PhonePe)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12-digit UTR (e.g. 429381029384) or GPAY-REF-9021"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Our administrative dashboard validates this reference code upon order receipt.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENT TAB: PAYPAL LINK */}
            {paymentMethod === 'paypal' && (
              <div className="p-6 bg-neutral-950 border border-blue-500/30 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-neutral-800 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="font-black text-xl tracking-tight text-blue-400">Pay<span className="text-sky-300">Pal</span></div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Checkout Gateway</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Total Due: ₹{finalTotal.toLocaleString('en-IN')} INR</span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  Click the <strong>External PayPal Checkout</strong> button below to open PayPal's secure portal in a new tab. You can pay using your PayPal balance, linked bank account, or debit/credit card.
                </p>

                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-neutral-300">
                    <span className="font-semibold text-white block">Official Merchant PayPal:</span>
                    <span className="font-mono text-blue-400 text-xs">payments@crococasttrends.com</span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">Instant international payment protection</span>
                  </div>

                  <a
                    href="https://www.paypal.com/checkoutnow"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      showToast('PayPal Gateway', 'Opened PayPal secure portal. Complete your transfer and enter your reference ID.', 'info');
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-amber-400/20 hover:scale-[1.02] no-underline"
                  >
                    <span>Open PayPal Secure Portal</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    PayPal Transaction ID / Receipt Number (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PP-TXN-902341 or PayPal Email"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">
                    You can paste your PayPal confirmation receipt code to speed up verification.
                  </span>
                </div>
              </div>
            )}

            {/* PAYMENT TAB: CARD */}
            {paymentMethod === 'card' && (
              <div className="p-6 bg-neutral-950 border border-neutral-800 rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Card Number</label>
                  <input
                    type="text"
                    maxLength={19}
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Security CVC</label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PAYMENT TAB: CASH ON DELIVERY */}
            {paymentMethod === 'cod' && (
              <div className="p-5 bg-neutral-950 border border-amber-500/30 rounded-2xl text-xs space-y-2">
                <div className="font-bold text-white text-sm">Cash on Delivery Verification</div>
                <p className="text-neutral-400 leading-relaxed">
                  You will inspect and pay <strong>₹{finalTotal.toLocaleString('en-IN')} INR</strong> in cash upon physical courier arrival. A phone verification call will be placed prior to dispatching your handcrafted order.
                </p>
              </div>
            )}

            {/* Delivery Instructions / Order Notes */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Concierge Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Gate code, gift packaging instructions, or delivery requests..."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="p-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-5">
            <h3 className="font-display font-bold text-lg text-white">
              Order Breakdown ({cart.length} Items)
            </h3>

            {/* Item Previews */}
            <div className="divide-y divide-neutral-800 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg bg-neutral-950 overflow-hidden border border-neutral-800 shrink-0">
                    <CrocImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.product.name}</h4>
                    <span className="text-[11px] text-neutral-400 block">
                      {item.selectedColor} {item.selectedSize ? `· ${item.selectedSize}` : ''} · Qty {item.quantity}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-white tabular-nums">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Totals Calculation */}
            <div className="space-y-2.5 text-xs pt-4 border-t border-neutral-800">
              <div className="flex justify-between text-neutral-400">
                <span>Items Subtotal</span>
                <span className="font-mono text-white tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Shipping ({shippingMethod === 'express' ? 'Priority Air' : 'Standard'})</span>
                <span className="font-mono text-white">
                  {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                </span>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline text-sm">
                <span className="font-bold text-white">Final Total</span>
                <div className="text-right">
                  <span className="font-mono font-black text-2xl text-emerald-400 tabular-nums">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-neutral-500 font-mono block">INR</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-800 text-neutral-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Order...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Place Order & Complete Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>

            {/* Trust Markers */}
            <div className="p-3 bg-neutral-950/60 border border-neutral-800/80 rounded-xl space-y-1.5 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant confirmation sent to your email address</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Package className="w-3.5 h-3.5 text-emerald-400" />
                <span>Automatically dispatched to our Admin Order Center</span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* QR Code Full-Screen Zoom Modal */}
      {showQrZoom && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-sm w-full p-6 text-center relative shadow-2xl">
            <button
              onClick={() => setShowQrZoom(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2"
            >
              ✕
            </button>

            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold">
                पे
              </div>
              <span className="font-display font-bold text-sm text-white">Google Pay & PhonePe</span>
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-3">
              Scan with Phone Camera
            </span>

            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border-2 border-emerald-500/50 p-2 mb-4 shadow-xl">
              <img
                src={qrImagePath}
                alt="Enlarged Google Pay / PhonePe QR Code - Vansh Mogha"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/images/payment_qr_code.jpg';
                }}
              />
            </div>

            <div className="text-sm font-bold text-white mb-1">
              {userBeneficiaryName}
            </div>
            <div className="text-xs font-mono text-emerald-400 mb-4">
              {userUpiId}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyUpi}
                className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors"
              >
                {copiedUpi ? 'Copied to Clipboard!' : 'Copy UPI ID'}
              </button>
              <button
                type="button"
                onClick={() => setShowQrZoom(false)}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
