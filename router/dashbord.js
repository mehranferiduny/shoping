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


//! @Producte
router.post("/addProduct",  adminController.addProducts);
router.post("/editProduct/:id",  adminController.editProducts);
router.delete("/deleteProduct",  adminController.deleteProducts);
router.get("/getProducts",  adminController.getProducts);

//! getindex
router.get("/getProductindex",  adminController.getProductindex);
router.get("/editProductindex/:_id",  adminController.editProductindex);



module.exports = router;
