import express from "express";
import mongoose from "mongoose";
import router from './router.js';
const PORT = 5000;
const DB_URL = `mongodb+srv://bourbakiii:8236251Telefon@cluster0.vqwrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const app = express().use(express.json()).use('/api',router);


(async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    app.listen(PORT, () => console.log("SERVER STARTED SUCCESSFULL " + PORT));
  } catch (error) {
    console.log(error);
  }
})();
