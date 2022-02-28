import { response } from "express";
import User from "./User.js";


class UserController {
    async create(req, res) {
        try {
            const { image, name, surname, father_name, email, password } = req.body;
            const founded = await User.findOne({ "email": email }).exec();
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
     login(req, res) {
        try {
            const { email, password } = req.body;
            const the_user =  User.findOne({ "email":email });
            console.log({email,password});
            console.log(the_user.name);
            // if(the_user){
            //     console.log(the_user.email);
            // }
            // else{
            //     console.log("Почему не работате");
            // }
            res.status(200);
        } catch (error) {
            console.log("User login error:");
            console.log(error);
            res.status(500).json(error);
        }
    }
}

export default new UserController();
