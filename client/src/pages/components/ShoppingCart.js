import React from "react";
import ShoppingProductCart from "./ShoppingProductCart";
import { Link } from "react-router-dom";
import { useShopp } from "../../hooks/useFavorite";
import { BiShoppingBag } from "react-icons/bi";
import "../css/ShoppingCart.css";
function ShoppingCart() {
  const { shoppingList, setShoppingList } = useShopp();

  return (
    <>
      {!shoppingList?.length ? (
        <div className="shopping_cart_empty flex">
          <div className="bag_icon">
            <BiShoppingBag size={100} color={"#BDCDD6"} />
          </div>
          <h4 className="text_center">Shopping Bag is Empty</h4>
        </div>
      ) : (
        <>
          <div className="Shopping_cart_container flex">
            <div className="scroll">
              {shoppingList?.map((product) => {
                return <ShoppingProductCart product={product} />;
              })}
            </div>
            <div className="total-price flex">
              <p>
                <span>total</span>:124$
              </p>
            </div>
            <button className="btn view-btn">
              <Link className="btn-link" to={"/myShoppingCart"}>
                VIEW BAG
              </Link>
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default ShoppingCart;
