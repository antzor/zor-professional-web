'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useScrollAnimation } from '@/app/components/hooks/useScrollAnimation'
import type { ShopifyProductDetail } from '@/lib/shopify/products'
import ProductImageGallery from './components/ProductImageGallery'
import ProductActions from './components/ProductActions'

interface OutletProductContentProps {
  product: ShopifyProductDetail
  content: any
}

export default function OutletProductContent({ product, content }: OutletProductContentProps) {
  const { t } = useLanguage()
  const headerRef = useScrollAnimation()

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
            <Link href="/outlet" className="text-gray-500 hover:text-primary transition-colors">
              Outlet
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
          <ProductActions product={product} content={content} variant="outlet" />
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

        {/* Back to Outlet */}
        <div className="py-8 border-t border-gray-200">
          <Link
            href="/outlet"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t('product.breadcrumb.home') === 'Naslovnica' ? 'Natrag na Outlet' : 'Back to Outlet'}
          </Link>
        </div>
      </div>
    </div>
  )
}
