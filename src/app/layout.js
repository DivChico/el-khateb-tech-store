import "./globals.css";
import Header from "@/components/Header";
import localFont from "next/font/local";
export const metadata = {
  title: "الخطيب تكنولجي - المتجر الالكتروني",
  description: "الخطيب تكنولجي - المتجر الالكتروني",
};

const myFont = localFont({ src: "../../public/fonts/SST-Arabic-Medium.ttf" });
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body className={` antialiased ${myFont.className}`}>
        <Header />

        {children}
      </body>
    </html>
  );
}
