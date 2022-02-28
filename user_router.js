import Router from "express";
import UserController from "./UserController.js";

const router = new Router();

router.post("/users", UserController.create);
// router.get("/products", ProductController.getAll);
// router.get("/products/:id", ProductController.getOne);
// router.put("/products", ProductController.update);
// router.delete("/products/:id", ProductController.delete);

export default router;
