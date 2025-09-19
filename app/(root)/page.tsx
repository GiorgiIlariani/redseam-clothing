"use client";

import { useEffect, useState, useRef } from "react";
import { productsAPI } from "@/lib/productsApi";
import { ProductsResponse } from "@/types/products";
import ProductCard from "@/components/shared/ProductCard";
import Pagination from "@/components/shared/Pagination";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import PriceFilter, { PriceFilterRef } from "@/components/shared/PriceFilter";
import SortBy from "@/components/shared/SortBy";
import Image from "next/image";

const HomePage = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });
  const [sortBy, setSortBy] = useState("");
  const priceFilterRef = useRef<PriceFilterRef>(null);

  const fetchProducts = async (page: number = 1) => {
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

      console.log("Products fetched:", result);
      setProducts(result);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, priceFilter, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setPriceFilter({ min, max });
    setCurrentPage(1); // Reset to first page when applying filters
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  return (
    <main className="w-full mt-[72px] px-[100px]">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-[#10151F] font-semibold text-[42px]">Products</h1>
        <div className="flex items-center gap-4">
          {products && products.data.length > 0 && (
            <span className="text-gray-600 text-sm">
              Showing {products.meta.from}–{products.meta.to} of{" "}
              {products.meta.total} results
            </span>
          )}
          <SortBy onSortChange={handleSortChange} currentSort={sortBy} />
          <PriceFilter ref={priceFilterRef} onPriceChange={handlePriceChange} />
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex items-center gap-3">
        {(priceFilter.min !== null || priceFilter.max !== null) && (
          <div
            className="flex items-center bg-white border border-gray-300 text-gray-700 text-sm"
            style={{
              width: "141px",
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
              Price: {priceFilter.min || 0}-{priceFilter.max || "∞"}
            </span>
            <button
              onClick={() => {
                setPriceFilter({ min: null, max: null });
                setCurrentPage(1);
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
      </div>

      <div
        className="grid grid-cols-3 gap-x-6 gap-y-12"
        style={{
          marginTop:
            priceFilter.min !== null || priceFilter.max !== null
              ? "26px"
              : "32px",
        }}>
        {loading ? (
          <>
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
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

export default HomePage;
