import ProductCard from "@/components/ProductCard";
import ProductsGridDisplay from "@/components/ProductsGridDisplay";
import { searchProducts } from "@/sanity/lib/client";
import React from "react";

const SearchPage = async ({ searchParams }) => {
  const { query } = await searchParams;

  const products = await searchProducts(query);

  return (
    <div>
      <div className="bg-blue-50 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-fontPrimary mb-2">
            نتائج البحث عن &quot;{query}&quot; -
          </h1>
          <p className="text-center text-fontSecondary text-sm md:text-base animate-pulse">
            ⚡️ العرض ينتهي قريبًا! ⏰ لفترة محدودة فقط
          </p>
        </div>
      </div>

      <div className="bg-bgTertiary py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-900">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">🚚</span>
              <span>توصيل مجاني</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⭐️</span>
              <span>أعلى تقييم</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">💰</span>
              <span>أفضل الأسعار</span>
            </div>
          </div>
        </div>
      </div>

      <section className="container mx-auto py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">
            🎉 {products.length} عروض مذهلة متاحة الآن
          </p>
        </div>
        <ProductsGridDisplay sectionTitle={""} more={false}>
          {products.map((product, idx) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductsGridDisplay>
      </section>
    </div>
  );
};

export default SearchPage;
