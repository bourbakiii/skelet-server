import mongoose from "mongoose";
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

export default mongoose.model('Product', Product);