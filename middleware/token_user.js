// import User from "../user/User.js";
// export default function permission_middleware(req, res, next) {
//   if (!req.headers.authorization)
//     return res.status(404).json({ message: "Токен не передан" });
//   const token = req.headers.authorization.substring(7);
//   User.findOne({ token })
//     .exec()
//     .then((user) => {
//       if (user) next();
//       else res.status(404).json({ message: "Не удалось найти пользователя" });
//     });
// }
