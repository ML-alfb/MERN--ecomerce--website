import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
function DashbordBar() {
  const [isHoverd, setisHoverd] = useState(false);
  const location = useLocation();
  const [fullHeight, setfullHeight] = useState();
  const paths = ["/dashbord/products/", "/dashbord/product/add"];
  useEffect(() => {
    setfullHeight(() => {
      for (let i = 0; i < paths.length; i++) {
        if (location.pathname.startsWith(paths[i])) {
          return true;
        }
      }
      return false;
    });
  }, [location]);
  return (
    <div className="dashbord-nav flex column">
      <div className="logo-container ">
        <Link className="link" to={"/dashbord"}>
          DashBord
        </Link>
      </div>
      <ul className=" column ul">
        <li className="border_top">
          <Link className="link li" to={"/dashbord/Statistics"}>
            Statistics
          </Link>
        </li>
        <li
          className={` list-menu border_bottom border_top ${
            fullHeight ? "fullHeight" : ""
          }`}
          onMouseEnter={() => setisHoverd(true)}
          onMouseLeave={() => setisHoverd(false)}
        >
          <div className="menu-title flex items-center border_bottom">
            <span>Item Management</span>
            {!isHoverd ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </div>

          <ul className="menu column ul ">
            <li>
              <Link className="link " to={"/dashbord/products/1"}>
                products list
              </Link>
            </li>
            <li>
              <Link className="link " to={"/dashbord/product/add"}>
                add product
              </Link>
            </li>
            <li>
              <Link className="link " to={"/dashbord/product"}>
                Customers
              </Link>
            </li>
            <li>
              <Link className="link " to={"/dashbord/product"}>
                Employees
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link className="link border_bottom" to={"/dashbord/products"}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default DashbordBar;
