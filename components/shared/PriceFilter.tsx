"use client";

import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface PriceFilterProps {
  onPriceChange: (minPrice: number | null, maxPrice: number | null) => void;
}

export interface PriceFilterRef {
  clearInputs: () => void;
}

const PriceFilter = forwardRef<PriceFilterRef, PriceFilterProps>(
  ({ onPriceChange }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Expose clearInputs method to parent component
    useImperativeHandle(ref, () => ({
      clearInputs: () => {
        setFromPrice("");
        setToPrice("");
      },
    }));

     // Close dropdown when clicking outside
     useOutsideClick(dropdownRef, () => setIsOpen(false));

    const handleApplyFilter = () => {
      const minPrice = fromPrice ? parseFloat(fromPrice) : null;
      const maxPrice = toPrice ? parseFloat(toPrice) : null;

      onPriceChange(minPrice, maxPrice);
      setIsOpen(false);
    };

    const handleClearFilter = () => {
      setFromPrice("");
      setToPrice("");
      onPriceChange(null, null);
    };

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Filter Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-[70px] flex items-center gap-2 px-2 py-2">
          <Image
            src="/assets/adjustments-horizontal.png"
            alt="Filter"
            width={20}
            height={20}
          />
          <span className="text-gray-700 text-sm">Filter</span>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute top-full right-0 mt-2 bg-white border border-gray-200 shadow-lg z-10"
            style={{
              width: "392px",
              height: "169px",
              borderRadius: "8px",
              borderWidth: "1px",
              padding: "16px",
              gap: "20px",
            }}>
            {/* Price Label */}
            <div style={{ marginBottom: "20px" }}>
              <h3
                className="text-[#10151F]"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 600,
                  fontSize: "16px",
                  lineHeight: "100%",
                }}>
                Price
              </h3>
            </div>

            {/* Price Inputs */}
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

            {/* Action Buttons */}
            <div className="flex justify-end pr-4" style={{ gap: "20px" }}>
              <button
                onClick={handleClearFilter}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                Clear
              </button>
              <button
                onClick={handleApplyFilter}
                className="px-4 py-2 bg-[#FF4000] text-white rounded-lg hover:bg-[#E63600] transition-colors">
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
