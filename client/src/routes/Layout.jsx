import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import AuthContextProvider from "../context/AuthContext";
import Footer from './../components/Footer';

const Layout = () => {

  const isDashboard= location.pathname === "/dashboard" | "/dashboard/settings" | "/dashboard/create"

  return (
    <AuthContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Outlet />
        </div>
        {!isDashboard && <Footer/>}
      </div>
    </AuthContextProvider>
  );
};

export default Layout;
