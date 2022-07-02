import cors from "cors";
import express from "express";
// import product_router from "./product/product_router.js";
// import category_router from "./category/category_router.js";
import user_router from "./user/user_router.js";
import body_parser from "body-parser";



const app = express();
app.use(express.json());
app.use(express.static('static'));
app.use(body_parser.urlencoded({extended: false}));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use("/api", user_router);
// app.use("/api", product_router);
// app.use("/api", category_router);


const PORT = 5000;
app.listen(PORT, () => console.log("SERVER STARTED SUCCESSFULL " + PORT));
