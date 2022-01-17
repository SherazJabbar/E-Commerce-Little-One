import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModal.js";

// @desc   Fetch All Products
// @route  GET /api/products
// @access Public Route
const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc   Fetch Single Product
// @route  GET /api/products/:id
// @access Public Route
const getProductById = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProductById, getProducts };
