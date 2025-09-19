"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { productsAPI } from "@/lib/productsApi";
import { ProductDetail } from "@/types/products";
import { useCart } from "@/contexts/CartContext";

const ProductPage = () => {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [showQuantityDropdown, setShowQuantityDropdown] =
    useState<boolean>(false);
  const quantityDropdownRef = useRef<HTMLDivElement>(null);
  const { openCart, addToCart, isLoading, error } = useCart();

  // Create color-image mapping (each color corresponds to an image by index)
  const getImageForColor = (color: string): string => {
    if (!product?.available_colors || !product?.images) return "";
    
    const colorIndex = product.available_colors.indexOf(color);
    if (colorIndex >= 0 && colorIndex < product.images.length) {
      return product.images[colorIndex];
    }
    // Fallback to first image if mapping doesn't exist
    return product.images[0] || "";
  };

  const getColorForImage = (image: string): string => {
    if (!product?.available_colors || !product?.images) return "";
    
    const imageIndex = product.images.indexOf(image);
    if (imageIndex >= 0 && imageIndex < product.available_colors.length) {
      return product.available_colors[imageIndex];
    }
    // Fallback to first color if mapping doesn't exist
    return product.available_colors[0] || "";
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const result = await productsAPI.getProductById(Number(productId));
        console.log("Product data:", result);
        setProduct(result);
        // Set the first image as selected by default
        if (result.images && result.images.length > 0) {
          setSelectedImage(result.images[0]);
        }
        // Set the first color as selected by default
        if (result.available_colors && result.available_colors.length > 0) {
          setSelectedColor(result.available_colors[0]);
        }
        // Set the first size as selected by default
        if (result.available_sizes && result.available_sizes.length > 0) {
          setSelectedSize(result.available_sizes[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Color mapping for display
  const getColorHex = (colorName: string): string => {
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

  const handleQuantitySelect = (newQuantity: number) => {
    setQuantity(newQuantity);
    setShowQuantityDropdown(false);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Sync image with color selection
    const correspondingImage = getImageForColor(color);
    if (correspondingImage) {
      setSelectedImage(correspondingImage);
    }
  };

  const handleImageChange = (image: string) => {
    setSelectedImage(image);
    // Sync color with image selection
    const correspondingColor = getColorForImage(image);
    if (correspondingColor) {
      setSelectedColor(correspondingColor);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    // Validate selections
    if (!selectedColor && product.available_colors && product.available_colors.length > 0) {
      alert('Please select a color');
      return;
    }
    
    if (!selectedSize && product.available_sizes && product.available_sizes.length > 0) {
      alert('Please select a size');
      return;
    }

    try {
      // Use selected values or defaults
      const color = selectedColor || product.available_colors?.[0] || 'Default';
      const size = selectedSize || product.available_sizes?.[0] || 'One Size';
      
      await addToCart(product.id, color, size, quantity);
      openCart(); // Open cart to show the added item
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (loading) {
    return <div className="mt-[30px] px-[100px]">Loading...</div>;
  }

  if (!product) {
    return <div className="mt-[30px] px-[100px]">Product not found</div>;
  }
  return (
    <main className="mt-[30px] px-[100px] pb-[110px]">
      <h4 className="text-sm font-normal text-[#10151F]">Listing / Product</h4>

      <div className="mt-[49px] flex gap-[168px]">
        <div className="flex gap-6">
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-[9px]">
            {product?.images?.map((image, index) => (
              <div
                key={index}
                className={`w-[100px] h-[100px] relative rounded-lg overflow-hidden cursor-pointer border-2 ${
                  selectedImage === image
                    ? "border-[#FF4000]"
                    : "border-gray-200"
                }`}
                onClick={() => handleImageChange(image)}>
                <Image
                  src={image}
                  alt={`${product.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-[703px] h-[937px] relative bg-gray-100 rounded-lg overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product?.name || "Product image"}
                width={703}
                height={937}
                className="w-[703px] h-[937px] object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-14">
          {/* 1 */}
          <div className="flex flex-col gap-[21px]">
            <h1 className="text-[32px] font-semibold text-[#10151F]">
              {product.name}
            </h1>
            <h2 className="text-[32px] font-semibold text-[#10151F]">
              ${product.price}
            </h2>
          </div>
          {/* 2 */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-[#3E424A] font-normal text-base">
                Color:
              </span>
              <div className="flex gap-[13px]">
                {product.available_colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-[#FF4000]"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: getColorHex(color) }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#3E424A] font-normal text-base">
                Size:
              </span>
              <div className="flex gap-[10px]">
                {product.available_sizes ? (
                  product.available_sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border ${
                        selectedSize === size
                          ? "border-[#FF4000] bg-[#FF4000] text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                      style={{
                        width: "70px",
                        height: "42px",
                        paddingTop: "9px",
                        paddingRight: "16px",
                        paddingBottom: "9px",
                        paddingLeft: "16px",
                        borderRadius: "10px",
                        borderWidth: "1px",
                      }}>
                      <span
                        style={{
                          fontFamily: "Poppins",
                          fontWeight: 400,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                        }}>
                        {size}
                      </span>
                    </button>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">One Size</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[#3E424A] font-normal text-base">
                Quantity:
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
                  className="w-[70px] h-[42px] px-4 py-[9px] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between text-left">
                  <span className="text-gray-700 text-sm">{quantity}</span>
                  <Image
                    src="/assets/chevron-down.png"
                    alt="chevron-down"
                    width={16}
                    height={16}
                    className={`transition-transform ${
                      showQuantityDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showQuantityDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-[120px] max-h-[200px] overflow-y-auto">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        onClick={() => handleQuantitySelect(num)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          quantity === num
                            ? "bg-[#FF4000] text-white"
                            : "text-gray-700"
                        }`}>
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#FF4000] py-[10px] rounded-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E63600] transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <p className="text-white text-lg font-medium">Adding...</p>
              </>
            ) : (
              <>
                <Image
                  src="/assets/shopping-cart.png"
                  alt="shopping-cart"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <p className="text-white text-lg font-medium">Add to cart</p>
              </>
            )}
          </button>
          {/* 4 */}
          <div className="w-full my-14 border border-[#E1DFE1]" />

          {/* 5 */}
          <div className="flex flex-col gap-[7px]">
            <div className="w-full flex justify-between items-center">
              <h4 className="text-[#10151F] font-medium text-xl">Details</h4>
              <Image
                src="/assets/details.png"
                alt="shopping-cart"
                width={109}
                height={61}
                className="w-[109px] h-[61px]"
              />
            </div>

            <div className="flex flex-col gap-[19px]">
              <div className="flex items-center gap-2">
                <span className="text-[#10151F] font-normal text-base">
                  Brand:
                </span>
                {product.brand && (
                  <>
                    <Image
                      src={product.brand.image}
                      alt={product.brand.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                    <span className="text-[#10151F] font-medium text-base">
                      {product.brand.name}
                    </span>
                  </>
                )}
              </div>
              <p className="text-[#3E424A] font-normal text-base">
                {product.description || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
