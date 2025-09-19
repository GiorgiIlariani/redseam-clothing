import { CartItem } from "@/types/cart";

// Calculate total price for cart using total_price from backend
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.total_price, 0);
};

// Calculate total items count (sum of all quantities)
export const calculateCartItemsCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Calculate unique items count (number of different products)
export const calculateUniqueItemsCount = (items: CartItem[]): number => {
  return items.length;
};

// Find cart item by product ID
export const findCartItem = (
  items: CartItem[], 
  productId: number
): CartItem | undefined => {
  return items.find(item => item.id === productId);
};

// Format price for display
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

// Handle API errors consistently
export const handleCartApiError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('Authentication required')) {
      return 'Please log in to manage your cart';
    }
    return error.message;
  }
  return 'An unexpected error occurred';
};
