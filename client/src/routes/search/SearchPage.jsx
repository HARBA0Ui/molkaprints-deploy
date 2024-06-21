import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import ProductCard from "../../components/ProductCard";
import { CgSpinnerTwo } from "react-icons/cg";

function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState("");

  const { title } = useParams();

  const fetchSearch = async () => {
    setLoading(true);
    try {
      const res = await apiRequest.get(`/products/search/${title}`);
      setProducts(res.data.product);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [title]);

  return (
    <div className="flex flex-col justify-center items-center gap-4 px-4 py-16">
      <h1 className="text-zinc-800 text-2xl font-bold uppercase">
        You've searched for: {title}
      </h1>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center flex-1">
          <CgSpinnerTwo className="w-6 h-6 animate-spin mx-auto text-pinky" />
        </div>
      ) : (!loading && products.length == 0 ) ? (
        <p className="text-xl">No Products have been found!!!</p>
      ) : (
        <div className="flex justify-center flex-wrap gap-4 px-4">
          {Array.from(products).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
