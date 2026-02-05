'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useCart } from '@/providers/CartProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import type { ShopifyProduct } from '@/lib/shopify/products'

export default function OutletContent({ products }: { products: ShopifyProduct[] }) {
  const { t } = useLanguage()
  const { addItem, isLoading: cartLoading } = useCart()
  const headerRef = useScrollAnimation()
  const infoRef = useScrollAnimation()

  const handleAddToCart = async (product: ShopifyProduct) => {
    if (product.variants[0]?.id) {
      await addItem(product.variants[0].id, 1)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
              {t('outlet.badge')}
            </span>
          </div>
          <h1 className="text-gray-900 text-4xl font-black tracking-tight">{t('outlet.title')}</h1>
          <p className="text-gray-600 text-lg mt-3 max-w-2xl">{t('outlet.subtitle')}</p>
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

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">inventory_2</span>
            <p className="text-gray-500">{t('outlet.noProducts')}</p>
          </div>
        )}

        {/* Product Grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-border rounded-xl bg-white hover:shadow-xl hover:border-primary transition-all duration-300 hover:-translate-y-1 overflow-hidden relative"
              >
                {/* Product Image */}
                <Link
                  href={`/products/${product.handle}`}
                  className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden relative"
                >
                  {product.images[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-gray-300 text-6xl">inventory_2</span>
                  )}
                </Link>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4">
                  <Link href={`/products/${product.handle}`}>
                    <h3 className="text-gray-900 text-base font-bold mb-1 leading-tight hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-black text-primary">
                        €{product.minPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={cartLoading}
                    className="mt-3 w-full flex items-center justify-center gap-1 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                    {t('products.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
