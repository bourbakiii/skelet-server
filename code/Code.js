import mongoose from "mongoose";
const validateEmail = email=> {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const Code = new mongoose.Schema({
    user_email: {
        type: String,
        required: [true, "Email является обязательным полем"],
        validate: [validateEmail, 'Email заполнен неправильно'],
    },
    createdAt: { type: Date, expires: 3600 }
});