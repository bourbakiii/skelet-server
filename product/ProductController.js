import { response } from './../response.js';
import { connection } from '../сonnection.js';
import FileService from '../FileService.js';


class ProductController {

    async search(req, res) {
        const { keyword, category_id } = req.query;
        console.log(123);
        return connection.query(`SELECT * FROM products WHERE
            (name LIKE '%${keyword}%' ${category_id ? 'AND category_id = ' + category_id : ''})`, (error, result) => {
            if (error) return response.error({
                status: 500, data: { message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error }
            }, res);
            return response.success(result.map(el => Object.assign(el, { description: null })), res);
        });
    }



    async create(req, res) {
        const { name, variations, description = null } = req.body;
        const image_name = FileService.generateName();
        return connection.query(`INSERT INTO products(name,variations, description, image) VALUES ('${name}', '${variations}', '${description}', '${image_name}')`, (error, result) => {
            if (error) return response.error({
                status: 500, data: { message: 'Кажется, что-то пошло не так, попробуйте позже (1)', error }
            }, res);
            if (req.files.image) FileService.save(req.files.image, 'products', image_name);
            return response.success(null, res);
        });
    }

    async update(req, res) {
        const { name, variations, description = null } = req.body;
        const image_name = FileService.generateName();
        return connection.query(`UPDATE INTO products(name,variations, description, image) VALUES ('${name}', '${variations}', ${description}, '${image_name}')`, (error, result) => {
            if (error) return response.error({
                status: 500, data: { message: 'Кажется, что-то пошло не так, попробуйте позже', error }
            }, res);
            const { image } = req.files;
            FileService.save(image, 'products', image_name);
            return response.success(null, res);
        });
    }

    async getAll(req, res) {
        return connection.query(`SELECT * FROM products`, (error, result) => {
            if (error) return response.error({
                status: 500, data: { message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error }
            }, res);
            return response.success(result.map(el => Object.assign(el, { description: null })), res);
        });
    }

    async getWithoutCategory(req, res) {
        return connection.query(`SELECT * FROM products WHERE category_id = null`, (error, result) => {
            if (error) return response.error({
                status: 500, data: { message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error }
            }, res);
            return response.success(result.map(el => Object.assign(el, { description: null })), res);
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
                status: 500, data: { message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error }
            }, res);
            if (!result.length) return response.notFounded({ message: "Не удалось найти продукт" }, res);
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
                status: 500, data: { message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error }
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
                status: 500, data: { message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error }
            }, res);
            return response.success(null, res);
        });
    }

    async images(req, res) {
        // FileService.save(req.files["image"]);
        console.log(Object.keys(req));
        response.success({ kill: Object.keys(req) }, res);
    }

    upload(req, res) {
        console.log("the req,");
        console.log(req.body)
        console.log(req.files);
        console.log(req.file);
    }
}

export default new ProductController();
