"use client";

import { useDropdown } from "@/hooks/useDropdown";
import { SortByProps } from "@/types/components";
import { SORT_OPTIONS } from "@/utils/constants";

const SortBy = ({ onSortChange, currentSort }: SortByProps) => {
  const { isOpen, dropdownRef, toggleDropdown, closeDropdown } = useDropdown();

  const getCurrentSortLabel = () => {
    const option = SORT_OPTIONS.find((opt) => opt.value === currentSort);
    return option ? option.label : "Sort By";
  };

  const handleSortSelect = (sortValue: string) => {
    onSortChange(sortValue);
    closeDropdown();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-auto h-[40px] gap-1 px-2 py-2 flex items-center justify-between text-left">
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

      {isOpen && (
        <div
          className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
          style={{
            width: "200px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}>
          {SORT_OPTIONS.map((option) => (
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
                className={
                  option.isDefault ? "text-base font-semibold" : "text-sm"
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
