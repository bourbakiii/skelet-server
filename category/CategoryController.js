import Category from "./Category.js";

class CategoryController {
  async create(req, res) {
    try {
      const name = req.body.name;
      const founded = await Category.findOne({ name }).exec();
      if (founded)
        return res.status(409).json({
          message: "Категория с таким именем уже существует",
        });
      const category = await Category.create({ name });
      res.status(200).json(category);
    } catch (error) {
      console.log("Category create error:");
      console.log(error);
      res.status(500).json(error);
    }
  }
}

export default new CategoryController();
