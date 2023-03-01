import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AdminProductsPage from "./pages/AdminProductsPage";
import AddProductPage from "./pages/AddProductPage";

import Dashbord from "./pages/Dashbord";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SingupPage from "./pages/SingupPage";
import PrivateRoutes from "./util/PrivateRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/page/:page" element={<HomePage />} />
        <Route
          element={<PrivateRoutes navto="/login" authRoute={"adminPages"} />}
        >
          <Route path="/dashbord" element={<Dashbord />} />
          <Route
            path="/dashbord/products/:page"
            element={<AdminProductsPage />}
          />
          <Route path="/dashbord/product/add" element={<AddProductPage />} />
        </Route>
        <Route element={<PrivateRoutes navto="/page/1" authRoute={""} />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/singup" element={<SingupPage />} />
        </Route>
        {/* <Route path="*" element={<SingupPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
