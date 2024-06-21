import { useEffect, useState } from "react";
import apiRequest from "../../../../lib/apiRequest";
import { Link } from "react-router-dom";
import ProductsTable from "../ProductsTable/ProductsTable";
import Title from "../../../../components/Title";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { CgMathPlus, CgSearch } from "react-icons/cg";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchField, setSearchField] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [more, setMore] = useState(true);
  const limit = 8; 
  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const res = await apiRequest.get(`/products?page=1&limit=${limit}`);
      const newProducts = res.data;

      setProducts(newProducts);
      setPage(1);
      if (newProducts.length < limit) {
        setMore(false);
      } else {
        setMore(true);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    try {
      setLoadingMore(true);
      const res = await apiRequest.get(`/products?page=${page + 1}&limit=${limit}`);
      const newProducts = res.data;
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      if (newProducts.length < limit) {
        setMore(false);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleLoadMore = async () => {
    await fetchMoreData();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (searchField === "") {
      await fetchInitialData();
    } else {
      try {
        const res = await apiRequest.get(`/products/search/${searchField}`);
        setProducts(res.data.product);
        setMore(false); // Assume no pagination for search results
      } catch (err) {
        console.log(err);
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-10">
      <Title title="Admin Dashboard" />
      <div className="flex justify-between items-center w-[90vw] lg:w-[700px] mb-10">
        <Link
          to="/dashboard/create"
          className="flex gap-2 text-lg items-center px-4 py-2 rounded-tr-md rounded-bl-md text-white bg-darkPruple hover:bg-pinky transition-all w-[170x] md:w-[270px]"
        >
          <CgMathPlus className="w-5 h-5" /> Create a new product
        </Link>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center bg-darkPruple text-white gap-4 h-fit py-2 text-sm px-4 rounded-tl-md rounded-br-md">
            <input
              type="text"
              placeholder="Search..."
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="bg-darkPruple placeholder:text-white/80 w-full"
            />
            <button
              type="submit"
              className="cursor-pointer transition-all p-1 pr-[8px] rounded-full flex justify-center items-center text-darkPruple hover:text-white bg-white hover:bg-pinky"
            >
              <CgSearch className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error || products.length === 0 ? (
        <span className="text-2xl mt-3">No products have been found!</span>
      ) : (
        <>
          <ProductsTable products={products} />
          {more && !loadingMore && (
            <button
              onClick={handleLoadMore}
              id="btn"
              className="group flex items-center gap-1 m-auto mt-6 py-3 px-6 bg-pinky text-white relative"
            >
              Load More
            </button>
          )}
          {loadingMore && <LoadingSpinner />}
        </>
      )}
    </div>
  );
}

export default Dashboard;
