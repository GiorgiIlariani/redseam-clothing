import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* Image Skeleton */}
      <div 
        className="relative bg-gray-200 rounded-lg animate-pulse"
        style={{ 
          width: '412px', 
          height: '549px', 
          borderRadius: '10px' 
        }}
      />
      
      {/* Text Skeleton */}
      <div className="flex flex-col gap-[2px]">
        {/* Product Name Skeleton */}
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        
        {/* Price Skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
