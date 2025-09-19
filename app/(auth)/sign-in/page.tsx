"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/shared/Input";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { SignInFormData, FormErrors } from "@/types/auth";
import { validateSignInForm, hasFormErrors } from "@/utils/validation";
import { createFieldChangeHandler } from "@/utils/inputHelpers";

const SignInPage = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors = validateSignInForm(formData.email, formData.password);
    setErrors(newErrors);
    return !hasFormErrors(newErrors);
  };

  const handleInputChange = createFieldChangeHandler<
    SignInFormData,
    FormErrors
  >(setFormData, setErrors);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await authAPI.login({
        email: formData.email,
        password: formData.password,
      });

      setUser(result.user);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setGeneralError(error.message);
      } else {
        setGeneralError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="max-w-[554px] mx-auto flex flex-col gap-12">
        <h1 className="text-[#10151F] font-semibold text-[42px]">Log In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[46px]">
          {generalError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm text-center">{generalError}</p>
            </div>
          )}

          <div className="flex flex-col gap-4">
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
          </div>
          <div className="flex flex-col items-center gap-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FF4000] text-white text-sm font-normal py-[10px] rounded-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E63600] transition-colors duration-200">
              {isLoading ? "Signing In..." : "Log In"}
            </button>
            <div className="flex gap-2 items-center text-[#000000] text-sm font-normal">
              Not a member?
              <Link
                href="/sign-up"
                className="font-medium text-[#FF4000] hover:text-[#E63600] transition-colors duration-200">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
