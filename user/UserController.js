import User from "./User.js";
import mongoose_bcrypt from "mongoose-bcrypt";
let alphabet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

function get_aphabet(length) {
  let letter = "";
  for (let i = 0; i < length; i++)
    letter += alphabet[Math.floor(Math.random() * alphabet.length)];
  return letter;
}
class UserController {
  async create(req, res) {
    try {
      const { image, name, surname, father_name, email, password } = req.body;
      const founded = await User.findOne({ email: email }).exec();
      if (founded)
        res.status(409).json({
          message:
            "Пользователь с таким адресом электронной почты уже зарегистрирован",
        });
      const user = await User.create({
        image,
        name,
        surname,
        father_name,
        email,
        password,
      });
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
      User.findOne({ email }, (err, user) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Возникла ошибка, попробуйте позже" });
        if (!user)
          return res
            .status(404)
            .json({ message: "Неверный адрес электронной почты и/или пароль" });
        user.verifyPassword(password, (err, valid) => {
          if (err)
            return res.status(500).json("Возникла ошибка, попробуйте позже");
          else if (valid) {
            user.token = get_aphabet(35);
            user.save();
            return res.status(200).json(user);
          } else
            return res.status(404).json({
              message: "Неверный адрес электронной почты и/или пароль",
            });
        });
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
  async getOne(req, res) {
    try {
    //   const token = req.headers.authorization.substring(7, 100);
    //   let user = await User.find({ token, permission: "user" }).exec();
    //     return res.status(200).json(user).send();
    //   console.log("Сюда не дошел");
      //   // return res.status(403).json(user);
      //   console.log(user);
      //   if (!req.headers.authorization)
      //     return res.status(403).json({ message: "Токен не передан" });
      //   const who_questions = User.findOne(
      //     { token: token, permission: "user" },
      //     (err, user) => {
      //       if (err) res.status(500).json(error);
      //       if (!user)
      //         return res.status(403).json({ message: "В доступеп отказано" });
      //       return res.status(403).json({ message: "В доступеп отказано" });
      //     }
      //   );
      //   res.status(200).json({ message: "Founded" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
