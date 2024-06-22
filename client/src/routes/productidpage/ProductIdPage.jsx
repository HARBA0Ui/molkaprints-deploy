import React, { useState, useEffect } from "react";
import apiRequest from "../../lib/apiRequest";
import { useParams } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";

function ProductIdPage() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [messageIsLoading, setMessageIsLoading] = useState(false);
  const [product, setProduct] = useState();

  const handleSubmit = async (e) => {
    setMessage("");
    e.preventDefault();
    setMessageIsLoading(true);
    try {
      const formData = new FormData(e.target);
      const username = formData.get("username");
      const tel = formData.get("tel");
      const email = formData.get("email");
      const city = formData.get("city");
      const { title } = product;

      const orderInfo = { username, tel, email, city, title, id };

      const res = await apiRequest.post("/email/order-email", orderInfo);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
    } finally {
      setMessageIsLoading(false);
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  const cityOptions = [
    "Ariana",
    "Beja",
    "Ben Arous",
    "Bizerte",
    "Gabes",
    "Gafsa",
    "Jendouba",
    "Kasserine",
    "Kef",
    "Mahdia",
    "Manouba",
    "Monastir",
    "Nabeul",
    "Sfax",
    "Sidi Bouzid",
    "Sousse",
    "Siliana",
    "Tataouine",
    "Tozeur",
    "Tunis",
    "Zaghouan",
    "Medenine",
    "Kebili",
    "Kairouan",
  ];

  useEffect(() => {
    const getProductById = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest.get("/products/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getProductById();
  }, []);

  return (
    <div className="m-auto flex justify-center items-center min-h-[70vh] w-[90vw] xl:w-[70vw] max-w-[1440px] py-20">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center flex-1">
          <CgSpinnerTwo className="w-6 h-6 animate-spin mx-auto text-pinky" />
        </div>
      ) : (
        <div className="flex justify-center flex-col md:flex-row items-center w-full gap-8 md:gap-16 lg:gap-20 xl:gap-24">
          {/* images container  */}
          <div className="flex justify-center items-center w-1/2 min-w-[200px] max-w-[450px] ">
            <img
              className="w-full max-h-[700px]"
              src={product.imgs[0]}
              />
          </div>
          {/* details container  */}
          <div className="flex flex-col gap-4 text-center md:text-left md:w-[550px]">
            <h1 className="text-4xl sm:text-5xl text-zinc-900 font-bold ">
              {product.title}
            </h1>
            <h2 className="text-pinky text-3xl sm:text-4xl font-bold">{product.price}DT</h2>
            <p className="text-md text-gray-900 w-full md:w-11/12">
              <strong>Description: </strong>{product.desc}
            </p>
            <p className="text-black font-bold">
              To place an order, please fill in these fields:
            </p>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-400 text-zinc-900 h-14 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0"
                placeholder="Full Name..."
                required
              />
              <input
                type="email"
                name="email"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-400 text-zinc-900 h-14 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0"
                placeholder="Email..."
                required
              />
              <input
                type="text"
                name="tel"
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-pink-400 text-zinc-900 h-14 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0"
                placeholder="Tel Number of 8 digits..."
                pattern="[0-9]{8}"
                maxlength={8}
                required
              />
              <select
                name="city"
                className="h-14 px-4 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0"
                aria-label="city"
                required
              >
                <option value="" disabled select>
                  Enter your city
                </option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <article className="text-sm rounded-md bg-white shadow-md p-2 px-4 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0 flex items-center justify-between">
                {/* skeleton????x */}
                <img
                  src={product.imgs[0]}
                  className="w-16 object-fill max-h-24 border border-zinc-400 rounded-sm"
                />
                <div className="">{product.title}</div>
                <div className="font-bold">{product.price}DT</div>
              </article>

              <div>
                <button
                  type="submit"
                  id="btn"
                  className="min-h-16 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0 px-8 py-3 font-semibold bg-pinky text-white focus:outline-none shadow-md flex items-center gap-3 justify-center"
                >
                  Order
                  {messageIsLoading && (
                    <CgSpinnerTwo className="w-6 h-6 animate-spin text-white" />
                  )}
                </button>
                {message && (
                  <p className="min-h-16 md:w-full lg:w-4/5 w-4/5 mx-auto md:mx-0 px-8 py-3 font-semibold bg-green-700 mt-3 text-white focus:outline-none shadow-md text-center flex justify-center items-center">
                    {message}
                  </p>
                )}
              </div>
            </form>
          </div>
          {/* details container  */}
        </div>
      )}
    </div>
  );
}

export default ProductIdPage;
