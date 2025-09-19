"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/cartUtils";
import CartItem from "@/components/shared/CartItem";
import Input from "@/components/shared/Input";
import { cartAPI } from "@/lib/cartApi";

const CheckoutPage = () => {
  const { cartItems, cartTotal, fetchCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    address: ""
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate email from user data
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.zipCode || !formData.address) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call the real checkout API
      const result = await cartAPI.checkout();
      console.log("Checkout successful:", result);
      
      // Refresh cart to get updated state (should be empty after checkout)
      await fetchCart();
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        zipCode: "",
        address: ""
      });
      
    } catch (error) {
      console.error("Order submission failed:", error);
      const errorMessage = error instanceof Error ? error.message : "Order submission failed. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mt-[72px] px-[100px]">
      <h1 className="text-[42px] text-[#10151F] font-semibold">Checkout</h1>

      <form onSubmit={handleSubmit}>
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
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  className="w-[277px]"
                  required
                />
              </div>

              <div className="w-full">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  className="w-[578px]"
                  required
                />
              </div>
              
              <div className="flex gap-6">
                <Input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange("zipCode")}
                  className="w-[277px]"
                  required
                />
                <Input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange("address")}
                  className="w-[277px]"
                  required
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

                <button 
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full bg-[#FF4000] text-white py-3 rounded-lg font-medium hover:bg-[#E63600] transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </div>
          )}
        </div>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#10151F] mb-2">
                Order Confirmed!
              </h3>
              <p className="text-[#3E424A] mb-6">
                Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-[#FF4000] text-white py-3 rounded-lg font-medium hover:bg-[#E63600] transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CheckoutPage;
