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

// @desc   Delete a product
// @route  DETETE /api/products/:id
// @access Rrivate/admin
const deleteProduct = expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc   Create a product
// @route  Post /api/products
// @access Private/admin
const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStocks: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc  Update a product
// @route  Post /api/products/:id
// @access Private/admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStocks } =
    req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStocks = countInStocks;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  }
  {
    res.status(404);
    throw new Error("product not found");
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
