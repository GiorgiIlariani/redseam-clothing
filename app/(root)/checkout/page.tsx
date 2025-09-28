"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import CartItem from "@/components/shared/CartItem";
import Input from "@/components/shared/Input";
import { cartAPI } from "@/lib/cartApi";
import SuccessModal from "@/components/shared/SuccessModal";

const CheckoutPage = () => {
  const { cartItems, cartTotal, fetchCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

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

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errors[field as keyof typeof errors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    setErrors({});

    try {
      const result = await cartAPI.checkout({
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        zip_code: formData.zipCode,
        address: formData.address,
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
    <main className="mt-16 sm:mt-[72px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px]">
      <h1 className="text-2xl sm:text-3xl lg:text-[42px] text-[#10151F] font-semibold">
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mt-8 sm:mt-[42px] flex flex-col lg:flex-row gap-8 lg:gap-[131px]">
          <div className="flex-1 bg-[#F8F6F7] rounded-2xl p-6 sm:p-8 lg:pl-[47px] lg:pt-[72px] lg:pr-[47px] lg:pb-[72px]">
            <h3 className="text-lg sm:text-xl lg:text-[22px] text-[#10151F] font-medium">
              Order details
            </h3>

            <div className="flex flex-col gap-6 sm:gap-[33px] mt-8 sm:mt-[46px]">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleInputChange("firstName")}
                  error={errors.firstName}
                  className="w-full sm:w-[277px]"
                  required
                />
                <Input
                  type="text"
                  placeholder="Surname"
                  value={formData.lastName}
                  onChange={handleInputChange("lastName")}
                  error={errors.lastName}
                  className="w-full sm:w-[277px]"
                  required
                />
              </div>

              <div className="w-full">
                <div className="relative w-full sm:w-[578px]">
                  <Image
                    src="/assets/envelope.png"
                    alt="email"
                    width={20}
                    height={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    error={errors.email}
                    className="w-full"
                    hasLeftIcon
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Input
                  type="text"
                  placeholder="Zip Code"
                  value={formData.zipCode}
                  onChange={handleInputChange("zipCode")}
                  error={errors.zipCode}
                  className="w-full sm:w-[277px]"
                  required
                />
                <Input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange("address")}
                  error={errors.address}
                  className="w-full sm:w-[277px]"
                  required
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[460px]">
            {cartItems.length > 0 && (
              <div className="bg-white flex flex-col gap-12 lg:gap-[81px] rounded-lg p-4 sm:p-6 h-fit max-h-[800px]">
                <div className="overflow-y-auto max-h-[400px] pr-2">
                  {cartItems.map((item) => (
                    <CartItem
                      key={`${item.id}-${item.color}-${item.size}`}
                      item={item}
                    />
                  ))}
                </div>

                <div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-normal text-[#3E424A]">
                        Items subtotal:
                      </span>
                      <span className="text-base font-normal text-[#3E424A]">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-base font-normal text-[#3E424A]">
                        Delivery:
                      </span>
                      <span className="text-base font-normal text-[#3E424A]">
                        $5.00
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-medium text-[#10151F]">
                        Total:
                      </span>
                      <span className="text-xl font-medium text-[#10151F]">
                        ${(cartTotal + 5).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
                  className="w-full bg-[#FF4000] cursor-pointer text-white py-3 rounded-lg font-medium hover:bg-[#E63600] transition-colors duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Processing..." : "Pay"}
                </button>
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
