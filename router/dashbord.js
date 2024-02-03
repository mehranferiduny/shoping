const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const adminController = require("../controller/dashbord");

const router = new express.Router();

//!askli
router.get("/",  adminController.getDashbord);

//  @desc   Dashboard
//  @route  GET /dashboard
router.post("/addCategory",  adminController.addCategory);
router.put("/editCategory",  adminController.editCategory);
router.get("/getCategorys",  adminController.getCategory);
router.delete("/deleteCategory",  adminController.deleteCategory);
router.get("/deletesubCategory/:id",  adminController.deletesubCategory);


//!mincat
//  @desc   Dashboard
//  @route  GET /dashboard
router.post("/addCategorymin/:id",  adminController.addCategorymin);

//! @Producte
router.post("/addProduct",  adminController.addProducts);
router.post("/editProduct/:id",  adminController.editProducts);
router.delete("/deleteProduct",  adminController.deleteProducts);
router.get("/getProducts",  adminController.getProducts);
router.post("/saleProduct",  adminController.editProductsale);

//! getindex
router.get("/getProductindex",  adminController.getProductindex);
router.get("/getsales",  adminController.getProductsale);
router.get("/editProductindex/:_id",  adminController.editProductindex);



//! Banner
router.get("/getBanner",adminController.getBanner);
router.post("/addBanner",adminController.addBanner);
router.get("/deleteBanner/:id",adminController.deleteBanner);


//!Comment
router.get("/getComment",adminController.getComment);
router.get("/showComment/:id",adminController.showComment);
router.post("/replayComment/:id",adminController.replayComment);


module.exports = router;
