import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./css/dashbord.css";
import DashbordBar from "./components/DashbordBar";
function Dashbord() {
  // const { setAuth } = useAuth();
  // useEffect(() => {
  //   const userID = localStorage.getItem("user");
  //   if (userID) {
  //     setAuth(userID);
  //   }
  // }, []);
  return (
    <section className="dashbord flex ">
      <DashbordBar />
      <div className="main-section">main</div>
    </section>
  );
}

export default Dashbord;
