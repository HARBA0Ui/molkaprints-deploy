import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import apiRequest from "../../../../lib/apiRequest";
import { memo, useState } from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner";

/* eslint-disable react/prop-types */
function Product({ product: p }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await apiRequest.delete("/products/" + p.id);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <article className="rounded-md bg-white shadow-md p-4 text-center text-base flex justify-between gap-32 items-center w-[750px] max-h-32 overflow-hidden">
        {/* skeleton????x */}
        <div className="w-1/2 flex items-center justify-between">
          <img
            src={p.imgs[0]}
            className="w-20 border-zinc-400 object-fill"
          />
          <div className=" w-[150px] justify-self-end">{p.title}</div>
        </div>
        <div className="w-1/2 flex items-center justify-between">
          <div>{p.price}DT</div>
          <div className="flex gap-4">
            <Link
              to={`/dashboard/update/${p.id}`}
              className="text-white p-2 rounded-full bg-pinky hover:bg-darkPruple transition-all hover:scale-105"
            >
              <AiFillEdit className="h-6 w-6 pointer-events-none" />
            </Link>
            <button
              onClick={handleDelete}
              className="text-white p-2 rounded-full bg-pinky hover:bg-darkPruple transition-all hover:scale-105"
            >
              <AiFillDelete className="h-6 w-6 pointer-events-none" />
            </button>
          </div>
        </div>
      </article>
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
export default memo(Product);
