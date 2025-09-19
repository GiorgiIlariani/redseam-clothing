import { CartItem, AddToCartRequest, UpdateCartQuantityRequest } from "@/types/cart";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get authentication token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Create authenticated headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export const cartAPI = {
  // GET /cart - Get all cart items
  async getCart(): Promise<CartItem[]> {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }

    const result: CartItem[] = await response.json();
    return result;
  },

  // POST /cart/products/{product} - Add product to cart
  async addToCart(productId: number, data: AddToCartRequest): Promise<CartItem> {
    const response = await fetch(`${API_BASE_URL}/cart/products/${productId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      if (response.status === 422) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Validation error');
      }
      throw new Error(`Failed to add to cart: ${response.status}`);
    }

    const result: CartItem = await response.json();
    return result;
  },

  // PATCH /cart/products/{product} - Update product quantity in cart
  async updateCartQuantity(productId: number, data: UpdateCartQuantityRequest): Promise<CartItem> {
    const response = await fetch(`${API_BASE_URL}/cart/products/${productId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      if (response.status === 422) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Validation error');
      }
      throw new Error(`Failed to update cart: ${response.status}`);
    }

    const result: CartItem = await response.json();
    return result;
  },

  // DELETE /cart/products/{product} - Remove product from cart
  async removeFromCart(productId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/cart/products/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      throw new Error(`Failed to remove from cart: ${response.status}`);
    }

    // 204 No Content - successful deletion
  },

  // POST /cart/checkout - Checkout cart
  async checkout(orderData?: {
    name?: string;
    surname?: string;
    email?: string;
    zip_code?: string;
    address?: string;
  }): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      ...(orderData && { body: JSON.stringify(orderData) }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication required');
      }
      if (response.status === 400) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Bad request');
      }
      if (response.status === 422) {
        const errorData = await response.json().catch(() => ({}));
        console.error('422 Validation Error Details:', errorData);
        throw new Error(errorData.message || 'Validation error - check console for details');
      }
      throw new Error(`Checkout failed: ${response.status}`);
    }

    const result = await response.json();
    return result;
  },
};
