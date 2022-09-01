// import User from "./User.js";
// import Code from "../code/Code.js";
import nodemailer from "nodemailer";

import {response} from './../response.js';

// import FileService from "../services/FilesService.js";
import {connection} from "../сonnection.js";

import {parseBearer} from "../helper.js";
import bcrypt from "bcrypt";


const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.mail.ru", service: "mail",
    auth: {
        user: "veve111111@mail.ru", pass: "1fctRCN45ntfzu39Pcv6",
    }, secure: true,
});


let alphabet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

function get_aphabet(length) {
    let letter = "";
    for (let i = 0; i < length; i++) letter += alphabet[Math.floor(Math.random() * alphabet.length)];
    return letter;
}


class UserController {
    async create(req, res) {
        const {name, second_name, father_name, email, phone, password} = req.body;

        return bcrypt.genSalt(10, function (err, salt) {
            if (err) return response.error({
                status: 500, data: {message: 'При хешировании возникла проблема, попробуйте позже', err: err}
            }, res);
            return bcrypt.hash(`${password}`, salt, async function (error, hash) {
                if (error) return response.error({
                    status: 500, data: {message: 'При хешировании возникла проблема, попробуйте позже', error}
                }, res);
                const generated_code = get_aphabet(5);

                return await transporter.sendMail({
                    from: '"The Idea project" <veve111111@mail.ru>',
                    to: email,
                    subject: "Ваш код для верификации:",
                    html: `Ваш <i>код</i>:<h3>${generated_code}</h3>`,
                }).then(() => {
                    return connection.query(`INSERT INTO users(name,second_name,father_name,email, phone,password) VALUES ('${name}','${second_name}', '${father_name}', '${email}', '${phone}', '${hash}')`, async (error, {insertId}) => {
                        if (error) return response.error({
                            status: 500, data: {message: 'Кажется, что-то пошло не так, попробуйте позже', error}
                        }, res);
                        await connection.query(`INSERT INTO codes(user_id, code) VALUES ('${insertId}','${generated_code}')`, (error, result) => {
                            return response.success(null, res)
                        })
                    });
                }).catch(error => {
                    return response.error({
                        status: 500, data: {
                            message: 'Кажется, что-то пошло не так при отправке письма на вашу почту, попробуйте позже',
                            error
                        }
                    }, res);
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
    }


    async verify(req, res) {
        const header_token = parseBearer(req.headers.authorization);
        if (!header_token) return response.unathorized(res);

        const {code} = req.body;


        return connection.query(`SELECT * FROM users WHERE token = '${header_token}' LIMIT 1`, (error, result) => {
            if (error) return response.error({
                status: 500,
                data: {message: "При поиске пользователя возникла проблема. Попробуйте позже", detail_error: error}
            }, res);
            if (!result.length) return response.error({
                status: 404,
                data: {message: "Пользователь не найден"}
            }, res);
            return connection.query(`DELETE FROM codes WHERE (code = '${code}' AND user_id = ${result[0].id})`, (error, result_of_code) => {
                if (error) return response.error({
                    status: 500,
                    data: {message: "При проверка кода возникла ошибка. Попробуйте позже", detail_error: error}
                }, res);
                if (result_of_code.affectedRows === 0) return response.error({
                    status: 401,
                    data: {message: "Код неверный"}
                }, res);
                else {
                    return connection.query(`UPDATE users SET verify = 1 WHERE  id = ${result[0].id}`, (error, result_of_change_user) => {
                        if (error) return response.error({
                            status: 500,
                            data: {
                                message: "При верификации пользователя возникла ошибка. Попробуйте позже",
                                detail_error: error
                            }
                        }, res);
                        return response.success(null, res);
                    });
                }

            })
        });
    }


    async login(req, res) {
        const {email, password} = req.body;
        return await connection.query(`SELECT * FROM users WHERE email = \'${email}\' LIMIT 1`, (error, result) => {
            if (error) return response.error({
                status: 500, data: {message: 'При проверке пользователя возникла проблема, попробуйте позже', err: err}
            }, res);
            if (!result.length) return response.error({
                status: 404, data: {message: 'Пользователь не найден'}
            }, res);
            result = result[0];
            bcrypt.compare(password, result.password, async (err, result_of_compare) => {
                if (err) return response.error({
                    status: 500, data: {message: 'При проверке пароля возникла проблема, попробуйте позже', err: err}
                }, res);
                if (result_of_compare) {
                    delete result.password;
                    delete result.token;
                    const token_to_return = get_aphabet(30);
                    connection.query(`UPDATE users SET token = \'${token_to_return}\' WHERE email = \'${email}\'`);
                    return response.success({user: result, token: token_to_return}, res);
                } else return response.error({
                    status: 401, data: {message: 'Неверный пароль', err: err}
                }, res);

            });
        })
    }
}

export default new UserController();
