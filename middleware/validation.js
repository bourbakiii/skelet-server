// import User from "../user/User.js";
import {body, validationResult} from 'express-validator';
import {response} from "../response.js";

export default function validation(req, res, next) {
    if (validationResult(req).errors.length) {
        return response.validationErrors(validationResult(req).errors.map(el => el = {
            'name': el.param,
            'message': el.msg,
            'given_value': el.value
        }), res);
    }

    next();
}
