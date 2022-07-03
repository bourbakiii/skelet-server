// import User from "./User.js";
// import Code from "../code/Code.js";
import nodemailer from "nodemailer";
import {body, validationResult} from 'express-validator';

import {response} from './../response.js';

// import FileService from "../services/FilesService.js";
import {connection} from "../сonnection.js";

import {parseBearer} from "../helper.js";
import bcrypt from "bcrypt";

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "gabisov05@gmail.com",
        pass: "8236251telef",
    },
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

        const {name, second_name, father_name, email, phone, password} = req.body;

        return bcrypt.genSalt(10, function (err, salt) {
            if (err) return response.error({
                status: 500,
                data: {message: 'При хешировании возникла проблема, попробуйте позже', err: err}
            }, res);
            return bcrypt.hash(`${password}`, salt, function (error, hash) {
                if (error) return response.error({
                    status: 500,
                    data: {message: 'При хешировании возникла проблема, попробуйте позже', error}
                }, res);

                return connection.query(`INSERT INTO users(name,second_name,father_name,email, phone,password) VALUES ('${name}','${second_name}', '${father_name}', '${email}', '${phone}', '${hash}')`, (error, result) => {
                    console.log(error, result);
                    if (error) return response.error({
                        status: 500,
                        data: {message: 'Кажется, что-то пошло не так, попробуйте позже', error}
                    }, res);




                    return response.success(null, res);
                });
            });

        });


    }


    async getAll(req, res) {
        return connection.query(`SELECT * FROM users`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            return response.success(result, res);
        });
    }

    async getById(req, res) {
        if (req.params.id) return response.validationErrors({
            validation_fields: {
                id: 'Не передан ID пользователя'
            }
        }, res);

        return connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            if (!result.length) return response.notFounded({message: "Не удалось найти пользователя"}, res);
            return response.success(result, res);
        });
    }

    async logout(req, res) {
        const header_token = parseBearer(req.headers.authorization);
        if (!header_token) return response.unathorized(res);
        return connection.query(`UPDATE users SET token = null WHERE token = '${header_token}'`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
            }, res);
            if (!result?.changedRows) return response.notFounded({message: "Не удалось найти пользователя"}, res);
            return response.success(null, res);
        });


        //
        // return connection.query(`SELECT * FROM users WHERE id = ${req.params.id}`, (error, result) => {
        //     if (error) return response.error({
        //         status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
        //     }, res);
        //     if (!result.length) return response.notFounded({message: "Не удалось найти пользователя"}, res);
        //     return response.success(result, res);
        // });

    }


}

export default new UserController();