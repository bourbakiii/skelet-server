import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
// import product_router from "./product/product_router.js";
// import category_router from "./category/category_router.js";

import UserRouter from "./user/UserRouter.js";
import body_parser from "body-parser";
import ProductRouter from "./product/ProductRouter.js";
import PageRouter from "./Page/Router.js";
import CategoryRouter from "./Category/Router.js";

let app = express();
app.use(express.json());

app.use(fileUpload({}));
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static('static'));
app.use(cors());

app.use("/api", UserRouter);
app.use("/api", ProductRouter);
app.use("/api", PageRouter);
app.use("/api", CategoryRouter);


const PORT = 5000;
app.listen(PORT, console.log("%сSERVER STARTED SUCCESSFULL " + PORT));


