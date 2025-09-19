export const handleCartApiError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('Authentication required')) {
      return 'Please log in to manage your cart';
    }
    return error.message;
  }
  return 'An unexpected error occurred';
};
