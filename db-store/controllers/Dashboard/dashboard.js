const { status } = require("express/lib/response");
const productSchema = require("../../models/product-schema");
const salesSchema = require("../../models/sales-schema");

class Dashboard {
  async dashboard(req, res) {
    if (!req.body.startDate || !req.body.endDate) {
      res.json(404, {
        status: "error",
        message: "Date is required",
      });
    }
    try {
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;

      const purchaseData = await productSchema.aggregate([
        {
          $match: {
            date: {
              $gte: startDate, // Greater than or equal to startDate
              $lte: endDate, // Less than or equal to endDate
            },
          },
        },
        {
          $group: {
            _id: {
              purchase: "$purchase",
              date: "$date"
            },
            // totalQuantity: { $sum: "$quantity" }
          }
        },
        {
          $sum: "$quantity"
        }
      ]);
      const salesData = await salesSchema.aggregate([
        {
          $match: {
            date: {
              $gte: startDate, // Greater than or equal to startDate
              $lte: endDate, // Less than or equal to endDate
            },
          },
        },
        {
          $group: {
            _id: {
              purchase: "sales",
              date: "$date",
              quantity: { $sum: "$quantity" },
            },
          },
        },
      ]);

      if (purchaseData.length > 0 || salesData.length > 0) {
        res.json(200, {
          status: "success",
          message: "data found",
          result: [salesData, purchaseData],
        });
      } else {
        res.json(404, {
          status: "error",
          message: "data not found",
        });
      }
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "An error occurred" });
      } else {
        console.error("Headers already sent:", error);
      }
    }
  }
}
module.exports = new Dashboard();
