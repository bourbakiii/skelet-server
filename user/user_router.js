import Router from "express";
import UserController from "./UserController.js";

import {body} from 'express-validator';


// import ResetController from "./ResetController.js";
// import permission_middleware from "../middleware/token_permission.js";
// import token_middewaware from "../middleware/token_user.js";
// import action_code_middleware from "../middleware/action_code.js";
// import fileUpload from 'express-fileupload';

const router = new Router();
// router.use(fileUpload());

// router.post("/users", UserController.create);
// router.post("/user", UserController.login);
// router.put("/user/logout", UserController.logout);

// permission_middleware
router.post("/users/create", [
    body('name').notEmpty().withMessage('Имя обязательно').bail().trim(),
    body('second_name').notEmpty().withMessage('Фамилия обязательна').bail().trim(),
    body('father_name').notEmpty().withMessage('Отчество обязательно').bail().trim(),
// TODO: Проверять на уникальность почту + сделать уникальный телефон
    body('email').notEmpty().withMessage('Адрес электронной обязателен').bail().isEmail().withMessage('Адрес электоронной почты невалиден'),
    body('password').notEmpty().withMessage('Пароль обязателен').bail().isLength({min: 8}).withMessage('Минимальная длина пароля - 8 символов')
], UserController.create);
router.post("/users/:id/logout", UserController.logout);
router.get("/users/:id", UserController.getById);
router.get("/users", UserController.getAll);

///////////////////////////////////////////////


// router.get("/user", UserController.getByToken);
// router.put("/users", token_middewaware, UserController.update);
// router.put("/user/:id", token_middewaware, action_code_middleware, UserController.verify);
// router.delete("/user/:id", permission_middleware, UserController.delete);
// router.put("/reset", ResetController.reset);
// router.get("/reset/send", ResetController.send);
// router.post("/reset/check", ResetController.check);

// ?router.get("/products/:id", ProductController.getOne);
// ?router.delete("/products/:id", ProductController.delete);

export default router;