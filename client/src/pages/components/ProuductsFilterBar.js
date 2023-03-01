import React, { useState } from "react";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import { MdStarRate, MdOutlineStarRate } from "react-icons/md";
import "../css/filterComponent.css";

function ProuductsFilterBar() {
  const [filterValues, setFilterValues] = useState({
    Category: [],
    priceRange: { max: "", min: "" },
    colors: [],
    rating: "1",
  });
  const getfilterArray = {
    Category: ["sport", "classic", "static", "fontic"],
    priceRange: { max: "", min: "" },
    rating: [0, 1, 2, 3, 4],
  };

  const onCFClick = (cate) => {
    setFilterValues((prev) => {
      // const name = e.target.name;
      // console.log(e.target.value);
      return {
        ...prev,
        Category: prev.Category.includes(cate)
          ? prev.Category.filter((x) => x !== cate)
          : [...prev.Category, cate],
      };
    });
  };
  const onRFClick = (e) => {
    setFilterValues((prev) => {
      return {
        ...prev,
        rating: e,
      };
    });
  };

  return (
    <>
      {getfilterArray.Category?.length && (
        <div className="border-bottom">
          <h5 className="filter-title">Category:</h5>
          {getfilterArray.Category.map((cate, index) => {
            return (
              <button
                className="filter-btn  space-between flex"
                key={index}
                value={cate}
                name={"Category"}
                onClick={() => onCFClick(cate)}
              >
                <span>{cate}</span>
                {filterValues.Category?.includes(cate) ? (
                  <FaCheckSquare />
                ) : (
                  <FaRegSquare />
                )}
              </button>
            );
          })}
        </div>
      )}
      {/* {getfilterArray.Category?.length && (
        <div className="cate">
          {getfilterArray.Category.map((cate, index) => {
            return (
              <button
                className="filter-btn"
                key={index}
                value={cate}
                name={cate}
                onClick={(e) => onClick(cate)}
              >
                {filterValues.Category?.includes(cate) ? (
                  <FaCheckSquare />
                ) : (
                  <FaRegSquare />
                )}

                <span>{cate}</span>
              </button>
            );
          })}
        </div>
      )} */}

      <div className="border-bottom">
        <h5 className="filter-title">filter by Rating:</h5>
        {getfilterArray.rating.reverse().map((rates, index) => {
          return (
            <button
              className="filter-btn flex-start flex"
              key={index}
              value={index}
              onClick={() => onRFClick(index + 1)}
            >
              {(() => {
                let ratingIcons = [];
                for (let i = 1; i < 6; i++) {
                  if (rates < i) {
                    ratingIcons.unshift(<MdStarRate color="#F5EA5A" />);
                  } else {
                    ratingIcons.unshift(<MdOutlineStarRate />);
                  }
                }
                return ratingIcons;
              })().map((icon) => icon)}
              <span>
                {" "}
                {index + 1 === 5
                  ? `${index + 1} only`
                  : `${index + 1} and up`}{" "}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default ProuductsFilterBar;
