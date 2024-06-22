import { useState } from "react";
import Title from "../../../components/Title";
import apiRequest from "../../../lib/apiRequest";
import { HiMiniCursorArrowRays } from "react-icons/hi2";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !price) {
      return;
    }
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("price", price);
      Array.from(images).forEach((img) => formData.append("images", img));

      const res = await apiRequest.post("/products", formData);
      console.log(res)

      setTitle("");
      setDesc("");
      setPrice("");
      setImages([]);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Title title="Create a new product" />
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td className="p-2 mb-1">
                <label htmlFor="title">Title</label>
              </td>
              <td className="py-2 mb-1">
                <input
                  type="text"
                  className="h-14 w-96 px-4"
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
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
                  className="h-28 text-sm w-96 p-2 resize-none"
                  id="desc"
                  name="desc"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="p-2 mb-1">
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
                <label htmlFor="images">Images</label>
              </td>
              <td className="mb-1" id="fileTd">
                <input
                  type="file"
                  name="images"
                  id="images"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  required
                />
                <div id="fileOverlay" className="hover:bg-zinc-300">
                  {images.length == 0 ? (
                    <>
                      Click To Upload Or Drop it here{" "}
                      <HiMiniCursorArrowRays className="w-9 h-9 mt-2" />
                    </>
                  ) : (
                    <div className="flex items-center flex-col gap-2">
                      <span>Files uploaded successfully</span>
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
                  className="bg-darkPruple px-4 py-3 text-white w-full h-16 text-md font-bold uppercase hover:tracking-widest transition-all flex justify-center items-center gap-4"
                >
                  Add Product
                  {isLoading && (
                    <CgSpinnerTwo className="w-6 h-6 animate-spin text-white" />
                  )}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default CreateProduct;
