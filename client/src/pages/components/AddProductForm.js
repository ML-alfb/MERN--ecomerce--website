import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import { addProduct, updateProducts } from "../../api/productsApi";

// import "./css/addProduct.css";
function AddProductForm({ productInfoToUpdate, toUpdate, setmodel }) {
  const {
    productID,
    posterUp,
    nameUp,
    stockUp,
    priceUp,
    descriptionUp,
    discountUp,
    catygoryUp,
    publishedUp,
  } = productInfoToUpdate;
  const [productInfo, setProductInfo] = useState({
    poster: "",
    name: nameUp ? nameUp : "",
    stock: stockUp ? stockUp : "",
    price: priceUp ? priceUp : "",
    description: descriptionUp ? descriptionUp : "",
    discount: discountUp ? discountUp : "",
    catygory: catygoryUp ? catygoryUp : "",
    published: publishedUp ? publishedUp : "",
  });
  const {
    poster,
    name,
    stock,
    price,
    description,
    discount,
    catygory,
    published,
  } = productInfo;
  const onStringChange = (e) => {
    setProductInfo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onImageCange = (e) => {
    console.log(e.target.files[0].name);
    if (e.target.files?.length > 0) {
      setProductInfo((prev) => {
        return {
          ...prev,

          poster: e.target.files[0],
          posterPathName: e.target.files[0].name,
        };
      });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", poster);
    formData.append("productInfo", JSON.stringify(productInfo));
    const data = toUpdate
      ? updateProducts(productID, formData)
      : addProduct(formData);
    if (data) {
      setmodel(false);
      console.log(data);
    }
  };
  return (
    <>
      <div className="add-product-form-container flex">
        <div className="grow flex canter poster-container column">
          <div
            className={` " flex image-size " ${poster ? "" : "border-dash"}  `}
          >
            {poster ? (
              <img
                className="product-image"
                src={URL.createObjectURL(poster)}
              ></img>
            ) : posterUp ? (
              <img className="product-image" src={posterUp}></img>
            ) : (
              <FiImage size="120px" color="6D8299" />
            )}
          </div>
          <input
            type="file"
            name="image"
            id="fileInput"
            className="fileInput"
            onChange={onImageCange}
            accept="/image"
          />
          <label htmlFor="fileInput" className="fileInput-btn">
            Choose image
          </label>
        </div>

        <form className="product-form" onSubmit={onSubmit}>
          <dev className="input_container">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="name"
              name="name"
              value={name}
              onChange={onStringChange}
              required
            ></input>
          </dev>
          <dev className="input_container">
            <label htmlFor="catygory">catygory</label>
            <input
              id="catygory"
              type="text"
              placeholder="catygory"
              name="catygory"
              value={catygory}
              onChange={onStringChange}
              required
            ></input>
          </dev>
          <div className="flex wrap">
            <dev className="input_container">
              <label htmlFor="price">price</label>
              <input
                id="price"
                type="number"
                placeholder="price"
                name="price"
                value={price}
                onChange={onStringChange}
                required
              ></input>
            </dev>
            <dev className="input_container">
              <label htmlFor="discount">discount</label>
              <input
                id="discount"
                type="number"
                placeholder="discount"
                name="discount"
                value={discount}
                onChange={onStringChange}
                required
              ></input>
            </dev>
            <dev className="input_container">
              <label htmlFor="stock">stock</label>
              <input
                id="stock"
                type="number"
                placeholder="stock"
                name="stock"
                value={stock}
                onChange={onStringChange}
                required
              ></input>
            </dev>
          </div>
          <dev className="input_container">
            <label htmlFor="description">description</label>
            <textarea
              id="description"
              type=""
              placeholder="description"
              name="description"
              value={description}
              onChange={onStringChange}
              required
            ></textarea>
          </dev>
          <dev className="flex  gap-20">
            <span>publish:</span>
            <div className="flex gap-10">
              <label htmlFor="published">No</label>
              <input
                id="published"
                type="radio"
                placeholder="published"
                name="published"
                value={false}
                onChange={onStringChange}
                required
              ></input>
            </div>
            <div className="flex gap-10">
              <label htmlFor="publishedture">Yes</label>
              <input
                id="publishedtrue"
                type="radio"
                placeholder="published"
                name="published"
                value={true}
                onChange={onStringChange}
                required
              ></input>
            </div>
          </dev>
          <div className="flex absulate flex-end">
            <button type="submit" className="add-btn">
              {toUpdate ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProductForm;
