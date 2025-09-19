"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CartContextType } from '@/types/cart';
import { cartAPI } from '@/lib/cartApi';
import { 
  calculateCartTotal, 
  calculateCartItemsCount,
  calculateUniqueItemsCount,
  handleCartApiError
} from '@/utils/cartUtils';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Fetch cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      setError(null);
      const items = await cartAPI.getCart();
      setCartItems(items);
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error('Error fetching cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId: number, color: string, size: string, quantity: number = 1) => {
    if (!isAuthenticated) {
      setError('Please log in to add items to cart');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await cartAPI.addToCart(productId, { color, size, quantity });
      // Refresh cart after adding
      await fetchCart();
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error('Error adding to cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId: number, quantity: number) => {
    if (!isAuthenticated) return;

    try {
      setLoadingItems(prev => new Set(prev).add(productId));
      setError(null);
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      await cartAPI.updateCartQuantity(productId, { quantity });
      // Refresh cart after updating
      await fetchCart();
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error('Error updating cart quantity:', err);
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) return;

    try {
      setLoadingItems(prev => new Set(prev).add(productId));
      setError(null);
      await cartAPI.removeFromCart(productId);
      // Refresh cart after removing
      await fetchCart();
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error('Error removing from cart:', err);
    } finally {
      setLoadingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const cartItemsCount = calculateCartItemsCount(cartItems);
  const uniqueItemsCount = calculateUniqueItemsCount(cartItems);
  const cartTotal = calculateCartTotal(cartItems);

  // Helper function to check if specific item is loading
  const isItemLoading = (productId: number) => loadingItems.has(productId);

  return (
    <CartContext.Provider value={{ 
      isCartOpen, 
      cartItems,
      cartItemsCount,
      uniqueItemsCount,
      cartTotal,
      isLoading,
      isItemLoading,
      error,
      openCart, 
      closeCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
