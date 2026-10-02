import React from 'react';
import { ArrowRight, Star, CheckCircle, ShieldCheck, Gem, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { HeroSlider } from '../components/HeroSlider';
import { ProductCard } from '../components/ProductCard';
import { CrocImage } from '../components/CrocImage';
import { ProductCategory } from '../types';

export const HomePage: React.FC = () => {
  const { products, categories, reviews, navigate } = useStore();

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);
  const featuredReviews = reviews.slice(0, 3);

  const categoryCards: { title: ProductCategory; desc: string; image: string }[] = [
    {
      title: 'Footwear',
      desc: 'Chelsea boots & ergonomic street slides',
      image: '/images/product_croc_chelsea_boot.jpg'
    },
    {
      title: 'Bags & Luggage',
      desc: 'Structured totes & intercontinental travel duffles',
      image: '/images/product_croc_tote_bag.jpg'
    },
    {
      title: 'Wallets & Clutches',
      desc: 'Slim RFID money clips & tablet folios',
      image: '/images/product_croc_bifold_wallet.jpg'
    },
    {
      title: 'Watches & Straps',
      desc: 'Automatic chronos with hand-stitched flank straps',
      image: '/images/product_croc_chrono_watch.jpg'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Section Slider */}
      <HeroSlider />

      {/* 2. Curated Categories List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              Bespoke Taxonomy
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Crococast Collections
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryCards.map((cat) => (
            <div
              key={cat.title}
              onClick={() => navigate('shop', null, cat.title)}
              className="group relative h-80 rounded-xl overflow-hidden border border-neutral-800 hover:border-emerald-500/60 transition-all duration-300 cursor-pointer flex flex-col justify-end p-6"
            >
              <CrocImage
                src={cat.image}
                alt={cat.title}
                fallbackTitle={cat.title}
                category={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />

              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                  Collection
                </span>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-300 transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mb-3">
                  {cat.desc}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                  <span>Browse Selection</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured 8-12 Crococast Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              Hand-Selected Casts
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Signature Crococast Pieces
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Limited runs manufactured from heat-relief crocodile calfskin with reinforced architectural hardware.
            </p>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer self-start sm:self-auto"
          >
            View Complete Catalog ({products.length})
          </button>
        </div>

        {/* 3-4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Craftsmanship & Heritage Spotlight */}
      <section className="bg-neutral-900/40 border-y border-neutral-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
                Material Integrity
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight mb-6">
                The Science of High-Relief Croc Casting
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed mb-6">
                Unlike synthetic vinyl substitutes that crack within months, our crococast technique presses archival steel relief matrices into prime full-grain European calf hides at calibrated temperatures. The result is a sculptural texture with organic grain variations, deep luster, and lifetime resilience.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full-Grain Italian Calfhide</h4>
                    <p className="text-xs text-neutral-400">Naturally drum-dyed for color saturation through the entire cross-section of the leather.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">PVD Vacuum Brass Hardware</h4>
                    <p className="text-xs text-neutral-400">Corrosion-proof, tarnish-resistant electroplated fittings rated for marine durability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Hand-Burnished Waxed Edges</h4>
                    <p className="text-xs text-neutral-400">Five consecutive layers of edge paint hand-sanded and sealed for enduring elegance.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('shop')}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-sm transition-colors cursor-pointer"
              >
                Experience the Collection
              </button>
            </div>

            <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
              <CrocImage
                src="/images/hero_crococast_luxury.jpg"
                alt="Crocodile Cast Leather Studio Showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold text-white">Workshop Milano & Florence</span>
                  <span className="font-mono text-emerald-400">Grade AAA Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Product Reviews & Verified Patron Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
            Verified Experiences
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Client Reviews & Endorsements
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Read authentic feedback from collectors and connoisseurs wearing Crococast Trends worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Verified Flag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="text-[11px] font-mono font-medium text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified Order
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-white text-base mb-2">
                  "{rev.title}"
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-neutral-200">{rev.author}</span>
                <span className="font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
