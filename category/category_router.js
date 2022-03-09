import Router from "express";
import CategoryController from "./CategoryController.js";

const router = new Router();

router.post("/categories", CategoryController.create);
// router.get("/products", ProductController.getAll);
// router.get("/products/:id", ProductController.getOne);
// router.put("/products", ProductController.update);
// router.delete("/products/:id", ProductController.delete);

export default router;
