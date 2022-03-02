import User from "./User.js";
import mongoose_bcrypt from 'mongoose-bcrypt';


class UserController {
    async create(req, res) {
        try {
            const { image, name, surname, father_name, email, password } = req.body;
            const founded = await User.findOne({ "email": email }).exec();
            if (founded) res.status(409).json({ message: 'Пользователь с таким адресом электронной почты уже зарегистрирован' });
            const user = await User.create({ image, name, surname, father_name, email, password });
            res.status(200).json(user);
        } catch (error) {
            console.log("User create error:");
            console.log(error);
            res.status(500).json(error);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            User.findOne({ email}, function (err, user) {
                if (err) return res.status(500).json({message:'Возникла ошибка, попробуйте позже'});
                if (!user) return res.status(404).json({ message: "Неверный адрес электронной почты и/или пароль" })
                user.verifyPassword(password, function (err, valid) {
                    if (err) return res.status(500).json('Возникла ошибка, попробуйте позже');
                    else if (valid) 
                         return res.status(200).json(user);
                    else return res.status(404).json({ message: "Неверный адрес электронной почты и/или пароль" })
                })
            });
        } catch (error) {
            console.log("User login error:");
            console.log(error);
            res.status(500).json(error);
        }
    }
    async getAll(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new UserController();
