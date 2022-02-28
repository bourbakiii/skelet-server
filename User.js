import mongoose from "mongoose";
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
    token:{
        type: String,
        default: null
    },
    verification:{
        type: Boolean,
        default: false
    }
});
User.pre('save',()=>{
    console.log('Предсохранение пользователя');
})
export default mongoose.model('User', User);