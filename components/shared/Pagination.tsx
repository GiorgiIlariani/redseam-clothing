import React from "react";
import ChevronDown from "@/components/icons/ChevronDown";
import { getVisiblePages, isPageNumber } from "@/utils/pagination";
import { PaginationProps } from "@/types/components";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = getVisiblePages({ currentPage, totalPages });

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent">
        <ChevronDown className={`w-4 h-4 rotate-90 ${currentPage <= 1 ? "opacity-30" : "opacity-70"}`} />
      </button>

      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => isPageNumber(page) && onPageChange(page)}
          disabled={!isPageNumber(page)}
          className={`
            w-8 h-8 rounded flex items-center justify-center cursor-pointer text-sm font-medium
            transition-colors duration-200
            ${
              page === currentPage
                ? "border border-[#FF4000] text-[#FF4000]"
                : !isPageNumber(page)
                ? "text-gray-500 cursor-default"
                : "text-[#212B36] border border-[#F8F6F7]"
            }
          `}>
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent">
        <ChevronDown className={`w-4 h-4 -rotate-90 ${currentPage >= totalPages ? "opacity-30" : "opacity-70"}`} />
      </button>
    </div>
  );
};

export default Pagination;
