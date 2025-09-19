import React from "react";
import { getVisiblePages, isPageNumber } from "@/utils/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = getVisiblePages({ currentPage, totalPages });

  return (
    <div
      className="flex items-center justify-center gap-2"
      style={{ width: "248px", height: "32px" }}>
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
                ? "bg-[#FF4000] text-white"
                : !isPageNumber(page)
                ? "text-gray-500 cursor-default"
                : "text-[#10151F] hover:bg-gray-100"
            }
          `}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
