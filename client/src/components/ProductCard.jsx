/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/${product.id}`}
      key={product.id}
      className="group flex flex-col overflow-hidden w-[150px] sm
      max-h-[300px] sm:w-[200px]  sm:max-h-[350px] lg:w-[250px] lg:max-h-[400px]  shadow-md shadow-black/30 rounded-lg border-b-4 border-b-pinky"
    >
      <div className="overflow-hidden border-t-md flex justify-center items-center flex-1 bg-white">
        {!product.imgs[0] ? (
          <div className="h-[100px] bg-white flex justify-center items-center w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <img
          src={product.imgs[0]}
          className="group-hover:scale-105 transition-all w-full h-full object-cover"
          />
        )}
      </div>
      <div className="text-xs sm:text-sm md:text-md border-2 border-pink-400 border-b-0 flex flex-col justify-center items-center text-center w-full bg-white group-hover:bg-pinky text-zinc-900 group-hover:text-white group-hover:border-0 transition-all h-14 md:h-16">
        <span className="capitalize">{product.title}</span>
        <span className="font-bold">{product.price} DT</span>
      </div>
    </Link>
  );
}

export default ProductCard;
