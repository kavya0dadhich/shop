const dirspermentSchems = require("../../models/dirsperment-schems");
const productSchema = require("../../models/product-schema");
const salesSchema = require("../../models/sales-schema");
const shopSchema = require("../../models/shop-schema");
const uuid = require("uuid");

function generateInvoiceNumber() {
  return `INV-${uuid.v4().slice(0, 8)}`;
}
class Product {
  async createProduct(req, res) {
    const { category, brandName, invoice, date } = req.body;
    if (!category || !brandName) {
      return res.json(404, {
        status: "error",
        message: "fill the required fields",
      });
    }
    try {
      if (!invoice) {
        var invoiceGEN = generateInvoiceNumber();
      }
      const data = {
        invoice: invoiceGEN,
        date,
        category,
        brandName,
        id: req.User.id,
      };
      // const OstockSchema
      const result = await productSchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Product not created",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Product created successfully",
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
  async productList(req, res) {
    console.log(req.User);
    try {
      const result = await productSchema.find({
        status: true,
        id: req.User.id,
      });
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Product not founded",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Product founded",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: `${error.message}`,
      });
      console.log(error, "try is not working");
    }
  }
  async productDeleteById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        status: "error",
        message: "Id is required",
      });
    }

    try {
      // Update sales schema
      const Psales = await salesSchema.updateOne(
        {
          $or: [
            {
              typeOfSale: "Product",
              "updatedProductAll._id": new mongoose.Types.ObjectId(id),
            },
            {
              typeOfSale: "Shop",
              "updatedShopAll._id": new mongoose.Types.ObjectId(id),
            },
          ],
        },
        {
          $set: { status: false },
        }
      );
      // Step 1: Find the document in dirspermentSchema and retrieve the shop ID
      const dir = await dirspermentSchems.findOneAndUpdate(
        { "updatedProduct._id": new mongoose.Types.ObjectId(id) },
        { $set: { status: false } }, // ✔️ If the schema expects a number
        { new: true }
      );
      console.log(dir);
      if (dir) {
        const shopId = dir.updatedShop._id;

        // Step 2: Update the shop's quantity and dueQuantity to 0
        const shopUpdate = await shopSchema.updateOne(
          { _id: shopId },
          {
            $set: {
              quantity: 0,
              dueQuntity: 0,
              "product.0.shopQuntity": 0,
            },
          }
        );

        console.log("Shop update result:", shopUpdate);
      } else {
        console.log("No document found with the provided updatedProduct._id");
      }

      console.log("Update pipeline result:", dir);

      // Update product schema
      const result = await productSchema.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { status: false } },
        { new: true }
      );

      if (result || Psales || dir) {
        return res.status(200).json({
          status: "success",
          message: "Product record deleted successfully",
          Psales,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "Product record not deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  }
}
module.exports = new Product();
