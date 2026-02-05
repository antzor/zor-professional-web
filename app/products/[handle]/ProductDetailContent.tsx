'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useCart } from '@/providers/CartProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import type { ShopifyProductDetail } from '@/lib/shopify/products'

interface ProductDetailContentProps {
  product: ShopifyProductDetail
  content: any
}

export default function ProductDetailContent({ product, content }: ProductDetailContentProps) {
  const { language, t } = useLanguage()
  const { addItem, isLoading: cartLoading } = useCart()
  const headerRef = useScrollAnimation()

  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id || '')
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
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
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-warm border-b border-gray-border">
        <div ref={headerRef} className="animate-fade-up max-w-7xl mx-auto px-6 lg:px-10 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
            <Link href="/products" className="text-gray-500 hover:text-primary transition-colors">
              {t('product.breadcrumb.products')}
            </Link>
            <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-border relative">
              {product.images.length > 0 ? (
                <img
                  src={product.images[selectedImageIndex]?.url}
                  alt={product.images[selectedImageIndex]?.altText || product.title}
                  className="w-full h-full object-contain p-6"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/20 text-8xl">inventory_2</span>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
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
                  {product.variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title} - €{variant.price.toFixed(2)}
                      {!variant.availableForSale && ` (${t('product.outOfStock')})`}
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

            {/* Trust badges */}
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

            {/* Bulk note */}
            <div className="bg-accent rounded-lg p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl shrink-0">info</span>
              <p className="text-sm text-primary">{t('products.bulkNote')}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.descriptionHtml && (
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('product.description')}</h2>
            <div
              className="prose prose-lg max-w-none text-gray-600"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
