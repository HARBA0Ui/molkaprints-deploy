import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Banner from "../../components/Banner";

import { FaCaretRight } from "react-icons/fa";

import apiRequest from "../../lib/apiRequest";
import { CgSpinnerTwo } from "react-icons/cg";
import ProductCard from "../../components/ProductCard";
import Contact from "../../components/Contact";

function Home() {
  const [products, setProducts] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [numProductsToShow, setNumProductsToShow] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateNumProductsToShow = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setNumProductsToShow(2);
      } else {
        setNumProductsToShow(3);
      }
    };

    // Set initial value
    updateNumProductsToShow();

    // Add event listener
    window.addEventListener("resize", updateNumProductsToShow);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateNumProductsToShow);
  }, []);

  return (
    <div>
      <Banner />
      <div className="flex mb-4">
        <div className="flex flex-col min-h-[400px] py-6 m-auto">
          <h2 className="text-3xl md:text-5xl text-center w-fit mx-auto mb-10 font-bold uppercase tracking-wide border-b-4 border-pinky rounded text-zinc-900">
            Our Latest Products
          </h2>
          {loading ? (
            <div className="h-full w-full flex justify-center items-center flex-1">
              <CgSpinnerTwo className="w-6 h-6 animate-spin mx-auto text-pinky" />
            </div>
          ) : (
            <div className="flex justify-center flex-wrap gap-4 px-4">
              {products?.slice(0, numProductsToShow).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="flex justify-center pt-3">
            <Link
              to={"/products"}
              id="btn"
              className="group mx-auto py-3 px-6 mt-5 flex justify-center items-center gap-1 bg-pinky text-white font-medium text-xl shadow-md"
            >
              View More
              <FaCaretRight className="group-hover:translate-x-2 w-5 h-5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default Home;
