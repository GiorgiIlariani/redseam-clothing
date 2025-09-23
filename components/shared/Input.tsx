"use client";

import React, { forwardRef, useMemo, useState } from "react";
import Eye from "@/components/icons/Eye";
import EyeOff from "@/components/icons/EyeOff";
import { InputProps } from "@/types/components";
import {
  getInputPlaceholder,
  getInputType,
  isPasswordField,
} from "@/utils/inputHelpers";

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      variant = "default",
      className = "",
      required,
      placeholder: incomingPlaceholder,
      type: incomingType,
      hasLeftIcon,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const placeholder = getInputPlaceholder(variant, incomingPlaceholder);
    const inputType = getInputType(variant, showPassword, incomingType);
    const isPassword = isPasswordField(variant);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputValue = useMemo(() => {
      const valueFromProps = rest.value as string | number | undefined;
      const defaultFromProps = rest.defaultValue as string | number | undefined;
      const str = (valueFromProps ?? defaultFromProps ?? "") as string | number;
      return String(str);
    }, [rest]);

    const showCustomPlaceholder = required && inputValue.length === 0;

    return (
      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={showCustomPlaceholder ? "" : placeholder}
            className={`
              h-[42px] 
              px-4 
              ${hasLeftIcon ? "pl-10" : ""}
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
              ${className || "w-full"}
            `}
            style={{
              fontSize: "14px",
              fontWeight: 400,
            }}
            {...rest}
          />

          {showCustomPlaceholder && (
            <span
              aria-hidden
              className={`pointer-events-none absolute ${
                hasLeftIcon ? "left-[42px]" : "left-[18px]"
              } top-1/2 -translate-y-1/2 flex items-center gap-1`}
              style={{ fontSize: "14px", fontWeight: 400 }}>
              <span className="text-[#9CA3AF]">{placeholder}</span>
              <span className="text-[#FF4000]">*</span>
            </span>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#10151F] transition-colors duration-200 focus:outline-none"
              tabIndex={-1}>
              {showPassword ? <EyeOff /> : <Eye />}
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
