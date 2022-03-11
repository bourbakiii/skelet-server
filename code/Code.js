import mongoose from "mongoose";

const Code = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: [true, "Email не передан"],
    },
    code: {
      type: String,
      required: [true, "Code не передан"],
    },
    type: {
      type: String,
      required: [true, "Тип кода не передан"],
    },
  },
  { timestamps: true }
);
Code.index({ updatedAt: 1 }, { expireAfterSeconds: 86400 });

export default mongoose.model("Code", Code);
