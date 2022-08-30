import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";

import UserRouter from "./user/UserRouter.js";
import body_parser from "body-parser";
import ProductRouter from "./product/ProductRouter.js";
import PageRouter from "./Page/Router.js";
import CategoryRouter from "./Category/Router.js";
import CompilationRouter from "./Compilation/Router.js";


const app = express();
app.use(express.static('static'));
app.use(fileUpload({
    createParentPath: true
}));
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

app.use("/api", ProductRouter);


app.use("/api", UserRouter);
app.use("/api", PageRouter);
app.use("/api", CategoryRouter);
app.use("/api", CompilationRouter);


app.listen(5000, () => console.log("%сSERVER STARTED SUCCESSFULL 5000"));


