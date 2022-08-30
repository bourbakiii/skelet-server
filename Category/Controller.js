import {response} from '../response.js';
import {connection} from '../сonnection.js';

class CategoryController {
    getAll(req, res) {
        return connection.query(`SELECT * FROM CATEGORIES`, (error, result) => {
            if (error) return response.error({
                status: 500,
                data: {message: 'Кажется, при получении категорий что-то пошло не так, попробуйте позже', error}
            }, res);
            return response.success(result, res)
        });
    }

    create(req, res) {
        const {name, products_attached} = req.body;
        return connection.query(`INSERT INTO categories(name) VALUES ('${name}')`, (error, {insertId}) => {
            if (error) return response.error({
                status: 500,
                data: {message: 'Кажется, при создании категории что-то пошло  не так, попробуйте позже', error}
            }, res);
            return connection.query(`UPDATE products SET category_id = ${insertId} WHERE ${products_attached.map(el => 'id = '+el).join(' OR ')}`, (error, result) => {
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

    // async create(req, res) {
    //     const {name, content} = req.body;
    //     return connection.query(`INSERT INTO pages(name, content) VALUES ('${name}', '${content}')`, (error, result) => {
    //         if (error) return response.error({
    //             status: 500, data: {message: 'Кажется, что-то пошло не так, попробуйте позже', error}
    //         }, res);
    //         return response.success(null, res)
    //     });
    // }

    // update(req, res) {
    //     if (!req.params.id) return response.validationErrors({
    //         validation_fields: {
    //             id: 'Не передан ID страницы'
    //         }
    //     }, res);
    //     const {name, content} = req.body;
    //     return connection.query(`UPDATE pages SET name = '${name}', content = '${content}' WHERE id = ${req.params.id}`, (error, result) => {
    //         if (error) return response.error({
    //             status: 500, data: {message: 'Кажется, что-то пошло не так, попробуйте позже', error}
    //         }, res);
    //         return response.success(null, res)
    //     });
    // }


    // getById(req, res) {
    //     if (!req.params.id) return response.validationErrors({
    //         validation_fields: {
    //             id: 'Не передан ID страницы'
    //         }
    //     }, res);

    //     return connection.query(`SELECT id,name,content FROM pages WHERE id = ${req.params.id} LIMIT 1`, (error, result) => {
    //         if (error) return response.error({
    //             status: 500, data: {message: "Кажется, что-то пошло не так. Попробуйте позже", detail_error: error}
    //         }, res);
    //         if (!result.length) return response.notFounded({message: "Не удалось найти cтраницу"}, res);
    //         return response.success(result[0], res);
    //     });
    // }
}

export default new CategoryController();
