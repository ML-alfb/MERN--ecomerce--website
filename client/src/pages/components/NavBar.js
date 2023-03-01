import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorite, useShopp } from "../../hooks/useFavorite";

import { useAuth } from "../../hooks/useAuth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi";

import "../css/navBar.css";
import ShoppingCart from "./ShoppingCart";
function NavBar() {
  const [searchValue, setSearchValue] = useState("");
  const { Favorites } = useFavorite();
  const { auth } = useAuth();
  const { shoppingList } = useShopp();

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header>
      <nav>
        <div className="logo">logo</div>
        <div className="search-form-container">
          <form className="search-form" onSubmit={onSubmit}>
            <input
              className="searchInput"
              type={"search"}
              value={searchValue}
              onChange={onChange}
              name="search"
              placeholder="Search..."
            />
            <input className="search-btn " type="submit" value="Search" />
          </form>
        </div>
        <ul>
          <li className="relative list">
            <Link className="link " to={auth ? "/profil" : "/login"}>
              <HiOutlineUserCircle size="22px" color="black" />
            </Link>
            <ul className="list-menu">
              <li>
                <Link className="link " to={auth ? "/profil" : "/login"}>
                  {auth ? "My profil" : "login"}
                </Link>
              </li>
              <li>
                <Link className="link " to={auth ? "/orders" : "/singup"}>
                  {auth ? "orders" : "Register"}
                </Link>
              </li>
              {auth ? (
                <>
                  <li>
                    <Link className="link " to="/deconnect">
                      logout
                    </Link>
                  </li>
                  <li>
                    <Link className="link " to="/dashbord">
                      dashbord
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </li>
          <li className="relative list">
            <Link className=" link" to={"/singup"}>
              {shoppingList.length > 0 ? (
                <span className="countFav">{shoppingList.length} </span>
              ) : (
                ""
              )}
              <AiOutlineShoppingCart size="22px" color="black" />
            </Link>
            <ul className="shopping-cart flex">
              <ShoppingCart />
            </ul>
          </li>
          <li className="relative">
            <Link className=" link " to={"/singup"}>
              {Favorites.length > 0 ? (
                <span className="countFav">{Favorites.length} </span>
              ) : (
                ""
              )}

              <HiOutlineHeart size="22px" color="black" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
