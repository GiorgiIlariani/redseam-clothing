"use client";

import { useDropdown } from "@/hooks/useDropdown";
import ChevronDown from "@/components/icons/ChevronDown";
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
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden w-48 sm:w-[200px] py-4">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() =>
                option.isDefault ? null : handleSortSelect(option.value)
              }
              disabled={option.isDefault}
              className={`w-full text-left transition-colors h-10 px-3 sm:px-4 ${
                option.isDefault
                  ? "cursor-default text-[#10151F]"
                  : currentSort === option.value
                  ? "bg-[#FF4000] text-white cursor-pointer"
                  : "hover:bg-gray-50 text-gray-700 cursor-pointer"
              }`}>
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
