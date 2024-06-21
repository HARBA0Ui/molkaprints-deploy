import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function DashboardLayout() {
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log("admin: ", admin)
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);
  return (
    <div className="flex">
      <Sidebar />
      <main className="p-12 flex-1">
        <Outlet/>
      </main>
    </div>
  );
}

export default DashboardLayout;
