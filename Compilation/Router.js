import Router from "express";
import Controller from "./Controller.js";

import {body} from 'express-validator';
import validation from "../middleware/validation.js";

const router = new Router();
router.get("/compilations", Controller.getAll);
router.get("/compilations/:id", Controller.getById);
router.post("/compilations/create",
    body('name').notEmpty().withMessage('Название подборки обязательно').bail().trim(),
    validation, Controller.create);
export default router;
