"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice } from "@/utils/cartUtils";
import CartItem from "@/components/shared/CartItem";
import Input from "@/components/shared/Input";
import { cartAPI } from "@/lib/cartApi";
import SuccessModal from "@/components/shared/SuccessModal";

const CheckoutPage = () => {
  const { cartItems, cartTotal, fetchCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    address: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    zipCode?: string;
    address?: string;
  }>({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate email from user data
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      // Clear error for this field when user starts typing
      if (errors[field as keyof typeof errors]) {
        setErrors(prev => ({
          ...prev,
          [field]: undefined
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: typeof errors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Surname is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip Code is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({}); // Clear any previous errors

    try {
      const result = await cartAPI.checkout({
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        zip_code: formData.zipCode,
        address: formData.address
      });
      console.log("Checkout successful:", result);

      await fetchCart();

      setShowSuccessModal(true);

      setFormData({
        firstName: "",
        lastName: "",
        email: user?.email || "",
        zipCode: "",
        address: "",
      });
    } catch (error) {
      console.error("Order submission failed:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Order submission failed. Please try again.";
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
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  error={errors.firstName}
                  className="w-[277px]"
                  required
                />
                <Input
                  type="text"
                  placeholder="Surname"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  error={errors.lastName}
                  className="w-[277px]"
                  required
                />
              </div>

              <div className="w-full">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  error={errors.email}
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
                  error={errors.zipCode}
                  className="w-[277px]"
                  required
                />
                <Input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange("address")}
                  error={errors.address}
                  className="w-[277px]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="w-[400px]">
            {cartItems.length > 0 && (
              <div className="bg-white rounded-lg p-6">
                <div className="mb-6">
                  {cartItems.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.color}-${item.size}`}
                      item={item}
                    />
                  ))}
                </div>

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
                    className="w-full bg-[#FF4000] text-white py-3 rounded-lg font-medium hover:bg-[#E63600] transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Processing..." : "Pay"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </main>
  );
};

export default CheckoutPage;
