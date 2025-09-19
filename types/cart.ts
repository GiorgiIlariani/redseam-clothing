// Backend cart item response
export interface CartItem {
  id: number;
  name: string;
  description: string;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  total_price: number;
  quantity: number;
  color: string;
  size: string;
  available_colors: string[];
  available_sizes: string[];
}

export interface CartContextType {
  isCartOpen: boolean;
  cartItems: CartItem[];
  cartItemsCount: number;
  uniqueItemsCount: number;
  cartTotal: number;
  isLoading: boolean;
  isItemLoading: (productId: number) => boolean;
  error: string | null;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: number, color: string, size: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

// API request interfaces
export interface AddToCartRequest {
  color: string;
  quantity: number;
  size: string;
}

export interface UpdateCartQuantityRequest {
  quantity: number;
}
