import mongoose from "mongoose";
import ttl from "mongoose-ttl";
const validateEmail = email=> {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const Code = new mongoose.Schema({
    user_email: {
        type: String,
        required: [true, "Email не передан"],
        validate: [validateEmail, 'Email заполнен неправильно'],
    },
    code:{
        type: String,
        required: [true, "Code не передан"],
    },
});
Code.plugin(ttl, { ttl: '5s' });
export default mongoose.model("Code",Code);