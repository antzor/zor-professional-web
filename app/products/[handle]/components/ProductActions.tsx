'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useCart } from '@/providers/CartProvider'
import type { ShopifyProductDetail } from '@/lib/shopify/products'

interface ProductActionsProps {
  product: ShopifyProductDetail
  content: any
  variant?: 'standard' | 'outlet'
  onAddToCartRef?: React.RefObject<HTMLButtonElement | null>
}

export default function ProductActions({ product, content, variant = 'standard', onAddToCartRef }: ProductActionsProps) {
  const { language, t } = useLanguage()
  const l = (hr?: string, en?: string) => language === 'hr' ? hr : en
  const { addItem, isLoading: cartLoading } = useCart()

  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '')
  const [quantity, setQuantity] = useState(1)

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId)
  const currentPrice = selectedVariant?.price ?? product.minPrice
  const isAvailable = selectedVariant?.availableForSale ?? true

  const handleAddToCart = async () => {
    if (selectedVariantId) {
      await addItem(selectedVariantId, quantity)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        {content?.badge?.textEn && (
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3 ${
            content.badge.color === 'green' ? 'bg-green-100 text-green-700' :
            content.badge.color === 'blue' ? 'bg-blue-100 text-blue-700' :
            content.badge.color === 'red' ? 'bg-red-100 text-red-700' :
            content.badge.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
            'bg-primary/10 text-primary'
          }`}>
            {l(content.badge.textHr, content.badge.textEn)}
          </span>
        )}
        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">{product.title}</h1>
      </div>

      {/* Price */}
      <div className="mb-2">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-primary">€{currentPrice.toFixed(2)}</span>
        </div>
        {content?.priceNoteEn && (
          <p className="text-sm text-gray-500 mt-1">
            {language === 'hr' ? content.priceNoteHr : content.priceNoteEn}
          </p>
        )}
      </div>

      {/* Variant Selector */}
      {product.variants.length > 1 && (
        <div className="mb-6 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.variant')}</label>
          <select
            value={selectedVariantId}
            onChange={(e) => setSelectedVariantId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title} - €{v.price.toFixed(2)}
                {!v.availableForSale && ` (${t('product.outOfStock')})`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">{t('product.quantity')}</label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span className="material-symbols-outlined">remove</span>
          </button>
          <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex gap-3 mb-6">
        <button
          ref={onAddToCartRef}
          onClick={handleAddToCart}
          disabled={cartLoading || !isAvailable}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined">add_shopping_cart</span>
          {isAvailable ? t('product.addToCart') : t('product.outOfStock')}
        </button>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
          title={t('product.requestQuote')}
        >
          <span className="material-symbols-outlined">request_quote</span>
        </Link>
      </div>

      {/* Trust badges - standard only */}
      {variant === 'standard' && (
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            {t('sections.fastDelivery')}
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
            {t('sections.freeSamples')}
          </div>
        </div>
      )}

      {/* Bulk note */}
      <div className="bg-accent rounded-lg p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-xl shrink-0">info</span>
        <p className="text-sm text-primary">{t('products.bulkNote')}</p>
      </div>
    </div>
  )
}
