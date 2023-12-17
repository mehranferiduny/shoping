const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const adminController = require("../controller/dashbord");

const router = new express.Router();

//  @desc   Dashboard
//  @route  GET /dashboard
router.post("/addCategory",  adminController.addCategory);
router.post("/addProduct",  adminController.addProducts);



module.exports = router;
