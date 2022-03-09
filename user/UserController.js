import User from "./User.js";
import Code from "../code/Code.js";
import mongoose_bcrypt from "mongoose-bcrypt";
import nodemailer from "nodemailer";
import FileService from "../services/FilesService.js";
import * as fs from "fs";
let alphabet = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gabisov05@gmail.com",
    pass: "8236251telef",
  },
});

function get_aphabet(length) {
  let letter = "";
  for (let i = 0; i < length; i++)
    letter += alphabet[Math.floor(Math.random() * alphabet.length)];
  return letter;
}
class UserController {
  async create(req, res) {
    try {
      const { name, surname, father_name, email, password } = req.body;
      const founded = await User.findOne({ email: email }).exec();
      if (founded)
        return res.status(409).json({
          message:
            "Пользователь с таким адресом электронной почты уже зарегистрирован",
        });
      let image_name = "placeholder.png";
      if (req.files["image"]) {
        image_name = FileService.save(req.files["image"]);
      }
      const user = await User.create({
        image: image_name,
        name,
        surname,
        father_name,
        email,
        password,
      });
      let code = get_aphabet(5);
      Code.create({ user_email: email, code });
      await transporter.sendMail({
        from: "Сайт-скелет",
        to: email,
        subject: "Ваш код для верификации на сайте-скелете:",
        html: `Ваш <i>код</i>:<h3>${code}'</h3>
          <br/> (внешний вид письма будет на выбор заказчика)`,
      });
      return res.status(200).json(user);
    } catch (error) {
      console.log("User create error:");
      console.log(error);
      return res.status(500).json(error);
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
      return res.status(500).json(error);
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
      const { id } = req.params;
      if (!id)
        return res.status(422).json({ message: "ID пользователя не передан" });
      let user = await User.findOne({ id });
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(422).json({ message: "ID пользователя не передан" });
      User.findOne({_id: id}).exec(function(err, user){
        if(err) throw {message:'При удалении пользователя вощникла проблема'};
        if(!user)
          throw {message:'Пользователь не найден'};
        });
        
      // return res.status(200).json({'message':'deleted'});
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const { name, surname, father_name, email, password } = req.body;
      const founded = await User.findOne(
        { email: email },
        (error, user) => {}
      ).exec();
    } catch (error) {
      console.log("User update error");
      console.log(error);
      return res.code(500).json(error);
    }
  }
}

export default new UserController();
