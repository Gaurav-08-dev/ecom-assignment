import mongoose from "mongoose";
import { InvalidateCacheProps } from "../types/types.js";
import { Product } from "../models/product.js";
import { nodeCache } from "../app.js";
export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017", { dbName: "Ecom" })
    .then((c) => console.log(`DB connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: InvalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = ["latest-products", "category"];
    const products = await Product.find({}).select("_id");
    const singleProductKey = products.map((product) => {
      const id = product._id;
      return `product-${id}`;
    });
    productKeys.push(...singleProductKey);
    nodeCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
