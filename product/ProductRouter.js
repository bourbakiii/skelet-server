import Router from "express";
import ProductController from "./ProductController.js";

import {body} from 'express-validator';
import validation from "../middleware/validation.js";

const router = new Router();
// router.use(fileUpload());


// permission_middleware
// TODO: сделать имена продуктов уникальными при создании и изменении

router.post("/products/create", // TODO: проверить работу вариаций
    body('name').notEmpty().withMessage('Имя обязательно').bail().trim(), body('price').notEmpty().withMessage('Цена обязательна').isNumeric().withMessage('Цена дожна быть числом'), body('discount_price').optional({checkFalsy: true}).isNumeric().withMessage('Цена со скидкой дожна быть числом'), validation, ProductController.create);

router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.get);
router.patch("/products/:id", ProductController.update);
router.delete("/products/:id", ProductController.delete);
router.post("/products/images", ProductController.images);


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

export default router;