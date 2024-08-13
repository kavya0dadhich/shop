const router = require('express').Router();
const Allrouter = require('../controllers/All-routers');
const Dashboard = require('../controllers/Dashboard/dashboard');


// post apis
router.post("/createCategory",Allrouter.createCategory);
router.post("/createCategory/:id/subCategories",Allrouter.createSubCategories);
router.post("/createProduct",Allrouter.createProduct);
router.post("/createML",Allrouter.createML);
router.post("/createShop",Allrouter.createShop);
router.post("/createUser",Allrouter.createUser);
router.post("/createDirsperment",Allrouter.createDirsperment);
router.post("/salesCreate",Allrouter.salesCreate);


// get api
router.get("/shopList",Allrouter.shopList);
router.get("/productList",Allrouter.productList);
router.get("/getShopDataById",Allrouter.getShopDataById);
router.get("/categoryList",Allrouter.categoryList);
router.get("/ML_List",Allrouter.ML_List);
router.get("/dirspermentList",Allrouter.dirspermentList);
router.get("/salesList",Allrouter.salesList);
router.get("/dashboard", Dashboard.dashboard);

//delete api
router.delete("/productDeleteById/:id",Allrouter.productDeleteById);
module.exports = router