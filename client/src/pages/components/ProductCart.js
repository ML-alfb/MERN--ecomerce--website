import React from "react";
import { Link } from "react-router-dom";
import { useFavorite, useShopp } from "../../hooks/useFavorite";

import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import "../css/ProductCart.css";

function ProductCart({ product }) {
  const {
    images: { posterUrl },
    name,
    price,
  } = product;
  const { Favorites, setFavorites } = useFavorite();
  const { setShoppingList } = useShopp();
  const addToFavorite = () => {
    setFavorites((prev) => {
      if (prev.some((x) => x._id === product._id)) {
        return prev.filter((item) => item._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleShoppingCart = () => {
    setShoppingList((prev) => {
      if (!prev.some((x) => x._id === product._id)) {
        return [...prev, product];
      }
      return [...prev];
    });
  };

  return (
    <div className="product-cart-container">
      <div
        className="product-img-container "
        style={{ backgroundImage: `url(${posterUrl})` }}
      >
        <Link className="fool" to="/product/detail/:id">
          <div className="add_product absolute"></div>
        </Link>
        <button className="cart_btn" onClick={handleShoppingCart}>
          add to cart
        </button>
      </div>

      <div className="product-info-container">
        <Link className="link" to="/product/detail/:id">
          <h5 className="product-title">{name}</h5>
        </Link>
        <div className="product-cart-footer flex">
          <h6 className="product-price">{price}$</h6>
          <button className="add-to-favorite-btn" onClick={addToFavorite}>
            {Favorites.some((x) => x._id === product._id) ? (
              <HiHeart size="20px" color="black" />
            ) : (
              <HiOutlineHeart size="20px" color="black" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;
