import Header from "@/components/Header";
import "./globals.css";
import localFont from "next/font/local";
import { getCurrentSession } from "@/actions/auth";
import { SanityLive } from "@/sanity/lib/live";

export const metadata = {
  title: "الخطيب تكنولجي - المتجر الالكتروني",
  description: "الخطيب تكنولجي - المتجر الالكتروني",
};

const myFont = localFont({ src: "../../public/fonts/SST-Arabic-Medium.ttf" });

export default async function RootLayout({ children }) {
  const { user } = await getCurrentSession();

  return (
    <html lang="ar" className="bg-white">
      <body className={`antialiased ${myFont.className}`}>
        <Header user={user} />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
