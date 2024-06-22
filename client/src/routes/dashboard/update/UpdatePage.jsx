import { useParams } from "react-router-dom";
import Title from "../../../components/Title";
import apiRequest from "../../../lib/apiRequest";
import { useEffect, useState } from "react";
import { HiMiniCursorArrowRays } from "react-icons/hi2";
import { AiFillCheckCircle } from "react-icons/ai";
import { CgSpinnerTwo } from "react-icons/cg";
import LoadingSpinner from "./../../../components/LoadingSpinner";

function UpdatePage() {
  const { id } = useParams();

  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price) {
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      //addimages
      if (images.length > 0) {
        Array.from(images).forEach((img) => formData.append("images", img));
      }
      const res = await apiRequest.put(`/products/${id}`, formData);
      // console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getProductById = async () => {
      const res = await apiRequest.get("/products/" + id);
      setProduct(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setPrice(res.data.price);
    };

    getProductById();
  }, []);

  if (!product) return <LoadingSpinner />;

  console.log(product);

  return (
    <div>
      <div className="text-center">
        <Title title="Update Product" />
      </div>
      {!product ? (
        <CgSpinnerTwo className="w-6 h-6 animate-spin m-auto" />
      ) : (
        <div className="flex justify-center items-center gap-20">
          <form onSubmit={handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <td className="p-2 mb-1 text-center">
                    <label htmlFor="title">Title</label>
                  </td>
                  <td className="py-2 mb-1">
                    <input
                      type="text"
                      className="h-14 w-96 px-4"
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                      defaultValue={title}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 mb-1">
                    <label htmlFor="desc">Description</label>
                  </td>
                  <td className="py-2 mb-1">
                    <textarea
                      type="text"
                      className="h-28 text-sm w-96 p-4 resize-none"
                      id="desc"
                      name="desc"
                      onChange={(e) => setDesc(e.target.value)}
                      value={desc}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 mb-1 text-center">
                    <label htmlFor="price">Price</label>
                  </td>
                  <td className="py-2 pb-5 mb-1">
                    <input
                      type="number"
                      className="h-14 w-96 px-4"
                      id="price"
                      name="price"
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      value={price}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2 mb-1">
                    <label htmlFor="images">New images?</label>
                  </td>
                  <td className="mb-1" id="fileTd">
                    <input
                      type="file"
                      name="images"
                      id="images"
                      multiple
                      onChange={(e) => setImages(e.target.files)}
                    />
                    <div id="fileOverlay" className="hover:bg-zinc-300">
                      {images.length == 0 ? (
                        <>
                          Upload/Drop new images
                          <HiMiniCursorArrowRays className="w-9 h-9 mt-2" />
                        </>
                      ) : (
                        <div className="flex items-center flex-col gap-2">
                          <span className="flex flex-col items-center">
                            Files uploaded successfully{" "}
                            <p className="text-sm">
                              (click/drop to change them)
                            </p>
                          </span>
                          <AiFillCheckCircle className="w-10 h-10 text-pinky" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="flex-1"></td>
                  <td className="flex justify-center my-4 py-3">
                    <button
                      type="submit"
                      id="btn"
                      className="bg-darkPruple px-4 py-3 text-white w-full h-16 text-md font-bold uppercase hover:tracking-widest transition-all flex justify-center items-center gap-2"
                    >
                      <span>Update Product</span>
                      {isLoading && (
                        <div className="inline">
                          <CgSpinnerTwo className="w-6 h-6 animate-spin text-white" />
                        </div>
                      )}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <div className="h-[60vh]">
            <h3 className="text-center text-3xl text-zinc-900 font-bold mb-4">
              Images
            </h3>
            <div className="images flex flex-wrap justify-center items-center gap-10">
              {product.imgs.length == 1 && (
                <img
                  className="w-56 h-74"
                  alt={title}
                  src={product.imgs[0]}
                  />
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdatePage;
