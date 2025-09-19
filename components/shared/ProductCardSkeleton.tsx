import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="w-full aspect-[3/4] relative bg-gray-200 rounded-lg animate-pulse" />
      
      <div className="flex flex-col gap-[2px]">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
