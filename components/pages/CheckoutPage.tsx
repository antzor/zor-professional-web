import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const CheckoutPage: React.FC = () => {
  const { t } = useLanguage();
  const { items, totalPrice, checkoutUrl, isLoading } = useCart();
  const headerRef = useScrollAnimation();

  // Auto-redirect to Shopify checkout if checkoutUrl is available
  useEffect(() => {
    if (checkoutUrl && items.length > 0) {
      // Small delay to show the page briefly
      const timer = setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [checkoutUrl, items.length]);

  // Empty cart state
  if (items.length === 0 && !isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
          <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">
            shopping_cart
          </span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('checkout.emptyCart')}</h1>
          <p className="text-gray-500 mb-6">{t('checkout.emptyCartDesc')}</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
          >
            {t('checkout.browseProducts')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-warm min-h-screen">
      {/* Header */}
      <div className="bg-primary">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <h1 className="text-white text-3xl lg:text-4xl font-black tracking-tight">
            {t('checkout.title')}
          </h1>
          <p className="text-white/80 text-lg mt-2">{t('checkout.redirecting')}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 lg:px-10 py-10">
        {/* Redirecting state */}
        <div className="bg-white rounded-xl p-8 border border-gray-border text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined animate-spin text-primary text-3xl">
              progress_activity
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t('checkout.redirectingToShopify')}
          </h2>
          <p className="text-gray-500 mb-6">
            {t('checkout.redirectingDesc')}
          </p>

          {/* Order Summary */}
          <div className="border-t border-gray-100 pt-6 mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 text-left">
              {t('checkout.summary.title')}
            </h3>
            <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.lineId} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-medium">€{item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <span className="font-semibold text-gray-900">{t('checkout.summary.total')}</span>
              <span className="font-bold text-primary text-lg">€{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Manual redirect button */}
          {checkoutUrl && (
            <a
              href={checkoutUrl}
              className="mt-6 inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
            >
              {t('checkout.proceedToPayment')}
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          )}
        </div>

        {/* Info */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {t('checkout.secureNote')}
        </p>
      </div>
    </div>
  );
};

export default CheckoutPage;
