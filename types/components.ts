import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "email" | "password" | "username" | "confirmPassword";
}

export interface ImageUploadProps {
  onImageChange?: (file: File | null) => void;
  error?: string;
}
