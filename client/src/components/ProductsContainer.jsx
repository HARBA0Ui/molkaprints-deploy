import { useState } from "react";

function ProductsContainer({products}) {
  return (
    <div>
      <div className="flex flex-col min-h-[400px] py-6 m-auto">
        <h2 className="text-3xl md:text-5xl text-center w-fit mx-auto mb-10 font-bold uppercase tracking-wide border-b-4 border-pinky rounded text-zinc-900">
          Our Latest Products
        </h2>
        {loading ? (
          <div className="h-full w-full flex justify-center items-center flex-1">
            <CgSpinnerTwo className="w-6 h-6 animate-spin mx-auto text-white" />
          </div>
        ) : (
          <div className="flex justify-center flex-wrap gap-4 px-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="flex justify-center pt-3 border-green-900">
          <Link
            to={"/products"}
            id="btn"
            className="group mx-auto py-3 px-6 mt-5 flex justify-center items-center gap-1 bg-pinky text-white rounded before:rounded font-medium text-xl"
          >
            View More
            <FaCaretRight className="group-hover:translate-x-2 w-5 h-5 transition-all" />
          </Link>
        </div>
      </div>
      ;
    </div>
  );
}

export default ProductsContainer;
