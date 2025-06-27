import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import {
  NewProductReqBody,
  SearchRequestQuery,
  BaseQueryType,
} from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utilityClass.js";
import { rm } from "fs";
// import {faker} from "@faker-js/faker"
import { nodeCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";

export const getlatestProducts = TryCatch(async (req, res, next) => {
  let products = [];
  if (nodeCache.has("latest-products")) {
    products = JSON.parse(nodeCache.get("latest-products")!);
  } else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    nodeCache.set("latest-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

export const getAllCategories = TryCatch(async (req, res, next) => {
  let categories = [];
  if (nodeCache.has("category")) {
    categories = JSON.parse(nodeCache.get("category")!);
  } else {
    categories = await Product.distinct("category");
    nodeCache.set("categories", JSON.stringify(categories));
  }

  return res.status(200).json({
    success: true,
    categories,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
  let product;
  const id = req.params.id;
  if (nodeCache.has(`product-${id}`)) {
    product = JSON.parse(nodeCache.get(`product-${id}`)!);
  } else {
    product = await Product.findById(id);
    nodeCache.set(`product-${id}`, JSON.stringify(product));
  }

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  return res.status(200).json({
    success: true,
    product,
  });
});

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductReqBody>, res, next) => {
    const { name, category, price, stock } = req.body;
    const photo = req.file;
    if (!photo) return next(new ErrorHandler("Please add photo", 400));
    if (!name || !category || !price || !stock) {
      rm(photo.path, () => {
        console.log("photo deleted");
      });
      return next(new ErrorHandler("Required fields missing", 400));
    }

    await Product.create({
      name,
      category: category.toLowerCase(),
      price,
      stock,
      photo: photo?.path,
    });

    await invalidateCache({ product: true });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  }
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photos = req.file;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photos) {
    rm(product.photo!, () => {
      console.log("old photo deleted");
    });
    // @ts-expect-error
    product.photos = photos;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  //   if (description) product.description = description;

  await product.save();

  await invalidateCache({ product: true });
  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  rm(product.photo!, () => {
    console.log("Product photo deleted");
  });

  await product.deleteOne();
  await invalidateCache({ product: true });
  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

export const getAllProducts = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;

    const page = Number(req.query.page) || 1;

    const key = `products-${search}-${sort}-${category}-${price}-${page}`;

    let products;
    let totalPage;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQueryType = {};

    if (search)
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };

    if (price)
      baseQuery.price = {
        $lte: Number(price),
      };

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    const [productsFetched, filteredOnlyProduct] = await Promise.all([
      productsPromise,
      Product.find(baseQuery),
    ]);

    products = productsFetched;
    totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  }
);

// * for generating data
// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\5ba9bd91-b89c-40c2-bb8a-66703408f986.png",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };

// generateRandomProducts(50)
