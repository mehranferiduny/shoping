const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const indexController = require("../controller/index");
// const userController = require("../controller/users");

const router = new express.Router();

//!category
// router.get("/getCategorys",  adminController.getCategory);

//! @Producte

router.get("/",  indexController.getProducts);
router.post("/product",  indexController.singelProduct);





module.exports = router;
