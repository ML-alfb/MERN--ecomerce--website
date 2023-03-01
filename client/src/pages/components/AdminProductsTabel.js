import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";

function AdminProductsTabel({ products, setmodel, setindex }) {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const onClickSelectALL = () => {
    setIsSelected((prev) => !prev);
    const productIds = products.map((item) => item._id);
    setSelectedProducts((prev) => [...prev, ...productIds]);
  };
  return (
    <>
      <div className="flex product-listInfo-container">
        <div className="select-coloum">
          {isSelected ? (
            <span onClick={onClickSelectALL}>
              <FaCheckSquare />
            </span>
          ) : (
            <span onClick={onClickSelectALL}>
              <FaRegSquare />
            </span>
          )}
        </div>
        <div className="image-coloum">image</div>
        <div className="detail-coloum flex column">name</div>
        <div className="price-coloum">price</div>
        <div className="rating-coloum flex">rating</div>
        <div className="published-coloum">published </div>
        <div className="stock-coloum">stock</div>
        <div className="edit-coloum">edit</div>
      </div>
      {products?.map((product) => {
        // console.log("laaaaa", product._id);
        return (
          <ProductInfo
            key={product._id}
            productDetails={product}
            setmodel={setmodel}
            setindex={setindex}
            isSelected={isSelected}
          />
        );
      })}
    </>
  );
}

export default AdminProductsTabel;
