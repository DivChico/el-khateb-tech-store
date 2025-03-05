import CategoryCard from "@/components/CategoryCard";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import OfferCard from "@/components/OfferCard";
import ProductCard from "@/components/ProductCard";
import ProductsGridDisplay from "@/components/ProductsGridDisplay";
import { getAllProducts } from "@/sanity/lib/client";

export default async function Home() {
  const products = await getAllProducts();
  products.length = 5;

  return (
    <div className="bg-white text-black min-h-screen ">
      <Hero />
      <ProductsGridDisplay sectionTitle={"افضل العروض"}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ProductsGridDisplay>
      <ProductsGridDisplay sectionTitle={"التصنيفات"}>
        <CategoryCard
          title={"اكسسورات كومبيوتر"}
          img={
            "https://i.ibb.co/qYYrStr1/gaming-headset-with-glowing-lights-isolated-from-background-free-png.webp"
          }
        />
        <CategoryCard
          title={"لابتوبات"}
          img={
            "https://i.ibb.co/tp6gHF7n/laptop-with-blank-screen-isolate-on-transparent-background-ai-generated-png.webp"
          }
        />
        <CategoryCard
          title={"راوترات"}
          img={
            "https://i.ibb.co/5WFPGRcw/purepng-com-routerelectronicsroutermodem-941524672790kvn3d.png"
          }
        />
        <CategoryCard
          title={"اكسسورات جوال"}
          img={"https://i.ibb.co/7xvMXHtq/pngimg-com-usb-cable-PNG9.png"}
        />
        <CategoryCard
          title={"هواتف ذكية"}
          img={"https://i.ibb.co/RGGSt0sQ/image-3.png"}
        />
      </ProductsGridDisplay>
      <ProductsGridDisplay sectionTitle={"عروض اكبر الشركات"} maxColums={3}>
        <OfferCard url={"https://i.ibb.co/T6wJ4kF/Group-50.png"} />
        <OfferCard url={"https://i.ibb.co/9mHnXZcp/Group-51.png"} />
        <OfferCard
          url={
            "https://i.ibb.co/dZyZn7j/d53bd41c-a7e3-4a63-bc81-78b92e6dbd84d-cover.png"
          }
        />
      </ProductsGridDisplay>
    </div>
  );
}
