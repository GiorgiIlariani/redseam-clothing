// File validation constants
export const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg", 
  "image/png",
  "image/gif",
  "image/webp",
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// File validation result interface
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

// Validate file type
export const validateFileType = (file: File): FileValidationResult => {
  if (!VALID_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Please select a valid image file (JPG, PNG, GIF, WebP)"
    };
  }
  return { isValid: true };
};

// Validate file size
export const validateFileSize = (file: File): FileValidationResult => {
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: "File size must be less than 5MB"
    };
  }
  return { isValid: true };
};

// Complete file validation
export const validateImageFile = (file: File): FileValidationResult => {
  // Check file type first
  const typeValidation = validateFileType(file);
  if (!typeValidation.isValid) {
    return typeValidation;
  }
  
  // Check file size
  const sizeValidation = validateFileSize(file);
  if (!sizeValidation.isValid) {
    return sizeValidation;
  }
  
  return { isValid: true };
};

// Convert file to base64 data URL
export const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
};
