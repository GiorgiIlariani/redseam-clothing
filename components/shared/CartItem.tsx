"use client";

import React from "react";
import Image from "next/image";
import { getBestImageForColor } from "@/utils/colorUtils";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart, isItemLoading } = useCart();
  const itemIsLoading = isItemLoading(item.id);

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const displayedImage = getBestImageForColor(
    item.color,
    item.available_colors,
    item.images,
    item.cover_image
  );

  return (
    <div className="flex gap-4 py-4">
      <div className="flex-shrink-0 border border-[#E1DFE1] rounded-[10px]">
        <Image
          src={displayedImage}
          alt={item.name}
          width={100}
          height={134}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col gap-[13px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[#10151F] font-medium text-base leading-[100%]">
              {item?.name}
            </h3>
            <span className="text-[#10151F] font-semibold text-base">
              ${item?.total_price.toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[#3E424A] text-sm font-normal">
              {item?.color}
            </span>
            <span className="text-[#3E424A] text-sm font-normal">
              {item?.size}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full border cursor-pointer border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1 || itemIsLoading}>
              <span className="text-lg font-medium">−</span>
            </button>

            <span className="min-w-[20px] text-center font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full border cursor-pointer border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={itemIsLoading}>
              <span className="text-lg font-medium">+</span>
            </button>
          </div>

          <button
            onClick={handleRemove}
            className="text-[#3E424A] cursor-pointer text-xs font-normal">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
