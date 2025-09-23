import { InputHTMLAttributes, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "email" | "password" | "username" | "confirmPassword";
  hasLeftIcon?: boolean;
}

export interface ImageUploadProps {
  onImageChange?: (file: File | null) => void;
  error?: string;
}

export interface ShowWhenProps {
  condition: boolean;
  children: ReactNode;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface PriceFilterProps {
  onPriceChange: (minPrice: number | null, maxPrice: number | null) => void;
}

export interface PriceFilterRef {
  clearInputs: () => void;
}

export interface SortByProps {
  onSortChange: (sort: string) => void;
  currentSort: string;
}

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    cover_image: string;
    price: number;
    description?: string | null;
    release_year?: string;
    images?: string[];
    available_colors?: string[];
    available_sizes?: string[] | null;
  };
}
