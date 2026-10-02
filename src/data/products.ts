import { Product, ProductReview, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'croco-01',
    name: 'CrocoCast Apex Chelsea Boot',
    slug: 'crococast-apex-chelsea-boot',
    subtitle: 'Hand-finished emerald crocodile embossed calfskin boot',
    price: 14999,
    originalPrice: 18499,
    category: 'Footwear',
    rating: 4.9,
    reviewCount: 48,
    images: [
      '/images/product_croc_chelsea_boot.jpg',
      '/images/hero_crococast_luxury.jpg'
    ],
    description: 'Sculpted from premium Italian calfskin with an artisan deep-groove crocodile cast relief. Features a stacked Goodyear-welted leather sole, elasticated side gussets, burnished brass heel pull, and cushioned memory footbed for all-day streetwear luxury.',
    features: [
      'Deep embossed crocodile cast texture',
      'Goodyear welted dual-density sole construction',
      'Antiqued solid brass hardware pull tabs',
      'Reinforced stretch micro-rib gusset for effortless slip-on',
      'Supple lambskin interior lining'
    ],
    specs: {
      material: '100% Full-Grain Calfskin with Croc Cast Relief',
      hardware: 'Solid Antiqued Brass',
      origin: 'Florence, Italy',
      dimensions: 'Shaft: 16cm | Heel Height: 3.2cm',
      careInstructions: 'Wipe with microfiber cloth. Condition with natural beeswax cream biannually.'
    },
    colors: [
      { name: 'Emerald Gloss', hex: '#0f382c' },
      { name: 'Obsidian Noir', hex: '#18181b' },
      { name: 'Cognac Amber', hex: '#5c3317' }
    ],
    sizes: ['UK/IND 7 (EU 41)', 'UK/IND 8 (EU 42)', 'UK/IND 9 (EU 43)', 'UK/IND 10 (EU 44)', 'UK/IND 11 (EU 45)'],
    stock: 9,
    inStock: true,
    badge: 'Bestseller',
    isFeatured: true
  },
  {
    id: 'croco-02',
    name: 'CrocoCast Nocturne Sovereign Tote',
    slug: 'crococast-nocturne-sovereign-tote',
    subtitle: 'Architectural structured crocodile leather daily tote',
    price: 19999,
    originalPrice: 24999,
    category: 'Bags & Luggage',
    rating: 4.95,
    reviewCount: 62,
    images: [
      '/images/product_croc_tote_bag.jpg',
      '/images/hero_crococast_luxury.jpg'
    ],
    description: 'A monument to functional luxury. The Nocturne Sovereign Tote features an uncompromising rectangular silhouette wrapped in glazed obsidian crocodile cast hide, with hand-painted beveled edges and signature gold clasp hardware.',
    features: [
      'Accommodates up to 16-inch laptops in padded suede sleeve',
      'Gold-plated 24K electroplated metal twist-lock and feet',
      'Dual reinforced rolled carry handles with 24cm drop',
      'Removable cross-body strap with adjustable buckles',
      'Internal zippered security pouch and dual slip pockets'
    ],
    specs: {
      material: 'Hand-glazed Crocodile Embossed European Leather',
      hardware: '24K Gold-Plated Marine Stainless Steel',
      origin: 'Milano, Italy',
      dimensions: '41cm W x 32cm H x 14cm D',
      careInstructions: 'Store in breathable cotton dust bag; avoid direct sunlight exposure.'
    },
    colors: [
      { name: 'Obsidian Noir', hex: '#18181b' },
      { name: 'Imperial Emerald', hex: '#0f382c' },
      { name: 'Oxblood Crimson', hex: '#4a151b' }
    ],
    stock: 6,
    inStock: true,
    badge: 'Artisan Pick',
    isFeatured: true
  },
  {
    id: 'croco-03',
    name: 'CrocoCast Heritage Bi-Fold & Clip',
    slug: 'crococast-heritage-bifold-clip',
    subtitle: 'Ultra-slim crocodile textured cardholder & wallet',
    price: 3499,
    originalPrice: 4299,
    category: 'Wallets & Clutches',
    rating: 4.88,
    reviewCount: 94,
    images: [
      '/images/product_croc_bifold_wallet.jpg'
    ],
    description: 'Engineered for the discerning minimalist. Crafted with pronounced belly scale crocodile patterns, featuring eight card slots, RFID shielding foil, and an integrated solid brass spring tension money clip.',
    features: [
      'Integrated military-grade RFID identity theft blocker',
      '8 precision beveled card slots + central notes compartment',
      'Spring-loaded solid brass tension money bar',
      'Ultra-thin 7mm profile when loaded',
      'Signature debossed Crococast crest in metallic gold'
    ],
    specs: {
      material: 'Exotic Heat-Embossed Italian Calf Leather',
      hardware: 'Brushed Brass Clip',
      origin: 'Porto, Portugal',
      dimensions: '11cm x 8.5cm x 0.8cm',
      careInstructions: 'Spot clean only with damp cloth.'
    },
    colors: [
      { name: 'Forest Green', hex: '#0f382c' },
      { name: 'Midnight Black', hex: '#18181b' },
      { name: 'Cognac Tan', hex: '#633918' }
    ],
    stock: 24,
    inStock: true,
    badge: 'Bestseller',
    isFeatured: true
  },
  {
    id: 'croco-04',
    name: 'CrocoCast Weekender Grand Duffle',
    slug: 'crococast-weekender-grand-duffle',
    subtitle: '50-liter travel duffle with armored crocodile cast exterior',
    price: 24999,
    originalPrice: 29999,
    category: 'Bags & Luggage',
    rating: 4.92,
    reviewCount: 31,
    images: [
      '/images/hero_crococast_luxury.jpg',
      '/images/product_croc_tote_bag.jpg'
    ],
    description: 'Constructed for intercontinental travel and weekend escapes. Seamlessly blends rugged armored crocodile cast hide with a generous 50-liter luggage chamber, dedicated shoe garage, and heavy-duty YKK Excella zippers.',
    features: [
      'Dedicated ventilated bottom shoe & laundry compartment',
      'TSA-approved brass padlock with leather-sheathed keys',
      'Heavy-duty ergonomic shoulder strap with memory foam pad',
      'Airline overhead bin compliant dimensions',
      'Water-resistant waxed twill lining'
    ],
    specs: {
      material: 'Heavyweight Croc Cast Armor Leather & Waxed Canvas',
      hardware: 'Solid Industrial Brass & YKK Excella Zips',
      origin: 'León, Mexico',
      dimensions: '54cm L x 28cm W x 30cm H',
      careInstructions: 'Leather balm application once per year.'
    },
    colors: [
      { name: 'Stealth Black', hex: '#18181b' },
      { name: 'Croc Emerald', hex: '#0f382c' }
    ],
    stock: 5,
    inStock: true,
    badge: 'Limited Edition',
    isFeatured: true
  },
  {
    id: 'croco-05',
    name: 'CrocoCast Chrono Legacy Watch',
    slug: 'crococast-chrono-legacy-watch',
    subtitle: 'Mechanical timepiece with bespoke crocodile flank strap',
    price: 18999,
    originalPrice: 22999,
    category: 'Watches & Straps',
    rating: 4.85,
    reviewCount: 39,
    images: [
      '/images/product_croc_chrono_watch.jpg',
      '/images/hero_crococast_luxury.jpg'
    ],
    description: 'Precision Japanese automatic chronograph movement paired with an exquisite hand-stitched crocodile scale strap. Sapphire crystal glass with anti-reflective coating and 100-meter water resistance.',
    features: [
      'Self-winding mechanical automatic movement with 42hr reserve',
      'Scratch-proof double-domed sapphire crystal',
      'Hand-stitched crocodile flank strap with deployant butterfly clasp',
      '10 ATM / 100M water resistance certification',
      'Exhibition sapphire caseback showcasing balance wheel'
    ],
    specs: {
      material: '316L Surgical Stainless Steel & Genuine Croc Cast Leather',
      hardware: 'Sapphire Crystal & Deployant Clasp',
      origin: 'Geneva / Tokyo Collaboration',
      dimensions: 'Case: 41mm | Thickness: 11.5mm | Lug Width: 20mm',
      careInstructions: 'Keep strap dry; service mechanical movement every 5 years.'
    },
    colors: [
      { name: 'Emerald & Gold', hex: '#0f382c' },
      { name: 'Obsidian & Silver', hex: '#18181b' }
    ],
    stock: 8,
    inStock: true,
    badge: 'Limited Edition',
    isFeatured: true
  },
  {
    id: 'croco-06',
    name: 'CrocoCast Asymmetrical Biker Moto',
    slug: 'crococast-asymmetrical-biker-moto',
    subtitle: 'Iconic streetwear jacket with relief croc-embossed panels',
    price: 28999,
    originalPrice: 34999,
    category: 'Apparel & Vests',
    rating: 4.96,
    reviewCount: 44,
    images: [
      '/images/product_croc_biker_vest.jpg',
      '/images/hero_crococast_luxury.jpg'
    ],
    description: 'The crowning statement of modern luxury streetwear. Crafted with premium supple lambskin juxtaposed against rigid crocodile cast shoulder yokes and forearm plates. Finished with heavy diagonal metal zips and throat latch.',
    features: [
      'Heavy gauge diagonal front zip with snapped lapels',
      'High-relief crocodile cast shoulder and elbow strike panels',
      'Silky diamond-quilted thermal cupro lining',
      'Action-back shoulder gussets for maximum range of movement',
      'Two zip pockets + interior zippered passport vault'
    ],
    specs: {
      material: '1.2mm Drum-Dyed Lambskin with Croc Cast Yokes',
      hardware: 'Antiqued Nickel Hardware',
      origin: 'London, UK',
      dimensions: 'Cropped Modern Streetwear Cut',
      careInstructions: 'Specialist leather dry cleaning only.'
    },
    colors: [
      { name: 'Pitch Black', hex: '#121212' },
      { name: 'Deep Evergreen', hex: '#0a2e22' }
    ],
    sizes: ['S (38)', 'M (40)', 'L (42)', 'XL (44)', 'XXL (46)'],
    stock: 7,
    inStock: true,
    badge: 'Artisan Pick',
    isFeatured: true
  },
  {
    id: 'croco-07',
    name: 'CrocoCast Street Slide & Mule',
    slug: 'crococast-street-slide-mule',
    subtitle: 'Ergonomic cork-bed slide with embossed crocodile vamp',
    price: 4999,
    originalPrice: 5999,
    category: 'Footwear',
    rating: 4.82,
    reviewCount: 57,
    images: [
      '/images/product_croc_chelsea_boot.jpg'
    ],
    description: 'Effortless warm-weather luxury. Molded natural cork footbed wrapped in buttery suede, crowned with an arched crocodile embossed leather upper and adjustable custom cast roller buckles.',
    features: [
      'Anatomically contoured deep heel cup & arch support',
      'Cast crocodile wide vamp with adjustable brass roller buckle',
      'Shock-absorbing lightweight EVA ripple traction outsole',
      'Soft microfiber under-strap padding to prevent friction',
      'Hand-burnished leather trim'
    ],
    specs: {
      material: 'Crocodile Cast Leather Vamp, Natural Cork & Suede Footbed',
      hardware: 'Custom Cast Roller Buckles',
      origin: 'Alicante, Spain',
      dimensions: 'Sole thickness: 2.4cm',
      careInstructions: 'Treat upper with leather lotion; keep cork away from soaking water.'
    },
    colors: [
      { name: 'Onyx Croc', hex: '#18181b' },
      { name: 'Olive Green', hex: '#1b3b2b' },
      { name: 'Caramel Croc', hex: '#73411b' }
    ],
    sizes: ['UK/IND 7 (EU 41)', 'UK/IND 8 (EU 42)', 'UK/IND 9 (EU 43)', 'UK/IND 10 (EU 44)', 'UK/IND 11 (EU 45)'],
    stock: 15,
    inStock: true,
    badge: 'New Cast',
    isFeatured: false
  },
  {
    id: 'croco-08',
    name: 'CrocoCast Reversible Artisan Belt',
    slug: 'crococast-reversible-artisan-belt',
    subtitle: 'Dual-sided croc cast and smooth bridle leather belt with swivel buckle',
    price: 3999,
    originalPrice: 4999,
    category: 'Accessories & Belts',
    rating: 4.89,
    reviewCount: 78,
    images: [
      '/images/product_croc_leather_belt.jpg',
      '/images/product_croc_bifold_wallet.jpg'
    ],
    description: 'Two belts in one. Rotate the brushed gold mechanical buckle to seamlessly alternate between bold relief crocodile cast scales and sleek matte bridle leather. Hand-stitched with bonded nylon thread.',
    features: [
      'Precision rotating 360-degree buckle mechanism',
      'Dual-side aesthetic: High-shine Croc on side A, Smooth bridle on side B',
      '35mm universal belt width fits all denim and formal trousers',
      'Feathered edge profile with waxed hand-burnished seam',
      'Solid brass pin buckle with Crococast laser etch'
    ],
    specs: {
      material: 'Double-Layered Italian Vegetable-Tanned Leather',
      hardware: 'Solid Rotational Brass Buckle',
      origin: 'Florence, Italy',
      dimensions: 'Width: 3.5cm | Length: 85cm - 115cm',
      careInstructions: 'Avoid over-bending against natural scale direction.'
    },
    colors: [
      { name: 'Black & Emerald', hex: '#18181b' },
      { name: 'Black & Havana Brown', hex: '#3d2516' }
    ],
    sizes: ['32 inch (85cm)', '34 inch (90cm)', '36 inch (95cm)', '38 inch (100cm)', '40 inch (105cm)'],
    stock: 18,
    inStock: true,
    badge: 'Bestseller',
    isFeatured: false
  },
  {
    id: 'croco-09',
    name: 'CrocoCast Imperial Crossbody Sling',
    slug: 'crococast-imperial-crossbody-sling',
    subtitle: 'Tactical streetwear chest pack in armored crocodile leather',
    price: 8999,
    originalPrice: 11499,
    category: 'Bags & Luggage',
    rating: 4.91,
    reviewCount: 51,
    images: [
      '/images/product_croc_tote_bag.jpg',
      '/images/hero_crococast_luxury.jpg'
    ],
    description: 'The ultimate hands-free streetwear essential. Designed to be worn across the chest or over the shoulder, featuring ergonomic curvature, magnetic Fidlock quick-release buckle, and structured crocodile scales.',
    features: [
      'German Fidlock magnetic quick-release buckle system',
      'Dual zippered clamshell opening with gusseted internal dividers',
      'Rear hidden anti-theft zipper compartment for phone & wallet',
      'Waterproof seam-sealed nylon interior pockets',
      'High-density jacquard branded webbing strap'
    ],
    specs: {
      material: 'Armored Croc Cast Cowhide & Cordura Ballistic Nylon',
      hardware: 'Fidlock Magnetic & YKK AquaGuard Zippers',
      origin: 'Seoul / Florence Collab',
      dimensions: '26cm W x 16cm H x 7cm D',
      careInstructions: 'Clean exterior with damp sponge.'
    },
    colors: [
      { name: 'Obsidian Noir', hex: '#18181b' },
      { name: 'Vibrant Emerald', hex: '#0f382c' }
    ],
    stock: 11,
    inStock: true,
    badge: 'New Cast',
    isFeatured: true
  },
  {
    id: 'croco-10',
    name: 'CrocoCast Envelope Clutch & Folio',
    slug: 'crococast-envelope-clutch-folio',
    subtitle: 'Executive document folio and evening crocodile clutch',
    price: 6999,
    originalPrice: 8499,
    category: 'Wallets & Clutches',
    rating: 4.87,
    reviewCount: 38,
    images: [
      '/images/product_croc_folio_clutch.jpg',
      '/images/product_croc_bifold_wallet.jpg'
    ],
    description: 'From boardroom presentations to evening galas. Sized to hold 13-inch tablets, document contracts, and daily essentials inside an origami envelope flap with magnetic clasp and crocodile relief leather.',
    features: [
      'Holds up to 13-inch iPad Pro with Magic Keyboard',
      'Concealed neodymium magnetic flap closures',
      'Detachable wristlet strap with swivel snap clip',
      '6 card slots and interior passport slide',
      'Ultra-flat structure fits neatly under the arm'
    ],
    specs: {
      material: 'Premium Embossed Crocodile Calf Leather',
      hardware: 'Concealed Magnetic Hardware',
      origin: 'Milano, Italy',
      dimensions: '33cm W x 23cm H x 2cm D',
      careInstructions: 'Store flat with tissue padding inside.'
    },
    colors: [
      { name: 'Emerald Shimmer', hex: '#0f382c' },
      { name: 'Shadow Black', hex: '#18181b' }
    ],
    stock: 12,
    inStock: true,
    badge: 'Artisan Pick',
    isFeatured: false
  }
];

