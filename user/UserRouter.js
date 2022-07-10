import Router from "express";
import UserController from "./UserController.js";

import {body} from 'express-validator';
import {connection} from "../сonnection.js";
import validation from "../middleware/validation.js";


// import ResetController from "./ResetController.js";
// import permission_middleware from "../middleware/token_permission.js";
// import token_middewaware from "../middleware/token_user.js";
// import action_code_middleware from "../middleware/action_code.js";
// import fileUpload from 'express-fileupload';

const router = new Router();
// router.use(fileUpload());

// router.post("/users", UserController.create);
// router.post("/user", UserController.login);
// router.put("/user/logout", UserController.logout);  з

// permission_middleware
router.post("/users/create", body('name').notEmpty().withMessage('Имя обязательно').bail().trim(), body('second_name').notEmpty().withMessage('Фамилия обязательна').bail().trim(), body('father_name').notEmpty().withMessage('Отчество обязательно').bail().trim(), body('email').notEmpty().withMessage('Адрес электронной обязателен').bail().isEmail().withMessage('Адрес электоронной почты невалиден').bail().custom((value) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = '${value}'`, (error, result) => {
                if (error) reject(new Error('При проверке почты на уникальность возникла ошибка'));
                if (result.length) reject(new Error('Кажется, такой адрес электронной почты уже занят'));
                resolve(true);
            });
        })
    }).withMessage('Кажется, адрес электронной почты уже занят'), body('phone').notEmpty().withMessage('Номер телефона обязателен').isLength({
        min: 10, max: 10
    }).withMessage('Длина номера телефона - 10 символов').bail().isNumeric().withMessage('Номер телефона должен состоять только из цифр').bail().custom((value) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE email = '${value}'`, (error, result) => {
                if (error) reject(new Error('При проверке почты на уникальность возникла ошибка'));
                if (result.length) reject(new Error('Кажется, такой адрес электронной почты уже занят'));
                resolve(true);
            });
        })
    }).withMessage('Кажется, адрес электронной почты уже занят'),


    body('password').notEmpty().withMessage('Пароль обязателен').bail().isLength({min: 8}).withMessage('Минимальная длина пароля - 8 символов'), validation, UserController.create);
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