'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useCart } from '@/providers/CartProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import type { ShopifyProduct } from '@/lib/shopify/products'

const CATEGORIES = [
  { id: 'toilet-paper', nameKey: 'cat.tp', tag: 'toilet-paper' },
  { id: 'paper-towels', nameKey: 'cat.pt', tag: 'paper-towels' },
  { id: 'z-fold', nameKey: 'cat.zf', tag: 'z-fold' },
  { id: 'v-fold', nameKey: 'cat.vf', tag: 'v-fold' },
]

export default function ProductsContent({ products }: { products: ShopifyProduct[] }) {
  const { t } = useLanguage()
  const { addItem, isLoading: cartLoading } = useCart()
  const headerRef = useScrollAnimation()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products
    const category = CATEGORIES.find((c) => c.id === activeCategory)
    if (!category) return products
    return products.filter((p) =>
      p.tags.some((tag) => tag.toLowerCase() === category.tag.toLowerCase())
    )
  }, [activeCategory, products])

  const handleAddToCart = async (product: ShopifyProduct) => {
    if (product.variants[0]?.id) {
      await addItem(product.variants[0].id, 1)
    }
  }

  const getProductCategory = (product: ShopifyProduct): string | null => {
    for (const cat of CATEGORIES) {
      if (product.tags.some((tag) => tag.toLowerCase() === cat.tag.toLowerCase())) {
        return cat.nameKey
      }
    }
    return null
  }

  return (
    <div className="bg-white min-h-screen">
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
              activeCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t('products.allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">inventory_2</span>
            <p className="text-gray-500">{t('products.noProducts')}</p>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-border rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <Link
                  href={`/products/${product.handle}`}
                  className="w-full aspect-[3/2] bg-gray-50 flex items-center justify-center overflow-hidden"
                >
                  {product.images[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-primary/20 text-6xl">inventory_2</span>
                  )}
                </Link>
                <div className="flex flex-col flex-1 p-5">
                  {getProductCategory(product) && (
                    <div className="text-xs font-medium text-primary/70 uppercase tracking-wide mb-1">
                      {t(getProductCategory(product)!)}
                    </div>
                  )}
                  <Link href={`/products/${product.handle}`}>
                    <h3 className="text-gray-900 text-lg font-bold mb-1 hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs text-gray-400">{t('products.from')}</span>
                        <div className="text-2xl font-black text-primary">€{product.minPrice.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading}
                        className="flex-1 flex items-center justify-center gap-1 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                        {t('products.addToCart')}
                      </button>
                      <Link
                        href="/contact"
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
  )
}
