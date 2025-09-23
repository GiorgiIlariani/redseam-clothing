"use client";

import React from "react";
import Image from "next/image";
import Close from "@/components/icons/Close";
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
    router.push("/");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl max-w-[600px] w-full p-16 transform scale-100 transition-all duration-300 border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <Close className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-10 w-[76px] h-[76px] bg-[#F8F6F7] rounded-full flex items-center justify-center">
            <Image
              src="/assets/success.png"
              alt="Success"
              width={36}
              height={29}
              className="w-[36px] h-[29px] object-cover"
            />
          </div>

          <h3 className="text-[#10151F] mb-6 text-[42px] font-semibold text-center">
            {title}
          </h3>

          <p className="text-[#3E424A] mb-10 max-w-[280px] text-sm text-center leading-[1.4]">
            {message}
          </p>
          <button
            onClick={handleContinueShopping}
            className="bg-[#FF4000] cursor-pointer text-white font-medium hover:bg-[#E63600] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF4000]/20 focus:ring-offset-2 shadow-lg hover:shadow-xl w-full sm:w-[214px] h-[41px] rounded-[10px] px-5 py-[10px]">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
