'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/providers/CartProvider'
import { useLanguage } from '@/providers/LanguageProvider'

export default function CheckoutContent() {
  const { cart, isLoading } = useCart()
  const { t } = useLanguage()

  useEffect(() => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl
    }
  }, [cart])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
          <p className="text-gray-500 mt-4">{t('checkout.redirecting')}</p>
        </div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">shopping_cart</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('checkout.emptyCart')}</h1>
          <Link href="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary-light mt-4">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            {t('checkout.continueShopping')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
        <p className="text-gray-500 mt-4">{t('checkout.redirecting')}</p>
      </div>
    </div>
  )
}
