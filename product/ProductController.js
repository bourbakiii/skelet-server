// import User from "./User.js";
// import Code from "../code/Code.js";
import nodemailer from "nodemailer";

import {response} from './../response.js';

// import FileService from "../services/FilesService.js";
import {connection} from "../сonnection.js";


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
        connection.query(`INSERT INTO products(name,price,discount_price,variations, description) VALUES ('${name}',${price}, ${discount_price}, '${variations?JSON.stringify(variations):null}', ${description})`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: 'Кажется, что-то пошло не так, попробуйте позже', error}
            }, res);
            return response.success(null, res)
        });
    }

    async getAll(req, res) {
        return connection.query(`SELECT * FROM products`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            return response.success(result.map(el => Object.assign(el, {description: null})), res);
        });
    }

    async get(req, res) {

        if (!req.params.id) return response.validationErrors({
            validation_fields: {
                id: 'Не передан ID продукта'
            }
        }, res);

        return connection.query(`SELECT * FROM products WHERE id = ${req.params.id}`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            if (!result.length) return response.notFounded({message: "Не удалось найти продукт"}, res);
            return response.success(result, res);
        });
    }

    async update(req, res) {
        if (!req.params.id) return response.validationErrors({
            validation_fields: {
                id: 'Не передан ID продукта'
            }
        }, res);

        let keys = Object.entries(req.body).map(el => {
            return `${el[0]} = '${el[1]}'`;
        });


        return connection.query(`UPDATE products SET ${keys} WHERE id = ${req.params.id}`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            return response.success(null, res);
        });
    }


    async delete(req, res) {
        if (!req.params.id) return response.validationErrors({
            validation_fields: {
                id: 'Не передан ID продукта'
            }
        }, res);

        let keys = Object.entries(req.body).map(el => {
            return `${el[0]} = '${el[1]}'`;
        });

        return connection.query(`DELETE FROM products WHERE id = ${req.params.id}`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            return response.success(null, res);
        });
    }

    async images(req,res){
        FileService.save(req.files["image"]);
        response.success(req.files,res);
    }
}

export default new UserController();
