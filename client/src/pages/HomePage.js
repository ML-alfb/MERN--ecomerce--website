import React, { useEffect, useState } from "react";

import "./css/home.css";
import { useParams } from "react-router-dom";
import NavBar from "./components/NavBar";
import { getProducts } from "../api/productsApi";
import ProductCart from "./components/ProductCart";
import ProuductsFilterBar from "./components/ProuductsFilterBar";
// import { useAuth } from "../hooks/useAuth";
// import useAxios from "../hooks/useAxios";
import PaginitionComponent from "./components/PaginitionComponent";
function HomePage() {
  // const { auth, setAuth } = useAuth();

  // const api = useAxios();
  // const dref = async () => {
  //   await api.get("/api/users/info", {
  //     accessToken: auth?.accessToken,
  //   });
  // };
  const [data, setdata] = useState();
  const { page } = useParams();
  const [productsCount, setProductsCount] = useState();
  // const find = (id) => {
  //   return data.find((item) => item._id === id);
  // };
  const getPrs = async (page) => {
    try {
      const data1 = await getProducts(page);
      // console.log(data1);
      setProductsCount(parseInt(data1.productsCount));
      setdata(data1.msg);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // const pg = page ? page : 1;
    getPrs(page);
  }, [page]);

  return (
    <section className="main-section">
      <NavBar />
      <main className="main">
        <div className="filter-form">
          <div className="f1">
            <ProuductsFilterBar />
          </div>
        </div>
        <div className="products-container">
          <div className="products-cart flex">
            {data?.length
              ? data.map((product) => {
                  return <ProductCart product={product} />;
                })
              : ""}
          </div>
          {productsCount ? (
            <PaginitionComponent
              productsCount={productsCount}
              urlPath={"/page/"}
              productsParPage={7}
            />
          ) : (
            ""
          )}
        </div>
      </main>
    </section>
  );
}

export default HomePage;
