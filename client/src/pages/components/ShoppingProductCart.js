import React from "react";
import { MdOutlineDelete } from "react-icons/md";
function ShoppingProductCart({ product }) {
  const {
    images: { posterUrl },
    name,
    price,
  } = product;
  return (
    <>
      <div className="product_container flex">
        <div
          className="product_img"
          style={{ backgroundImage: `url(${posterUrl})` }}
        ></div>
        <div className="info_container flex">
          <div>
            <h5>{name}</h5>
          </div>
          <div className="price flex">
            <div>
              <span>{price}$</span>
            </div>
            <button className="btn">
              <MdOutlineDelete />
            </button>
          </div>
          <div className="flex">
            <button className="btn btnx">-</button>
            <div className="btnx flex span">
              <span>1</span>
            </div>
            <button className="btn btnx">+</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingProductCart;
