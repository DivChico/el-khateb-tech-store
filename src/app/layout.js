import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";
import { SanityLive } from "@/sanity/lib/live";
import Cart from "@/components/cart/Cart";

export const metadata = {
  title: "الخطيب تكنولجي - المتجر الالكتروني",
  description: "الخطيب تكنولجي - المتجر الالكتروني",
};

const myFont = localFont({
  src: "../../public/fonts/SST-Arabic-Medium.ttf",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="ar" className="bg-white">
      <body className={`antialiased ${myFont.className}`}>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
