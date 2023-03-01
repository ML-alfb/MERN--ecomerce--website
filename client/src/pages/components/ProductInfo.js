import React, { useEffect, useState } from "react";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";
import {
  MdStarRate,
  MdOutlineStarRate,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import "../css/infoRow.css";
function ProductInfo({ productDetails, setmodel, setindex, isSelected }) {
  const [select, setSelect] = useState(isSelected);
  const {
    _id,
    images,
    rating,
    name,
    price,
    published,
    description,
    stock,
    discount,
  } = productDetails;
  useEffect(() => {
    setSelect(isSelected);
  }, [isSelected]);
  const onClickSelect = () => {
    setSelect((prev) => !prev);
  };
  const onClickEdit = () => {
    setindex(_id);
    setmodel(true);
  };
  return (
    <div className="flex product-listInfo-container">
      <div className="select-coloum">
        {select ? (
          <span onClick={onClickSelect}>
            <FaCheckSquare />
          </span>
        ) : (
          <span onClick={onClickSelect}>
            <FaRegSquare />
          </span>
        )}
      </div>
      <div className="image-coloum">
        {images ? (
          <img
            src={images?.posterUrl}
            width="50px"
            height="50px"
            alt="waaaaaa"
            srcset=""
          />
        ) : (
          ""
        )}
      </div>
      <div className="detail-coloum flex column">
        <div>
          <h4>{name}</h4>
        </div>
        <p>{description}</p>
      </div>
      <div className="price-coloum">{price}$</div>
      <div className="rating-coloum flex">
        {((rating) => {
          let ratingIcons = [];
          for (let i = 0; i < 5; i++) {
            if (rating > i) {
              ratingIcons.push(<MdStarRate size="12px" color="#F5EA5A" />);
            } else {
              ratingIcons.push(<MdOutlineStarRate size="12px" />);
            }
          }
          return ratingIcons;
        })({ rating }).map((icon) => icon)}
        <span>{`(${rating})`}</span>
      </div>
      <div className="published-coloum">{published ? "yes" : "no"}</div>
      <div className="stock-coloum">{stock}</div>
      <div className="edit-coloum">
        <button className="btn-edit" onClick={onClickEdit}>
          <MdOutlineModeEditOutline size="22px" />
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
