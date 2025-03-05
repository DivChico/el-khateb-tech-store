import Form from "next/form";
import React from "react";

const SearchBar = () => {
  return (
    <Form action="/search" className="w-full max-w-md mx-auto">
      <div className="relative flex flex-row-reverse  text-gray-900 ">
        <input
          type="text"
          name="query"
          placeholder="ابحث عن المنتجات"
          className="w-full text-right pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-fontPrimary focus:border-transparent transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>
    </Form>
  );
};

export default SearchBar;
