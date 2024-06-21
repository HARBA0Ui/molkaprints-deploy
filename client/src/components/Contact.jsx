import React, { useState } from "react";
import apiRequest from "../lib/apiRequest";
import { CgSpinnerTwo } from "react-icons/cg";

function Contact() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [messageIsLoading, setMessageIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageIsLoading(true);
    setMessage("");
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const desc = formData.get("desc");

      const contactInfo = { email, desc };

      const res = await apiRequest.post("/email/contact-email", contactInfo);
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

  return (
    <div className="rounded-md h-[550px] w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[70vw] m-auto mb-12 bg-pinky text-white flex items-center">
      <div className="hidden lg:block h-[550px]">
        <img
          src="/contactImg.jpg"
          className="w-full h-full rounded-l-md"
          alt="img"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex-1 px-10 sm:px-16 md:px-12 lg:px-16 flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-center mb-3">Contact Us</h1>
        {/* Email field */}
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300  focus:outline-none focus:border-pink-400 h-12 text-zinc-900"
            required
          />
        </div>

        {/* Description field */}
        <div className="mb-4 w-full">
          <label htmlFor="description" className="block mb-2">
            Description:
          </label>
          <textarea
            name="desc"
            rows="4"
            className="w-full px-3 py-2 border resize-none border-gray-300  focus:outline-none focus:border-pink-400 h-32 text-zinc-900"
            required
          ></textarea>
        </div>

        <div className="w-full">
          <button
            type="submit"
            id="btn"
            className="min-h-14 w-full py-3 font-semibold bg-white text-pinky hover:text-white focus:outline-none flex items-center gap-2 justify-center"
          >
            Send
            {messageIsLoading && (
              <CgSpinnerTwo className="w-6 h-6 animate-spin text-white" />
            )}
          </button>
          {message && (
            <p className="w-full min-h-14 font-semibold bg-green-700 mt-3 text-white focus:outline-none shadow-md text-center flex justify-center items-center">
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Contact;
