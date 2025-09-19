"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Congrats!",
  message = "Your order is placed successfully!",
  buttonText = "Continue shopping",
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    onClose();
    router.push('/');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Improved Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-[600px] w-full p-16 transform scale-100 transition-all duration-300 border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Success Image */}
          <div className="mb-10 w-[76px] h-[76px] bg-[#F8F6F7] rounded-full flex items-center justify-center">
            <Image
              src="/assets/success.png"
              alt="Success"
              width={36}
              height={29}
              className="w-[36px] h-[29px] object-cover"
            />
          </div>

          {/* Title */}
          <h3
            className="text-[#10151F] mb-6"
            style={{
              fontFamily: "Poppins",
              fontWeight: 600,
              fontSize: "42px",
              lineHeight: "100%",
              letterSpacing: "0%",
              textAlign: "center",
            }}>
            {title}
          </h3>

          {/* Message */}
          <p
            className="text-[#3E424A] mb-10 max-w-[280px]"
            style={{
              fontFamily: "Poppins",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "140%",
              letterSpacing: "0%",
              textAlign: "center",
            }}>
            {message}
          </p>

          {/* Action Button */}
          <button
            onClick={handleContinueShopping}
            className="bg-[#FF4000] text-white font-medium hover:bg-[#E63600] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF4000]/20 focus:ring-offset-2 shadow-lg hover:shadow-xl"
            style={{
              width: "214px",
              height: "41px",
              borderRadius: "10px",
              paddingTop: "10px",
              paddingRight: "20px",
              paddingBottom: "10px",
              paddingLeft: "20px",
            }}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
