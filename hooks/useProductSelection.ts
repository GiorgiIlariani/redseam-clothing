import { useState } from "react";
import { getImageForColor, getColorForImage } from "@/utils/colorUtils";

export const useProductSelection = (
  initialImage: string = "",
  initialColor: string = "",
  initialSize: string = "",
  initialQuantity: number = 1
) => {
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [selectedColor, setSelectedColor] = useState<string>(initialColor);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleColorChange = (color: string, availableColors: string[], images: string[]) => {
    setSelectedColor(color);
    const correspondingImage = getImageForColor(color, availableColors, images);
    if (correspondingImage) {
      setSelectedImage(correspondingImage);
    }
  };

  const handleImageChange = (image: string, availableColors: string[], images: string[]) => {
    setSelectedImage(image);
    const correspondingColor = getColorForImage(image, availableColors, images);
    if (correspondingColor) {
      setSelectedColor(correspondingColor);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return {
    selectedImage,
    selectedColor,
    selectedSize,
    quantity,
    setSelectedImage,
    setSelectedColor,
    setSelectedSize,
    setQuantity,
    handleColorChange,
    handleImageChange,
    handleSizeChange,
    handleQuantityChange,
  };
};
