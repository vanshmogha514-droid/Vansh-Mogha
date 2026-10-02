import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw, X, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery 
  } = useStore();

  const [priceRange, setPriceRange] = useState<'all' | 'under5k' | '5kto15k' | 'above15k'>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchSub = p.subtitle.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchName && !matchSub && !matchDesc) return false;
        }
        // Price range in INR
        if (priceRange === 'under5k' && p.price >= 5000) return false;
        if (priceRange === '5kto15k' && (p.price < 5000 || p.price > 15000)) return false;
        if (priceRange === 'above15k' && p.price <= 15000) return false;
        // In-stock
        if (inStockOnly && (!p.inStock || p.stock <= 0)) return false;
        // Rating
        if (minRating > 0 && p.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // featured default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, minRating, sortBy]);

  const activeFiltersCount = 
    (selectedCategory !== 'All' ? 1 : 0) +
    (priceRange !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setPriceRange('all');
    setInStockOnly(false);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-1">
          Complete Catalog
        </div>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white">
          The Crococast Trends Boutique
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Discover our full selection of hand-cast crocodile leather footwear, architectural carryalls, RFID wallets, and precision automatic timepieces.
        </p>
      </div>

      {/* Action / Sorting Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-neutral-800 mb-8">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white font-medium"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-emerald-500 text-neutral-950 text-xs font-bold rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <span className="text-xs font-mono text-neutral-400">
            Showing <strong className="text-white tabular-nums">{filteredProducts.length}</strong> of {products.length} Products
          </span>

          {activeFiltersCount > 0 && (
            <button
              onClick={resetAllFilters}
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 ml-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-neutral-400 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-emerald-500"
          >
            <option value="featured">Featured Collection</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6">
          {/* Search Box */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Search Trends
            </h4>
            <div className="relative">
              <input
                type="text"
                placeholder="Product name, color..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Categories
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                <span>All Collections</span>
                <span className="font-mono text-[10px] text-neutral-500">{products.length}</span>
              </button>

              {categories.map((cat) => {
                const count = products.filter(p => p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="font-mono text-[10px] text-neutral-500">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Price Range
            </h4>
            <div className="space-y-1.5 text-xs text-neutral-300">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under5k', label: 'Under ₹5,000' },
                { id: '5kto15k', label: '₹5,000 – ₹15,000' },
                { id: 'above15k', label: '₹15,000 & Above' }
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={priceRange === opt.id}
                    onChange={() => setPriceRange(opt.id as any)}
                    className="accent-emerald-500 w-3.5 h-3.5"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Toggles */}
          <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Availability & Rating
            </h4>
            <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-emerald-500 rounded w-3.5 h-3.5"
              />
              <span>In-Stock Items Only</span>
            </label>

            <div className="pt-2 border-t border-neutral-800">
              <label htmlFor="rating-filter" className="block text-xs text-neutral-400 mb-1.5">
                Minimum Rating: {minRating > 0 ? `${minRating} Stars & Up` : 'Any'}
              </label>
              <input
                id="rating-filter"
                type="range"
                min="0"
                max="4.9"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 h-1 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">No Matching Products Found</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                We couldn't find any crococast products matching your active filters. Try adjusting your search query or reset your filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-sm transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="bg-neutral-950 w-full max-w-sm h-full p-6 overflow-y-auto border-l border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <h3 className="font-display font-bold text-lg text-white">Filter Catalog</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Product name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              {/* Mobile Categories */}
              <div className="mb-6">
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  Category
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                      selectedCategory === 'All'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'text-neutral-400 hover:bg-neutral-900'
                    }`}
                  >
                    All Collections
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                        selectedCategory === c
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'text-neutral-400 hover:bg-neutral-900'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="mb-6">
                <label className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                  Price
                </label>
                <div className="space-y-1.5 text-xs text-neutral-300">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under5k', label: 'Under ₹5,000' },
                    { id: '5kto15k', label: '₹5,000 – ₹15,000' },
                    { id: 'above15k', label: '₹15,000 & Above' }
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mobilePriceRange"
                        checked={priceRange === opt.id}
                        onChange={() => setPriceRange(opt.id as any)}
                        className="accent-emerald-500 w-3.5 h-3.5"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex gap-3">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-2.5 bg-neutral-900 text-neutral-300 hover:text-white rounded-lg text-xs font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 bg-emerald-500 text-neutral-950 rounded-lg text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
