import { Product, ProductDetail, ProductsResponse, ProductsApiParams } from "@/types/products";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com';

export const productsAPI = {
  async getProducts(params: ProductsApiParams = {}): Promise<ProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }
    
    if (params.filter?.price_from) {
      searchParams.append('filter[price_from]', params.filter.price_from.toString());
    }
    
    if (params.filter?.price_to) {
      searchParams.append('filter[price_to]', params.filter.price_to.toString());
    }
    
    if (params.sort) {
      searchParams.append('sort', params.sort);
    }

    const url = `${API_BASE_URL}/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const result: ProductsResponse = await response.json();
    return result;
  },

  async getProductById(id: number): Promise<ProductDetail> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const result: ProductDetail = await response.json();
    return result;
  }
};
