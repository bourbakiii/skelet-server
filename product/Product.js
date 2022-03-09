import e from "express";
import mongoose from "mongoose";
import Category from "../category/Category.js";

const Product = new mongoose.Schema({
  image: {
    type: String,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: [true, "Название является обязательным полем"],
  },
  description: {
    type: String,
    required: false,
    default: null,
  },
  price: {
    type: Number,
    required: [true, "Цена является обязательным полем"],
  },
  discount_price: {
    type: Number,
    required: false,
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    min: [0, "Вы не можете добавить отрицательное количество продукта"],
    required: [true, "Количество является обязательным полем"],
  },
  categories: { type: Array, default: ["6223c15dd905421b5377f436"] },
});

Product.methods.toJSON = function () {
  let product = this.toObject();
  let categories = product.categories;
  product.categories = null;
  categories.forEach(async element => {
      element = await Category.findById(element).exec();
  });
  console.log("The categories is");
  console.log(categories);
  delete product.__v;
  return product;
};

export default mongoose.model("Product", Product);
