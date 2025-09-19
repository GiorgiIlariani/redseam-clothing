"use client";

import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/cartUtils";

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  console.log({ item });
  return (
    <div className="flex gap-4 py-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={item.cover_image}
          alt={item.name}
          width={100}
          height={134}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-[13px]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[#10151F] font-medium text-base leading-[100%]">
              {item?.name}
            </h3>
            <span className="text-[#10151F] font-semibold text-base">
              {formatPrice(item?.total_price)}
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
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1 || isLoading}>
              <span className="text-lg font-medium">−</span>
            </button>

            <span className="min-w-[20px] text-center font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}>
              <span className="text-lg font-medium">+</span>
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="text-[#FF4000] text-sm font-normal hover:underline transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}>
            {isLoading ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
