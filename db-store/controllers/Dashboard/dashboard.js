// const { status } = require("express/lib/response");
const { status } = require("express/lib/response");
const productSchema = require("../../models/product-schema");
const salesSchema = require("../../models/sales-schema");
const moment = require("moment");
const shopSchema = require("../../models/shop-schema");

class Dashboard {
  async dashboard(req, res) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    console.log("startDate:", startDate, "Type:", typeof startDate);
    console.log("endDate:", endDate, "Type:", typeof endDate);
    try {
      console.log("Starting process...");

      const dataPFound = await productSchema.find({ status: true });
      let finalResultP = [];

      if (dataPFound && dataPFound.length > 0) {
        const purchaseData = await productSchema.aggregate([
          {
            $match: {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
              status: true, // Ensure the status is true
              id:req.User.id
            },
          },
        ]);

        if (purchaseData.length === 0) {
          return res.status(200).json({
            status: "error",
            message: "No purchase data found for the specified date range.",
          });
        }

        const purchaseResult = {};
        purchaseData.forEach((ele) => {
          const monthName = moment(ele.date, "MM/DD/YYYY").format("MMMM");
          if (!purchaseResult[monthName]) {
            purchaseResult[monthName] = {
              monthName: monthName,
              dueQuantity: 0,
              date: ele.date,
            };
          }
          purchaseResult[monthName].dueQuantity += ele.dueQuantity;
        });

        finalResultP = Object.values(purchaseResult);
        console.log("Purchase Data Processed:", finalResultP);
      } else {
        console.log("No purchases found.");
      }

      const dataSFound = await salesSchema.find({ status: true });
      let finalResultS = [];

      if (dataSFound && dataSFound.length > 0) {
        const salesData = await salesSchema.aggregate([
          {
            $match: {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
              status: true, // Ensure the status is true
              id:req.User.id
            },
          },
        ]);

        if (salesData.length === 0) {
          return res.status(200).json({
            status: "error",
            message: "No sales data found for the specified date range.",
          });
        }

        const salesDataResult = {};
        salesData.forEach((ele) => {
          const monthName = moment(ele.date, "MM/DD/YYYY").format("MMMM");
          if (!salesDataResult[monthName]) {
            salesDataResult[monthName] = {
              monthName: monthName,
              dueQuantity: 0,
              date: ele.date,
            };
          }
          salesDataResult[monthName].dueQuantity += ele.salesQuntity;
        });

        finalResultS = Object.values(salesDataResult);
        console.log("Sales Data Processed:", finalResultS);
      } else {
        console.log("No sales found.");
      }

      if (finalResultP.length === 0 && finalResultS.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "No data found for purchases or sales.",
        });
      }

      const result = [];

      // Loop through Purchase Data
      finalResultP.forEach((purchase) => {
        // Find the corresponding sales data with the same monthName
        const sales = finalResultS.find(
          (sale) => sale.monthName === purchase.monthName
        );

        if (sales) {
          // If a matching month is found in sales, merge them
          result.push({
            monthName: purchase.monthName,
            purchaseQ: purchase.dueQuantity,
            salesQ: sales.dueQuantity,
          });
        } else {
          // If no matching month is found in sales, push only the purchase data
          result.push({
            monthName: purchase.monthName,
            purchaseQ: purchase.dueQuantity,
            salesQ: 0, // No sales data for this month
          });
        }
      });

      // Loop through Sales Data to add any months that are not in Purchase Data
      finalResultS.forEach((sale) => {
        const purchase = finalResultP.find(
          (purchase) => purchase.monthName === sale.monthName
        );

        if (!purchase) {
          // If no matching month is found in purchases, push only the sales data
          result.push({
            monthName: sale.monthName,
            purchaseQ: 0, // No purchase data for this month
            salesQ: sale.dueQuantity,
          });
        }
      });

      console.log(result);

      res.status(200).json({
        status: "success",
        message: "Data found",
        result,
      });
    } catch (error) {
      if (!res.headersSent) {
        res.status(500).json({ success: false, message: "An error occurred" });
      } else {
        console.error("Headers already sent:", error);
      }
    }
  }
  async cardDetails(req, res) {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    console.log(startDate, endDate);
    try {
      const dataPFound = await productSchema.find({ status: true });
      if (dataPFound && dataPFound.length > 0) {
        var purchaseData = await productSchema.aggregate([
          {
            $match: {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
              status: true, // Ensure the status is true
              id:req.User.id
            },
          },
          {
            $group: {
              _id: null, // Group all documents together
              totalPurchase: { $sum: "$dueQuantity" }, // Sum the dueQuantity field
            },
          },
        ]);

        if (purchaseData.length === 0) {
          return res.status(200).json({
            status: "error",
            message: "No purchase data found for the specified date range.",
          });
        }
        console.log(purchaseData);
      } else {
        console.log("No purchases found.");
      }

          
      const dataSFound = await salesSchema.find({ status: true , });
      if (dataSFound && dataSFound.length > 0) {
        var salesData = await salesSchema.aggregate([
          {
            $match: {
              date: {
                $gte: startDate,
                $lte: endDate,
              },
              status: true, // Ensure the status is true
              id:req.User.id
            },
          },
          {
            $group: {
              _id: null, // Group all documents together
              totalSales: { $sum: "$salesQuntity" }, // Sum the dueQuantity field
            },
          },
        ]);

        if (salesData.length === 0) {
          return res.status(200).json({
            status: "error",
            message: "No sales data found for the specified date range.",
          });
        }
        console.log(salesData);
      } else {
        console.log("No sales found.");
      }

      res.status(200).json({
        status: "success",
        message: "sales or purchase found",
        result: [purchaseData[0], salesData[0]],
      });
    } catch (error) {
      return res.status(404).json({
        status: "error",
        message: "An error occurred",
      });
    }
  }
  async allShop(req,res){
    console.log(req.User);
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    const shopdetails = await shopSchema.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
          status: true, // Ensure the status is true
          id:req.User.id
        },
      },
    ])

    if (shopdetails) {
      res.status(200).json({
        status: "success",
        message: "Shop found in this range",
        shopdetails
      });
    } else {
      return res.status(404).json({
        status: "error",
        message: "Shop is not found",
      });
    }
  }
}
module.exports = new Dashboard();
