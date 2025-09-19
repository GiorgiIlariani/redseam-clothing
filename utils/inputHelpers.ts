// Input helper utilities

// Get placeholder text based on input variant
export const getInputPlaceholder = (variant: string, customPlaceholder?: string): string => {
  if (customPlaceholder) return customPlaceholder;
  
  switch (variant) {
    case "email":
      return "Email";
    case "password":
      return "Password";
    case "username":
      return "Username";
    case "confirmPassword":
      return "Confirm Password";
    default:
      return "";
  }
};

// Get input type based on variant and password visibility
export const getInputType = (variant: string, showPassword: boolean = false, customType?: string): string => {
  if (customType) return customType;
  
  switch (variant) {
    case "email":
      return "email";
    case "password":
    case "confirmPassword":
      return showPassword ? "text" : "password";
    default:
      return "text";
  }
};

// Check if input is a password field
export const isPasswordField = (variant: string): boolean => {
  return variant === "password" || variant === "confirmPassword";
};

// Generic form field change handler creator
export const createFieldChangeHandler = <
  T extends Record<string, any>,
  E extends Record<string, string | undefined> = Record<string, string | undefined>
>(
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors?: React.Dispatch<React.SetStateAction<E>>,
  field?: keyof T
) => {
  return (fieldName: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetField = field || fieldName;
    
    setFormData(prev => ({
      ...prev,
      [targetField]: e.target.value
    }));
    
    // Clear error for this field if it exists
    if (setErrors) {
      setErrors(prev => ({
        ...prev,
        [targetField as keyof E]: undefined
      } as E));
    }
  };
};
