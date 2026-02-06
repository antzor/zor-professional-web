'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useCart } from '@/providers/CartProvider'
import type { ShopifyProduct } from '@/lib/shopify/products'

interface FrequentlyBoughtTogetherProps {
  products: ShopifyProduct[]
}

export default function FrequentlyBoughtTogether({ products }: FrequentlyBoughtTogetherProps) {
  const { t } = useLanguage()
  const { addItem, isLoading: cartLoading } = useCart()

  const handleAddToCart = async (product: ShopifyProduct) => {
    if (product.variants[0]?.id) {
      await addItem(product.variants[0].id, 1)
    }
  }

  return (
    <div className="py-12 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t('sections.frequentlyBought')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border border-gray-border rounded-xl bg-white hover:shadow-lg hover:border-primary transition-all duration-300 overflow-hidden"
          >
            <Link
              href={`/products/${product.handle}`}
              className="w-full aspect-square bg-gray-50 flex items-center justify-center overflow-hidden"
            >
              {product.images[0] ? (
                <img
                  src={product.images[0].url}
                  alt={product.title}
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform"
                  loading="lazy"
                />
              ) : (
                <span className="material-symbols-outlined text-gray-300 text-5xl">inventory_2</span>
              )}
            </Link>
            <div className="flex flex-col flex-1 p-4">
              <Link href={`/products/${product.handle}`}>
                <h3 className="text-gray-900 text-sm font-bold mb-1 leading-tight hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>
              <div className="mt-auto pt-3">
                <span className="text-lg font-black text-primary">
                  €{product.minPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={cartLoading}
                className="mt-2 w-full flex items-center justify-center gap-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                {t('product.addToCart')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
