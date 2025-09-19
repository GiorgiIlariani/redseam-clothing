// Pagination utility functions

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

export type PaginationItem = number | "...";

// Calculate visible pages for pagination
export const getVisiblePages = ({ 
  currentPage, 
  totalPages, 
  maxVisible = 5 
}: PaginationConfig): PaginationItem[] => {
  const pages: PaginationItem[] = [];

  if (totalPages <= maxVisible) {
    // Show all pages if total is within max visible limit
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Complex pagination logic for many pages
    if (currentPage <= 3) {
      // Near the beginning
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }
  }

  return pages;
};

// Check if pagination item is a page number (not ellipsis)
export const isPageNumber = (item: PaginationItem): item is number => {
  return typeof item === "number";
};

// Generate page range for simple pagination
export const generatePageRange = (start: number, end: number): number[] => {
  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
