import { FormErrors } from "@/types/auth";

// Error message parsing utilities
export const parseAuthErrorMessage = (errorMessage: string): { field: keyof FormErrors; message: string } | null => {
  if (errorMessage.includes('Email:')) {
    return { field: 'email', message: errorMessage.replace('Email: ', '') };
  }
  if (errorMessage.includes('Username:')) {
    return { field: 'username', message: errorMessage.replace('Username: ', '') };
  }
  if (errorMessage.includes('Password:')) {
    return { field: 'password', message: errorMessage.replace('Password: ', '') };
  }
  return null;
};

// Set form errors from API error
export const setFormErrorFromApiError = (error: unknown): FormErrors => {
  if (error instanceof Error) {
    const parsedError = parseAuthErrorMessage(error.message);
    if (parsedError) {
      return { [parsedError.field]: parsedError.message };
    }
    return { email: error.message };
  }
  return { email: "An unexpected error occurred. Please try again." };
};

// Generic API error handler
export const handleApiError = (error: unknown, fallbackMessage: string = "An error occurred"): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMessage;
};

// Validation error handler for API responses
export const handleValidationErrors = (errorData: any): string => {
  if (errorData.errors) {
    const errors = errorData.errors;
    if (errors.email) return `Email: ${errors.email[0]}`;
    if (errors.username) return `Username: ${errors.username[0]}`;
    if (errors.password) return `Password: ${errors.password[0]}`;
  }
  return errorData.message || 'Validation error';
};

// HTTP status code error messages
export const getHttpErrorMessage = (status: number, context: 'login' | 'register' = 'login'): string => {
  switch (status) {
    case 401:
      return context === 'login' ? 'Invalid email or password' : 'Registration failed';
    case 422:
      return 'Validation error';
    case 404:
      return 'Resource not found';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return `${context === 'login' ? 'Login' : 'Registration'} failed. Please try again.`;
  }
};
