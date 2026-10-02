import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CrocImage } from './CrocImage';

interface Slide {
  id: string;
  tagline: string;
  title: string;
  description: string;
  ctaText: string;
  ctaAction: () => void;
  image: string;
  category: string;
}

export const HeroSlider: React.FC = () => {
  const { navigate } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: Slide[] = [
    {
      id: 'slide-1',
      tagline: 'FALL/WINTER 2026 EDITION',
      title: 'Sculpted Crocodile Cast Leather',
      description: 'Handcrafted European full-grain calfskin pressed with high-relief reptilian grain. Built for the modern vanguard of luxury streetwear.',
      ctaText: 'Explore New Footwear',
      ctaAction: () => navigate('shop', null, 'Footwear'),
      image: '/images/hero_crococast_luxury.jpg',
      category: 'Footwear & Luggage'
    },
    {
      id: 'slide-2',
      tagline: 'ARCHITECTURAL STATEMENT BAGS',
      title: 'The Nocturne Sovereign Collection',
      description: 'Structured silhouettes meet mirror-glazed obsidian crocodile hide and 24K gold-plated custom hardware. Crafted by generational leather artisans in Milano.',
      ctaText: 'Shop Handcrafted Bags',
      ctaAction: () => navigate('shop', null, 'Bags & Luggage'),
      image: '/images/product_croc_tote_bag.jpg',
      category: 'Leather Bags'
    },
    {
      id: 'slide-3',
      tagline: 'ICONIC EMERALD PATINA',
      title: 'The Apex Goodyear Chelsea Boot',
      description: 'Engineered with deep-groove crocodile scales, memory-foam insole cushioning, and storm-welted leather outsoles. Unyielding durability meets runway distinction.',
      ctaText: 'View Boot Details',
      ctaAction: () => navigate('product-detail', 'croco-01'),
      image: '/images/product_croc_chelsea_boot.jpg',
      category: 'Footwear'
    }
  ];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section 
      aria-label="Campaign Hero Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-800"
    >
      <div className="relative min-h-[540px] md:min-h-[620px] flex items-center">
        {/* Background Image with Contrast Scrim */}
        <div className="absolute inset-0">
          <CrocImage
            src={active.image}
            alt={active.title}
            fallbackTitle={active.title}
            category={active.category}
            className="w-full h-full object-cover transition-all duration-1000 transform scale-100"
          />
          {/* Measured Scrim for WCAG AA compliance */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
          <div className="max-w-2xl">
            {/* Unboxed Metadata Tagline */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-widest text-emerald-400 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{active.tagline}</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="text-neutral-400">AUTHENTIC CROC CAST</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-6 text-balance">
              {active.title}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              {active.description}
            </p>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={active.ctaAction}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm tracking-wide rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('shop')}
                className="px-6 py-3.5 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-medium text-sm tracking-wide rounded-lg transition-colors cursor-pointer"
              >
                Browse All Trends
              </button>
            </div>

            {/* Trust Markers placed cleanly */}
            <div className="flex items-center gap-6 mt-12 pt-6 border-t border-neutral-800/80 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified Full-Grain Italian Hide</span>
              </div>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>Complimentary Worldwide Returns</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>100% Authentic Cast Guarantee</span>
            </div>
          </div>
        </div>

        {/* Slide Controls & Carousel Arrows */}
        <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-8 h-1.5 bg-emerald-400 rounded-full' 
                    : 'w-2 h-1.5 bg-neutral-600 hover:bg-neutral-400 rounded-full'
                }`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-2.5 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-2.5 rounded-lg bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
