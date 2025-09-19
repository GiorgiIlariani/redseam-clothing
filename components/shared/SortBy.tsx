"use client";

import { useState, useRef, useEffect } from "react";

interface SortByProps {
  onSortChange: (sort: string) => void;
  currentSort: string;
}

const SortBy = ({ onSortChange, currentSort }: SortByProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: "", label: "Sort by", isDefault: true },
    { value: "-created_at", label: "New products first" },
    { value: "price", label: "Price, low to high" },
    { value: "-price", label: "Price, high to low" },
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === currentSort);
    return option ? option.label : "Sort By";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue: string) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[223px] h-[40px] px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between text-left">
        <span className="text-gray-700 text-sm">{getCurrentSortLabel()}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
          style={{
            width: "223px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                option.isDefault ? null : handleSortSelect(option.value)
              }
              disabled={option.isDefault}
              className={`w-full text-left transition-colors ${
                option.isDefault
                  ? "cursor-default text-[#10151F]"
                  : currentSort === option.value
                  ? "bg-[#FF4000] text-white"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              style={{
                height: "40px",
                paddingTop: "8px",
                paddingRight: "16px",
                paddingBottom: "8px",
                paddingLeft: "16px",
              }}>
              <span
                className="text-sm"
                style={
                  option.isDefault
                    ? {
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }
                    : {}
                }>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
