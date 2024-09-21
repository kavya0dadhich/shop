const OstockSchema = require("../../models/oshock-schema");

class Ostock {
  async OstockCreate(req, res) {
    const { category, brandName } = req.body;
    if (!category || !brandName) {
      res.status(400).json({
        status: "error",
        message: "fill the required field",
      });
    }
    console.log("object");
    try {
      const data = {
        category,
        brandName,
        id: req.User.id,
      };
      const result = await OstockSchema.create(data);
      if (!result) {
        res.status(400).json({
          status: "error",
          message: "Open stock is not created",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Open stock is created",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Internal Server error",
      });
    }
  }
  async OstockList(req, res) {
    try {
      const result = await OstockSchema.find({
        status: true,
        id: req.User.id,
      });
      console.log(result);
      if (!result) {
        res.status(400).json({
          status: "error",
          message: "Open stock is not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Open stock is found",
        result,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Internal Server error",
      });
    }
  }
}
module.exports = new Ostock();
