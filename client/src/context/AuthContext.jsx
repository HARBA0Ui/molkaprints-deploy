import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || null
  );

  function updateAdmin(data) {
    setAdmin(data);
  }

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(admin));
  }, [admin]);

  return (
    <AuthContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
