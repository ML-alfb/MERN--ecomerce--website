import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import React from "react";

function PrivateRoutes({ navto, authRoute }) {
  const { auth } = useAuth();

  const isAuth = authRoute === "adminPages" ? auth : !auth;

  return isAuth ? <Outlet /> : <Navigate to={navto} />;
}

export default PrivateRoutes;
