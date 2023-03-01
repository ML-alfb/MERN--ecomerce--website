import React, { useRef, useState } from "react";
import DashbordBar from "./components/DashbordBar";

import "./css/addProduct.css";

import AddProductForm from "./components/AddProductForm";
function AddProductPage() {
  return (
    <section className=" flex ">
      <DashbordBar />
      <div className="main-section flex center">
        <AddProductForm productInfoToUpdate={{}} toUpdate={false} />
      </div>
    </section>
  );
}

export default AddProductPage;
