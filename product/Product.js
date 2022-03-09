import mongoose from "mongoose";
import Category from "../";
const { Schema } = mongoose;
const Product = new Schema({
    image: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String, 
        required: [true, "Название является обязательным полем"]
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    price: {
        type: Number,
        required: [true, "Цена является обязательным полем"]
    },
    discount_price: {
        type: Number,
        required: false,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        min: [1, "Вы не можете добавить продукт, если его нет в наличии"],
        required: [true, "Количество является обязательным полем"]
    }
});
Product.methods.toJSON = function() {
    var product = this.toObject();
    delete product['__v'];
    let categories = product.categories;
    product.categories = [];
    categories.forEach(element => {
        element = Category.findById(element);
    });
    return product;
   }
export default mongoose.model('Product', Product);