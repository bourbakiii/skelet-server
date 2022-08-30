import {response} from '../response.js';
import {connection} from '../сonnection.js';

class CompilationController {
    getAll(req, res) {
        return connection.query(`SELECT * FROM COMPILATIONS`, (error, result) => {
            if (error) return response.error({
                status: 500,
                data: {message: 'Кажется, при получении подоборок что-то пошло не так, попробуйте позже', error}
            }, res);
            return response.success(result, res)
        });
    }

    create(req, res) {
        const {name, products_attached = []} = req.body;
        return connection.query(`INSERT INTO compilations(name) VALUES ('${name}')`, (error, {insertId}) => {
            if (error) return response.error({
                status: 500,
                data: {message: 'Кажется, при создании категории что-то пошло  не так, попробуйте позже', error}
            }, res);
            return connection.query("INSERT INTO compilations_attachment(compilation_id, product_id) VALUES" + products_attached.map(el => `('${insertId}','${el}')`), (error, result) => {
                if (error) return response.error({
                    status: 500,
                    data: {
                        message: 'Кажется, при связи продуктов с категорией что-то пошло  не так',
                        error
                    }
                }, res);
                return response.success({...result, insertId}, res)
            });
        });
    }

    async getById(req, res) {
        const {id} = req.params;
        const firstAction = new Promise(async (resolve, reject) => {
            await connection.query(`SELECT * FROM compilations WHERE id = '${id}'`, (error, result) => {
                if (error) reject({
                    status: 500,
                    data: {message: 'Кажется, при получении подборки что-то пошло не так, попробуйте позже', error}
                });
                if (result.length) resolve(result);
                else reject({error: 404, data: {message: "Подборка не найдена"}})
            });
        });
        const secondAction = new Promise(async (resolve, reject) => {
            await connection.query(`SELECT product_id FROM compilations_attachment WHERE compilation_id = '${id}'`, async (error, result) => {
                if (error) reject({
                    status: 500,
                    data: {
                        message: 'Кажется, при получении продуктов из подборки что-то пошло не так, попробуйте позже',
                        error
                    }
                });
                await connection.query(`SELECT * FROM products WHERE id IN (${result.map(el => el.product_id).join(', ')})`, async (error, result) => {
                    if (error) reject({
                        status: 500,
                        data: {
                            message: 'Кажется, при получении продуктов из подборки что-то пошло не так, попробуйте позже',
                            error
                        }
                    });
                    resolve(result);
                })
            });
        });
        await Promise.all([firstAction, secondAction])
            .then(([[{id, name}], products]) => response.success({id, name, products}, res))
            .catch(error => response.error(error, res));
    }

}

export default new

CompilationController();
