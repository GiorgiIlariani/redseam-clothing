"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { productsAPI } from "@/lib/productsApi";
import { ProductsResponse } from "@/types/products";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import PriceFilter from "@/components/shared/PriceFilter";
import SortBy from "@/components/shared/SortBy";
import Image from "next/image";
import { useProductFilters } from "@/hooks/useProductFilters";
import { PRODUCT_GRID_SKELETON_COUNT, SORT_OPTIONS } from "@/utils/constants";
import { PriceFilterRef } from "@/types/components";

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const priceFilterRef = useRef<PriceFilterRef>(null);
  const {
    currentPage,
    priceFilter,
    sortBy,
    handlePageChange,
    handlePriceChange,
    handleSortChange,
    clearPriceFilter,
  } = useProductFilters();

  const fetchProducts = useCallback(
    async (page: number = 1) => {
      try {
        setLoading(true);
        const result = await productsAPI.getProducts({
          page,
          sort: sortBy || "-created_at",
          filter: {
            ...(priceFilter.min !== null && { price_from: priceFilter.min }),
            ...(priceFilter.max !== null && { price_to: priceFilter.max }),
          },
        });

        setProducts(result);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    },
    [sortBy, priceFilter]
  );

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  return (
    <main className="w-full mt-16 sm:mt-[72px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px]">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4">
        <h1 className="text-[#10151F] font-semibold text-2xl sm:text-3xl lg:text-[42px]">
          Products
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {products && products.data.length > 0 && (
            <span className="text-gray-600 text-sm">
              Showing {products.meta.from}–{products.meta.to} of{" "}
              {products.meta.total} results
            </span>
          )}
          <div className="hidden sm:block border border-[#E1DFE1] w-[1px] h-[14px] mx-4" />
          <div className="flex items-center gap-4">
            <PriceFilter
              ref={priceFilterRef}
              onPriceChange={handlePriceChange}
            />
            <SortBy onSortChange={handleSortChange} currentSort={sortBy} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-[19px]">
        {(priceFilter.min !== null || priceFilter.max !== null) && (
          <div
            className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm"
            style={{
              height: "37px",
              paddingTop: "8px",
              paddingRight: "10px",
              paddingBottom: "8px",
              paddingLeft: "16px",
              gap: "6px",
              borderRadius: "50px",
              borderWidth: "1px",
            }}>
            <span>
              Price: {priceFilter.min !== null ? `${priceFilter.min}` : "$0"}
              {priceFilter.max !== null ? ` - ${priceFilter.max}` : "+"}
            </span>
            <button
              onClick={() => {
                clearPriceFilter();
                priceFilterRef.current?.clearInputs();
              }}
              className="ml-auto cursor-pointer hover:opacity-70 transition-opacity">
              <Image
                src="/assets/x-mark.png"
                alt="Remove filter"
                width={12}
                height={12}
              />
            </button>
          </div>
        )}
        {sortBy && (
          <div
            className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm"
            style={{
              height: "37px",
              paddingTop: "8px",
              paddingRight: "10px",
              paddingBottom: "8px",
              paddingLeft: "16px",
              gap: "6px",
              borderRadius: "50px",
              borderWidth: "1px",
            }}>
            <span>
              {`Sort: ${SORT_OPTIONS.find((opt) => opt.value === sortBy)?.label || ""}`}
            </span>
            <button
              onClick={() => handleSortChange("")}
              className="ml-auto cursor-pointer hover:opacity-70 transition-opacity">
              <Image
                src="/assets/x-mark.png"
                alt="Remove sort"
                width={12}
                height={12}
              />
            </button>
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 gap-y-8 sm:gap-y-12"
        style={{
          marginTop:
            priceFilter.min !== null || priceFilter.max !== null || Boolean(sortBy)
              ? "26px"
              : "32px",
        }}>
        {loading ? (
          <>
            {Array.from({ length: PRODUCT_GRID_SKELETON_COUNT }).map(
              (_, index) => (
                <ProductCardSkeleton key={index} />
              )
            )}
          </>
        ) : (
          products?.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {products && products.data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found.</p>
        </div>
      )}

      {products && products.meta.last_page > 1 && (
        <div className="flex justify-center mt-[90px] pb-[216px]">
          <Pagination
            currentPage={currentPage}
            totalPages={products.meta.last_page}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </main>
  );
};

export default ProductsPage;

