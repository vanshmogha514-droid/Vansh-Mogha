import React from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { CrocImage } from './CrocImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate('product-detail', product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      {/* Visual Image Container */}
      <div className="relative aspect-4/3 w-full bg-neutral-950 overflow-hidden">
        <CrocImage
          src={product.images[0]}
          alt={product.name}
          fallbackTitle={product.name}
          category={product.category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Scrim on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge (Single subtle text marker, no badge sandwich) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-neutral-950/90 border border-neutral-700/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-colors cursor-pointer ${
            wishlisted 
              ? 'bg-emerald-500 text-neutral-950' 
              : 'bg-neutral-950/70 text-neutral-300 hover:text-white hover:bg-neutral-900'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-neutral-950' : ''}`} />
        </button>

        {/* Quick Action Overlay Bar on Hover */}
        <div className="absolute bottom-3 inset-x-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-black/50 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
          <button
            onClick={handleCardClick}
            aria-label="View Details"
            className="p-2 bg-neutral-900/90 hover:bg-neutral-800 text-white rounded-lg transition-colors border border-neutral-700/60"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with typographic bullet separator */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-emerald-400/90 text-[11px]">
              {product.category}
            </span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <div className="flex items-center gap-1 text-neutral-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-mono text-xs tabular-nums">{product.rating}</span>
              <span className="text-neutral-500 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-display font-bold text-base text-white tracking-tight group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Subtitle */}
          <p className="text-xs text-neutral-400 line-clamp-1 mb-3">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Availability Row */}
        <div className="flex items-baseline justify-between pt-2 border-t border-neutral-800/80">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-lg text-white tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="font-mono text-xs text-neutral-500 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-emerald-400">
            {product.stock <= 5 ? `Only ${product.stock} left` : 'In Stock'}
          </span>
        </div>
      </div>
    </div>
  );
};
