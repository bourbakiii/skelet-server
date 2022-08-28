import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
// import product_router from "./product/product_router.js";
// import category_router from "./category/category_router.js";

// import UserRouter from "./user/UserRouter.js";
import body_parser from "body-parser";
import ProductRouter from "./product/ProductRouter.js";
// import PageRouter from "./Page/Router.js";
// import CategoryRouter from "./Category/Router.js";


const app = express();
app.use(fileUpload({}));
app.use(body_parser.urlencoded({extended: false}));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use("/api", ProductRouter);

// app.use(express.static('static'));
// app.use(cors());

// app.use("/api", UserRouter);
// app.use("/api", PageRouter);
// app.use("/api", CategoryRouter);


app.listen(5000, console.log("%сSERVER STARTED SUCCESSFULL 5000"));


