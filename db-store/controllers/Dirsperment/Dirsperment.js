const dirspermentSchems = require("../../models/dirsperment-schems");
const productSchema = require("../../models/product-schema");
const shopSchema = require("../../models/shop-schema");

class Dirsperment {
  async createDirsperment(req, res) {
    try {
      const { disperseQuantity, date, shopID, productID, note } = req.body;

      // Validate required fields
      console.log(disperseQuantity, date, shopID, productID, note);
      if (!productID || !disperseQuantity || !shopID) {
        return res.status(400).json({
          status: "error",
          message: "Please fill in all required fields",
        });
      }

      // Find product and shop by ID
      const product = await productSchema.findById(productID);
      const shop = await shopSchema.findById(shopID);

      // Check if product and shop exist
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }

      if (!shop) {
        return res.status(404).json({
          status: "error",
          message: "Shop not found",
        });
      }

      // Update quantity in shop and product
      const updatedShopQuantity = shop.quantity + Number(disperseQuantity);
      const updatedProductQuantity =
        product.dueQuantity - Number(disperseQuantity);
      // Check if quantity is valid (i.e., not negative)
      if (updatedProductQuantity < 0) {
        return res.status(400).json({
          status: "error",
          message: "Insufficient quantity in product",
        });
      }

      // Update shop and product quantities
      const updatedProduct = await productSchema.findByIdAndUpdate(
        productID,
        { dueQuantity: updatedProductQuantity },
        { new: true }
      );
      console.log(updatedProduct);
      if (!Array.isArray(shop.product)) {
        shop.product = [];
      }
      console.log(shop);
      const updatedShop = await shopSchema.findByIdAndUpdate(
        shopID,
        {
          quantity: updatedShopQuantity,
          dueQuntity: updatedShopQuantity,
          $push: {
            product: {
              productId: updatedProduct._id,
              category: updatedProduct.category,
              subCategories: updatedProduct.subCategories,
              ml: updatedProduct.ml,
              shopQuntity: Number(disperseQuantity),
            },
          },
        },
        { new: true }
      );
      console.log(updatedShop);
      // Create dirsperment document
      const dirspermentData = {
        quantity: Number(disperseQuantity),
        updatedProduct,
        updatedShop,
        date: date,
        note: note,
        id: req.User.id,
      };
      const result = await dirspermentSchems.create(dirspermentData);

      if (!result) {
        return res.status(500).json({
          status: "error",
          message: "Failed to create dirsperment",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Dirsperment created successfully",
        result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async dirspermentList(req, res) {
    try {
      const result = await dirspermentSchems.find({
        status: true,
        id: req.User.id,
      });

      if (!result) {
        return res.status(500).json({
          status: "error",
          message: "Dirsperments is not found",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Dirsperments founed",
        result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

module.exports = new Dirsperment();
