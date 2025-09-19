"use client";

import Image from "next/image";
import React from "react";
import { ShowWhen } from "./ShowWhen";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useDropdown } from "@/hooks/useDropdown";
import { getUserAvatarSrc, handleImageError, formatCartItemCount } from "@/utils/componentUtils";

const HeaderComponent = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { openCart, uniqueItemsCount } = useCart();
  const { isOpen: isDropdownOpen, dropdownRef, toggleDropdown, closeDropdown } = useDropdown();

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px] h-16 sm:h-20">
      <Link className="flex items-center gap-1" href="/">
        <Image
          src="/assets/HandEye.png"
          alt="HandEye"
          width={24}
          height={24}
          className="w-6 h-6"
        />

        <h3 className="text-[#10151F] text-sm sm:text-base font-semibold hidden xs:block">
          RedSeam Clothing
        </h3>
      </Link>

      <ShowWhen condition={!isAuthenticated}>
        <div className="flex items-center gap-4">
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
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200 relative">
            <Image
              src="/assets/header-shopping-cart.png"
              alt="shopping cart"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            {uniqueItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF4000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {formatCartItemCount(uniqueItemsCount)}
              </span>
            )}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
              <Image
                src={getUserAvatarSrc(user)}
                alt="Profile"
                width={40}
                height={40}
                className="w-8 h-8 rounded-full object-cover"
                onError={handleImageError}
              />
              <Image
                src="/assets/chevron-down.png"
                alt="chevron down"
                width={16}
                height={16}
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[180px] z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-[#10151F] truncate">
                    {user?.username}
                  </p>
                  <p className="text-xs text-[#3E424A] truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-[#10151F] hover:bg-gray-50 transition-colors duration-200">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </ShowWhen>
    </header>
  );
};

export default HeaderComponent;
