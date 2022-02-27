import express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";
const PORT = 5000;
const DB_URL = `mongodb+srv://bourbakiii:8236251Telefon@cluster0.vqwrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express().use(express.json());

app.post("/", async (req, res) => {
  console.log(req.body);
  const { author, title, content, picture } = req.body;
  const post = await Post.create({ author, title, content, picture });
  res.status(200).json("Сервер работаfет");
});

startApp();
async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("SERVER STARTED SUCCESSFULL " + PORT));
  } catch (error) {
    console.log(error);
  }
}
