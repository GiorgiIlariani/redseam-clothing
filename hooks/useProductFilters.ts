"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface PriceFilter {
  min: number | null;
  max: number | null;
}

export const useProductFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialState = useMemo(() => {
    const pageParam = Number(searchParams.get("page") || 1);
    const minParam = searchParams.get("price_from");
    const maxParam = searchParams.get("price_to");
    const sortParam = searchParams.get("sort") || "";

    return {
      page: Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam,
      min: minParam !== null ? Number(minParam) : null,
      max: maxParam !== null ? Number(maxParam) : null,
      sort: sortParam,
    };
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState(initialState.page);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({ min: initialState.min, max: initialState.max });
  const [sortBy, setSortBy] = useState(initialState.sort);

  useEffect(() => {
    if (currentPage !== initialState.page) {
      setCurrentPage(initialState.page);
    }
    if (priceFilter.min !== initialState.min || priceFilter.max !== initialState.max) {
      setPriceFilter({ min: initialState.min, max: initialState.max });
    }
    if (sortBy !== initialState.sort) {
      setSortBy(initialState.sort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState.page, initialState.min, initialState.max, initialState.sort]);

  const updateUrl = useCallback((next: { page?: number; min?: number | null; max?: number | null; sort?: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (next.page !== undefined) {
      if (next.page > 1) params.set("page", String(next.page));
      else params.delete("page");
    }

    if (next.min !== undefined) {
      if (next.min !== null) params.set("price_from", String(next.min));
      else params.delete("price_from");
    }

    if (next.max !== undefined) {
      if (next.max !== null) params.set("price_to", String(next.max));
      else params.delete("price_to");
    }

    if (next.sort !== undefined) {
      if (next.sort) params.set("sort", next.sort);
      else params.delete("sort");
    }

    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  }, [pathname, router, searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl({ page });
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setPriceFilter({ min, max });
    setCurrentPage(1);
    updateUrl({ page: 1, min, max });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateUrl({ page: 1, sort });
  };

  const clearPriceFilter = () => {
    setPriceFilter({ min: null, max: null });
    setCurrentPage(1);
    updateUrl({ page: 1, min: null, max: null });
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setPriceFilter({ min: null, max: null });
    setSortBy("");
    updateUrl({ page: 1, min: null, max: null, sort: "" });
  };

  return {
    currentPage,
    priceFilter,
    sortBy,
    setCurrentPage,
    setPriceFilter,
    setSortBy,
    handlePageChange,
    handlePriceChange,
    handleSortChange,
    clearPriceFilter,
    resetFilters,
  };
};
