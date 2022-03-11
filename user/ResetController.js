import User from "./User.js";
import Code from "../code/Code.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
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
class ResetController {
  async send(req, res) {
    const { email } = req.body;
    if (!email)
      return res
        .status(422)
        .json({ success: false, message: "Адрес почты не передан" });
    const user = await User.findOne({ email }).exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Пользователь с таким адресом почты не зарегистрирован",
      });
    let code = get_aphabet(5);
    await Code.findOneAndUpdate(
      { user_email: user.email },
      { code: code, type: "reset" },
      {
        upsert: true,
      }
    );
    await transporter.sendMail({
      from: "Сайт-скелет",
      to: email,
      subject: "Ваш код для восстановления пароля на сайте-скелете:",
      html: `Ваш <i>код</i>:<h3>${code}</h3>
          <br/> (внешний вид письма будет на выбор заказчика)`,
    });
    return res.json({ success: true, message: "Код отправлен" });
  }
  async check(req, res) {
    const { email, code } = req.body;
    if (!email)
      return res
        .status(422)
        .json({ success: false, message: "Адрес почты не передан" });
    if (!code)
      return res
        .status(422)
        .json({ success: false, message: "Код не передан" });
    if (code.length != 5)
      return res
        .status(422)
        .json({ success: false, message: "Длина кода - 5 символов" });
    const user = await User.findOne({ email }).exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Пользователь с таким адресом почты не зарегистрирован",
      });
    await Code.findOne({ user_email: user.email }, async (error, code_for_check) => {
      if(error){
        return res
          .status(500)
          .json({ success: false, message: "При проверка кода возникла какая-то ошибка" });
      }
      if (!code_for_check)
        return res
          .status(404)
          .json({ success: false, message: "Код для пользователя не найден" });
      if (code != code_for_check.code)
        return res
          .status(422)
          .json({ success: false, message: "Неверный код" });
      await transporter.sendMail({
        from: "Сайт-скелет",
        to: email,
        subject: "Смена пароля:",
        html: `Вы успешно сменили пароль на сайте-скелете
        <br/> (внешний вид письма будет на выбор заказчика)`,
      });
      return res.json({ success: true, message: "Код подтвержден" });
    });
  }
}

export default new ResetController();