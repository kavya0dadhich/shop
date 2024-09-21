const router = require("express").Router();
const Dashboard = require("../controllers/Dashboard/dashboard");
const Category = require("../controllers/Category/Category");
const authMiddleware = require("../middleware/middleware");
const Sales = require("../controllers/Sales/Sales");
const Shop = require("../controllers/Shop/Shop");
const ml = require("../controllers/ml/ml");
const Product = require("../controllers/Product/Product");
const UserCont = require("../controllers/UserCont");
const SubCategories = require("../controllers/SubCategories/SubCategories");
const Dirsperment = require("../controllers/Dirsperment/Dirsperment");
const Ostock = require("../controllers/Ostock/Ostock");
const TotalStock = require("../controllers/TotalStock/TotalStock");

// post apis
router.post("/createCategory", authMiddleware, Category.createCategory);
router.post("/createSubCategories", authMiddleware, SubCategories.createSubCategories);
router.post("/createProduct", authMiddleware, Product.createProduct);
router.post("/createML", authMiddleware, ml.createML);
router.post("/createShop", authMiddleware, Shop.createShop);
router.post("/login", UserCont.login);
router.post(
  "/createDirsperment",
  authMiddleware,
  Dirsperment.createDirsperment
);
router.post("/salesCreate", authMiddleware, Sales.salesCreate);
router.post("/dashboard", authMiddleware, Dashboard.dashboard);
router.post("/allShop", authMiddleware, Dashboard.allShop);
router.post("/cardDetails", authMiddleware, Dashboard.cardDetails);
router.post("/findUser", authMiddleware, UserCont.findUser);
router.post("/createRegister", UserCont.createRegister);
router.post("/OstockCreate", authMiddleware, Ostock.OstockCreate);

// get api
router.get("/shopList", authMiddleware, Shop.shopList);
router.get("/productList", authMiddleware, Product.productList);
router.get("/getShopDataById", authMiddleware, Shop.getShopDataById);
router.get("/categoryList", authMiddleware, Category.categoryList);
router.get("/ML_List", authMiddleware, ml.ML_List);
router.get("/SubCategorieslist", authMiddleware, SubCategories.SubCategorieslist);
router.get("/dirspermentList", authMiddleware, Dirsperment.dirspermentList);
router.get("/salesList", authMiddleware, Sales.salesList);
router.get("/OstockList", authMiddleware, Ostock.OstockList);
router.get("/totalStockList", TotalStock.totalStockList);

//delete api
router.delete(
  "/productDeleteById/:id",
  authMiddleware,
  Product.productDeleteById
);
router.delete("/salesDelete/:id", authMiddleware, Sales.salesDelete);
router.delete("/shopDelete/:id", authMiddleware, Shop.shopDelete);
router.delete("/subCategoriesDelete/:id", authMiddleware, SubCategories.subCategoriesDelete);
module.exports = router;


// update api
// router.put("/")