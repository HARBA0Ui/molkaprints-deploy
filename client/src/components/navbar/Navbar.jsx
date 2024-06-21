import { Link, useNavigate } from "react-router-dom";
import "./navbar.module.css";
import { CgSearch } from "react-icons/cg";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { FaCaretRight } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchInput}`);
    // location.reload()
    setSearchInput("");
  };
  return (
    <header className="w-screen">
      <nav className="bg-pinky w-screen h-[13vh] sm:h-[15vh] flex my-auto justify-between items-center px-4 md:px-14 lg:px-40 shadow-md relative">
        <Link className="h-full flex items-center justify-center" to={"/"} reloadDocument={true}>
          <img
            src="/logo.jpg"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full drop-shadow-md hover:scale-110 transition-all"
          />
        </Link>
        <div className="flex gap-4 items-center">
          <form onSubmit={handleSubmit}>
            <div className="w-[250px] md:w-[350px] flex items-center bg-white gap-4 h-fit py-2 px-4 rounded-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-[90%] md:flex-1 text-sm md:text-base"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="cursor-pointer transition-all p-2 pr-[10px] rounded-full flex justify-center items-center text-white bg-pinky hover:bg-darkPruple "
              >
                <CgSearch className="w-4 h-4 md:w-5 md:h-5 " />
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center sm:relative absolute top-full right-0">
            <Link
              to={"/products"}
              id="btn"
              className="group mx-auto px-3 py-2 sm:py-3 sm:px-5 flex justify-center items-center gap-1 !rounded-none bg-darkPruple sm:bg-white sm:text-pinky sm:hover:text-white text-white !rounded-bl-md sm:!rounded-tr-md"
            >
              Products
              <FaCaretRight className="group-hover:translate-x-2 w-5 h-5 transition-all" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
