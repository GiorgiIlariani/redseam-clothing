"use client";

import Image from "next/image";
import React from "react";
import { ShowWhen } from "./ShowWhen";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const HeaderComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { openCart, cartItemsCount } = useCart();

  return (
    <header className="flex items-center justify-between px-[100px] h-20">
      <Link className="flex items-center gap-1" href="/">
        <Image
          src="/assets/handEye.png"
          alt="handEye"
          width={24}
          height={24}
          className="w-6 h-6"
        />

        <h3 className="text-[#10151F] text-base font-semibold">
          RedSeam Clothing
        </h3>
      </Link>

      <ShowWhen condition={!isAuthenticated}>
        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200 relative"
          >
            <Image
              src="/assets/header-shopping-cart.png"
              alt="shopping cart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF4000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>
          <Link
            href="/sign-in"
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <Image
              src="/assets/user.png"
              alt="user"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-[#10151F] text-xs font-medium">Log In</span>
          </Link>
        </div>
      </ShowWhen>

      <ShowWhen condition={isAuthenticated}>
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200 relative"
          >
            <Image
              src="/assets/header-shopping-cart.png"
              alt="shopping cart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF4000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>
          <div className="relative">
              <Image
                src={
                  user?.avatar &&
                  user.avatar !== "null" &&
                  user.avatar.trim() !== ""
                    ? user.avatar
                    : "/assets/user.png"
                }
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity duration-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/user.png";
                }}
              />
          </div>
          <button
            onClick={logout}
            className="text-[#10151F] cursor-pointer text-xs font-medium hover:text-[#FF4000] transition-colors duration-200">
            Logout
          </button>
        </div>
      </ShowWhen>
    </header>
  );
};

export default HeaderComponent;
