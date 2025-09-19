"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { useDropdown } from "@/hooks/useDropdown";
import { PriceFilterProps, PriceFilterRef } from "@/types/components";

const PriceFilter = forwardRef<PriceFilterRef, PriceFilterProps>(
  ({ onPriceChange }, ref) => {
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");
    const { isOpen, dropdownRef, toggleDropdown, closeDropdown } =
      useDropdown();

    useImperativeHandle(ref, () => ({
      clearInputs: () => {
        setFromPrice("");
        setToPrice("");
      },
    }));

    const handleApplyFilter = () => {
      const minPrice = fromPrice ? parseFloat(fromPrice) : null;
      const maxPrice = toPrice ? parseFloat(toPrice) : null;

      onPriceChange(minPrice, maxPrice);
      closeDropdown();
    };

    const handleClearFilter = () => {
      setFromPrice("");
      setToPrice("");
      onPriceChange(null, null);
    };

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="w-[70px] flex items-center gap-2 px-2 py-2">
          <Image
            src="/assets/adjustments-horizontal.png"
            alt="Filter"
            width={20}
            height={20}
          />
          <span className="text-gray-700 text-sm">Filter</span>
        </button>

        {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg z-10"
            style={{
              width: "392px",
              borderRadius: "8px",
              borderWidth: "1px",
              padding: "16px",
              gap: "20px",
            }}>
            <div style={{ marginBottom: "20px" }}>
              <h3 className="text-[#10151F] text-base font-semibold">Price</h3>
            </div>

            <div className="flex" style={{ gap: "10px", marginBottom: "20px" }}>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="From"
                  value={fromPrice}
                  onChange={(e) => setFromPrice(e.target.value)}
                  className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4000]/20 focus:border-[#FF4000]"
                  style={{ width: "175px" }}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="To"
                  value={toPrice}
                  onChange={(e) => setToPrice(e.target.value)}
                  className="w-full h-[42px] px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4000]/20 focus:border-[#FF4000]"
                  style={{ width: "175px" }}
                />
              </div>
            </div>

            <div className="flex justify-end pr-4" style={{ gap: "20px" }}>
              <button
                onClick={handleClearFilter}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer">
                Clear
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-4 py-2 bg-[#FF4000] text-white rounded-lg hover:bg-[#E63600] transition-colors cursor-pointer">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

PriceFilter.displayName = "PriceFilter";

export default PriceFilter;
