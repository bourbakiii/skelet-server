import mongoose from "mongoose";
import mongoose_bcrypt from 'mongoose-bcrypt';

const { Schema } = mongoose;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const User = new Schema({
    image: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String, 
        required: [true, "Имя является обязательным полем"]
    },
    surname: {
        type: String, 
        required: [true, "Фамилия является обязательным полем"]
    },
    father_name: {
        type: String, 
        required: [true, "Отчество является обязательным полем"]
    },
    email:{
        type: String,
        required: [true, "Email является обязательным полем"],
        validate: [validateEmail, 'Email заполнен неправильно'],
    },
    password:{
        type: String,
        required: [true, "Пароль является обязательным полем"],
        bcrypt: true
    },
    token:{
        type: String,
        default: null
    },
    verification:{
        type: Boolean,
        default: false
    },
    permission:{
        type: String,
        default: "user",
        enum: ["user","manager","admin"]
    }
});
User.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;
    delete user['__v'];
    return user;
   }
User.plugin(mongoose_bcrypt);

export default mongoose.model('User', User);