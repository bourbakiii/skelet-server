import Router from "express";
import UserController from "./UserController.js";
import permission_middleware from "../middleware/token_permission.js";
import fileUpload from 'express-fileupload';
const router = new Router();
router.use(fileUpload());
router.post("/users", UserController.create);
router.post("/user", UserController.login);
router.get("/users", permission_middleware, UserController.getAll);
router.post("/user/upload", UserController.upload);
router.get("/user/:id", permission_middleware, UserController.getOne);
// ?router.put("/products", ProductController.update);
// ?router.delete("/products/:id", ProductController.delete);
// ?router.get("/products/:id", ProductController.getOne);
// ?router.delete("/products/:id", ProductController.delete);

export default router;