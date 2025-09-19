export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  maxVisible?: number;
}

export type PaginationItem = number | "...";

export const getVisiblePages = ({ 
  currentPage, 
  totalPages, 
  maxVisible = 5 
}: PaginationConfig): PaginationItem[] => {
  const pages: PaginationItem[] = [];

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
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

export const isPageNumber = (item: PaginationItem): item is number => {
  return typeof item === "number";
};

export const generatePageRange = (start: number, end: number): number[] => {
  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};
