// import mongoose from "mongoose";
// import Category from "../category/Category.js";
//
// const Product = new mongoose.Schema({
//   image: {
//     type: String,
//     required: false,
//     default: 'product-placeholder.png',
//   },
//   name: {
//     type: String,
//     required: [true, "Название является обязательным полем"],
//   },
//   description: {
//     type: String,
//     required: false,
//     default: null,
//   },
//   price: {
//     type: Number,
//     required: [true, "Цена является обязательным полем"],
//   },
//   discount_price: {
//     type: Number,
//     required: false,
//     default: null,
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
//   stock: {
//     type: Number,
//     min: [0, "Вы не можете добавить отрицательное количество продукта"],
//     required: [true, "Количество является обязательным полем"],
//   },
//   categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
// });
//
// Product.methods.toJSON = function(){
//     let product = this.toObject();
//     delete product['__v'];
//      return product;
// }
// export default mongoose.model("Product", Product);
