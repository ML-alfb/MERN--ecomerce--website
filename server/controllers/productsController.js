const Product = require("../models/productModel");
const path = require("path");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const getProducts = asyncHandler(async (req, res) => {
  const query = req.query;
  console.log(query, req.body);
  const page = query?.page ? parseInt(query.page) : 1;

  const limit = query?.limit ? parseInt(query.limit) : 7;

  try {
    const productsCount = await Product.count();
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);
    if (products) {
      return res.status(200).json({
        msg: products,
        query: {
          limit,
          page,
        },
        productsCount,
      });
    } else {
      res.status(400).json({
        msg: "no product found",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, catygory, price, stock, published, discount, description } =
    JSON.parse(req?.body?.productInfo);

  try {
    const product = await Product.create({
      name,
      images: {
        posterUrl: `${req.protocol}://${req.get("host")}/images/${
          req?.file?.filename
        }`,
      },
      catygory,
      price,
      stock,
      published,
      discount,
      description,
    });

    const saved = await product.save();
    if (saved) {
      return res.status(200).json({
        msg: "product added successfally",
      });
    } else {
      return res.status(400).json({
        msg: "product not added",
      });
    }
    // console.log(product);
  } catch (error) {
    return res.status(400).json({
      msg: error._message,
    });
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req?.params;
  const {
    name,
    catygory,
    price,
    stock,
    rating,
    published,
    discount,
    description,
  } = req?.body?.productInfo ? JSON.parse(req?.body?.productInfo) : {};
  const file = req?.file;

  try {
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return res.status(400).json({
        msg: "product does not exist",
      });
    }
    // console.log(product);
    // console.log("file:", file?.filename);
    const newposterUrl = file?.filename
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : product.images.posterUrl;
    console.log("poster0", newposterUrl);
    product.rating = rating ? rating : product.rating;
    product.description = description ? description : product.description;
    product.name = name ? name : product.name;
    product.catygory = catygory ? catygory : product.catygory;
    product.price = price ? price : product.price;
    product.stock = stock ? stock : product.stock;
    product.rating = rating ? rating : product.rating;
    product.published = published ? published : product.published;
    product.discount = discount ? discount : product.discount;
    product.images.posterUrl = newposterUrl;
    // console.log("h1", product);
    // posterUrl: `${req.protocol}://${req.get("host")}/images/${
    //   req.file.filename
    // }`
    const saved = await product.save();
    if (saved) {
      console.log("saved");
      return res.status(200).json({
        msg: "product updated successfally",
        product: product,
      });
    } else {
      return res.status(400).json({
        msg: "product not updated",
      });
    }
    // console.log(product);
  } catch (error) {
    return res.status(400).json({
      msg: error._message,
      ms2: "laaaaaaa",
    });
  }
});

module.exports = { getProducts, createProduct, updateProduct };
