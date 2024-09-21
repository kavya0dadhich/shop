const dirspermentSchems = require("../../models/dirsperment-schems");
const productSchema = require("../../models/product-schema");
const salesSchema = require("../../models/sales-schema");
const shopSchema = require("../../models/shop-schema");

class Shop {
  async createShop(req, res) {
    const { shopName, address, dueQuntity, quantity, date, product } = req.body;
    try {
      const data = {
        shopName,
        address,
        quantity,
        dueQuntity: quantity,
        date: date,
        product,
        id: req.User.id,
      };
      const result = await shopSchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Shop not created",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Shop created successfully",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
      console.log("try is not working");
    }
  }
  async shopList(req, res) {
    try {
      const result = await shopSchema.find({ status: true, id: req.User.id });
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Shops is not find",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Shops is find successfully",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
      console.log("try is not working");
    }
  }
  async shopDelete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: "error",
        message: "Id is required",
      });
    }

    try {
      // Update the shop
      const ShopFindById = await shopSchema.findByIdAndUpdate(
        id,
        {
          quantity: 0,
          dueQuantity: 0, // corrected typo
        },
        { new: true } // return the updated document
      );

      if (!ShopFindById) {
        return res.status(404).json({
          status: "error",
          message: "Shop record not found",
        });
      }
      try {
        if (ShopFindById.product) {
          for (const ele of ShopFindById.product) {
            try {
              if (ele.productId) {
                const currentProduct = await productSchema.findById(
                  ele.productId
                );

                if (currentProduct) {
                  const newDueQuantity =
                    Number(currentProduct.dueQuantity) +
                    Number(ele.shopQuntity);

                  await productSchema.findByIdAndUpdate(
                    ele.productId,
                    { dueQuantity: newDueQuantity },
                    { new: true }
                  );
                } else {
                  console.log(`Product with ID ${ele.productId} not found`);
                }
              }
            } catch (err) {
              console.error(
                `Error updating product with ID ${ele.productId}:`,
                err.message
              );
            }
          }
          try {
            const dirspermentData = await dirspermentSchems.updateMany(
              { "updatedShop._id": new mongoose.Types.ObjectId(id) },
              { $set: { status: false } }
            );
          } catch (error) {
            console.log(error);
          }

          // Update salesSchema
          try {
            const salesData = await salesSchema.updateMany(
              { "updatedShopAll._id": new mongoose.Types.ObjectId(id) },
              { $set: { status: false } }
            );
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }

      return res.status(200).json({
        status: "success",
        message: "Shop record deleted successfully",
      });
    } catch (error) {
      console.error("Internal Server Error:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Internal Server error",
      });
    }
  }
  async getShopDataById(req, res) {
    const { id } = req.body;
    if (!id) {
      return res.json(404, {
        status: "error",
        message: "Shop id is not found",
      });
    }
    try {
      const result = await shopSchema.findById(id);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "Shop is not find",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Shop is find successfully",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
    }
  }
}
module.exports = new Shop();