import { FaEnvelope } from "react-icons/fa";
import apiRequest from "./../../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target);
      const email = formData.get("email");

      const res = await apiRequest.post("/settings/forgot-password", { email });
      console.log(res.data.Status);

      setIsLoading(false);
      if (res.data.Status == "success") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-[85vh] gap-5 ">
        <div className="bg-white/75 rounded-lg px-10 min-h-[300px] py-8 flex flex-col gap-3 justify-center items-center drop-shadow-lg">
          <h1 className="font-bold text-2xl text-center uppercase tracking-wide text-zinc-900">
            Forgot password?
          </h1>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-6 py-1 w-full"
          >
            <div className="relative w-full pl-10 pr-3 mx-auto border-b border-pinky">
              <input
                type="email"
                placeholder="email"
                name="email"
                required
                className="h-14 rounded-sm bg-transparent w-full placeholder:text-zinc-400/70"
              />
              <div className="absolute left-3 top-1/2 translate-y-[-50%] ">
                <FaEnvelope className="text-pinky" />
              </div>
            </div>

            <div className="mx-auto w-full">
              <button
                // disabled={isLoading}
                type="submit"
                id="loginbtn"
                className={`
                w-full h-12 text-white mt-2 bg-pinky hover:bg-pinky/95 text-xl relative
                `}
              >
                Send
                {isLoading && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <CgSpinnerTwo className="w-6 h-6 animate-spin" />
                  </div>
                )}
              </button>
            </div>
            {/* {error != "" && (
              <p className="bg-red-600 text-white text-md py-2 w-4/5 mx-auto text-center mt-4 ">
                {error}
              </p>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
}

