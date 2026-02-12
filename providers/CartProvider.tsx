'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// Shopify client-side configuration
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
const STOREFRONT_API_URL = SHOPIFY_STORE_DOMAIN
  ? `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
  : ''

function isShopifyConfigured() {
  return !!(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_TOKEN)
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  })
  const json = await response.json()
  if (json.errors) {
    throw new Error(json.errors.map((e: { message: string }) => e.message).join(', '))
  }
  return json.data
}

// Cart types
interface CartItem {
  lineId: string
  variantId: string
  title: string
  quantity: number
  price: number
  totalPrice: number
  image?: string
}

interface Cart {
  id: string
  items: CartItem[]
  totalQuantity: number
  total: number
  checkoutUrl: string
}

interface CartContextType {
  cart: Cart | null
  items: CartItem[]
  isLoading: boolean
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateQuantity: (lineId: string, quantity: number) => Promise<void>
  clearCart: () => void
  totalItems: number
  totalPrice: number
  checkoutUrl: string | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const CART_ID_KEY = 'zor-cart-id'

// GraphQL fragments
const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost { totalAmount { amount currencyCode } }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price { amount currencyCode }
              product { title }
              image { url altText }
            }
          }
          cost { totalAmount { amount currencyCode } }
        }
      }
    }
  }
`

function transformCart(data: any): Cart {
  return {
    id: data.id,
    checkoutUrl: data.checkoutUrl,
    totalQuantity: data.totalQuantity,
    total: parseFloat(data.cost.totalAmount.amount),
    items: data.lines.edges.map((edge: any) => ({
      lineId: edge.node.id,
      variantId: edge.node.merchandise.id,
      title: edge.node.merchandise.product.title + (edge.node.merchandise.title !== 'Default Title' ? ` - ${edge.node.merchandise.title}` : ''),
      quantity: edge.node.quantity,
      price: parseFloat(edge.node.merchandise.price.amount),
      totalPrice: parseFloat(edge.node.cost.totalAmount.amount),
      image: edge.node.merchandise.image?.url,
    })),
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    if (!isShopifyConfigured()) return

    const loadCart = async () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY)
      if (!savedCartId) return

      setIsLoading(true)
      try {
        const data = await shopifyFetch<any>(
          `${CART_FRAGMENT} query($id: ID!) { cart(id: $id) { ...CartFields } }`,
          { id: savedCartId }
        )
        if (data.cart) {
          setCart(transformCart(data.cart))
        } else {
          localStorage.removeItem(CART_ID_KEY)
        }
      } catch {
        localStorage.removeItem(CART_ID_KEY)
      } finally {
        setIsLoading(false)
      }
    }
    loadCart()
  }, [])

  useEffect(() => {
    if (cart?.id) localStorage.setItem(CART_ID_KEY, cart.id)
  }, [cart?.id])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    if (!isShopifyConfigured()) return
    setIsLoading(true)
    try {
      let data: any
      if (cart?.id) {
        data = await shopifyFetch<any>(
          `${CART_FRAGMENT} mutation($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...CartFields } } }`,
          { cartId: cart.id, lines: [{ merchandiseId: variantId, quantity }] }
        )
        setCart(transformCart(data.cartLinesAdd.cart))
      } else {
        data = await shopifyFetch<any>(
          `${CART_FRAGMENT} mutation($input: CartInput!) { cartCreate(input: $input) { cart { ...CartFields } } }`,
          { input: { lines: [{ merchandiseId: variantId, quantity }] } }
        )
        setCart(transformCart(data.cartCreate.cart))
      }
      setIsCartOpen(true)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart?.id])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return
    setIsLoading(true)
    try {
      const data = await shopifyFetch<any>(
        `${CART_FRAGMENT} mutation($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...CartFields } } }`,
        { cartId: cart.id, lineIds: [lineId] }
      )
      setCart(transformCart(data.cartLinesRemove.cart))
    } catch (error) {
      console.error('Error removing from cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart?.id])

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return
    if (quantity <= 0) { await removeItem(lineId); return }
    setIsLoading(true)
    try {
      const data = await shopifyFetch<any>(
        `${CART_FRAGMENT} mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...CartFields } } }`,
        { cartId: cart.id, lines: [{ id: lineId, quantity }] }
      )
      setCart(transformCart(data.cartLinesUpdate.cart))
    } catch (error) {
      console.error('Error updating cart:', error)
    } finally {
      setIsLoading(false)
    }
  }, [cart?.id, removeItem])

  const clearCart = useCallback(() => {
    setCart(null)
    localStorage.removeItem(CART_ID_KEY)
  }, [])

  const value: CartContextType = {
    cart,
    items: cart?.items || [],
    isLoading,
    isCartOpen,
    setIsCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems: cart?.totalQuantity || 0,
    totalPrice: cart?.total || 0,
    checkoutUrl: cart?.checkoutUrl || null,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export type { CartItem, Cart }
