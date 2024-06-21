import { AiFillSwitcher, AiOutlineLogout } from "react-icons/ai";
import { CgMathPlus } from "react-icons/cg";

import { Link } from "react-router-dom";
import LogoutBtn from "../../../../components/LogoutBtn";

import "./sidebar.module.css";

function Sidebar() {
  return (
    <div>
      <aside className="hidden md:flex w-32 bg-pinky flex-col pt-12 h-full min-h-[85vh] gap-4 text-pinky text-sm">
        <ul className="flex flex-col gap-4 flex-1">
          <Link
            to={"/dashboard"}
            reloadDocument={true}
            id="btn"
            className="flex gap-2 bg-white w-full items-center px-2 py-3 hover:text-white !rounded-none !before:rounded-0"
          >
            <AiFillSwitcher className="w-6 h-6" /> <span>Dashboard</span>
          </Link>
          <Link
            to="/dashboard/create"
            id="btn"
            className="flex gap-2 bg-white w-full items-center px-2 py-3 hover:text-white !rounded-none !before:rounded-0"
          >
            <CgMathPlus className="w-6 h-6" /> <span>Create</span>
          </Link>
        </ul>
        <LogoutBtn btnClassName="flex gap-2 bg-darkPruple text-white items-center px-2 py-3 sticky bottom-0 w-full">
          <AiOutlineLogout className="w-6 h-6" /> <span>Logout</span>
        </LogoutBtn>
      </aside>
    </div>
  );
}

export default Sidebar;
