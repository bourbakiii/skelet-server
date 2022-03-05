import Router from "express";
import UserController from "./UserController.js";
import permission_middleware from "../middleware/token_permission.js";
import token_middewaware from "../middleware/token_user.js";
import fileUpload from 'express-fileupload';

const router = new Router();
router.use(fileUpload());
 
router.post("/users", UserController.create);
router.post("/user", UserController.login);
router.put("/users", token_middewaware, UserController.update);
router.get("/users", permission_middleware, UserController.getAll);
router.get("/user/:id", permission_middleware, UserController.getOne);
router.delete("/user/:id", UserController.delete);

// ?router.get("/products/:id", ProductController.getOne);
// ?router.delete("/products/:id", ProductController.delete);

export default router;