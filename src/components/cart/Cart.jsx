"use client";

import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { Loader2, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";

const CartItem = ({ item }) => {
  const { removeItem, updateQuantity } = useCartStore(
    useShallow((state) => ({
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
    }))
  );

  const isFreeItem = item.price === 0;

  return (
    <div
      key={`cart-item-${item.id}`}
      className="flex gap-4 p-4 hover:bg-gray-50"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
        <div className="text-sm text-gray-500 mt-1">
          {isFreeItem ? (
            <span className="text-emerald-600 font-medium">مجاني</span>
          ) : (
            formatPrice(item.price)
          )}
        </div>
        <div className="flex items-center gap-3 mt-2">
          {isFreeItem ? (
            <div className="text-sm text-emerald-600 font-medium">
              عنصر جائزة
            </div>
          ) : (
            <>
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="border rounded-md px-2 py-1 text-sm bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={`cart-qty-slct-${item.id}-${num}`} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm hover:text-red-600"
              >
                إزالة
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const {
    cartId,
    removeItem,
    updateQuantity,
    items,
    close,
    isOpen,
    syncWithUser,
    setLoaded,
    getTotalPrice,
    getTotalItems,
  } = useCartStore(
    useShallow((state) => ({
      cartId: state.cartId,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      items: state.items,
      close: state.close,
      isOpen: state.isOpen,
      syncWithUser: state.syncWithUser,
      setLoaded: state.setLoaded,
      getTotalPrice: state.getTotalPrice,
      getTotalItems: state.getTotalItems,
    }))
  );

  useEffect(() => {
    const initCart = async () => {
      await useCartStore.persist.rehydrate();
      await syncWithUser();
      setLoaded(true);
    };

    initCart();
  }, []);

  const [loadingProceed, setLoadingProceed] = useState(false);
  const handelAddOrder = async () => {
    if (!cartId || loadingProceed) {
      return;
    }
    setLoadingProceed(true);

    // place and order to DB TODO
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoadingProceed(false);
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      {/* خلفية */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/* سلة المشتريات */}
      <div
        className={`
                    fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out z-50
                    ${isOpen ? "translate-x-0" : "translate-x-full"}
                `}
      >
        <div className="flex flex-col h-full">
          {/* رأس السلة */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <h2 className="text-lg font-semibold">سلة المشتريات</h2>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium">
                {getTotalItems()}
              </span>
            </div>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* عناصر السلة */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  سلتك فارغة
                </h3>
                <p className="text-gray-500 mb-6">
                  يبدو أنك لم تضف أي عناصر إلى سلتك بعد!
                </p>
                <Link
                  href="/"
                  onClick={close}
                  className="bg-[#1868c9] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0d4e9b] transition-colors"
                >
                  ابدأ التسوق
                </Link>
              </div>
            ) : (
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={"cart-item-" + item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* أسفل السلة */}
          {items.length > 0 && (
            <div className="border-t">
              {/* ملخص الطلب والدفع */}
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">المجموع الفرعي</span>
                    <span className="font-medium">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">الشحن</span>
                    <span className="font-medium">يتم حسابه عند الدفع</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-lg">الإجمالي</span>
                    <span className="font-bold text-lg">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>

                  <button
                    className="w-full bg-[#1868c9] text-white py-4 rounded-full font-bold hover:bg-[#0d4e9b] transition-colors flex items-center justify-center"
                    onClick={handelAddOrder}
                    disabled={loadingProceed}
                  >
                    {loadingProceed ? (
                      <div className="flex items-center gap-1">
                        جاري الانتقال إلى الدفع...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    ) : (
                      "الانتقال إلى الدفع"
                    )}
                  </button>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>🔒</span>
                      <span>دفع آمن</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>🔄</span>
                      <span>إرجاع خلال 30 يومًا</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>💳</span>
                      <span>جميع طرق الدفع الرئيسية مقبولة</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
