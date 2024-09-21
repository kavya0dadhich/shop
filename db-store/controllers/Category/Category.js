const categorySchema = require("../../models/category-schema");
class Category {
    // category api
    async createCategory(req, res) {
      try {
        const date = {
          categoryName: req.body.categoryName,
          description: req.body.description,
          subCategories: req.body.subCategories,
        };
        const result = await categorySchema.create(date);
        if (!result) {
          return res.json({
            status: "error",
            message: "Category is not created",
          });
        } else {
          return res.json(200, {
            status: "success",
            message: "Category created successfully",
            result,
          });
        }
      } catch (error) {
        return res.json(404, {
          status: "error",
          message: `${error.message}`,
        });
        console.log(error, "try is not working!");
      }
    }
    async categoryList(req, res) {
      try {
        const result = await categorySchema.find();
        if (!result) {
          return res.json({
            status: "error",
            message: "Category not found",
          });
        } else {
          return res.json(200, {
            status: "success",
            message: "Category founded",
            result,
          });
        }
      } catch (error) {
        return res.json(404, {
          status: "error",
          message: `${error.message}`,
        });
      }
    }
}

module.exports = new Category();