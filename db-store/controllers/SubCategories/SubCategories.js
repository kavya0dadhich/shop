const SubCategorySchema = require("../../models/subCategory-schema");

class SubCategories {
  async SubCategorieslist(req, res) {
    try {
      const result = await SubCategorySchema.find({
        status: true,
        id: req.User.id,
      });
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Sub Category is not Created",
        });
      }

      return res.json(201, {
        status: "success",
        message: "Sub Category created successfully",
        result,
      });
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
    }
  }
  async createSubCategories(req, res) {
    const data = {
      name: req.body.name,
      description: req.body.description,
      id: req.User.id,
    };
    console.log("object");
    try {
      const result = await SubCategorySchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Sub Category is not Created",
        });
      }

      return res.json(200, {
        status: "success",
        message: "Sub Category created successfully",
        result,
      });
    } catch (error) {
      console.log(error.message);
      return res.json(404, {
        status: "error",
        message: error.message,

      });
    }
  }
  async subCategoriesUpdate(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(404, {
        status: "error",
        message: "ID is required",
      });
    }
    try {
      const data = {
        name: req.body.name,
        description: req.body.description,
        brandPrice: req.body.name,
      };
      const result = await SubCategorySchema.findByIdAndUpdate(
        { _id: id },
        { $set: data },
        { new: true } 
      );

      if (!result) {
        res.status(404).json({
          status: "error",
          message: "Can Not Update this Sub Category",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Sub Category Updated successfully",
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
  async subCategoriesDelete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.json(404, {
        status: "error",
        message: "ID is required",
      });
    }
    try {
      const result = await SubCategorySchema.findByIdAndUpdate(
        { _id: id },
        { $set: { status: false } },
        { new: true } // This ensures you get the updated document
      );
      console.log(result);
      if (!result) {
        res.status(404).json({
          status: "error",
          message: "Can Not Delete this Sub Category",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Sub Category Deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}

module.exports = new SubCategories();
