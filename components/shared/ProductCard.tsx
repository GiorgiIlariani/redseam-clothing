import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ProductCardProps } from "@/types/components";
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer hover:opacity-90 transition-opacity">
      <div className="w-full aspect-[3/4] relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.cover_image}
          alt={product.name}
          fill
          className="object-cover"
        />
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
