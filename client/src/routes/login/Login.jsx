import apiRequest from "../../lib/apiRequest";

import { FaKey, FaUser } from "react-icons/fa";
import "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const { admin, updateAdmin } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const admin = {
      username,
      password,
    };

    try {
      const res = await apiRequest.post("/auth/login", admin);
      localStorage.setItem("admin", JSON.stringify(res.data));
      updateAdmin(res.data);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[85vh] gap-5 ">
      <div className="bg-white/75 rounded-lg w-[430px] min-h-[450px] py-8 flex flex-col gap-3 justify-center items-center drop-shadow-lg">
        <h1 className="font-bold text-6xl text-center uppercase tracking-wide mb-2 text-zinc-900">
          Login
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className=" flex flex-col gap-6 py-6 w-full"
        >
          <div className="relative w-4/5 pl-10 pr-3 mx-auto border-b border-pinky">
            <input
              type="text"
              placeholder="username"
              name="username"
              required
              className="h-14 rounded-sm bg-transparent w-full placeholder:text-zinc-400/70"
            />
            <div className="absolute left-3 top-1/2 translate-y-[-50%] ">
              <FaUser className="text-pinky" />
            </div>
          </div>
          <div className="relative w-4/5 pl-10 pr-3 mx-auto border-b border-pinky">
            <input
              type="password"
              placeholder="password"
              name="password"
              required
              className="h-14 rounded-sm bg-transparent w-full placeholder:text-zinc-400/70"
            />
            <div className="absolute left-3 top-1/2 translate-y-[-50%] ">
              <FaKey className="text-pinky" />
            </div>
          </div>

          <Link
            to={"/forgot-password"}
            className="w-4/5 mx-auto text-darkPruple"
          >
            <span className="border-b-2 border-b-darkPruple">Forgot password?</span>
          </Link>

          <div className="mx-auto w-4/5">
            <button
              disabled={isLoading}
              type="submit"
              id="loginbtn"
              className={`
                ${isLoading && "[border-radius: 5rem]"}
                w-full h-14 text-white mt-6  bg-pinky hover:bg-pinky/95 text-xl relative
                `}
            >
              Login
              {isLoading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CgSpinnerTwo className="w-6 h-6 animate-spin" />
                </div>
              )}
            </button>
          </div>
          {error != "" && (
            <p className="bg-red-600 text-white text-md py-2 w-4/5 mx-auto text-center mt-4 ">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
