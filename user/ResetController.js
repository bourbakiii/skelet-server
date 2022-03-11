import User from "./User.js";
import Code from "../code/Code.js";
import nodemailer from "nodemailer";
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
            res
            .status(422)
            .json({ success: false, message: "Адрес почты не передан" });
        const user = await User.findOne({ email }).exec();
        if (!user)
            res
            .status(404)
            .json({
                success: false,
                message: "Пользователь с таким адресом почты не зарегистрирован",
            });
        let code = get_aphabet(5);
        Code.findOneAndUpdate({ user_id: user.id, type: "reset" }, { code }, { upsert: true });
        await transporter.sendMail({
            from: "Сайт-скелет",
            to: email,
            subject: "Ваш код для восстановления пароля на сайте-скелете:",
            html: `Ваш <i>код</i>:<h3>${code}</h3>
          <br/> (внешний вид письма будет на выбор заказчика)`,
        });
        res.json({ success: true, message: "Код отправлен" });
    }
    async check(req, res) {
        const { email, code } = req.body;
        if (!email)
            res
            .status(422)
            .json({ success: false, message: "Адрес почты не передан" });
        if (!code)
            res.status(422).json({ success: false, message: "Код не передан" });
        if (code.length != 5)
            res
            .status(422)
            .json({ success: false, message: "Длина кода - 5 символов" });
        const user = await User.findOne({ email }).exec();
        if (!user)
            res
            .status(404)
            .json({
                success: false,
                message: "Пользователь с таким адресом почты не зарегистрирован",
            });
        const code_for_check = await Code.findOne({
            user_id: user.id,
            type: "reset",
        }).exec();
        if (!code_for_check)
            res
            .status(404)
            .json({ success: false, message: "Код для пользователя не найден" });
        if (code != code_for_check)
            res.status(422).json({ success: false, message: "Неверный код" });
        await transporter.sendMail({
            from: "Сайт-скелет",
            to: email,
            subject: "Смена пароля:",
            html: `Вы успешно сменили пароль на сайте-скелете
        <br/> (внешний вид письма будет на выбор заказчика)`,
        });
        return res.json({ success: true, message: "Код подтвержден" });
    }
}

export default new ResetController();