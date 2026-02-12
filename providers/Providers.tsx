'use client'

import { LanguageProvider } from './LanguageProvider'
import { CartProvider } from './CartProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </LanguageProvider>
  )
}
