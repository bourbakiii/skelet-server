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

Product.methods.getCategories = async function () {
        // !!! При возвращении чтобы сами категории раскрывались

  let product = this.toObject();
//   product.categories = await product.categories.map(async (el) => {
//     return await Category.find({
//       _id: el,
//     });
//   });
//   console.log(product);
  return product;
};
Product.methods.toJSON = function () {
  let product = this.toObject();
  delete product.__v;
  return product;
};

export default mongoose.model("Product", Product);
