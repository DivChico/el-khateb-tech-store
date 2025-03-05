"use client";
import { formatPrice } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { useCartStore } from "@/stores/cart-store";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useShallow } from "zustand/shallow";

const AddToCartButton = ({ product }) => {
  const { cartId, addItem, open } = useCartStore(
    useShallow((state) => ({
      cartId: state.cartId,
      addItem: state.addItem,
      open: state.open,
    }))
  );

  const [isLoading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!product.title || product.price === undefined || !product.image) {
      return;
    }
    setLoading(true);

    // Add the item to the cart
    await new Promise((resolve) => setTimeout(resolve, 600));

    addItem({
      id: product._id,
      title: product.title,
      price: product.price,
      image: urlFor(product.image).url(),
      quantity: 1,
    });

    try {
      const anyWindow = window;

      if (anyWindow.umami) {
        anyWindow.umami.track("add_to_cart", {
          cartId: cartId,
          productId: product._id,
          productName: product.title,
          price: product.price,
          currency: "USD",
        });
      }
    } catch (e) {}

    setLoading(false);
    open();
  };

  if (!product.price) {
    return null;
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`
            w-full mt-6 bg-[#1868c9] hover:bg-[#0d4e9b]
            text-white py-3 px-6 rounded-lg font-medium
            transition-colors flex items-center justify-center gap-2
            disabled:opacity-80 disabled:cursor-not-allowed
            disabled:hover:scale-100 disabled:active:scale-100
            disabled:hover:bg-[#1868c9]
        `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>جاري الإضافة إلى السلة</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
          </svg>
          <span>إضافة إلى السلة - {formatPrice(product.price)}</span>
        </>
      )}
    </button>
  );
};

export default AddToCartButton;
