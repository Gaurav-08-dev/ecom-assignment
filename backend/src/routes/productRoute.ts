// @ts-nocheck
import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import {
  newProduct,
  getAllProducts,
  getlatestProducts,
  getAllCategories,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
} from "../controllers/product.js";
import { adminOnly } from "../middlewares/auth.js";
const app = express.Router();

app.post("/new", adminOnly, singleUpload, newProduct);

// app.get("/all", getAllProducts);

app.get("/latest", getlatestProducts);

app.get("/categories", getAllCategories);
app.get("/all", getAllProducts); // get products with filters
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
