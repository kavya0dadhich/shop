const categorySchema = require("../models/category-schema");
const mlSchema = require("../models/ml-schema");
const productSchema = require("../models/product-schema");
const uuid = require("uuid");
const shopSchema = require("../models/shop-schema");
const userSchema = require("../models/user-schema");
const dirspermentSchems = require("../models/dirsperment-schems");
const salesSchema = require("../models/sales-schema");

function generateInvoiceNumber() {
  return `INV-${uuid.v4().slice(0, 8)}`;
}
class Allrouter {
  // category api
  async createCategory(req, res) {
    try {
      const date = {
        categoryName: req.body.categoryName,
        description: req.body.description,
        subCategories: req.body.subCategories,
        data: new Date(),
      };
      const result = await categorySchema.create(date);
      if (!result) {
        return res.json({
          status: "error",
          message: "Category is not created",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Category created successfully",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: `${error.message}`,
      });
      console.log(error, "try is not working!");
    }
  }
  async categoryList(req, res) {
    try {
      const result = await categorySchema.find();
      if (!result) {
        return res.json({
          status: "error",
          message: "Category not found",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "Category founded",
          result,
        });
      }
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: `${error.message}`,
      });
      console.log(error, "try is not working!");
    }
  }
  // sub category api
  async createSubCategories(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id) {
      return res.json(404, {
        status: "error",
        message: "ID is required",
      });
    }
    try {
      const category = await categorySchema.findById(id);
      if (!category) {
        return res.json(404, {
          status: "error",
          message: "Category is not exsit",
        });
      }
      const categoryWithSubcategory = { name, description };
      category.subCategories.push(categoryWithSubcategory);

      await category.save();
      return res.json(201, {
        status: "success",
        message: "Sub Category created successfully",
        category,
      });
    } catch (error) {
      return res.json(404, {
        status: "error",
        message: error.message,
      });
    }
  }
  // Product api
  async createProduct(req, res) {
    const {
      ml,
      quantity,
      category,
      subCategories,
      address,
      dueQuantity,
      invoice,
      date,
      status,
    } = req.body;
    if (!ml || !quantity || !category || !subCategories) {
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
        dueQuantity: quantity,
        address,
        ml,
        quantity,
        category,
        subCategories,
        status: true,
      };
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
      console.log(error, "try is not working");
    }
  }
  async productList(req, res) {
    try {
      const result = await productSchema.find({ status: true });
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
    const result = await productSchema.findOneAndUpdate(
      { _id: id },
      { $set: { status: false } },
      { new: true }
    );
    console.log(result);
    if (result) {
      res.json(200, {
        status: "success",
        message: "Product is deleted",
        result,
      });
    } else {
      res.json(404, {
        status: "error",
        message: "Product not deleted",
      });
    }
  }
  // ml api
  async createML(req, res) {
    const { ml, description } = req.body;
    if (!ml) {
      return res.json(404, {
        status: "error",
        message: "fill required fields",
      });
    }
    try {
      const data = {
        ml,
        description,
      };
      const result = await mlSchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "ml not created",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "ml created successfully",
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
  async ML_List(req, res) {
    try {
      const result = await mlSchema.find();
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "ml not found",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "ml founded",
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
  // shop api
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
      const result = await shopSchema.find();
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
      console.log("try is not working");
    }
  }
  //   user api
  async createUser(req, res) {
    const { email, password, role } = req.body;
    if (!role.length) {
      res.json(404, {
        status: "error",
        message: "role is required",
      });
    }
    if ((!email, !password, !role)) {
      return res.json(404, {
        status: "error",
        message: "Vaild email and password",
      });
    }

    try {
      const data = {
        email,
        password,
      };
      const result = await userSchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "user is not cerated",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "user cerated successfully",
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
  async createRegister(req, res) {
    const { userName, address, phoneNumber, email, password, gender, DOB } =
      req.body;
    if (!role.length) {
      res.json(404, {
        status: "error",
        message: "role is required",
      });
    }
    if ((!email, !password, !role)) {
      return res.json(404, {
        status: "error",
        message: "Vaild email and password",
      });
    }

    try {
      const data = {
        email,
        password,
      };
      const result = await userSchema.create(data);
      if (!result) {
        return res.json(404, {
          status: "error",
          message: "user is not cerated",
        });
      } else {
        return res.json(200, {
          status: "success",
          message: "user cerated successfully",
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
  // async createUser(req, res) {
  //   try {
  //     const result = await userSchema.find();
  //     if (!result) {
  //       return res.json(404, {
  //         status: "error",
  //         message: "users is not found",
  //       });
  //     } else {
  //       return res.json(200, {
  //         status: "success",
  //         message: "users founded",
  //         result,
  //       });
  //     }
  //   } catch (error) {
  //     return res.json(404, {
  //       status: "error",
  //       message: error.message,
  //     });
  //     console.log("try is not working");
  //   }
  // }
  // dirsperment api
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
              category: updatedProduct.category,
              subCategories: updatedProduct.subCategories,
              ml: updatedProduct.ml,
              shopQuntity:Number(disperseQuantity),
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
      const result = await dirspermentSchems.find();

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
  async salesCreate(req, res) {
    var { typeOfSale, productId, shopId, date, quantity, salesQuntity } =
      req.body;
    if (!typeOfSale || !salesQuntity || (!productId && !shopId)) {
      res.json(404, {
        status: "error",
        message: "fill the required fields",
      });
    }

    if (typeOfSale == "Shop") {
      const shop = await shopSchema.findById(shopId);
      if (!shop) {
        return res.status(404).json({
          status: "error",
          message: "Shop not found",
        });
      }
      if (Number(shop.dueQuntity) < Number(salesQuntity)) {
        return res.status(404).json({
          status: "error",
          message: "Sales quntity can not grater then shop quantity",
        });
      } else {
        const updatedShopQuantity = shop.dueQuntity - Number(salesQuntity);
        var updatedShopAll = await shopSchema.findByIdAndUpdate(
          shopId,
          { dueQuntity: updatedShopQuantity },
          { new: true }
        );
      }
    }
    if (typeOfSale == "Product") {
      const product = await productSchema.findById(productId);
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }
      if (Number(product.dueQuantity) < Number(salesQuntity)) {
        return res.status(404).json({
          status: "error",
          message: "Sales quntity can not grater then product quantity",
        });
      } else {
        const updatedProductQuantity =
          product.dueQuantity - Number(salesQuntity);
        var updatedProductAll = await productSchema.findByIdAndUpdate(
          productId,
          { dueQuantity: updatedProductQuantity },
          { new: true }
        );
      }
    }

    const data = {
      updatedProductAll,
      updatedShopAll,
      date,
      quantity,
      salesQuntity,
      typeOfSale,
    };
    const result = await salesSchema.create(data);
    if (!result) {
      res.json(404, {
        status: "error",
        message: "Sales did not processed",
      });
    } else {
      res.json(200, {
        status: "success",
        message: "Sales processed successfully",
        result,
      });
    }
  }
  async salesList(req, res) {
    try {
      const result = await salesSchema.find();
      if (!result) {
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
      res.json(404, {
        status: "error",
        message: error.message,
      });
    }
  }
}
module.exports = new Allrouter();
