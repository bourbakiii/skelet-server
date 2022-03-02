import User from "../user/User.js";
export default (req, res, next)=> {
    if(!req.headers.authorization) return res.status(404).json({"message":"Токен не передан"});
    const token = req.headers.authorization.substring(7);
    User.findOne({ token, permission: { $in: ["manager", "admin"] } })
      .exec()
      .then((user) => {
          if(user) next();
          else res.status(404).json({"message":"У вас нет прав"});
      });
  }

