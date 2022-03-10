import Product from "./Product.js";
import Category from "../category/Category.js";

class ProductController {
  async create(req, res) {
    try {
      const { image, name, description, price, discount_price, active, stock } =
        req.body;
      const product = await Product.create({
        image,
        name,
        description,
        price,
        discount_price,
        active,
        stock,
      });
      res.status(200).json(product);
    } catch (error) {
      console.log("Product create error:");
      console.log(error);
      res.status(500).json(error);
    }
  }
  async getAll(req, res) {
    try {
      const products = await Product.find();
      let categories = new Array();
      await products.forEach(element=>{
      })
      return res.json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(500).json({ message: "ID продукта не указан" });
      const products = await Product.findById(id);
      return res.json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async update(req, res) {
    try {
      const product = req.body;
      if (!product.id)
        return res.status(404).json({ message: "ID продукта не указан" });
      const updatedProduct = await Post.findByIdAndUpdate(product.id, product, {
        new: true,
      });
      return res.json(updatedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(404).json({ message: "ID продукта не указан" });
      const product = await Product.findByIdAndDelete(id);
      return res.json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new ProductController();
