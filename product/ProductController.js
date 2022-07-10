// import User from "./User.js";
// import Code from "../code/Code.js";
import nodemailer from "nodemailer";
import {body, validationResult} from 'express-validator';

import {response} from './../response.js';

// import FileService from "../services/FilesService.js";
import {connection} from "../сonnection.js";

import {parseBearer} from "../helper.js";
import bcrypt from "bcrypt";


const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com", service: "gmail",

    auth: {
        user: "gabisov05@gmail.com", pass: "wyqmyjcjpfeiyyzo",
    }, secure: true,
});

const users = [{id: 1, name: "Первый"}, {id: 2, name: "Второй"}]

// let alphabet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
//
// function get_aphabet(length) {
//     let letter = "";
//     for (let i = 0; i < length; i++) letter += alphabet[Math.floor(Math.random() * alphabet.length)];
//     return letter;
// }


class UserController {
    async create(req, res) {
        const {name, price, discount_price = null, variations = null, description = null} = req.body;

        connection.query(`INSERT INTO products(name,price,discount_price,variations, description) VALUES ('${name}',${price}, ${discount_price}, ${variations?variations:null}, ${description})`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: 'Кажется, что-то пошло не так, попробуйте позже', error}
            }, res);
            return response.success(null, res)
        });
    }

    async get(req, res) {
        return connection.query(`SELECT * FROM products`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            return response.success(result.map(el => Object.assign(el,{description: null})), res);
        });
    }
}

export default new UserController();
