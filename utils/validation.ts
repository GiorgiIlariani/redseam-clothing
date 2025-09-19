import { FormErrors } from "@/types/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const VALIDATION_RULES = {
  MIN_LENGTH: 3,
  EMAIL_REGEX,
};

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

export const validateSignInForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {};
  
  const emailError = validateEmail(email);
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

export const hasFormErrors = (errors: FormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
