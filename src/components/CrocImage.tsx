import React, { useState, useRef, useEffect } from 'react';

interface CrocImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  category?: string;
}

export const CrocImage: React.FC<CrocImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  category,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset states when src changes & check if already loaded from cache
  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);

    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else if (imgRef.current.src) {
        setHasError(true);
      }
    }
  }, [src]);

  // If source is missing or errored out, render luxury crocodile textured fallback
  if (!src || hasError) {
    return (
      <div 
        className={`relative overflow-hidden bg-neutral-900 flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Crocodile skin scale geometric pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="croc-scales" width="40" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
                <path d="M 0 0 L 20 6 L 40 0 L 40 18 L 20 24 L 0 18 Z" fill="none" stroke="#10b981" strokeWidth="0.8" />
                <path d="M 20 6 L 20 24" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="20" cy="15" r="2" fill="#10b981" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#croc-scales)" />
          </svg>
        </div>

        {/* Ambient emerald vignette glow */}
        <div className="absolute inset-0 bg-radial from-emerald-950/40 via-transparent to-neutral-950/80 pointer-events-none" />

        {/* Brand Monogram Crest */}
        <div className="relative z-10 w-14 h-14 rounded-full border border-emerald-500/30 bg-neutral-950/90 flex items-center justify-center mb-3 shadow-lg shadow-emerald-950/50">
          <span className="font-display font-bold text-lg tracking-wider text-emerald-400">CT</span>
        </div>

        <div className="relative z-10 max-w-xs">
          <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-500/80 block mb-1">
            {category || 'Crococast Trends'}
          </span>
          <p className="text-xs font-semibold text-neutral-300 line-clamp-2">
            {fallbackTitle || alt}
          </p>
          <span className="text-[10px] text-neutral-500 mt-2 block tracking-wider">
            PREMIUM CROC CAST HIDE
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {/* Background skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-emerald-500/20 border-t-emerald-500 animate-spin" />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
