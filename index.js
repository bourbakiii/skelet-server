import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

// import product_router from "./product/product_router.js";
// import category_router from "./category/category_router.js";

import UserRouter from "./user/UserRouter.js";
import body_parser from "body-parser";
import ProductRouter from "./product/ProductRouter.js";

let app = express();
app.use(fileUpload());
app.use(express.json()).use(express.static('static')).use(cors()).use(body_parser.urlencoded({extended: false})).use("/api", UserRouter).use("/api", ProductRouter);

const PORT = 5000;
app.listen(PORT, console.log("%сSERVER STARTED SUCCESSFULL " + PORT));


