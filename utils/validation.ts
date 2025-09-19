import { FormErrors } from "@/types/auth";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation rules
export const VALIDATION_RULES = {
  MIN_LENGTH: 3,
  EMAIL_REGEX,
};

// Individual field validators
export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return "Email is required";
  }
  if (email.length < VALIDATION_RULES.MIN_LENGTH) {
    return "Email must be at least 3 characters";
  }
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return "Please enter a valid email address";
  }
  return undefined;
};

export const validateEmailOrUsername = (value: string): string | undefined => {
  if (!value.trim()) {
    return "Email or username is required";
  }
  if (value.length < VALIDATION_RULES.MIN_LENGTH) {
    return "Must be at least 3 characters";
  }
  // Accept both email format and username format (no specific validation for username)
  return undefined;
};

export const validatePassword = (password: string): string | undefined => {
  if (!password.trim()) {
    return "Password is required";
  }
  if (password.length < VALIDATION_RULES.MIN_LENGTH) {
    return "Password must be at least 3 characters";
  }
  return undefined;
};

export const validateUsername = (username: string): string | undefined => {
  if (!username.trim()) {
    return "Username is required";
  }
  if (username.length < VALIDATION_RULES.MIN_LENGTH) {
    return "Username must be at least 3 characters";
  }
  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword.trim()) {
    return "Please confirm your password";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return undefined;
};

// Form validation functions
export const validateSignInForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmailOrUsername(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  return errors;
};

export const validateSignUpForm = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
): FormErrors => {
  const errors: FormErrors = {};
  
  const usernameError = validateUsername(username);
  if (usernameError) errors.username = usernameError;
  
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  
  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;
  
  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
  return errors;
};

// Check if form has errors
export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
