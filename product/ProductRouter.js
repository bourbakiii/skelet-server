import Router from "express";
import ProductController from "./ProductController.js";

import { body } from 'express-validator';
import validation from "../middleware/validation.js";
import multer from "multer";
const upload = multer({ dest: "static/products" });


const router = new Router();


router.post("/products/create",
upload.single('image'),
    // body('name').notEmpty().withMessage('Имя обязательно').bail().trim(),
    // body('variations').notEmpty().withMessage('Вариации обязательны').bail()
    //     .custom((value) => {
    //         return new Promise((resolve, reject) => {
    //             try {
    //                 JSON.parse(value);

    //                 resolve(true);
    //             }
    //             catch {
    //                 reject(new Error('Не валидное поле вариаций'));
    //             }
    //         })
    //     }).withMessage('Кажется, вариации невалидны'),
    // validation, 
    ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/products/without-category", ProductController.getWithoutCategory);
router.get("/products/:id", ProductController.get);
router.patch("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);
router.post("/products/images", ProductController.images);

export default router;

//     body('password').notEmpty().withMessage('Пароль обязателен').bail().isLength({min: 8}).withMessage('Минимальная длина пароля - 8 символов'), validation, UserController.create);
// router.post("/users/:id/logout", UserController.logout);
// router.get("/users/:id", UserController.getById);
// router.get("/users", UserController.getAll);

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