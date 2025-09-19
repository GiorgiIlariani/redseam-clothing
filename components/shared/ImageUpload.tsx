"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { ImageUploadProps } from "@/types/components";
import { validateImageFile, fileToDataURL } from "@/utils/fileValidation";

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, error }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        alert(validation.error);
        return;
      }

      try {
        const dataURL = await fileToDataURL(file);
        setSelectedImage(dataURL);
        setSelectedFile(file);
        onImageChange?.(file);
      } catch (error) {
        alert("Failed to process the selected file");
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    onImageChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div
        className="flex items-center gap-[15px]"
        style={{ width: "272px", height: "100px" }}>
        <div
          className="flex items-center justify-center border border-[#E1DFE1] rounded-full overflow-hidden cursor-pointer"
          style={{ width: "100px", height: "100px" }}
          onClick={handleUploadClick}>
          {selectedImage ? (
            <Image
              src={selectedImage}
              width={100}
              height={100}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-400">
              <Image
                src="/assets/camera.png"
                width={20}
                height={20}
                alt="camera"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {!selectedImage ? (
            <button
              type="button"
              onClick={handleUploadClick}
              className="text-[#3E424A] cursor-pointer focus:outline-none"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}>
              Upload Image
            </button>
          ) : (
            <div className="flex gap-[15px]">
              <button
                type="button"
                onClick={handleUploadClick}
                className="text-[#3E424A] cursor-pointer focus:outline-none"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                }}>
                Upload New
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-200 focus:outline-none"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "center",
                }}>
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <span className="text-red-500 text-xs font-normal">{error}</span>
      )}
    </div>
  );
};

export default ImageUpload;
