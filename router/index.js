const  express  = require("express");
// const { authenticated } = require("../middlewares/auth");

const indexController = require("../controller/index");

const router = new express.Router();

//!category
// router.get("/getCategorys",  adminController.getCategory);

//! @Producte

router.get("/Products",  indexController.getProducts);



module.exports = router;
