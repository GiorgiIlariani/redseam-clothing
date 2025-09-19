export interface Product {
  id: number;
  name: string;
  description: string | null;
  release_year: string;
  cover_image: string;
  images: string[];
  price: number;
  available_colors: string[];
  available_sizes: string[] | null;
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string | null;
  release_date: string;
  cover_image: string;
  images: string[];
  price: number;
  total_price: number;
  quantity: number;
  available_colors: string[];
  available_sizes: string[] | null;
  brand: {
    id: number;
    name: string;
    image: string;
  };
}

export interface ProductsResponse {
  data: Product[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    current_page_url: string;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface ProductFilters {
  page?: number;
  price_from?: number;
  price_to?: number;
  sort?: string;
}

export interface ProductsApiParams {
  page?: number;
  filter?: {
    price_from?: number;
    price_to?: number;
  };
  sort?: string;
}
