'use client'

import React from 'react'
import { useCart } from '@/providers/CartProvider'
import { useLanguage } from '@/providers/LanguageProvider'

const CartDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, checkoutUrl, isLoading } = useCart()
  const { t } = useLanguage()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    if (checkoutUrl) {
      setIsCartOpen(false)
      window.location.href = checkoutUrl
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-border">
          <h2 className="text-lg font-bold text-gray-900">{t('cart.title')}</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">shopping_cart</span>
              <p className="text-gray-500">{t('cart.empty')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.lineId} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  {item.image && (
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain p-1" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">&euro;{item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                        disabled={isLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                        disabled={isLoading}
                        className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.lineId)} disabled={isLoading} className="text-gray-400 hover:text-red-500 disabled:opacity-50">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                    <span className="text-sm font-bold text-gray-900">&euro;{item.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{t('cart.subtotal')}</span>
              <span className="text-xl font-bold text-gray-900">&euro;{totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500">{t('cart.shippingNote')}</p>
            <button
              onClick={handleCheckout}
              disabled={isLoading || !checkoutUrl}
              className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  {t('cart.loading')}
                </>
              ) : (
                <>
                  {t('cart.checkout')}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
