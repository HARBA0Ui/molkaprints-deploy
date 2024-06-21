import { FaEnvelope } from "react-icons/fa";
import apiRequest from "./../../lib/apiRequest";
import { useNavigate, useParams } from "react-router-dom";
import { CgSpinnerTwo } from "react-icons/cg";
import { useState } from "react";

export default function ForgotPassword() {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target);
      const password = formData.get("pass");

      const res = await apiRequest.post(
        `/settings/reset-password/${id}/${token}`,
        { password }
      );
      // console.log(res);
      if (res.data.Status == "success") {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-[85vh] gap-5 ">
        <div className="bg-white/75 rounded-lg px-10 min-h-[300px] py-8 flex flex-col gap-3 justify-center items-center drop-shadow-lg">
          <h1 className="font-bold text-2xl text-center uppercase tracking-wide text-zinc-900">
            Reset password
          </h1>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-6 py-1 w-full"
          >
            <div className="relative w-full pl-10 pr-3 mx-auto border-b border-pinky">
              <input
                type="password"
                placeholder="New Password of at least 8 characters..."
                name="pass"
                minLength={8}
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
                Update
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

//// ${isLoading && "[border-radius: 5rem]"}
