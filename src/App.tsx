import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, toasts, dismissToast } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 selection:bg-emerald-500 selection:text-neutral-950">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Floating Notification Toasts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${
              t.type === 'success'
                ? 'bg-neutral-900/95 border-emerald-500/50 text-white'
                : t.type === 'error'
                ? 'bg-neutral-900/95 border-red-500/50 text-white'
                : t.type === 'warning'
                ? 'bg-neutral-900/95 border-amber-500/50 text-white'
                : 'bg-neutral-900/95 border-neutral-700 text-white'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {t.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : t.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-red-400" />
              ) : t.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <Info className="w-5 h-5 text-sky-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="font-bold text-xs tracking-tight">{t.title}</h5>
              <p className="text-xs text-neutral-300 mt-0.5 leading-snug">{t.message}</p>
            </div>

            <button
              onClick={() => dismissToast(t.id)}
              className="text-neutral-400 hover:text-white p-1 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
