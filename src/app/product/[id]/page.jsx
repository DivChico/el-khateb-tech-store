import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { getProductById } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Home, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = async ({ params }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    console.log(`Product not found for id: ${id}`);
  }
  if (!product?.price) {
    return <div>Product not found</div>;
  }

  const originalPrice = product.price * 5;

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center flex-row-reverse gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-fontSecondary transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <ChevronLeft className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 truncate">{product.title}</span>
          </div>
        </div>
      </div>

      <div
        className="min-h-screen bg-[#f3f9fb] flex items-center justify-center p-4 md:p-8"
        dir="rtl"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-6xl w-full grid md:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="p-6 flex flex-col gap-4 ">
            {product.image && (
              <div className="bg-white rounded-sm p-4 aspect-square overflow-hidden ">
                <div className="relative aspect-square  ">
                  <Image
                    fill
                    priority
                    className="object-fill h-full hover:scale-105 transition-transform duration-300"
                    alt={product.title ?? "Product Image"}
                    src={urlFor(product.image).url()}
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-4">
              <button className="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1868c9] transition-all">
                {product.image && (
                  <div className="bg-white rounded-2xl p-4 aspect-square overflow-hidden ">
                    <div className="relative aspect-square">
                      <Image
                        fill
                        priority
                        className="object-fill  hover:scale-105 transition-transform duration-300"
                        alt={product.title ?? "Product Image"}
                        src={urlFor(product.image).url()}
                      />
                    </div>
                  </div>
                )}
              </button>
              <button className="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1868c9] transition-all">
                {product.image && (
                  <div className="bg-white rounded-2xl p-4 aspect-square overflow-hidden ">
                    <div className="relative aspect-square">
                      <Image
                        fill
                        priority
                        className="object-fill hover:scale-105 transition-transform duration-300"
                        alt={product.title ?? "Product Image"}
                        src={urlFor(product.image).url()}
                      />
                    </div>
                  </div>
                )}
              </button>
              <button className="rounded-lg overflow-hidden border-2 border-transparent hover:border-[#1868c9] transition-all">
                {product.image && (
                  <div className="bg-white rounded-2xl p-4 aspect-square overflow-hidden ">
                    <div className="relative aspect-square">
                      <Image
                        fill
                        priority
                        className="object-fill hover:scale-105 transition-transform duration-300"
                        alt={product.title ?? "Product Image"}
                        src={urlFor(product.image).url()}
                      />
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <h1 className="text-3xl font-bold text-[#0d4e9b] mb-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-[#1868c9]">
                {formatPrice(product.price).replace("$", "")}
                شيكل{" "}
              </span>
              <span className="text-sm line-through text-gray-500">
                {originalPrice}
                {formatPrice(originalPrice).replace("$", "")}
                شيكل{" "}
              </span>
              <span className="bg-[#00b3ff] text-white text-xs px-2 py-1 rounded-full">
                خصم ٢٠٪
              </span>
            </div>

            <div className="h-px bg-[#d9d9d9] w-full my-4"></div>

            <div className="mb-6">
              <h2 className="font-semibold text-[#0d4e9b] mb-2">الوصف</h2>
              <p className="text-gray-700 leading-relaxed">
                سماعات بلوتوث لاسلكية عالية الجودة مع تقنية إلغاء الضوضاء
                النشطة. تتميز بعمر بطارية يصل إلى ٢٠ ساعة، وتصميم مريح للاستخدام
                اليومي. متوافقة مع جميع الأجهزة التي تدعم تقنية البلوتوث.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold text-[#0d4e9b] mb-2">المميزات</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>تقنية إلغاء الضوضاء النشطة</li>
                <li>عمر بطارية يصل إلى ٢٠ ساعة</li>
                <li>تصميم مريح وخفيف الوزن</li>
                <li>مقاومة للماء والعرق</li>
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="font-semibold text-[#0d4e9b] mb-2">اللون</h2>
              <div className="flex gap-2 mt-2">
                <button className="w-8 h-8 rounded-full bg-black border-2 border-transparent hover:border-[#1868c9] focus:border-[#1868c9] transition-all"></button>
                <button className="w-8 h-8 rounded-full bg-white border border-gray-300 hover:border-[#1868c9] focus:border-[#1868c9] transition-all"></button>
                <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent hover:border-[#1868c9] focus:border-[#1868c9] transition-all"></button>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="px-3 py-2 text-[#1868c9] hover:bg-gray-100">
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">١</span>
                  <button className="px-3 py-2 text-[#1868c9] hover:bg-gray-100">
                    +
                  </button>
                </div>
                <span className="text-gray-500">المتبقي في المخزون: ١٢</span>
              </div>
              <AddToCartButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
