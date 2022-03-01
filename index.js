import express from "express";
import mongoose from "mongoose";
import product_router from './product_router.js';
import user_router from './user_router.js';
import cors from 'cors';
const PORT = 5000;
const DB_URL = `mongodb+srv://bourbakiii:8236251@cluster0.vqwrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const corsOptions = {
  origin: 'http://localhost:3000/', // домен сервиса, с которого будут приниматься запросы
  optionsSuccessStatus: 200 // для старых браузеров
}

const app = express().use(express.json()).use('/api', [
  product_router,
  user_router]);
app.use(cors());
app.options('*', cors());

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
