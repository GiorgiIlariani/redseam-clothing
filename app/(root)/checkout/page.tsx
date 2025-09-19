"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/utils/cartUtils";
import CartItem from "@/components/shared/CartItem";
import Input from "@/components/shared/Input";

const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <main className="mt-[72px] px-[100px]">
      <h1 className="text-[42px] text-[#10151F] font-semibold">Checkout</h1>

      <div className="mt-[42px] flex gap-[131px]">
        <div className="flex-1 bg-[#F8F6F7] rounded-2xl pl-[47px] pt-[72px] pr-[47px] pb-[72px]">
          <h3 className="text-[22px] text-[#10151F] font-medium">
            Order details
          </h3>

          <div className="flex flex-col gap-[33px] mt-[46px]">
            <div className="flex gap-6">
              <Input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                className="w-[277px]"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                className="w-[277px]"
              />
            </div>

            <div className="w-full">
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange("email")}
                className="w-[578px]"
              />
            </div>
            
            <div className="flex gap-6">
              <Input
                type="text"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                className="w-[277px]"
              />
              <Input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange("address")}
                className="w-[277px]"
              />
            </div>
          </div>
        </div>

        <div className="w-[400px]">
          {cartItems.length > 0 && (
            <div className="bg-white rounded-lg p-6">
              {/* Cart Items */}
              <div className="mb-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.color}-${item.size}`}
                    item={item}
                  />
                ))}
              </div>

              {/* Pricing Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-normal text-[#3E424A]">
                      Items subtotal:
                    </span>
                    <span className="text-base font-normal text-[#3E424A]">
                      {formatPrice(cartTotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-normal text-[#3E424A]">
                      Delivery:
                    </span>
                    <span className="text-base font-normal text-[#3E424A]">
                      {formatPrice(5)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xl font-medium text-[#10151F]">
                      Total:
                    </span>
                    <span className="text-xl font-medium text-[#10151F]">
                      {formatPrice(cartTotal + 5)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-[#FF4000] text-white py-3 rounded-lg font-medium hover:bg-[#E63600] transition-colors duration-200 mt-6">
                  Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
