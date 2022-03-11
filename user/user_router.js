import Router from "express";
import UserController from "./UserController.js";
import ResetController from "./ResetController.js";
import permission_middleware from "../middleware/token_permission.js";
import token_middewaware from "../middleware/token_user.js";
import action_code_middleware from "../middleware/action_code.js";
import fileUpload from 'express-fileupload';

const router = new Router();
router.use(fileUpload());
 
router.post("/users", UserController.create);
router.post("/user", UserController.login);
router.get("/user/:id", permission_middleware, UserController.getOne);
router.get("/user", UserController.getByToken);
router.put("/users", token_middewaware, UserController.update);
router.get("/users", permission_middleware, UserController.getAll);
router.put("/user/:id", token_middewaware, action_code_middleware, UserController.verify);
router.delete("/user/:id", permission_middleware, UserController.delete);
router.get("/reset/send", ResetController.send);
router.post("/reset/check", ResetController.check);

// ?router.get("/products/:id", ProductController.getOne);
// ?router.delete("/products/:id", ProductController.delete);

export default router;