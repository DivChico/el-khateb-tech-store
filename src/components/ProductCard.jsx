import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ product }) => {
  return (
    <div className="  w-52 px-2 py-4 flex items-center flex-col justify-center bg-white border border-bgTertiary hover:border-fontPrimary cursor-pointer hover:scale-105 ease-in rounded-lg overflow-hidden relative">
      <div className="relative h-60  w-full">
        {product.image && (
          <Image
            src={urlFor(product.image).width(256).url()}
            alt={product.title || "Product Image"}
            fill
            className="object-contain p-2"
            loading="lazy"
          />
        )}
      </div>
      <div className="px-4 py-6 text-center text-fontSecondary">
        <h3 className=" font-bold text-sm line-clamp-2 text-black">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 justify-center">
          <span className="text-lg font-bold text-fontTertiary">
            ${(product.price || 0).toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ${((product.price || 0) * 5).toFixed(2)}
          </span>
        </div>{" "}
      </div>
      <div className="  bg-fontPrimary text-white absolute top-0 right-0 p-1 rounded-bl-lg">
        <p className="font-semibold text-xs">خصم</p>
        <p className=" font-semibold">50%</p>
      </div>
      <Link
        href={`/product/${product._id}`}
        className="w-full text-center bg-gradient-to-r from-fontSecondary to-fontPrimary text-white py-2 rounded-full text-xs font-bold hover:brightness-110 transition-all"
      >
        اضافة الى السلة{" "}
      </Link>
    </div>
  );
};

export default ProductCard;
