import User from "./User.js";
import bcryptjs from 'bcryptjs';

class UserController {
    async create(req, res) {
        try {
            const { image, name, surname, father_name, email, password } = req.body;
            const user = await User.create({ image, name, surname, father_name, email, password });
            res.status(200).json(user);
        } catch (error) {
            console.log("User create error:");
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export default new UserController();
