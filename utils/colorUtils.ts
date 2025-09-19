export const getColorHex = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    Black: "#000000",
    "Navy Blue": "#1e3a8a",
    Green: "#16a34a",
    Purple: "#9333ea",
    Peach: "#fdba74",
    Brown: "#92400e",
    Olive: "#65a30d",
    Blue: "#2563eb",
    Grey: "#6b7280",
    Gray: "#6b7280",
    Red: "#dc2626",
    White: "#ffffff",
  };
  return colorMap[colorName] || "#6b7280";
};

export const getImageForColor = (color: string, availableColors: string[], images: string[]): string => {
  if (!availableColors || !images) return "";

  const colorIndex = availableColors.indexOf(color);
  if (colorIndex >= 0 && colorIndex < images.length) {
    return images[colorIndex];
  }
  return images[0] || "";
};

export const getColorForImage = (image: string, availableColors: string[], images: string[]): string => {
  if (!availableColors || !images) return "";

  const imageIndex = images.indexOf(image);
  if (imageIndex >= 0 && imageIndex < availableColors.length) {
    return availableColors[imageIndex];
  }
  return availableColors[0] || "";
};
