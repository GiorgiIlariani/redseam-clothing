"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { productsAPI } from "@/lib/productsApi";
import { ProductDetail } from "@/types/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useDropdown } from "@/hooks/useDropdown";
import { useProductSelection } from "@/hooks/useProductSelection";
import ProductDetailSkeleton from "@/components/shared/ProductDetailSkeleton";
import { getColorHex } from "@/utils/colorUtils";

const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState<Set<string>>(
    new Set()
  );
  const { openCart, addToCart, isLoading, error, clearError } = useCart();
  const { isAuthenticated } = useAuth();

  const {
    selectedImage,
    selectedColor,
    selectedSize,
    quantity,
    setSelectedImage,
    setSelectedColor,
    setSelectedSize,
    handleColorChange,
    handleImageChange,
    handleSizeChange,
    handleQuantityChange,
  } = useProductSelection();

  const {
    isOpen: showQuantityDropdown,
    dropdownRef: quantityDropdownRef,
    toggleDropdown: toggleQuantityDropdown,
    closeDropdown: closeQuantityDropdown,
  } = useDropdown();

  useEffect(() => {
    clearError();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setMainImageLoaded(false);
        setThumbnailsLoaded(new Set());
        const result = await productsAPI.getProductById(Number(productId));
        setProduct(result);

        if (result.images && result.images.length > 0) {
          setSelectedImage(result.images[0]);
        }

        if (result.available_colors && result.available_colors.length > 0) {
          setSelectedColor(result.available_colors[0]);
        }

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
  }, [
    productId,
    setSelectedImage,
    setSelectedColor,
    setSelectedSize,
    clearError,
  ]);

  const handleQuantitySelect = (newQuantity: number) => {
    handleQuantityChange(newQuantity);
    closeQuantityDropdown();
  };

  const handleThumbnailLoad = (imageUrl: string) => {
    setThumbnailsLoaded((prev) => new Set(prev).add(imageUrl));
  };

  const handleMainImageLoad = () => {
    setMainImageLoaded(true);
  };

  const handleProductColorChange = (color: string) => {
    if (product?.available_colors && product?.images) {
      handleColorChange(color, product.available_colors, product.images);
    }
  };

  const handleProductImageChange = (image: string) => {
    if (product?.available_colors && product?.images) {
      setMainImageLoaded(false);
      handleImageChange(image, product.available_colors, product.images);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (!isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    const availableQuantity = product.quantity ?? 0;
    if (availableQuantity === 0) {
      alert("This product is out of stock");
      return;
    }

    if (
      !selectedColor &&
      product.available_colors &&
      product.available_colors.length > 0
    ) {
      alert("Please select a color");
      return;
    }

    if (
      !selectedSize &&
      product.available_sizes &&
      product.available_sizes.length > 0
    ) {
      return;
    }

    try {
      const color = selectedColor || product.available_colors?.[0] || "Default";
      const size = selectedSize || product.available_sizes?.[0] || "One Size";

      await addToCart(product.id, color, size, quantity);
      openCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div className="mt-[30px] px-[100px]">Product not found</div>;
  }

  const availableQuantity = product.quantity ?? 0;
  return (
    <main className="mt-4 sm:mt-[30px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[100px] pb-8 sm:pb-[110px]">
      <h4 className="text-sm font-normal text-[#10151F]">Listing / Product</h4>

      <div className="mt-8 sm:mt-[49px] flex flex-col lg:flex-row gap-8 lg:gap-[168px]">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="flex sm:flex-col gap-2 sm:gap-[9px] overflow-x-auto sm:overflow-x-visible">
            {product?.images?.map((image, index) => {
              const isLoaded = thumbnailsLoaded.has(image);
              return (
                <div
                  key={index}
                  className={`w-16 h-16 sm:w-[100px] sm:h-[100px] relative rounded-lg overflow-hidden cursor-pointer border-2 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 ${
                    selectedImage === image
                      ? "border-[#FF4000]"
                      : "border-gray-200"
                  }`}
                  onClick={() => handleProductImageChange(image)}>
                  <Image
                    src={image}
                    alt={`${product.name} image ${index + 1}`}
                    fill
                    sizes="100px"
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    className={`object-cover transition-all duration-500 ${
                      isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    onLoad={() => handleThumbnailLoad(image)}
                    priority={index === 0}
                  />
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full sm:w-[400px] md:w-[500px] lg:w-[703px] aspect-[3/4] lg:h-[937px] lg:aspect-auto relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            {selectedImage && (
              <>
                <Image
                  src={selectedImage}
                  alt={product?.name || "Product image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 703px"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  className={`object-cover transition-all duration-500 ${
                    mainImageLoaded
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                  onLoad={handleMainImageLoad}
                  priority={true}
                />
                {!mainImageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-8 lg:gap-14">
          <div className="flex flex-col gap-4 lg:gap-[21px]">
            <h1 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#10151F]">
              {product.name}
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-[32px] font-semibold text-[#10151F]">
              ${product.price}
            </h2>
          </div>

          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-[#3E424A] font-normal text-base">
                Color:
              </span>
              <div className="flex gap-[13px]">
                {product.available_colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleProductColorChange(color)}
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
                Size: {selectedSize || "Not selected"}
              </span>
              <div className="flex gap-[10px]">
                {product.available_sizes ? (
                  product.available_sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`border ${
                        selectedSize === size
                          ? "border-[#10151F] bg-[#F8F6F7]"
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
                      <span className="text-base">{size}</span>
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
              <div className="relative w-fit" ref={quantityDropdownRef}>
                <button
                  onClick={
                    availableQuantity > 0 ? toggleQuantityDropdown : undefined
                  }
                  disabled={availableQuantity === 0}
                  className={`w-[70px] h-[42px] px-4 py-[9px] border border-gray-300 rounded-lg transition-colors flex items-center justify-between text-left ${
                    availableQuantity > 0
                      ? "hover:bg-gray-50 cursor-pointer"
                      : "bg-gray-100 cursor-not-allowed"
                  }`}>
                  <span className="text-gray-700 text-sm">
                    {availableQuantity > 0 ? quantity : 0}
                  </span>
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

                {showQuantityDropdown && availableQuantity > 0 && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-[70px] max-h-[200px] overflow-y-auto">
                    {Array.from(
                      { length: availableQuantity },
                      (_, i) => i + 1
                    ).map((num) => (
                      <button
                        key={num}
                        onClick={() => handleQuantitySelect(num)}
                        className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${
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

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isLoading || (product.quantity ?? 0) === 0}
            className="w-full flex items-center justify-center gap-2 bg-[#FF4000] py-[10px] rounded-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E63600] transition-colors duration-200">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <p className="text-white text-lg font-medium">Adding...</p>
              </>
            ) : (product.quantity ?? 0) === 0 ? (
              <p className="text-white text-lg font-medium">Out of stock</p>
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

          <div className="w-full my-14 border border-[#E1DFE1]" />

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
