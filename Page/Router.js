import Router from "express";
import Controller from "./Controller.js";

import {body} from 'express-validator';
import validation from "../middleware/validation.js";

const router = new Router();
router.post("/pages/create",
    body('name').notEmpty().withMessage('Название страницы обязательно').bail().trim(),
    body('content').notEmpty().withMessage('HTML-контент страницы обязателен').bail(),
    validation, Controller.create);
router.post("/pages/:id/update",
    body('name').notEmpty().withMessage('Название страницы обязательно').bail().trim(),
    body('content').notEmpty().withMessage('HTML-контент страницы обязателен').bail(),
    validation, Controller.update);
router.get("/pages", Controller.getAll);
router.get("/pages/:id", Controller.getById);
export default router;
