import { useState } from "react";

export interface PriceFilter {
  min: number | null;
  max: number | null;
}

export const useProductFilters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>({ min: null, max: null });
  const [sortBy, setSortBy] = useState("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setPriceFilter({ min, max });
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const clearPriceFilter = () => {
    setPriceFilter({ min: null, max: null });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setCurrentPage(1);
    setPriceFilter({ min: null, max: null });
    setSortBy("");
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
