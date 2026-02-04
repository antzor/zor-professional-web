import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getOutletProducts, isShopifyConfigured } from '../../lib/shopify';
import type { Product } from '../../types/shopify';

const OutletPage: React.FC = () => {
  const { t } = useLanguage();
  const { addItem, isLoading: cartLoading } = useCart();
  const headerRef = useScrollAnimation();
  const infoRef = useScrollAnimation();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch outlet products from Shopify
  useEffect(() => {
    const fetchProducts = async () => {
      if (!isShopifyConfigured()) {
        setError('Shopify nije konfiguriran. Molimo postavite VITE_SHOPIFY_STORE_DOMAIN i VITE_SHOPIFY_STOREFRONT_TOKEN u .env datoteci.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const shopifyProducts = await getOutletProducts();
        setProducts(shopifyProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching outlet products:', err);
        setError('Greška pri dohvaćanju proizvoda. Provjerite Shopify postavke.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    if (product.variantId) {
      await addItem(product.variantId, 1);
    }
  };

  // Calculate discount percentage
  const getDiscount = (product: Product): number | null => {
    if (product.compareAtPrice && product.compareAtPrice > product.price) {
      return Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
    }
    return null;
  };

  // Get max discount for header
  const maxDiscount = products.reduce((max, product) => {
    const discount = getDiscount(product);
    return discount && discount > max ? discount : max;
  }, 0);

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-primary">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
              {t('outlet.badge')}
            </span>
            {maxDiscount > 0 && (
              <span className="text-red-400 font-bold text-sm">
                {t('home.outlet.upTo')} {maxDiscount}% {t('home.outlet.off')}
              </span>
            )}
          </div>
          <h1 className="text-white text-4xl lg:text-5xl font-black tracking-tight">{t('outlet.title')}</h1>
          <p className="text-white/80 text-lg mt-3 max-w-2xl">{t('outlet.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Why Outlet info box */}
        <div ref={infoRef} className="animate-fade-up bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-amber-700 text-2xl">info</span>
            </div>
            <div>
              <h3 className="text-amber-900 font-bold text-lg mb-1">{t('outlet.whyOutlet')}</h3>
              <p className="text-amber-800 text-sm leading-relaxed">{t('outlet.whyOutlet.desc')}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined animate-spin text-primary text-4xl">
              progress_activity
            </span>
            <p className="text-gray-500 mt-4">{t('products.loading')}</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-red-500 text-4xl mb-4 block">error</span>
            <p className="text-gray-700 font-medium">{error}</p>
            <p className="text-gray-500 text-sm mt-2">
              Provjerite .env datoteku i Shopify postavke.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">
              inventory_2
            </span>
            <p className="text-gray-500">{t('outlet.noProducts')}</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const discount = getDiscount(product);
              return (
                <div
                  key={product.id}
                  className="flex flex-col border border-gray-border rounded-xl bg-white hover:shadow-xl hover:border-primary transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
                >
                  {/* Discount badge */}
                  {discount && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-red-600 text-white text-xs font-black px-2 py-1 rounded">
                        -{discount}%
                      </span>
                    </div>
                  )}

                  {/* Availability badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`${product.availableForSale ? 'bg-green-600' : 'bg-red-600'} text-white text-xs font-semibold px-2 py-1 rounded`}>
                      {product.availableForSale ? t('outlet.stock.available') : t('outlet.stock.lastItems')}
                    </span>
                  </div>

                  {/* Product Image - Clickable */}
                  <Link
                    to={`/products/${product.handle}`}
                    className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-300 text-6xl">inventory_2</span>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4">
                    <Link to={`/products/${product.handle}`}>
                      <h3 className="text-gray-900 text-base font-bold mb-1 leading-tight hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-2xl font-black text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            €{product.compareAtPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-green-600 font-semibold">
                            {t('outlet.save')} €{(product.compareAtPrice - product.price).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={cartLoading || !product.availableForSale}
                      className="mt-3 w-full flex items-center justify-center gap-1 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                      {t('products.addToCart')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutletPage;
