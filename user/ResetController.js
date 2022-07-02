// import User from "./User.js";
import Code from "../code/Code.js";
import nodemailer from "nodemailer";
// import mongoose from "mongoose";
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
    const { email } = req.query;
    if (!email)
      return res
        .status(422)
        .json({ success: false, general_message: "Адрес почты не передан" });
    const user = await User.findOne({ email }).exec();
    if (!user)
      return res.status(404).json({
        success: false,
        general_message: "Пользователь с таким адресом почты не зарегистрирован",
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
    return res.json({ success: true, general_message: "Код отправлен" });
  }
  async check(req, res) {
    const { email, code } = req.body;
    if (!email)
      return res
        .status(422)
        .json({ success: false, general_message: "Адрес почты не передан" });
    if (!code)
      return res
        .status(422)
        .json({ success: false, general_message: "Код не передан" });
    if (code.length != 5)
      return res
        .status(422)
        .json({ success: false, general_message: "Длина кода - 5 символов" });
    const user = await User.findOne({ email }).exec();
    if (!user)
      return res.status(404).json({
        success: false,
        general_message: "Пользователь с таким адресом почты не зарегистрирован",
      });
    await Code.findOne({ user_email: user.email }, async (error, code_for_check) => {
      if (error) {
        return res
          .status(500)
          .json({ success: false, general_message: "При проверка кода возникла какая-то ошибка" });
      }
      if (!code_for_check)
        return res
          .status(404)
          .json({ success: false, general_message: "Код для пользователя не найден" });
      if (code != code_for_check.code)
        return res
          .status(422)
          .json({ success: false, general_message: "Неверный код" });
      await transporter.sendMail({
        from: "Сайт-скелет",
        to: email,
        subject: "Смена пароля:",
        html: `Вы успешно сменили пароль на сайте-скелете
        <br/> (внешний вид письма будет на выбор заказчика)`,
      });
      await Code.findByIdAndDelete(code_for_check.id);
      return res.json({ success: true, general_message: "Код подтвержден" });
    });
  }
  async reset(req, res) {
    const { email, password } = req.body;
    let validation_errors = { password:null }; if (!password) validation_errors.password = 'Пароль обязателен';
    if (!email) return res.status(422).json({ success: false, general_message: "Адрес почты не передан" });
    if (validation_errors.password) return res.status(422).json({ success: false, validation_errors });
    const user = await User.findOneAndUpdate({email},{password},{new:true}).exec();
    user.token = get_aphabet(35);
      user.save();
    return res.json({success:true,user});
  }

}

export default new ResetController();