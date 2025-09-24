"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Close from "@/components/icons/Close";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { DELIVERY_COST } from "@/utils/constants";

const ShoppingCart = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    cartTotal,
    uniqueItemsCount,
    isLoading,
  } = useCart();
  const router = useRouter();

  const handleGoToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 cursor-pointer" onClick={closeCart} />
      )}

      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: "min(540px, 100vw)",
          borderLeftWidth: "1px",
          borderLeftColor: "#E5E7EB",
        }}>
        <div className="flex items-center justify-between pt-6 sm:pt-[41px] px-4 sm:px-10 pb-6 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold text-[#10151F]">
            Shopping Cart ({uniqueItemsCount})
          </h2>
          <button
            onClick={closeCart}
            className="hover:opacity-70 transition-opacity cursor-pointer">
            <Close className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-10 min-h-0">
          {isLoading && cartItems.length === 0 ? (
            <div className="flex justify-center items-center pt-[151px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF4000]"></div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center pt-[151px]">
              <Image
                src="/assets/no-cart-item.png"
                alt="no-cart"
                width={170}
                height={135}
              />
              <strong className="text-2xl font-semibold text-[#10151F] mt-6">
                Ooops!
              </strong>
              <p className="text-[#3E424A] text-sm font-normal mt-[10px]">
                You&apos;ve got nothing in your cart just yet...
              </p>

              <button
                onClick={closeCart}
                className="w-full sm:w-[214px] text-white mt-[58px] flex items-center justify-center gap-2 bg-[#FF4000] py-[10px] rounded-[10px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E63600] transition-colors duration-200">
                Start shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="pt-6 px-4 sm:px-10 pb-10 flex-shrink-0">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-normal text-[#3E424A]">
                  Items subtotal:
                </span>
                <span className="text-base font-normal text-[#3E424A]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base font-normal text-[#3E424A]">
                  Delivery:
                </span>
                <span className="text-base font-normal text-[#3E424A]">
                  ${DELIVERY_COST.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-medium text-[#10151F]">
                  Total:
                </span>
                <span className="text-xl font-medium text-[#10151F]">
                  ${(cartTotal + DELIVERY_COST).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleGoToCheckout}
              className="w-full cursor-pointer bg-[#FF4000] text-white py-3 rounded-lg font-medium hover:bg-[#E63600] transition-colors duration-200 mt-[102px]">
              Go to checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
