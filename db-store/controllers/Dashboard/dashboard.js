const productSchema = require("../../models/product-schema");

class Dashboard {
  async dashboard(req, res) {
    try {
      const startDate = "08/01/2024";
      const endDate = "08/25/2024";

      const result = await productSchema.aggregate([
        {
          $match: {
            date: {
              $gte: startDate, // Greater than or equal to startDate
              $lte: endDate, // Less than or equal to endDate
            },
          },
        },
      ]);
      console.log(result);
      if (result.length > 0) {
        res.status(200).json({
          status: "success",
          message: "data found",
          data: result, // You can send the result as well if needed
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "data not found",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "catch error",
        message: error.message,
      });
    }
  }
}
module.exports = new Dashboard();
