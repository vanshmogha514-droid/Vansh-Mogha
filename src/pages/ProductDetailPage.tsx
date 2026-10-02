import React, { useState } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  ChevronLeft, 
  Check, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CrocImage } from '../components/CrocImage';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { 
    products, 
    selectedProductId, 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    getProductReviews,
    addReview 
  } = useStore();

  // Find product or fallback to first
  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'care'>('desc');

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-white mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('shop')}
          className="px-4 py-2 bg-emerald-500 text-neutral-950 font-bold rounded-lg"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const productReviews = getProductReviews(product.id);
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    addReview(product.id, reviewName, reviewRating, reviewTitle || 'Exceptional craftsmanship', reviewComment);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setReviewSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back to Shop breadcrumb */}
      <div className="mb-6">
        <button
          onClick={() => navigate('shop', null, product.category)}
          className="text-xs font-semibold text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to {product.category}</span>
        </button>
      </div>

      {/* Main Contiguous Purchase Layout (2-Column Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
        
        {/* Left Column: Image Gallery (5 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-4/3 w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            <CrocImage
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fallbackTitle={product.name}
              category={product.category}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-neutral-950/90 border border-neutral-700 text-white text-xs font-semibold px-3 py-1 rounded">
                {product.badge}
              </div>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Wishlist"
              className={`absolute top-4 right-4 p-2.5 rounded-xl backdrop-blur-md transition-colors cursor-pointer ${
                wishlisted
                  ? 'bg-emerald-500 text-neutral-950'
                  : 'bg-neutral-950/80 text-white hover:bg-neutral-900'
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? 'fill-neutral-950' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-colors cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'border-neutral-800 hover:border-neutral-600 opacity-70 hover:opacity-100'
                  }`}
                >
                  <CrocImage
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Contiguous Purchase Module (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div>
            {/* Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
              <span className="font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                {product.category}
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <div className="flex items-center gap-1 text-neutral-300">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-mono text-xs font-bold tabular-nums">{product.rating}</span>
                <span className="text-neutral-500 text-xs">({productReviews.length || product.reviewCount} Reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug mb-2">
              {product.name}
            </h1>

            {/* Subtitle */}
            <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 py-3 border-y border-neutral-800/80">
              <span className="font-mono font-bold text-3xl text-white tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="font-mono text-base text-neutral-500 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    ).toFixed(0)}% Off)
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 mb-2">
              <span>Color Shade: <strong className="text-white">{selectedColor}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
                    selectedColor === c.name
                      ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-500/20'
                      : 'border-neutral-700 hover:border-neutral-500'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {selectedColor === c.name && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Selector (if applicable) */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 mb-2">
                <span>Select Size: <strong className="text-white">{selectedSize}</strong></span>
                <span className="text-emerald-400 cursor-pointer hover:underline text-[11px]">True to Size Guide</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-medium transition-colors border cursor-pointer ${
                      selectedSize === s
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Stock */}
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span className="font-semibold text-neutral-300">Quantity</span>
              <span className="text-emerald-400 font-medium">
                {product.stock <= 5 ? `Only ${product.stock} items remaining` : 'Ready to Dispatch'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-2 text-neutral-400 hover:text-white font-mono text-base transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-mono text-sm text-white font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3.5 py-2 text-neutral-400 hover:text-white font-mono text-base transition-colors"
                >
                  +
                </button>
              </div>

              {/* Total Calculation */}
              <div className="text-xs text-neutral-400 font-mono">
                Total: <strong className="text-white text-sm">₹{(product.price * quantity).toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm tracking-wide rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-emerald-500/40 text-white font-semibold text-sm tracking-wide rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Instant Buy with Google Pay / PayPal</span>
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Complimentary expedited courier delivery & tracking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authentic embossed crocodile calfskin guarantee certificate</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>30-day hassle-free size exchange and returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Specifications & Craft Details */}
      <section className="mb-20">
        <div className="border-b border-neutral-800 flex gap-6">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'desc'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Description & Key Features
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'specs'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Artisan Specifications
          </button>
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-4 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              activeTab === 'care'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Leather Care & Maintenance
          </button>
        </div>

        <div className="py-8">
          {activeTab === 'desc' && (
            <div className="space-y-6 max-w-3xl">
              <p className="text-base text-neutral-300 leading-relaxed">
                {product.description}
              </p>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Architectural Highlights</h4>
                <ul className="space-y-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <div className="border border-neutral-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <tbody className="divide-y divide-neutral-800">
                    <tr className="bg-neutral-900/40">
                      <td className="py-3 px-4 font-semibold text-neutral-400 w-1/3">Raw Material</td>
                      <td className="py-3 px-4 text-white font-medium">{product.specs.material}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-400">Metal Fittings & Zips</td>
                      <td className="py-3 px-4 text-white font-medium">{product.specs.hardware}</td>
                    </tr>
                    <tr className="bg-neutral-900/40">
                      <td className="py-3 px-4 font-semibold text-neutral-400">Atelier Origin</td>
                      <td className="py-3 px-4 text-white font-medium">{product.specs.origin}</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-neutral-400">Calibrated Dimensions</td>
                      <td className="py-3 px-4 text-white font-medium">{product.specs.dimensions}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-3xl space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>{product.specs.careInstructions}</p>
              <div className="p-4 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <h5 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider mb-1">
                  Patina Evolution Note
                </h5>
                <p className="text-xs text-neutral-400">
                  Natural croc-cast calfskin absorbs gentle daily wear and atmospheric oils, developing an exquisite burnished gloss over years of devoted use. Keep in provided cotton dust cover when resting.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews Section for this Product */}
      <section className="mb-20 border-t border-neutral-800 pt-16">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            Verified Feedback
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6">
            Customer Reviews ({productReviews.length})
          </h2>

          {/* Overall Rating Scorecard */}
          <div className="p-6 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row items-center gap-6 mb-10">
            <div className="text-center sm:text-left sm:border-r sm:border-neutral-800 sm:pr-8">
              <div className="font-mono font-extrabold text-4xl text-white tabular-nums mb-1">
                {product.rating}
              </div>
              <div className="flex items-center gap-1 text-amber-400 mb-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-neutral-400">Based on {productReviews.length || product.reviewCount} customer reviews</span>
            </div>

            <div className="flex-1 w-full text-xs space-y-1.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = productReviews.filter(r => Math.round(r.rating) === stars).length;
                const pct = productReviews.length ? Math.round((count / productReviews.length) * 100) : stars === 5 ? 85 : 15;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-12 text-neutral-400 font-mono">{stars} Stars</span>
                    <div className="flex-1 h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-neutral-500 text-right font-mono">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6 mb-12">
            {productReviews.length === 0 ? (
              <p className="text-sm text-neutral-400 italic">No reviews yet for this piece. Be the first to review!</p>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} className="p-5 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-neutral-500">{rev.date}</span>
                  </div>

                  <h4 className="font-bold text-white text-sm">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {rev.comment}
                  </p>

                  <div className="pt-2 border-t border-neutral-800/60 flex items-center justify-between text-xs text-neutral-400">
                    <span className="font-semibold text-neutral-200">{rev.author}</span>
                    {rev.verified && (
                      <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified Buyer
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Write a Review Form */}
          <div className="p-6 bg-neutral-900/80 border border-neutral-800 rounded-2xl">
            <h3 className="font-display font-bold text-lg text-white mb-2">Write a Customer Review</h3>
            <p className="text-xs text-neutral-400 mb-6">Share your styling experience with the Crococast community.</p>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs">
                Thank you! Your verified review has been published above.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-neutral-300">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Christian Grey"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Review Headline</label>
                    <input
                      type="text"
                      placeholder="e.g. Outstanding texture and finish"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Your Review Details</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How does the leather feel? Fit and comfort? How did you style it?"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-800 pt-16">
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
              Curated Complements
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Pair with Crococast Icons
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
