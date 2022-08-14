import Router from "express";
import Controller from "./Controller.js";

import { body } from 'express-validator';
import validation from "../middleware/validation.js";

const router = new Router();
router.get("/categories", Controller.getAll);
router.post("/categories/create",
    body('name').notEmpty().withMessage('Название категории обязательно').bail().trim(),
    validation, Controller.create);
export default router;
