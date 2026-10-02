import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  ChevronLeft, 
  Truck, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CrocImage } from '../components/CrocImage';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal, 
    cartItemCount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigate 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 2999;
  const progressToFreeShipping = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const ok = applyCoupon(couponInput);
      if (ok) setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-400">
          <ShoppingBag className="w-8 h-8 text-neutral-500" />
        </div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
          Your Shopping Bag is Empty
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8">
          Explore our collection of sculptural crocodile leather chelsea boots, architectural structured totes, and artisan small goods.
        </p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
        >
          Explore Crococast Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
          Bespoke Cart
        </div>
        <h1 className="font-display font-bold text-3xl text-white">
          Review Your Bag ({cartItemCount} Items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Cart Items List (7-8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-neutral-200 font-medium">
                <Truck className="w-4 h-4 text-emerald-400" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">You unlocked Complimentary Global Freight!</span>
                ) : (
                  <span>Add <strong className="text-white font-mono">₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for Free Delivery</span>
                )}
              </div>
              <span className="font-mono text-neutral-400 text-[11px]">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Itemized Cart List */}
          <div className="border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800 bg-neutral-900/40">
            {cart.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                
                {/* Product Thumbnail + Info */}
                <div className="flex items-center gap-4 flex-1">
                  <div 
                    onClick={() => navigate('product-detail', item.productId)}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 shrink-0 cursor-pointer"
                  >
                    <CrocImage
                      src={item.product.images[0]}
                      alt={item.product.name}
                      category={item.product.category}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                      {item.product.category}
                    </span>
                    <h3 
                      onClick={() => navigate('product-detail', item.productId)}
                      className="font-display font-bold text-white text-base hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                      <span>Color: <strong className="text-neutral-200">{item.selectedColor}</strong></span>
                      {item.selectedSize && (
                        <>
                          <span aria-hidden="true" className="text-neutral-600">·</span>
                          <span>Size: <strong className="text-neutral-200">{item.selectedSize}</strong></span>
                        </>
                      )}
                    </div>
                    <div className="font-mono text-sm text-neutral-300 font-semibold mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-neutral-800">
                  
                  {/* Stepper */}
                  <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-950">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-neutral-400 hover:text-white font-mono text-sm"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono text-xs text-white font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-neutral-400 hover:text-white font-mono text-sm"
                    >
                      +
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="font-mono font-bold text-base text-white tabular-nums min-w-[85px] text-right">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping button */}
          <div>
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary (4-5 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl space-y-5">
            <h3 className="font-display font-bold text-lg text-white">Order Summary</h3>

            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-emerald-950/60 border border-emerald-800/80 rounded-xl text-xs">
                  <div className="flex items-center gap-2 text-emerald-300 font-mono font-bold">
                    <Tag className="w-4 h-4" />
                    <span>{appliedCoupon.code} (-{appliedCoupon.percent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="p-1 text-emerald-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. CROCO10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculation Breakdown */}
            <div className="space-y-3 text-xs pt-3 border-t border-neutral-800">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="font-mono text-white tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promo Discount ({appliedCoupon?.code})</span>
                  <span className="font-mono tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-400">
                <span>Estimated Freight</span>
                <span className="font-mono text-white">
                  {cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹299'}
                </span>
              </div>

              <div className="flex justify-between text-neutral-400">
                <span>GST / Taxes</span>
                <span className="text-white">Included</span>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline text-sm">
                <span className="font-bold text-white">Total Amount</span>
                <div className="text-right">
                  <span className="font-mono font-extrabold text-2xl text-emerald-400 tabular-nums">
                    ₹{cartTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[11px] text-neutral-500 font-mono">INR</span>
                </div>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('checkout')}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee */}
            <div className="pt-2 text-center text-xs text-neutral-500 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
