import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ProductCardProps } from "@/types/components";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer hover:opacity-90 transition-opacity">
      <div className="w-full aspect-[3/4] relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
        <Image
          src={product.cover_image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          className={`object-cover transition-all duration-500 ${
            imageLoaded 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
          onLoad={() => setImageLoaded(true)}
          priority={false}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="text-[#10151F] text-base sm:text-lg font-medium truncate">{product.name}</p>
        <span className="text-[#10151F] text-sm sm:text-base font-medium">
          $ {product.price}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
