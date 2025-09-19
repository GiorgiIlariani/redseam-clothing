"use client";

import React, { forwardRef, useState } from "react";
import { InputProps } from "@/types/components";
import { getInputPlaceholder, getInputType, isPasswordField } from "@/utils/inputHelpers";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, variant = "default", className = "", label, required, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const basePlaceholder = getInputPlaceholder(variant, props.placeholder);
    const placeholder = required ? `${basePlaceholder} *` : basePlaceholder;
    const inputType = getInputType(variant, showPassword, props.type);
    const isPassword = isPasswordField(variant);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className={`
              h-[42px] 
              px-4 
              ${isPassword ? "pr-12" : "pr-4"}
              py-3 
              rounded-lg 
              border-2
              ${
                error
                  ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-[#E5E7EB] focus:ring-2 focus:ring-[#FF4000]/20 focus:border-[#FF4000]"
              }
              bg-white 
              text-[#10151F] 
              text-sm 
              font-normal 
              leading-[100%] 
              placeholder:text-[#9CA3AF] 
              focus:outline-none 
              transition-all 
              duration-200
              ${required ? 'placeholder-asterisk' : ''}
              ${className || 'w-[554px]'}
            `}
            style={{
              fontSize: "14px",
              fontWeight: 400,
            }}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#10151F] transition-colors duration-200 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>

        {error && (
          <span className="text-red-500 text-xs font-normal">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
