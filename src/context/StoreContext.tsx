import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  Order, 
  OrderStatus, 
  ProductReview, 
  NotificationToast,
  CustomerInfo,
  PaymentMethod
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/products';

interface StoreContextType {
  products: Product[];
  categories: ProductCategory[];
  cart: CartItem[];
  orders: Order[];
  reviews: ProductReview[];
  wishlist: string[];
  currentPage: string;
  selectedProductId: string | null;
  selectedCategory: ProductCategory | 'All';
  searchQuery: string;
  isAdminLoggedIn: boolean;
  toasts: NotificationToast[];
  appliedCoupon: { code: string; percent: number } | null;

  // Navigation
  navigate: (page: string, productId?: string | null, category?: ProductCategory | 'All') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: ProductCategory | 'All') => void;

  // Cart actions
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartItemCount: number;

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  placeOrder: (
    customer: CustomerInfo, 
    paymentMethod: PaymentMethod, 
    shippingMethod: 'standard' | 'express',
    transactionRef?: string,
    notes?: string
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  deleteOrder: (orderId: string) => void;

  // Reviews
  addReview: (productId: string, author: string, rating: number, title: string, comment: string) => void;
  getProductReviews: (productId: string) => ProductReview[];

  // Admin & Products Management
  adminCredentials: { username: string; password: string };
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  updateAdminCredentials: (user: string, pass: string) => void;
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;

  // Notifications
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or defaults with INR migration & image path check
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('crococast_products_inr_v3');
      if (saved) return JSON.parse(saved);
      // Check previous storage versions
      const oldSaved = localStorage.getItem('crococast_products_inr') || localStorage.getItem('crococast_products');
      if (oldSaved) {
        const parsed: Product[] = JSON.parse(oldSaved);
        if (parsed.length > 0 && parsed[0].price >= 1000) {
          // Normalize paths
          const migrated = parsed.map(p => ({
            ...p,
            images: p.images.map(img => img.replace('/src/assets/images/', '/images/'))
          }));
          localStorage.setItem('crococast_products_inr_v3', JSON.stringify(migrated));
          return migrated;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('crococast_orders_inr');
      if (saved) return JSON.parse(saved);
      const oldOrders = localStorage.getItem('crococast_orders');
      if (oldOrders) {
        const parsed: Order[] = JSON.parse(oldOrders);
        if (parsed.length > 0 && parsed[0].total < 1000) {
          localStorage.removeItem('crococast_orders');
          return INITIAL_ORDERS;
        }
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Load reviews
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('crococast_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('crococast_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Load wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('crococast_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Admin Auth state & credentials
  const [adminCredentials, setAdminCredentials] = useState<{ username: string; password: string }>(() => {
    try {
      const saved = localStorage.getItem('crococast_admin_creds');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return { username: 'admin', password: 'croco123' };
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('crococast_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; percent: number } | null>(null);
  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('crococast_products_inr_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('crococast_orders_inr', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('crococast_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('crococast_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('crococast_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Categories list
  const categories: ProductCategory[] = [
    'Footwear',
    'Bags & Luggage',
    'Wallets & Clutches',
    'Watches & Straps',
    'Apparel & Vests',
    'Accessories & Belts'
  ];

  // Toast handler
  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Navigation handler
  const navigate = (page: string, productId?: string | null, category?: ProductCategory | 'All') => {
    setCurrentPage(page);
    if (productId !== undefined) {
      setSelectedProductId(productId);
    }
    if (category !== undefined) {
      setSelectedCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const chosenColor = color || (product.colors.length > 0 ? product.colors[0].name : 'Standard');
    const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);
    const cartItemId = `${product.id}-${chosenColor}-${chosenSize || 'none'}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === cartItemId);
      if (existing) {
        return prev.map(item =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          quantity,
          selectedColor: chosenColor,
          selectedSize: chosenSize
        }
      ];
    });

    showToast('Added to Cart', `${product.name} (${chosenColor}${chosenSize ? `, ${chosenSize}` : ''}) is now in your cart.`);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item Removed', 'The selected item was removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CROCO10' || clean === 'CROCOCAST10') {
      setAppliedCoupon({ code: clean, percent: 10 });
      showToast('Promo Code Applied', '10% discount has been applied to your order!', 'success');
      return true;
    } else if (clean === 'VIP20' || clean === 'WELCOME20') {
      setAppliedCoupon({ code: clean, percent: 20 });
      showToast('VIP Code Applied', '20% discount has been applied to your order!', 'success');
      return true;
    } else {
      showToast('Invalid Coupon', 'The promo code entered is not valid or expired.', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo discount code removed.', 'info');
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.percent) / 100) : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from your saved items.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Item saved to your personal collection.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const placeOrder = (
    customer: CustomerInfo,
    paymentMethod: PaymentMethod,
    shippingMethod: 'standard' | 'express',
    transactionRef?: string,
    notes?: string
  ): Order => {
    const shippingFee = shippingMethod === 'express' ? 299 : 0;
    const finalTotal = cartTotal + shippingFee;
    const orderNum = `CT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map(item => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        color: item.selectedColor,
        size: item.selectedSize,
        image: item.product.images[0] || ''
      })),
      subtotal: cartSubtotal,
      shippingFee,
      shippingMethod,
      discountAmount: cartDiscount,
      couponCode: appliedCoupon?.code,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'Pending Verification' : 'Paid',
      transactionRef: transactionRef || (paymentMethod === 'paypal' ? `PP-TXN-${Math.floor(100000 + Math.random() * 900000)}` : `GPAY-REF-${Math.floor(100000 + Math.random() * 900000)}`),
      orderStatus: 'Pending',
      notes
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders(prev =>
      prev.map(ord =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: status,
              ...(trackingNumber !== undefined ? { trackingNumber } : {})
            }
          : ord
      )
    );
    showToast('Order Updated', `Order status changed to ${status}.`, 'info');
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(ord => ord.id !== orderId));
    showToast('Order Archived', 'Order record removed from dashboard.', 'info');
  };

  // Reviews
  const addReview = (productId: string, author: string, rating: number, title: string, comment: string) => {
    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      productId,
      author: author.trim(),
      rating,
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      comment: comment.trim(),
      verified: true,
      helpfulCount: 0
    };

    setReviews(prev => [newRev, ...prev]);

    // Recalculate product rating
    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const productRevs = [...reviews.filter(r => r.productId === productId), newRev];
          const avg = Number((productRevs.reduce((acc, r) => acc + r.rating, 0) / productRevs.length).toFixed(2));
          return {
            ...p,
            rating: avg,
            reviewCount: productRevs.length
          };
        }
        return p;
      })
    );

    showToast('Review Submitted', 'Thank you! Your verified review has been published.', 'success');
  };

  const getProductReviews = (productId: string) => {
    return reviews.filter(r => r.productId === productId);
  };

  // Admin Authentication
  const adminLogin = (user: string, pass: string): boolean => {
    if (user.trim() === adminCredentials.username && pass.trim() === adminCredentials.password) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('crococast_admin_auth', 'true');
      showToast('Admin Logged In', 'Welcome to the Crococast Order Management Dashboard.', 'success');
      return true;
    } else {
      showToast('Authentication Failed', 'Invalid administrator username or password.', 'error');
      return false;
    }
  };

  const updateAdminCredentials = (user: string, pass: string) => {
    const updated = { username: user.trim(), password: pass.trim() };
    setAdminCredentials(updated);
    localStorage.setItem('crococast_admin_creds', JSON.stringify(updated));
    showToast('Credentials Updated', 'Administrator username and password updated successfully.', 'success');
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('crococast_admin_auth');
    showToast('Logged Out', 'Administrator session ended.', 'info');
  };

  // Product Catalog Management
  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast('Product Updated', `${updated.name} catalog record updated.`, 'success');
  };

  const addProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    showToast('Product Added', `${newProd.name} added to the Crococast catalog.`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product Removed', 'Product removed from catalog.', 'info');
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('crococast_products_inr_v3', JSON.stringify(INITIAL_PRODUCTS));
    showToast('Catalog Reset', 'Crococast official products and high-res imagery restored.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        orders,
        reviews,
        wishlist,
        currentPage,
        selectedProductId,
        selectedCategory,
        searchQuery,
        isAdminLoggedIn,
        adminCredentials,
        toasts,
        appliedCoupon,
        navigate,
        setSearchQuery,
        setSelectedCategory,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartItemCount,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        addReview,
        getProductReviews,
        adminLogin,
        adminLogout,
        updateAdminCredentials,
        updateProduct,
        addProduct,
        deleteProduct,
        resetProducts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
