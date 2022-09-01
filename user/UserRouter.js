import Router from "express";
import UserController from "./UserController.js";

import {body} from 'express-validator';
import {connection} from "../сonnection.js";
import validation from "../middleware/validation.js";

const router = new Router();

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
}).withMessage('Кажется, адрес электронной почты уже занят'), body('password').notEmpty().withMessage('Пароль обязателен').bail().isLength({min: 8}).withMessage('Минимальная длина пароля - 8 символов'), validation, UserController.create);

router.post("/users/:id/logout", UserController.logout);

router.get("/users/:id", UserController.getById);

router.get("/users", UserController.getAll);

router.post("/users/changePassword",
    body('email').notEmpty().withMessage('Адрес электронной обязателен').bail().isEmail().withMessage('Адрес электоронной почты невалиден').bail(),
    body('old_password').notEmpty().withMessage('Старый пароль обязателен').bail(),
    body('password').notEmpty().withMessage('Новый пароль обязателен').bail(),
    validation,
    UserController.changePassword);

router.post("/users/login", body('email').notEmpty().withMessage('Адрес электронной обязателен').bail().isEmail().withMessage('Адрес электоронной почты невалиден'), body('password').notEmpty().withMessage('Пароль обязателен'), validation, UserController.login);

router.post("/users/verify", body('code').notEmpty().withMessage('Код обязателен').bail().isLength({
    min: 5,
    max: 5
}).withMessage('Длина кода - 5 символов'), validation, UserController.verify);


export default router;