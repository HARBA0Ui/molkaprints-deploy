import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [more, setMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = async (page, limit) => {
    try {
      const res = await apiRequest.get(`/products?page=${page}&limit=${limit}`);
      const newProducts = res.data;

      setProducts((prevProducts) => [...prevProducts, ...newProducts]);

      if (newProducts.length < limit) {
        setMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchProducts(page, limit);
      setLoading(false);
    };

    initialFetch();
  }, []);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchProducts(page + 1, limit);
    setPage((prevPage) => prevPage + 1);
    setLoadingMore(false);
  };

  return (
    <div className="py-10 w-[90vw] md:w-[80vw] m-auto flex flex-col">
      <h1 className="text-zinc-800 text-4xl md:text-5xl uppercase font-bold mb-3 text-center">
        Our Products
      </h1>
      <div className="flex justify-center flex-wrap gap-5 py-8 rounded-lg">
        {loading ? (
          <LoadingSpinner />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product}/>

          ))
        )}
      </div>
      {loadingMore && <LoadingSpinner />}
      {!loading && more && (
        <button
          onClick={handleLoadMore}
          id="btn"
          className="m-auto mt-4 py-3 px-6 bg-pinky text-white relative before:rounded"
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}

export default ProductsPage;
