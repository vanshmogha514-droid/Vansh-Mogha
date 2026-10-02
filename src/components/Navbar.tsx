import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigate, 
    cartItemCount, 
    wishlist, 
    searchQuery, 
    setSearchQuery,
    isAdminLoggedIn 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin Dashboard' }
  ];

  const handleNavClick = (pageId: string) => {
    navigate(pageId);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('shop');
      setShowSearchModal(false);
    }
  };

  return (
    <>
      {/* Promotional announcement bar - single line, minimal */}
      <div className="bg-emerald-950/70 border-b border-emerald-800/30 text-emerald-200 text-xs py-1.5 px-4 text-center tracking-wider">
        <span className="font-semibold text-emerald-400">CROCOCAST RUN</span> · Complimentary Insured Shipping On Orders Over ₹2,999 · Code: <span className="font-mono font-bold text-white">CROCO10</span>
      </div>

      {/* Top Bar - strictly obeys the 3-zone contract */}
      <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            className="group text-left flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-md bg-emerald-900/60 border border-emerald-500/40 flex items-center justify-center transition-colors group-hover:border-emerald-400">
              <span className="font-display font-black text-emerald-400 text-sm tracking-tighter">CT</span>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-white uppercase group-hover:text-emerald-400 transition-colors">
              crococast <span className="text-emerald-400 font-semibold lowercase tracking-normal">trends</span>
            </span>
          </button>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors whitespace-nowrap cursor-pointer py-1 relative ${
                    isActive 
                      ? 'text-emerald-400 font-semibold' 
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary interactive affordances */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              aria-label="Search Catalog"
              className="p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => navigate('shop')}
              title={`Wishlist (${wishlist.length})`}
              aria-label="Wishlist"
              className="relative p-2 text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-500 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => navigate('cart')}
              aria-label="Shopping Bag"
              className="flex items-center gap-2 px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Bag</span>
              <span className="font-mono text-xs px-1.5 py-0.5 bg-emerald-500 text-neutral-950 font-bold rounded">
                {cartItemCount}
              </span>
            </button>

            {/* Direct Admin Dashboard Action Pill */}
            <button
              onClick={() => navigate('admin')}
              title="Admin Order Dashboard"
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-500/20'
                  : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2 px-3 rounded-md text-base font-medium flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                <span>{link.label}</span>
                {link.id === 'admin' && (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 w-full max-w-xl shadow-2xl relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-lg font-bold text-white mb-4">Search Crococast Products</h3>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  placeholder="e.g. Chelsea Boot, Sovereign Tote, Wallet..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold rounded-lg text-sm transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-400">
              <span className="font-semibold text-neutral-300">Popular Searches:</span> Chelsea Boots · Wallets · Duffle Bag · Leather Belt
            </div>
          </div>
        </div>
      )}
    </>
  );
};
