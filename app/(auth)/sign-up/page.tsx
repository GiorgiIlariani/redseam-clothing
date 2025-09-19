"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/shared/Input";
import ImageUpload from "@/components/shared/ImageUpload";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpFormData, FormErrors } from "@/types/auth";
import { validateSignUpForm, hasFormErrors } from "@/utils/validation";
import { setFormErrorFromApiError } from "@/utils/errorHandling";
import { createFieldChangeHandler } from "@/utils/inputHelpers";

const SignUpPage = () => {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = validateSignUpForm(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );
    setErrors(newErrors);
    return !hasFormErrors(newErrors);
  };

  const handleInputChange = (field: keyof Omit<SignUpFormData, 'avatar'>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }

      if (field === "password" && formData.confirmPassword && errors.confirmPassword) {
        if (value === formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: undefined,
          }));
        }
      }

      if (field === "confirmPassword" && formData.password && errors.confirmPassword) {
        if (value === formData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: undefined,
          }));
        }
      }
    };

  const handleImageChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      avatar: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        avatar: formData.avatar
      });

      refreshUser();
      router.push('/');
    } catch (error) {
      console.error("Registration error:", error);
      const errorObj = setFormErrorFromApiError(error);
      setErrors(errorObj);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="max-w-[554px] mx-auto flex flex-col gap-12">
        <h1 className="text-[#10151F] font-semibold text-[42px]">
          Registration
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[46px]">
          <div className="flex flex-col gap-4">
            <ImageUpload onImageChange={handleImageChange} />
            <Input
              variant="username"
              value={formData.username}
              onChange={handleInputChange("username")}
              error={errors.username}
              required
            />
            <Input
              variant="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              error={errors.email}
              required
            />
            <Input
              variant="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={errors.password}
              required
            />
            <Input
              variant="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={errors.confirmPassword}
              required
            />
          </div>
          <div className="flex flex-col items-center gap-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF4000] text-white text-sm font-normal py-[10px] rounded-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E63600] transition-colors duration-200">
              {isLoading ? "Registering..." : "Register"}
            </button>
            <div className="flex gap-2 items-center text-[#000000] text-sm font-normal">
              Already member?
              <Link
                href="/sign-in"
                className="font-medium text-[#FF4000] hover:text-[#E63600] transition-colors duration-200">
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