export const INITIAL_REVIEWS: ProductReview[] = [
  {
    id: 'rev-01',
    productId: 'croco-01',
    author: 'Marcus Vance',
    rating: 5,
    date: '2026-09-18',
    title: 'The texture and build quality is unmatched',
    comment: 'The crocodile relief on these Chelsea boots is so deeply stamped and tactile. Wore them to Paris Fashion Week and received non-stop compliments. Extremely comfortable right out of the box with zero blistering.',
    verified: true,
    helpfulCount: 24
  },
  {
    id: 'rev-02',
    productId: 'croco-01',
    author: 'Elena Rostova',
    rating: 5,
    date: '2026-09-02',
    title: 'Pure sculpture for your feet',
    comment: 'The emerald shine has such depth in natural light. Sizing is spot on EU 41. Soles have great traction without looking clunky.',
    verified: true,
    helpfulCount: 19
  },
  {
    id: 'rev-03',
    productId: 'croco-02',
    author: 'Julian Sterling',
    rating: 5,
    date: '2026-09-24',
    title: 'My everyday workhorse statement tote',
    comment: 'Holds my 16" MacBook Pro, notebook, water bottle, and gym wear. The gold hardware feels solid and heavy, not like cheap tin. Worth every penny for the crococast quality.',
    verified: true,
    helpfulCount: 32
  },
  {
    id: 'rev-04',
    productId: 'croco-03',
    author: 'David K.',
    rating: 5,
    date: '2026-08-30',
    title: 'Slimmest wallet I have ever owned',
    comment: 'The money clip has incredible spring tension. Even holding 10 folded bills and 6 cards it stays remarkably flat in my front pocket.',
    verified: true,
    helpfulCount: 15
  },
  {
    id: 'rev-05',
    productId: 'croco-04',
    author: 'Sophia Chen',
    rating: 5,
    date: '2026-09-12',
    title: 'Best travel duffle on the market',
    comment: 'The separate shoe garage kept my dress shoes isolated from my cashmere sweaters. Flew 3 continents with it already and the leather only looks better with a slight patina.',
    verified: true,
    helpfulCount: 28
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'CT-2026-1042',
    createdAt: '2026-10-01T14:22:10Z',
    customer: {
      fullName: 'Alexander Wright',
      email: 'a.wright@monolith.co',
      phone: '+91 98765 43210',
      street: '742 Park Street, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    },
    items: [
      {
        productId: 'croco-01',
        name: 'CrocoCast Apex Chelsea Boot',
        price: 14999,
        quantity: 1,
        color: 'Emerald Gloss',
        size: 'UK/IND 9 (EU 43)',
        image: '/images/product_croc_chelsea_boot.jpg'
      },
      {
        productId: 'croco-03',
        name: 'CrocoCast Heritage Bi-Fold & Clip',
        price: 3499,
        quantity: 1,
        color: 'Forest Green',
        image: '/images/product_croc_bifold_wallet.jpg'
      }
    ],
    subtotal: 18498,
    shippingFee: 0,
    shippingMethod: 'standard',
    discountAmount: 1850,
    couponCode: 'CROCO10',
    total: 16648,
    paymentMethod: 'gpay_qr',
    paymentStatus: 'Paid',
    transactionRef: 'GPAY-UTR-90823411',
    orderStatus: 'Processing',
    trackingNumber: 'BLUEDART-IND-882341',
    notes: 'Please call before delivery.'
  },
  {
    id: 'ord-1041',
    orderNumber: 'CT-2026-1041',
    createdAt: '2026-09-30T19:05:40Z',
    customer: {
      fullName: 'Seraphina Laurent',
      email: 'seraphina.l@vogueparis.fr',
      phone: '+91 99887 76655',
      street: 'Flat 12B, Regency Towers, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400018',
      country: 'India'
    },
    items: [
      {
        productId: 'croco-02',
        name: 'CrocoCast Nocturne Sovereign Tote',
        price: 19999,
        quantity: 1,
        color: 'Obsidian Noir',
        image: '/images/product_croc_tote_bag.jpg'
      }
    ],
    subtotal: 19999,
    shippingFee: 299,
    shippingMethod: 'express',
    discountAmount: 0,
    total: 20298,
    paymentMethod: 'paypal',
    paymentStatus: 'Paid',
    transactionRef: 'PP-TXN-489912093X',
    orderStatus: 'Shipped',
    trackingNumber: 'DELHIVERY-EXPRESS-9921',
    notes: 'Gift wrap requested with Crococast seal.'
  },
  {
    id: 'ord-1040',
    orderNumber: 'CT-2026-0928',
    createdAt: '2026-09-28T11:45:15Z',
    customer: {
      fullName: 'Kenji Takahashi',
      email: 'kenji.takahashi@omotesando.jp',
      phone: '+91 91234 56789',
      street: '15 Barakhamba Road, Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      postalCode: '110001',
      country: 'India'
    },
    items: [
      {
        productId: 'croco-05',
        name: 'CrocoCast Chrono Legacy Watch',
        price: 18999,
        quantity: 1,
        color: 'Emerald & Gold',
        image: '/images/product_croc_chrono_watch.jpg'
      }
    ],
    subtotal: 18999,
    shippingFee: 0,
    shippingMethod: 'standard',
    discountAmount: 0,
    total: 18999,
    paymentMethod: 'gpay_qr',
    paymentStatus: 'Paid',
    transactionRef: 'GPAY-UTR-77312903',
    orderStatus: 'Delivered',
    trackingNumber: 'DTDC-AIR-4421009',
    notes: 'Signature required on delivery.'
  }
];
