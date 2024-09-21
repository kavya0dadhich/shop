const productSchema = require("../../models/product-schema");
const OstockSchema = require("../../models/oshock-schema");
// const totalStockSchema = require("../../models/totalStock-schema");

class TotalStock {
  //   async totalStockList(req, res) {
  //     try {
  //       // Fetch the opening stock and purchased stock data from your database
  //       const openingStock = await OstockSchema.find({ status: true });
  //       const purchasedStock = await productSchema.find({ status: true });

  //       // Initialize an array to store the updated stock data
  //       const totalStock = [];
  //       let matchFound = false;
  //       console.log("openingStock", openingStock);
  //       console.log("purchasedStock", purchasedStock);

  //       // Iterate over the opening stock items
  //       openingStock.forEach((ostock) => {
  //         // Find all products with the same category
  //         const categoryMatches = purchasedStock.filter(
  //           (product) =>
  //             product.category.categoryName === ostock.category.categoryName
  //         );
  //         console.log(categoryMatches);
  //         console.log(categoryMatches,"categoryMatches");
  //         if (categoryMatches.length > 0) {
  //           // Find a product within the category matches that also matches the brand name
  //           const brandMatch = categoryMatches.find(
  //             (product) => product.brandName.name === ostock.brandName.name
  //           );
  //           console.log(brandMatch,"brandMatch");
  //           if (brandMatch) {
  //             // If a match is found for both category and brandName, combine the quantities
  //             matchFound = true;
  //             const updatedQuantity =
  //               ostock.brandName.brandQuantity + brandMatch.brandName.brandQuantity;
  //             console.log(updatedQuantity);
  //             // Create a new JSON object with the updated stock
  //             const updatedProduct = {
  //               ...brandMatch._doc, // Use brandMatch._doc to copy all fields from brandMatch
  //               brandQuantity: updatedQuantity,
  //             };

  //             totalStock.push(updatedProduct);
  //           }
  //         }

  //         // If no brand match found but a category match exists, or if no matches are found
  //         if (!matchFound) {
  //           // Add the original opening stock item to the total stock
  //           totalStock.push(ostock);
  //             console.log(ostock,"ostock");
  //         }
  //       });

  //       // If no matches were found for any item, return all opening stock products
  //       if (!matchFound) {
  //         return res.json(openingStock);
  //       }

  //       // Respond with the total stock data (either combined quantities or just opening stock)
  //       res.json(totalStock);
  //     } catch (error) {
  //       // Handle any errors
  //       console.error("Error fetching total stock:", error);
  //       res.status(500).json({ error: "Failed to fetch total stock" });
  //     }
  //   }
  async totalStockList(req, res) {
    try {
      // Fetch the opening stock and purchased stock data from your database
      const openingStock = await OstockSchema.find({});
      const purchasedStock = await productSchema.find({});

      // Initialize an array to store the updated stock data
      const totalStock = [];

      // Flag to track if at least one match is found
      let matchFound = false;

      // Iterate over the purchased stock items
      purchasedStock.forEach((pstock) => {
        // Find all opening stock items with the same category
        const categoryMatches = openingStock.filter(
          (ostock) =>
            ostock.category.categoryName === pstock.category.categoryName
        );

        if (categoryMatches.length > 0) {
          // Now, check for brand name match within the matched category
          const brandMatch = categoryMatches.find(
            (ostock) =>
              ostock.brandName.name === pstock.brandName.name &&
              ostock.brandName.Type === pstock.brandName.Type
          );

          if (brandMatch) {
            // If a match is found for both category and brandName, combine the quantities
            matchFound = true;
            const updatedQuantity =
              brandMatch.brandName.brandQuantity +
              pstock.brandName.brandQuantity;

            // Create a new JSON object with the updated stock
            const updatedProduct = {
              ...pstock._doc, // Copy all fields from pstock
              brandQuantity: updatedQuantity,
              dueBrandQuantity: 0,
            };

            totalStock.push(updatedProduct);
          } else {
            // If category matches but no brand match, push the original purchased stock item
            const Product = {
              ...pstock._doc, // Copy all fields from pstock
              brandQuantity: pstock.brandName.brandQuantity,
              dueBrandQuantity: pstock.brandName.brandQuantity,
            };
            totalStock.push(Product);
          }
        } else {
          // If no category match is found, push the purchased stock item as is
          const Product = {
            ...pstock._doc, // Copy all fields from pstock
            brandQuantity: pstock.brandName.brandQuantity,
            dueBrandQuantity: pstock.brandName.brandQuantity,
          };
          totalStock.push(Product);
        }
      });

      if (!totalStock) {
        res.status(404).json({
          status: "error",
          message: "Fail to fatch",
        });
      }
      res.status(200).json({
        status: "success",
        message: "Fatch data successfully",
        totalStock,
      });
    } catch (error) {
      // Handle any errors
      console.error("Error fetching total stock:", error);
      res.status(500).json({ error: "Failed to fetch total stock" });
    }
  }
}

module.exports = new TotalStock();
