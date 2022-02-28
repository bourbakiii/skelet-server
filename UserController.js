import User from "./User.js";

class UserController {
    async create(req, res) {
        try {
            const { image, name, surname, father_name, email, password } = req.body;
            const founded = await User.findOne({ "email": email }).exec();
            // Если пользователь найден возвращаем ошибку, иначе создаем его
            if (founded) {
              res.status(409).json({ message: 'Пользователь с таким адресом электронной почты уже зарегистрирован' });
            }
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
