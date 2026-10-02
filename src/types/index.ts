export type ProductCategory = 
  | 'Footwear' 
  | 'Bags & Luggage' 
  | 'Wallets & Clutches' 
  | 'Watches & Straps' 
  | 'Apparel & Vests' 
  | 'Accessories & Belts';

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  avatar?: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specs: {
    material: string;
    hardware: string;
    origin: string;
    dimensions: string;
    careInstructions: string;
  };
  colors: { name: string; hex: string }[];
  sizes?: string[];
  stock: number;
  inStock: boolean;
  badge?: 'Bestseller' | 'New Cast' | 'Limited Edition' | 'Artisan Pick';
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (productId + color + size)
  productId: string;
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize?: string;
}

export type PaymentMethod = 'paypal' | 'gpay_qr' | 'card' | 'cod';
export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size?: string;
    image: string;
  }[];
  subtotal: number;
  shippingFee: number;
  shippingMethod: 'standard' | 'express';
  discountAmount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Paid' | 'Pending Verification' | 'Failed';
  transactionRef?: string;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}

export interface NotificationToast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
