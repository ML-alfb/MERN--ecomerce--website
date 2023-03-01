import React, { createContext, useContext, useState, useMemo } from "react";
const authContext = createContext();

export function useAuth() {
  return useContext(authContext);
}

export function AuthProvider({ children }) {
  const user = localStorage.getItem("user")
    ? localStorage.getItem("user")
    : false;
  const [auth, setAuth] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : false
  );

  const providervalue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return (
    <authContext.Provider value={providervalue}>
      {children}
    </authContext.Provider>
  );
}
