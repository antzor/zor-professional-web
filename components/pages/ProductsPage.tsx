import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getRegularProducts, isShopifyConfigured } from '../../lib/shopify';
import type { Product } from '../../types/shopify';

// Category definitions for filtering by tags
const CATEGORIES = [
  { id: 'toilet-paper', nameKey: 'cat.tp', tag: 'toilet-paper' },
  { id: 'paper-towels', nameKey: 'cat.pt', tag: 'paper-towels' },
  { id: 'z-fold', nameKey: 'cat.zf', tag: 'z-fold' },
  { id: 'v-fold', nameKey: 'cat.vf', tag: 'v-fold' },
];

const ProductsPage: React.FC = () => {
  const { t } = useLanguage();
  const { addItem, isLoading: cartLoading } = useCart();
  const headerRef = useScrollAnimation();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Fetch products from Shopify
  useEffect(() => {
    const fetchProducts = async () => {
      if (!isShopifyConfigured()) {
        setError('Shopify nije konfiguriran. Molimo postavite VITE_SHOPIFY_STORE_DOMAIN i VITE_SHOPIFY_STOREFRONT_TOKEN u .env datoteci.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const shopifyProducts = await getRegularProducts();
        setProducts(shopifyProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Greška pri dohvaćanju proizvoda. Provjerite Shopify postavke.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category (tag)
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    const category = CATEGORIES.find((c) => c.id === activeCategory);
    if (!category) return products;
    return products.filter((p) =>
      p.tags.some((tag) => tag.toLowerCase() === category.tag.toLowerCase())
    );
  }, [activeCategory, products]);

  const handleAddToCart = async (product: Product) => {
    if (product.variantId) {
      await addItem(product.variantId, 1);
    }
  };

  // Get category from product tags
  const getProductCategory = (product: Product): string | null => {
    for (const cat of CATEGORIES) {
      if (product.tags.some((tag) => tag.toLowerCase() === cat.tag.toLowerCase())) {
        return cat.nameKey;
      }
    }
    return null;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('products.title')}</h1>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl">{t('products.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('products.allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t(cat.nameKey)}
            </button>
          ))}
        </div>

        {/* Bulk pricing note */}
        <div className="bg-accent border border-primary/10 rounded-xl p-4 mb-10 flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-2xl">info</span>
          <p className="text-primary text-sm font-medium">{t('products.bulkNote')}</p>
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
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">
              inventory_2
            </span>
            <p className="text-gray-500">{t('products.noProducts')}</p>
          </div>
        )}

        {/* Product Grid */}
        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-border rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Product Image - Clickable */}
                <Link
                  to={`/products/${product.handle}`}
                  className="w-full aspect-[3/2] bg-gray-50 flex items-center justify-center overflow-hidden"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-primary/20 text-6xl">
                      inventory_2
                    </span>
                  )}
                </Link>
                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  {getProductCategory(product) && (
                    <div className="text-xs font-medium text-primary/70 uppercase tracking-wide mb-1">
                      {t(getProductCategory(product)!)}
                    </div>
                  )}
                  <Link to={`/products/${product.handle}`}>
                    <h3 className="text-gray-900 text-lg font-bold mb-1 hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs text-gray-400">{t('products.from')}</span>
                        <div className="text-2xl font-black text-primary">
                          €{product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading || !product.availableForSale}
                        className="flex-1 flex items-center justify-center gap-1 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                        {t('products.addToCart')}
                      </button>
                      <Link
                        to="/contact"
                        className="flex items-center justify-center gap-1 border border-primary text-primary px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/5 transition-colors"
                        title={t('products.requestQuote')}
                      >
                        <span className="material-symbols-outlined text-sm">request_quote</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
