import Code from "../code/Code.js";
export default function permission_middleware(req, res, next) {
    const id = req.params.id;
    const code = req.body.code;
  if (!id)
    return res
      .status(422)
      .json({ message: `ID пользователя не передан`, error });
      if (!code)
    return res
      .status(422)
      .json({ message: `Код не передан`, error });
  Code.findOne({ user_email: id, code }, )
    .exec()
    .then((code) => {
      if (code) next();
      else res.status(422).json({ message: "Неверный код" });
    }).catch(error=>{
        res.status(422).json({ message: "Неверный код" });
    });
}