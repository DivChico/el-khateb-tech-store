"use client";
import { logoutUser } from "@/actions/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/stores/cart-store";
import { useShallow } from "zustand/shallow";

const Header = ({ user }) => {
  console.log(user);

  const [isOpen, setIsOpen] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const { open, getTotalItems } = useCartStore(
    useShallow((state) => ({
      open: state.open,
      getTotalItems: state.getTotalItems,
    }))
  );
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrolledUp = currentScrollY < prevScrollY;

      if (scrolledUp) {
        setIsOpen(true);
      } else if (currentScrollY > 100) {
        setIsOpen(false);
      }

      setPrevScrollY(currentScrollY);
    };

    setPrevScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <header className="w-full sticky top-0 z-50">
      <div
        className={`w-full shadow-sm  rounded-b-2xl bg-white/80 backdrop-blur-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* announcment bar */}
        <div className="w-full flex items-center justify-between flex-row-reverse px-16 bg-blue-50 text-gray-900 h-10">
          <p className="text-xs  text-gray-700 leading-relaxed">
            اهلا وسهلا بك الى اكبر معرض للاجهزة الاكترونية في قطاع غزة{" "}
          </p>
          <div className="flex items-center flex-row-reverse gap-4 ">
            <div className="flex items-center space-x-1 ">
              <p className="text-xs font-semibold text-gray-900">جميع العروض</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-fontSecondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-1 ">
              <p className="text-xs font-semibold text-gray-900">
                {" "}
                توصيل مجاني
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-fontSecondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-1 ">
              <p className="text-xs font-semibold text-gray-900">
                دير البلح - مفترق البركة{" "}
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-fontSecondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* search and logo */}
        <div className="w-full h-20 border-b-2 border-bgSecondary  mx-auto max-w-7xl flex  items-center justify-between flex-row-reverse">
          {/* logo */}
          <div className="flex items-center justify-center gap-2  h-full ">
            <Link
              href={"/"}
              className=" text-lg font-semibold tracking-wider text-fontSecondary"
              prefetch
            >
              الخطيب تكنولوجي
            </Link>
            <div className=" p-2 bg-bgSecondary rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-fontSecondary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          </div>
          {/* search bar */}
          <div className=" flex items-center justify-center gap-4 py-4">
            <Link
              key={2}
              href={`/category/electronics`}
              // href={`/category/${category.slug?.current}`}
              className=" bg-bgSecondary text-fontSecondary px-3 py-2 rounded-lg flex items-center justify-center hover:bg-fontSecondary hover:text-bgSecondary"
              prefetch
            >
              لابتوبات
            </Link>
            <Link
              key={2}
              href={`/category/electronics`}
              // href={`/category/${category.slug?.current}`}
              className=" bg-bgSecondary text-fontSecondary px-3 py-2 rounded-lg flex items-center justify-center hover:bg-fontSecondary hover:text-bgSecondary"
              prefetch
            >
              راوترات{" "}
            </Link>
            <Link
              key={2}
              href={`/category/electronics`}
              // href={`/category/${category.slug?.current}`}
              className=" bg-bgSecondary text-fontSecondary px-3 py-2 rounded-lg flex items-center justify-center hover:bg-fontSecondary hover:text-bgSecondary"
              prefetch
            >
              اكسسورات كومبيوتر
            </Link>
            <Link
              key={2}
              href={`/category/electronics`}
              // href={`/category/${category.slug?.current}`}
              className=" bg-bgSecondary text-fontSecondary px-3 py-2 rounded-lg flex items-center justify-center hover:bg-fontSecondary hover:text-bgSecondary"
              prefetch
            >
              اكسسورات جوال
            </Link>
            <Link
              key={2}
              href={`/category/electronics`}
              // href={`/category/${category.slug?.current}`}
              className=" bg-bgSecondary text-fontSecondary px-3 py-2 rounded-lg flex items-center justify-center hover:bg-fontSecondary hover:text-bgSecondary"
              prefetch
            >
              طابعات
            </Link>
          </div>
          <div className="">
            <SearchBar />
          </div>
          <div>
            {/* sign in and sign up links */}
            <div>
              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  <span className="text-sm text-fontSecondary hidden md:block ">
                    {user.email.split("@")[0]}{" "}
                  </span>
                  <Link
                    href="#"
                    className="text-xs sm:text-sm font-medium text-fontSecondary hover:text-gray-900"
                    onClick={async (e) => {
                      e.preventDefault();
                      await logoutUser();
                      router.refresh();
                    }}
                  >
                    تسجيل الخروج{" "}
                  </Link>
                </div>
              ) : (
                <React.Fragment>
                  <Link
                    href="/auth/sign-in"
                    className="text-xs sm:text-sm font-medium text-fontSecondary hover:text-gray-900"
                  >
                    تسجيل الدخول{" "}
                  </Link>
                  <Link
                    href="/auth/sign-up"
                    className="text-xs sm:text-sm font-medium text-fontSecondary hover:text-gray-900"
                  >
                    مستخدم جديد{" "}
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={() => open()}
              className="text-gray-700 hover:text-gray-900 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center">
                {getTotalItems()}
              </span>
            </button>
          </div>
        </div>
        {/* categories */}
      </div>
    </header>
  );
};

export default Header;
