import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function LogoutBtn({children, btnClassName}) {
  const navigate = useNavigate();
  const signout = async () => {
    try {
      const res = await apiRequest.post("/auth/logout");
      localStorage.removeItem("admin");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={signout} className={btnClassName}>{children}</button>;
}

export default LogoutBtn;
