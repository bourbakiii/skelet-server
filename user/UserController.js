import User from "./User.js";
import Code from "../code/Code.js";
import nodemailer from "nodemailer";
import FileService from "../services/FilesService.js";
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
      let image_name = null;
      if (req.files && req.files["image"]) {
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
      Code.create({ user_id: user.id, code });
      await transporter.sendMail({
        from: "Сайт-скелет",
        to: email,
        subject: "Ваш код для верификации на сайте-скелете:",
        html: `Ваш <i>код</i>:<h3>${code}</h3>
          <br/> (внешний вид письма будет на выбор заказчика)`,
      });
      user.token = get_aphabet(35);
      user.save();
      res.status(200).json(user);
    } catch (error) {
      console.log("User create error:");
      console.log(error);
      return res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const { id, name, surname, father_name, email } = req.body;
      let user = await User.findByIdAndUpdate(id, {
        name,
        surname,
        father_name,
        email,
      }).catch((error) => {
        return res
          .status(404)
          .json({ message: "Пользователь не найден", error });
      });
      if (user && req.files && req.files["image"]) {
        console.log("зачем ты еще тут");
        if (user.image != null) FileService.delete(user.image, "images");
        user.image = FileService.save(req.files["image"], "images");
        user.save();
      }
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
      let validation_errors = { email: null,password: null};
      if(!email) validation_errors.email = 'Адрес электоронной почты обязателен';
      if(!password) validation_errors.password = 'Пароль обязателен';
      if(validation_errors.email||validation_errors.password) return res.status(422).json({success:false, validation_errors});
      User.findOne({ email }, (err, user) => {
        if (err)
          return res
            .status(500)
            .json({ success:false, general_message: "Возникла ошибка, попробуйте позже" });
        if (!user)
          return res
            .status(404)
            .json({ success:false, general_message: "Неверный адрес электронной почты и/или пароль" });
        user.verifyPassword(password, (err, valid) => {
          if (err)
            return res.status(500).json({ success:false, general_message:"Возникла ошибка, попробуйте позже"});
          else if (valid) {
            user.token = get_aphabet(35);
            user.save();
            return res.status(200).json(user);
          } else
            return res.status(404).json({
              success: false,
              general_message: "Неверный адрес электронной почты и/или пароль",
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
      if (!id)
        return res.status(422).json({ message: "ID пользователя не передан" });
      let user = await User.findByIdAndDelete(id).exec();
      if (user.image != null) FileService.delete(user.image, "images");
      return res.status(200).send();
    } catch (error) {
      console.log("User deleting error:");
      console.log(error);
      res
        .status(500)
        .json(
          Object.assign(error, { message: "Ошибка при удалении пользователя" })
        );
    }
  }
  async verify(req, res) {
    try {
      const id = req.params.id;

      let user = await User.findByIdAndUpdate(id, { verification: true })
        .exec()
        .then(() => {
          return res.status(200).send();
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ message: `Не удалось верифицировать пользователя`, error })
            .send();
        });
    } catch (error) {
      console.log("User verify error:");
      console.log(error);
      return res.status(500).json(error);
    }
  }
}

export default new UserController();
