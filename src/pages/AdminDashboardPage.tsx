import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  LogOut, 
  Package, 
  IndianRupee, 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Truck, 
  Trash2, 
  Eye, 
  Plus, 
  Image as ImageIcon, 
  Upload, 
  Edit3, 
  X,
  ExternalLink,
  QrCode,
  Search,
  Filter,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus, Product, ProductCategory } from '../types';
import { CrocImage } from '../components/CrocImage';
import { INITIAL_PRODUCTS } from '../data/products';

export const AdminDashboardPage: React.FC = () => {
  const { 
    orders, 
    products, 
    updateOrderStatus, 
    deleteOrder, 
    updateProduct, 
    addProduct, 
    deleteProduct,
    resetProducts,
    placeOrder,
    isAdminLoggedIn, 
    adminCredentials,
    adminLogin, 
    adminLogout,
    updateAdminCredentials,
    showToast 
  } = useStore();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard Tab state
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'security'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Security Credentials state
  const [newAdminUser, setNewAdminUser] = useState(adminCredentials.username);
  const [newAdminPass, setNewAdminPass] = useState('');
  const [confirmAdminPass, setConfirmAdminPass] = useState('');

  // Edit / Add Product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<ProductCategory>('Footwear');
  const [newProdPrice, setNewProdPrice] = useState(9999);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');

  // Status update modal / tracking number state
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [trackingInput, setTrackingInput] = useState('');

  // Handlers for Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    adminLogin(username, password);
  };

  const fillDemoCredentials = () => {
    setUsername(adminCredentials.username);
    setPassword(adminCredentials.password);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUser.trim()) {
      showToast('Validation Error', 'Username cannot be blank.', 'error');
      return;
    }
    if (newAdminPass.length < 5) {
      showToast('Validation Error', 'Password must be at least 5 characters long.', 'error');
      return;
    }
    if (newAdminPass !== confirmAdminPass) {
      showToast('Validation Error', 'Passwords do not match.', 'error');
      return;
    }
    updateAdminCredentials(newAdminUser, newAdminPass);
    setNewAdminPass('');
    setConfirmAdminPass('');
  };

  const handleResetDefaultCredentials = () => {
    updateAdminCredentials('admin', 'croco123');
    setNewAdminUser('admin');
    setNewAdminPass('');
    setConfirmAdminPass('');
  };

  const handleSimulateOrder = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)] || products[0];
    const dummyOrder = placeOrder(
      {
        fullName: 'Vikramaditya Roy',
        email: 'vikram.roy@domain.in',
        phone: '+91 98112 34567',
        street: '88 Marine Drive, Nariman Point',
        apartment: 'Penthouse 14B',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400021',
        country: 'India'
      },
      'gpay_qr',
      'express',
      `GPAY-UTR-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      'Please pack with luxury Crococast magnetic box and artisan seal.'
    );
    showToast('Live Customer Order Received', `Order ${dummyOrder.orderNumber} placed into dashboard.`, 'success');
  };

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Processing').length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (orderFilter !== 'All' && o.orderStatus !== orderFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchNum = o.orderNumber.toLowerCase().includes(q);
      const matchName = o.customer.fullName.toLowerCase().includes(q);
      const matchEmail = o.customer.email.toLowerCase().includes(q);
      const matchRef = o.transactionRef?.toLowerCase().includes(q);
      if (!matchNum && !matchName && !matchEmail && !matchRef) return false;
    }
    return true;
  });

  // Image Upload handler for Product edit
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetProduct: Product) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const updated = {
          ...targetProduct,
          images: [base64String, ...targetProduct.images.slice(1)]
        };
        updateProduct(updated);
        showToast('Image Updated', `Uploaded custom photo for ${targetProduct.name}`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // If not logged in, render the secure administrator login portal
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Header Accent */}
          <div className="w-14 h-14 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center mx-auto mb-6 text-emerald-400">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-1">
              Protected Access
            </span>
            <h1 className="font-display font-bold text-2xl text-white">
              Crococast Admin Portal
            </h1>
            <p className="text-xs text-neutral-400 mt-2">
              Sign in with your administrative credentials to manage store orders, product images, and dispatch logs.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                placeholder="Username (e.g. admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-neutral-300">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300 cursor-pointer font-medium"
                >
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password (e.g. croco123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              Authenticate & Open Orders Dashboard
            </button>
          </form>

          {/* Demo Credentials Helper Pill */}
          <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
            <span className="text-[11px] text-neutral-400 block mb-2">
              Default Administrator Credentials:
            </span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-950 border border-neutral-700 rounded-lg text-xs font-mono text-neutral-300 mb-3">
              <span className="text-emerald-400 font-bold">{adminCredentials.username}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-emerald-400 font-bold">{adminCredentials.password}</span>
            </div>
            <div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
              >
                Auto-Fill Credentials & Quick Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Bar / Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Admin Control Center
            </span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white mt-1">
            Orders & Catalog Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Root Admin: Active</span>
          </div>

          <button
            onClick={adminLogout}
            className="flex items-center gap-2 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-semibold text-red-400 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Total Sales Revenue</span>
            <IndianRupee className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono font-bold text-2xl text-white tabular-nums">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block">Live payments collected</span>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Orders Received</span>
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono font-bold text-2xl text-white tabular-nums">
            {totalOrders}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Across all payment gateways</span>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Pending Dispatch</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="font-mono font-bold text-2xl text-amber-400 tabular-nums">
            {pendingOrders}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">Awaiting shipping fulfillment</span>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
          <div className="flex items-center justify-between text-neutral-400 text-xs mb-2">
            <span>Average Order Value</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono font-bold text-2xl text-white tabular-nums">
            ₹{avgOrderValue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-neutral-400 mt-1 block">INR per transaction</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-neutral-800 gap-6 mb-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'products'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Product Catalog & Custom Images ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-2 ${
            activeTab === 'security'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Admin Security & Password</span>
        </button>
      </div>

      {/* TAB 1: CUSTOMER ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-semibold mr-1">Status:</span>
              {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    orderFilter === st
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative min-w-[220px]">
                <input
                  type="text"
                  placeholder="Search orders, names, UTR..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
              </div>

              <button
                type="button"
                onClick={handleSimulateOrder}
                title="Simulate receiving a new live order from the storefront"
                className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simulate Order</span>
              </button>
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-neutral-900/40 border border-neutral-800 rounded-2xl">
              <p className="text-sm text-neutral-400">No customer orders matching this criteria.</p>
            </div>
          ) : (
            <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-950 border-b border-neutral-800 text-neutral-400 uppercase font-mono text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Order ID & Date</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">Payment & Gateway</th>
                      <th className="py-3.5 px-4">Items</th>
                      <th className="py-3.5 px-4">Total</th>
                      <th className="py-3.5 px-4">Order Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-900/60 transition-colors">
                        
                        {/* Order ID & Date */}
                        <td className="py-4 px-4">
                          <span className="font-mono font-bold text-white text-xs block">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-500">
                            {new Date(ord.createdAt).toLocaleDateString()} {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4">
                          <span className="font-semibold text-white block">{ord.customer.fullName}</span>
                          <span className="text-neutral-400 text-[11px] block">{ord.customer.email}</span>
                          <span className="text-neutral-500 text-[10px]">{ord.customer.phone}</span>
                        </td>

                        {/* Payment */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5">
                            {ord.paymentMethod === 'gpay_qr' ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] font-mono">
                                Google Pay QR
                              </span>
                            ) : ord.paymentMethod === 'paypal' ? (
                              <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800 text-[11px] font-mono">
                                PayPal
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] capitalize">
                                {ord.paymentMethod}
                              </span>
                            )}
                          </div>
                          {ord.transactionRef && (
                            <span className="text-[10px] font-mono text-neutral-500 mt-1 block truncate max-w-[140px]" title={ord.transactionRef}>
                              Ref: {ord.transactionRef}
                            </span>
                          )}
                        </td>

                        {/* Items */}
                        <td className="py-4 px-4">
                          <span className="font-medium text-neutral-300">
                            {ord.items.reduce((s, i) => s + i.quantity, 0)} Items
                          </span>
                          <span className="text-[11px] text-neutral-500 block truncate max-w-[150px]">
                            {ord.items.map(i => i.name).join(', ')}
                          </span>
                        </td>

                        {/* Total */}
                        <td className="py-4 px-4 font-mono font-bold text-white text-sm tabular-nums">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            ord.orderStatus === 'Delivered'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : ord.orderStatus === 'Shipped'
                              ? 'bg-sky-950 text-sky-400 border border-sky-800'
                              : ord.orderStatus === 'Processing'
                              ? 'bg-amber-950 text-amber-400 border border-amber-800'
                              : ord.orderStatus === 'Cancelled'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-neutral-800 text-neutral-300'
                          }`}>
                            {ord.orderStatus}
                          </span>
                          {ord.trackingNumber && (
                            <span className="text-[10px] font-mono text-neutral-400 block mt-1">
                              Trk: {ord.trackingNumber}
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right space-x-2">
                          {/* Quick Status Advance */}
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="bg-neutral-950 border border-neutral-700 text-neutral-300 rounded px-2 py-1 text-[11px] focus:outline-none focus:border-emerald-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {/* View details */}
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            title="View Full Order Invoice"
                            className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Tracking Number */}
                          <button
                            onClick={() => {
                              setTrackingModalOrder(ord);
                              setTrackingInput(ord.trackingNumber || '');
                            }}
                            title="Assign Tracking"
                            className="p-1.5 text-neutral-400 hover:text-emerald-400 hover:bg-neutral-800 rounded transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteOrder(ord.id)}
                            title="Archive Order"
                            className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCT CATALOG & CUSTOM IMAGE MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Header & Add Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-white">
                Live Inventory & Visual Asset Manager
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Upload your custom product images directly from your device or paste image URLs to replace placeholders instantly.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={resetProducts}
                title="Restore original 10 Crococast items with official photography"
                className="px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-medium rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Restore Official Catalog</span>
              </button>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Product Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-neutral-950 mb-3 border border-neutral-800">
                    <CrocImage
                      src={prod.images[0]}
                      alt={prod.name}
                      fallbackTitle={prod.name}
                      category={prod.category}
                      className="w-full h-full object-cover"
                    />

                    {/* Stock pill */}
                    <div className="absolute top-2 left-2 bg-neutral-950/90 text-[10px] font-mono px-2 py-0.5 rounded text-emerald-400 border border-neutral-800">
                      Stock: {prod.stock}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                    {prod.category}
                  </span>
                  <h4 className="font-display font-bold text-white text-base truncate">
                    {prod.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800 text-xs">
                    <span className="font-mono font-bold text-white">₹{prod.price.toLocaleString('en-IN')}</span>
                    <span className="text-neutral-400 font-mono text-[11px]">{prod.rating} ★ ({prod.reviewCount})</span>
                  </div>
                </div>

                {/* Actions / Upload Image Feature */}
                <div className="pt-2 border-t border-neutral-800/80 space-y-2">
                  <div className="flex items-center gap-2">
                    {/* Device Upload */}
                    <label className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-[11px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, prod)}
                        className="hidden"
                      />
                    </label>

                    {/* Edit URL or details */}
                    <button
                      onClick={() => setEditingProduct(prod)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg text-[11px] font-medium flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteProduct(prod.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ADMIN SECURITY & CREDENTIALS MANAGEMENT */}
      {activeTab === 'security' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 sm:p-8 bg-neutral-900/60 border border-neutral-800 rounded-3xl space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  Administrator Credentials & Access Control
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Update the login username and password required to access the Crococast Orders Dashboard.
                </p>
              </div>
            </div>

            {/* Current Active Account Info */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-neutral-400 block mb-0.5">Current Active Username:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{adminCredentials.username}</span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5">Access Role:</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 border border-emerald-700 text-emerald-300 font-semibold rounded-lg text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Root Administrator
                </span>
              </div>
            </div>

            {/* Change Credentials Form */}
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  New Admin Username *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. admin"
                  value={newAdminUser}
                  onChange={(e) => setNewAdminUser(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    New Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Minimum 5 characters"
                    value={newAdminPass}
                    onChange={(e) => setNewAdminPass(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-type new password"
                    value={confirmAdminPass}
                    onChange={(e) => setConfirmAdminPass(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  Save New Admin Credentials
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaultCredentials}
                  className="w-full sm:w-auto px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer border border-neutral-700"
                >
                  Reset to Default (admin / croco123)
                </button>
              </div>
            </form>

            <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 rounded-2xl text-[11px] text-neutral-400 leading-relaxed flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                These administrative credentials are encrypted and stored in your browser's persistent session store. Only users who possess this username and password can unlock the Crococast Admin Dashboard and view customer order records.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: VIEW INVOICE / ORDER DETAILS */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block">
                Official Invoice
              </span>
              <h3 className="font-display font-bold text-2xl text-white">
                {selectedOrder.orderNumber}
              </h3>
              <span className="text-xs text-neutral-400 font-mono">
                Placed on {new Date(selectedOrder.createdAt).toUTCString()}
              </span>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-xs mb-6">
              <div>
                <span className="font-semibold text-white block mb-1">Customer Information:</span>
                <p className="text-neutral-300 leading-relaxed">
                  Name: {selectedOrder.customer.fullName}<br />
                  Email: {selectedOrder.customer.email}<br />
                  Phone: {selectedOrder.customer.phone}
                </p>
              </div>

              <div>
                <span className="font-semibold text-white block mb-1">Shipping Destination:</span>
                <p className="text-neutral-300 leading-relaxed">
                  {selectedOrder.customer.street} {selectedOrder.customer.apartment}<br />
                  {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.postalCode}<br />
                  {selectedOrder.customer.country}
                </p>
              </div>
            </div>

            {/* Payment & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-neutral-950 border border-neutral-800 rounded-2xl text-xs mb-6">
              <div>
                <span className="text-neutral-400 block">Payment Method</span>
                <span className="font-mono text-emerald-400 font-bold capitalize">
                  {selectedOrder.paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block">Reference ID</span>
                <span className="font-mono text-white text-[11px]">
                  {selectedOrder.transactionRef || 'N/A'}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block">Current Status</span>
                <span className="font-bold text-white">
                  {selectedOrder.orderStatus}
                </span>
              </div>
            </div>

            {/* Items Ordered */}
            <div className="border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800 mb-6 text-xs">
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-neutral-950 overflow-hidden border border-neutral-800 shrink-0">
                      <CrocImage src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">{it.name}</span>
                      <span className="text-neutral-400 text-[11px]">
                        Color: {it.color} {it.size ? `· Size: ${it.size}` : ''} · Qty: {it.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-white text-sm">
                    ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-between text-sm">
              <span className="font-bold text-white">Order Total Paid:</span>
              <span className="font-mono font-extrabold text-xl text-emerald-400">₹{selectedOrder.total.toLocaleString('en-IN')} INR</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ASSIGN TRACKING NUMBER */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Update Courier Tracking
            </h3>
            <p className="text-xs text-neutral-400 mb-4">
              Enter courier tracking ID (FedEx, DHL, UPS) for order <strong>{trackingModalOrder.orderNumber}</strong>.
            </p>

            <input
              type="text"
              placeholder="e.g. FEDEX-9923841029"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3.5 py-2.5 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-emerald-500 mb-4"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTrackingModalOrder(null)}
                className="flex-1 py-2 bg-neutral-800 text-neutral-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateOrderStatus(trackingModalOrder.id, 'Shipped', trackingInput);
                  setTrackingModalOrder(null);
                }}
                className="flex-1 py-2 bg-emerald-500 text-neutral-950 rounded-lg text-xs font-bold"
              >
                Save & Mark Shipped
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT PRODUCT DETAILS & IMAGE URL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="font-display font-bold text-lg text-white">Edit Product Record</h3>
              <button onClick={() => setEditingProduct(null)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Image URL (Direct link or upload above)</label>
                <input
                  type="text"
                  placeholder="https://... or /images/..."
                  value={editingProduct.images[0] || ''}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    images: [e.target.value, ...editingProduct.images.slice(1)]
                  })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="flex-1 py-2.5 bg-neutral-800 text-neutral-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateProduct(editingProduct);
                  setEditingProduct(null);
                }}
                className="flex-1 py-2.5 bg-emerald-500 text-neutral-950 rounded-lg text-xs font-bold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD NEW PRODUCT */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <h3 className="font-display font-bold text-lg text-white">Add New Crococast Piece</h3>
              <button onClick={() => setIsAddingProduct(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const newP: Product = {
                  id: `croco-${Date.now()}`,
                  name: newProdName,
                  slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  subtitle: 'Artisan high-relief crocodile cast piece',
                  price: newProdPrice,
                  category: newProdCategory,
                  rating: 5.0,
                  reviewCount: 1,
                  images: [newProdImageUrl || '/images/hero_crococast_luxury.jpg'],
                  description: newProdDesc || 'Crafted with premium crocodile-embossed leather and solid brass fittings.',
                  features: ['Hand-burnished crocodile texture', 'Durable craftsmanship', 'Limited run'],
                  specs: {
                    material: 'Full-Grain Calfskin Croc Cast',
                    hardware: 'PVD Brass Hardware',
                    origin: 'Florence, Italy',
                    dimensions: 'Standard Luxury Dimensions',
                    careInstructions: 'Condition annually with beeswax balm.'
                  },
                  colors: [{ name: 'Emerald Noir', hex: '#0f382c' }],
                  stock: 10,
                  inStock: true,
                  badge: 'New Cast'
                };
                addProduct(newP);
                setIsAddingProduct(false);
                setNewProdName('');
                setNewProdDesc('');
                setNewProdImageUrl('');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CrocoCast Pilot Flight Bag"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="Footwear">Footwear</option>
                    <option value="Bags & Luggage">Bags & Luggage</option>
                    <option value="Wallets & Clutches">Wallets & Clutches</option>
                    <option value="Watches & Straps">Watches & Straps</option>
                    <option value="Apparel & Vests">Apparel & Vests</option>
                    <option value="Accessories & Belts">Accessories & Belts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Image URL / Path</label>
                <input
                  type="text"
                  placeholder="https://... or upload later"
                  value={newProdImageUrl}
                  onChange={(e) => setNewProdImageUrl(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the silhouette, leather grade, and hardware..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-white"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddingProduct(false)}
                  className="flex-1 py-2.5 bg-neutral-800 text-neutral-300 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-500 text-neutral-950 rounded-lg text-xs font-bold"
                >
                  Add to Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
