import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ProductCardProps } from "@/types/components";
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex flex-col gap-3 cursor-pointer hover:opacity-90 transition-opacity">
      <div className="w-[412px] h-[549px] relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.cover_image}
          alt={product.name}
          width={412}
          height={549}
          className="w-[412px] h-[549px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <p className="text-[#10151F] text-lg font-medium">{product.name}</p>
        <span className="text-[#10151F] text-base font-medium">
          $ {product.price}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
