import Router from "express";
import UserController from "./UserController.js";

const router = new Router();

router.post("/users", UserController.create);
router.get("/user", UserController.login);
router.get("/users", UserController.getAll);
router.get("/user/:id", UserController.getOne);
// router.get("/products/:id", ProductController.getOne);
// router.put("/products", ProductController.update);
// router.delete("/products/:id", ProductController.delete);

export default router;
