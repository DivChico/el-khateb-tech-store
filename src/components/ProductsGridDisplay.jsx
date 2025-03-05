import React from "react";

const ProductsGridDisplay = ({ sectionTitle, children, maxColums }) => {
  return (
    <section className="max-w-7xl mx-auto my-10   relative">
      <div className="flex items-center h-16  flex-row-reverse justify-between border-b border-bgSecondary ">
        <div className=" border-fontTertiary border-b-2 h-full py-4 ">
          <h2 className=" font-bold text-fontSecondary">{sectionTitle}</h2>
        </div>
        <button className="flex items-center gap-2 text-fontSecondary py-4">
          <a href="" className=" bg-bgSecondary text-fontSecondary btn-circle">
            ❮
          </a>
          المزيد
        </button>
      </div>
      <div
        className={`py-8  grid grid-cols-1 md:grid-cols-3 ${maxColums ? "" + maxColums : "lg:grid-cols-5"} gap-4 justify-items-center`}
      >
        {" "}
        {children}
      </div>
    </section>
  );
};

export default ProductsGridDisplay;
