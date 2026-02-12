'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useCart } from '@/providers/CartProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import type { ShopifyProductDetail, ShopifyProduct } from '@/lib/shopify/products'
import ProductImageGallery from './components/ProductImageGallery'
import ProductActions from './components/ProductActions'
import ProductVideo from './components/ProductVideo'
import ProductTestimonials, { getAverageRating } from './components/ProductTestimonials'
import ProductFAQ from './components/ProductFAQ'
import FrequentlyBoughtTogether from './components/FrequentlyBoughtTogether'

interface StandardProductContentProps {
  product: ShopifyProductDetail
  content: any
  relatedProducts: ShopifyProduct[]
}

export default function StandardProductContent({ product, content, relatedProducts }: StandardProductContentProps) {
  const { language, t } = useLanguage()
  const l = (hr?: string, en?: string) => language === 'hr' ? hr : en
  const headerRef = useScrollAnimation()
  const addToCartRef = useRef<HTMLButtonElement | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const { addItem, isLoading: cartLoading } = useCart()

  const avgRating = content?.testimonials?.length ? getAverageRating(content.testimonials) : 0

  // Sticky add-to-cart bar: show when main button scrolls out of view
  useEffect(() => {
    const button = addToCartRef.current
    if (!button) return

    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(button)
    return () => observer.disconnect()
  }, [])

  const handleStickyAddToCart = async () => {
    const firstVariant = product.variants[0]
    if (firstVariant?.id) {
      await addItem(firstVariant.id, 1)
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
          <ProductImageGallery images={product.images} title={product.title} />
          <div>
            {/* Average rating badge */}
            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`material-symbols-outlined text-sm ${
                        star <= Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {avgRating} ({content.testimonials.length} {content.testimonials.length === 1
                    ? (language === 'hr' ? 'recenzija' : 'review')
                    : (language === 'hr' ? 'recenzija' : 'reviews')})
                </span>
              </div>
            )}
            <ProductActions
              product={product}
              content={content}
              variant="standard"
              onAddToCartRef={addToCartRef}
            />
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

        {/* Features */}
        {content?.features && content.features.length > 0 && (
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {language === 'hr' ? 'Značajke' : 'Features'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.features.map((feature: any, idx: number) => (
                <div key={feature._key || idx} className="flex gap-4 p-5 rounded-xl bg-gray-50 border border-gray-100">
                  {feature.icon && (
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">{feature.icon}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{l(feature.titleHr, feature.titleEn)}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{l(feature.descriptionHr, feature.descriptionEn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Specifications */}
        {content?.specifications && content.specifications.length > 0 && (
          <div className="py-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {language === 'hr' ? 'Specifikacije' : 'Specifications'}
            </h2>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              {content.specifications.map((spec: any, idx: number) => (
                <div
                  key={spec._key || idx}
                  className={`flex items-center justify-between px-6 py-4 ${
                    idx !== content.specifications.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
                >
                  <span className="text-gray-600 text-sm font-medium">{l(spec.labelHr, spec.labelEn)}</span>
                  <span className="text-gray-900 font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {content?.videoUrl && (
          <ProductVideo
            videoUrl={content.videoUrl}
            videoTitleHr={content.videoTitleHr}
            videoTitleEn={content.videoTitleEn}
          />
        )}

        {/* Testimonials */}
        {content?.testimonials && content.testimonials.length > 0 && (
          <ProductTestimonials testimonials={content.testimonials} />
        )}

        {/* FAQ */}
        {content?.faq && content.faq.length > 0 && (
          <ProductFAQ faq={content.faq} />
        )}

        {/* Frequently Bought Together */}
        {relatedProducts.length > 0 && (
          <FrequentlyBoughtTogether products={relatedProducts} />
        )}

        {/* CTA */}
        {content?.ctaTitleEn && (
          <div className="py-12 border-t border-gray-200">
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-8 lg:p-10 text-white text-center">
              <h2 className="text-2xl font-black mb-3">{l(content.ctaTitleHr, content.ctaTitleEn)}</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">{l(content.ctaDescriptionHr, content.ctaDescriptionEn)}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                {language === 'hr' ? 'Kontaktirajte nas' : 'Contact Us'}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40 transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-bold text-gray-900 truncate">{product.title}</span>
            <span className="text-lg font-black text-primary shrink-0">€{product.minPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleStickyAddToCart}
            disabled={cartLoading}
            className="shrink-0 flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
            {t('product.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}
