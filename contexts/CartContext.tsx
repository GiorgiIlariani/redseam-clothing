"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem, CartContextType } from "@/types/cart";
import { cartAPI } from "@/lib/cartApi";
import { productsAPI } from "@/lib/productsApi";
import { handleCartApiError } from "@/utils/cartUtils";
import { useAuth } from "./AuthContext";

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingItems, setLoadingItems] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated]);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const clearError = useCallback(() => setError(null), []);

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
      console.error("Error fetching cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (
    productId: number,
    color: string,
    size: string,
    quantity: number = 1
  ) => {
    if (!isAuthenticated) {
      setError("Please log in to add items to cart");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const product = await productsAPI.getProductById(productId);
      const availableQuantity = product.quantity ?? 0;
      const existingQuantityForProduct = cartItems
        .filter((item) => item.id === productId)
        .reduce((sum, item) => sum + item.quantity, 0);

      const remaining = Math.max(
        availableQuantity - existingQuantityForProduct,
        0
      );
      if (remaining <= 0) {
        setError("Maximum available quantity is already in your cart");
        return;
      }

      const quantityToAdd = Math.min(quantity, remaining);
      await cartAPI.addToCart(productId, {
        color,
        size,
        quantity: quantityToAdd,
      });
      await fetchCart();
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error("Error adding to cart:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!isAuthenticated) return;

    try {
      setLoadingItems((prev) => new Set(prev).add(productId));
      setError(null);
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }
      const product = await productsAPI.getProductById(productId);
      const availableQuantity = product.quantity ?? 0;
      const clampedQuantity = Math.max(
        1,
        Math.min(quantity, availableQuantity)
      );

      if (clampedQuantity < quantity) {
        setError(`Only ${availableQuantity} item(s) available in stock`);
      }

      await cartAPI.updateCartQuantity(productId, {
        quantity: clampedQuantity,
      });
      await fetchCart();
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error("Error updating cart quantity:", err);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!isAuthenticated) return;

    try {
      setLoadingItems((prev) => new Set(prev).add(productId));
      setError(null);
      await cartAPI.removeFromCart(productId);
      await fetchCart();
    } catch (err) {
      const errorMessage = handleCartApiError(err);
      setError(errorMessage);
      console.error("Error removing from cart:", err);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const cartItemsCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const uniqueItemsCount = cartItems.length;
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.total_price,
    0
  );

  const isItemLoading = (productId: number) => loadingItems.has(productId);

  return (
    <CartContext.Provider
      value={{
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
        clearError,
        addToCart,
        updateQuantity,
        removeFromCart,
        fetchCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
