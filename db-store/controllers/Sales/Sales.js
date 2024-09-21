const productSchema = require("../../models/product-schema");
const shopSchema = require("../../models/shop-schema");



class Sales {
    /**
     * @api {post} /sales Create Sales
     * @apiName CreateSales
     * @apiGroup Sales
     * @apiParam {String} typeOfSale Type of Sale (Shop or Product)
     * @apiParam {String} [productId] Product ID (Required if typeOfSale is Product)
     * @apiParam {String} [shopId] Shop ID (Required if typeOfSale is Shop)
     * @apiParam {String} date Date of Sale
     * @apiParam {Number} quantity Quantity of Sale
     * @apiParam {Number} salesQuntity Sales Quantity
     * @apiSuccess {Object} result Sales Object
     * @apiError {Object} 404 Sales did not processed
     */
    async salesCreate(req, res) {
        const { typeOfSale, productId, shopId, date, quantity, salesQuntity } =
          req.body;
        if (!typeOfSale || !salesQuntity || (!productId && !shopId)) {
          return res.status(404).json({
            status: "error",
            message: "fill the required fields",
          });
        }
    
        let updatedQuantity;
        let entity;
        if (typeOfSale === "Shop") {
          entity = await shopSchema.findById(shopId);
          if (!entity) {
            return res.status(404).json({
              status: "error",
              message: "Shop not found",
            });
          }
          if (Number(entity.dueQuntity) < Number(salesQuntity)) {
            return res.status(404).json({
              status: "error",
              message: "Sales quntity can not grater then shop quantity",
            });
          }
          updatedQuantity = entity.dueQuntity - Number(salesQuntity);
        } else if (typeOfSale === "Product") {
          entity = await productSchema.findById(productId);
          if (!entity) {
            return res.status(404).json({
              status: "error",
              message: "Product not found",
            });
          }
          if (Number(entity.dueQuantity) < Number(salesQuntity)) {
            return res.status(404).json({
              status: "error",
              message: "Sales quntity can not grater then product quantity",
            });
          }
          updatedQuantity = entity.dueQuantity - Number(salesQuntity);
        }
    
        const data = {
          date,
          quantity,
          salesQuntity,
          typeOfSale,
          id: req.User.id,
        };
        if (entity) {
          data.updatedEntity = await entity.updateOne({
            dueQuantity: updatedQuantity,
          });
        }
        const result = await salesSchema.create(data);
        if (!result) {
          return res.status(404).json({
            status: "error",
            message: "Sales did not processed",
          });
        }
        res.json(200, {
          status: "success",
          message: "Sales processed successfully",
          result,
        });
      } 

      async salesList(req, res) {
        try {
          const result = await salesSchema.find({ status: true, id: req.User.id }, { __v: 0 });
          if (!result || result.length === 0) {
            res.json(404, {
              status: "error",
              message: "Sales not found",
            });
          } else {
            res.json(200, {
              status: "success",
              message: "Sales found",
              result,
            });
          }
        } catch (error) {
          res.json(500, {
            status: "error",
            message: error.message,
          });
        }
      }
      async salesDelete(req, res) {
        const { id } = req.params;
        if (!id) {
          return res.status(404).json({
            status: "error",
            message: "Id is required",
          });
        }
        try {
          const objectId = new mongoose.Types.ObjectId(id);
    
          // Perform the update operation
          const uSales = await salesSchema.findByIdAndUpdate(
            { _id: objectId },
            { $set: { status: false } },
            { new: true }
          );
          if (uSales.updatedShopAll) {
            const data = await shopSchema.findByIdAndUpdate(
              { _id: uSales.updatedShopAll._id },
              {
                $set: {
                  dueQuntity:
                    uSales.updatedShopAll.dueQuntity + uSales.salesQuntity,
                },
              },
              { new: true }
            );
          }
          console.log(uSales);
          if (uSales.updatedProductAll) {
            console.log("working");
            const data = await productSchema.findByIdAndUpdate(
              { _id: uSales.updatedProductAll._id },
              {
                $set: {
                  dueQuantity:
                    uSales.updatedProductAll.dueQuantity + uSales.salesQuntity,
                },
              },
              { new: true }
            );
          }
    
          if (!uSales) {
            res.status(404).json({
              status: "error",
              message: "Sales record not deleted successfully",
            });
          }
          res.status(200).json({
            status: "success",
            message: "Sales record deleted successfully",
          });
        } catch (error) {
          res.status(500).json({
            status: "error",
            message: "Internal server error",
          });
        }
      }
}

module.exports = new Sales();