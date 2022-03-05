import mongoose from "mongoose";
import ttl from 'mongoose-ttl';

const Code = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "ID не передан"],
    },
    code:{
        type: String,
        required: [true, "Code не передан"],
    },
});
Code.plugin(ttl, { ttl: '10m' });
export default mongoose.model("Code",Code);