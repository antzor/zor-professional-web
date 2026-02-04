import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  isShopifyConfigured,
} from '../lib/shopify';
import type { Cart, CartItem } from '../types/shopify';

interface CartContextType {
  cart: Cart | null;
  items: CartItem[];
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutUrl: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'zor-cart-id';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart on mount
  useEffect(() => {
    if (!isShopifyConfigured()) {
      console.warn('Shopify is not configured. Cart functionality will be limited.');
      return;
    }

    const loadCart = async () => {
      const savedCartId = localStorage.getItem(CART_ID_KEY);
      if (savedCartId) {
        setIsLoading(true);
        try {
          const existingCart = await getCart(savedCartId);
          if (existingCart) {
            setCart(existingCart);
          } else {
            // Cart doesn't exist anymore, clear the saved ID
            localStorage.removeItem(CART_ID_KEY);
          }
        } catch (error) {
          console.error('Error loading cart:', error);
          localStorage.removeItem(CART_ID_KEY);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadCart();
  }, []);

  // Save cart ID to localStorage whenever cart changes
  useEffect(() => {
    if (cart?.id) {
      localStorage.setItem(CART_ID_KEY, cart.id);
    }
  }, [cart?.id]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    if (!isShopifyConfigured()) {
      console.error('Shopify is not configured');
      return;
    }

    setIsLoading(true);
    try {
      let updatedCart: Cart;

      if (cart?.id) {
        // Add to existing cart
        updatedCart = await addToCart(cart.id, variantId, quantity);
      } else {
        // Create new cart with item
        updatedCart = await createCart(variantId, quantity);
      }

      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id]);

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      const updatedCart = await removeFromCart(cart.id, lineId);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;

    if (quantity <= 0) {
      await removeItem(lineId);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart?.id, removeItem]);

  const clearCart = useCallback(() => {
    setCart(null);
    localStorage.removeItem(CART_ID_KEY);
  }, []);

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
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

// Re-export CartItem type for convenience
export type { CartItem } from '../types/shopify';
